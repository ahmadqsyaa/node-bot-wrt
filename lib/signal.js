import { exec } from 'child_process';
import util from 'util';

const fsExec = util.promisify(exec);

const execute = async (command) => {
  try {
    const { stdout, stderr } = await fsExec(command);
    if (stderr) throw new Error(stderr);
    return stdout.trim();
  } catch (error) {
    console.error(`Command failed: ${command}`, error.message);
    throw error;
  }
};

const signal = async () => {
  class SignalStrength {
    constructor() {
      this.Lte = null;
    }

    isEmpty() {
      return !this.Cdma && !this.Gsm && !this.Wcdma && !this.Tdscdma && !this.Lte && !this.Nr;
    }
  }

  const parseSignalStrength = (rawSignalStrength) => {
    const entries = rawSignalStrength.split(";"); // Pisahkan data menggunakan separator `;`
    return entries
      .map((entry) => parseSingleSignalStrength(entry.trim()))
      .filter((result) => !result.isEmpty());
  };

  const parseSingleSignalStrength = (singleRawSignalStrength) => {
    const regexNetworkType = /primary=([^,]+)(?:,|})/;
    const match = singleRawSignalStrength.match(regexNetworkType);
    if (!match || match.length < 2) return new SignalStrength();

    const networkType = match[1].trim();
    const signalStrengthJson = extractSignalStrength(networkType, singleRawSignalStrength);
    return createCellSignalStrength(networkType, signalStrengthJson);
  };

  const extractSignalStrength = (networkType, rawSignalStrength) => {
    const regexSignalStrengthValue = new RegExp(`${networkType}: ([^,]+),`);
    const match = rawSignalStrength.match(regexSignalStrengthValue);
    if (!match || match.length < 2) return "";
    return formatRawSignalStrength(match[1]);
  };

  const createCellSignalStrength = (networkType, signalStrengthJson) => {
    const signalStrength = new SignalStrength();
    const signalStrengthStructs = {
      CellSignalStrengthLte: () => (signalStrength.Lte = JSON.parse(signalStrengthJson)),
    };

    if (signalStrengthStructs[networkType]) signalStrengthStructs[networkType]();
    return signalStrength;
  };

  const formatRawSignalStrength = (data) => {
    const pairs = data.split(" ");
    const result = pairs.reduce((acc, pair) => {
      const [key, value] = pair.split("=");
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    try {
      return JSON.stringify(result);
    } catch (error) {
      console.error("Error in formatRawSignalStrength:", error);
      return "";
    }
  };

  try {
    // Ambil data mSignalStrength
    const rawSignalStrength = await execute(
      `adb shell dumpsys telephony.registry | grep "mSignalStrength=SignalStrength" | sed 's/mSignalStrength=SignalStrength://'`
    );
    const formattedData = rawSignalStrength.replace(/}\s*{/g, '};\n{');
    const signalStrengths = parseSignalStrength(formattedData);

    // Ambil informasi jaringan
    const networkResult = await fsExec('adb -s MZORLNU8GQ8HK7BI shell getprop');
    const networkInfo = {};
    const properties = {
      'gsm.sim.operator.alpha': 'operator',
      'gsm.network.type': 'signal',
      'gsm.version.ril-impl': 'driver',
      'gsm.operator.isroaming': 'roaming',
      'gsm.sim.operator.numeric': 'mcc',
    };

    networkResult.stdout.split('\n').forEach((line) => {
      Object.keys(properties).forEach((property) => {
        if (line.includes(`${property}`)) {
          const parts = line.split(']: [');
          let value = parts[1]?.substring(0, parts[1].length - 1);
          if (value) {
            value = value.includes(',')
              ? value.split(',').map((item) => item.trim())
              : [value.trim(), ''];
          } else {
            value = [''];
          }
          networkInfo[properties[property]] = value;
        }
      });
    });

    // Set default value if property is not found
    Object.keys(properties).forEach((property) => {
      if (!networkInfo.hasOwnProperty(properties[property])) {
        networkInfo[properties[property]] = false;
      }
    });

    // Format JSON output for easier access
    const jsonOutput = {
      signalStrength: signalStrengths.map((strength) => ({
        Lte: strength.Lte,
      })),
      networkInfo: {
        signal: networkInfo.signal,
        roaming: networkInfo.roaming,
        operator: networkInfo.operator,
        mcc: networkInfo.mcc,
        driver: networkInfo.driver,
      },
    };
    
   // console.log(JSON.stringify(jsonOutput, null, 2));
    //console.log(jsonOutput)
    return jsonOutput;
  } catch (error) {
    console.error('Error:', error.message);
    return { error: error.message };
  }
};

export default signal
