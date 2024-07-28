const fs = require('fs');
const WebSocket = require('ws')
const exec = require('./exec');
oc_ip = '127.0.0.1';
oc_port = '9090';

const dat = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const date = dat.toLocaleString('id-ID', options);
//const socket = new WebSocket(`ws://${oc_ip}:9090/connections?token=${oc_secret}`)

function delayColor(input) {
  if (input == 0) {
    return "⬛️";
  } else if (input >= 1 && input <= 150) {
    return "🟩";
  } else if (input >= 151 && input <= 300) {
    return "🟨";
  } else if (input >= 300 && input <= 350) {
    return "🟧";
  } else if (input > 350) {
    return "🟥";
  }
}

function format(bytes) {
    if (bytes < 1024) {
        return bytes + ' B';
    } else if (bytes < 1048576) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1073741824) {
        return (bytes / 1048576).toFixed(2) + ' MB';
    } else {
        return (bytes / 1073741824).toFixed(2) + ' GB';
    }
}

async function openClashProxies(y) {
try {
    oc_secret = await exec('uci get openclash.config.dashboard_password')
    const url = `http://${oc_ip}:${oc_port}/providers/proxies`;
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Authorization': `Bearer ${oc_secret}`,
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Cookie': 'filemanager=1ef7508aff97eaa2f6d60e5b174204ba',
        'Referer': `http://${oc_ip}:${oc_port}/ui/yacd/?hostname=${oc_ip}&port=${oc_port}&secret=${oc_secret}`,
        'Sec-Gpc': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
    };
    if (y == '1'){
        try {
        var response = await fetch(url, { method: 'GET', headers });
        var result = await response.json();
        var json = JSON.stringify(result,null,2)
        var aa = await exec(`echo ${json} > data.json`)
        let data = result['providers']['default']['proxies'];

        let final = "⏱ Type | Name | Delay\n";

        data.forEach(value => {
            let name = value['name'];
            let delay = value['extra']['http://www.gstatic.com/generate_204'].slice(-1)[0].delay
            let type = value['type'];
            let color = delayColor(delay);
            final += `${color} ${type} | ${name} | ${delay} ms \n`;
        });
        return final
        } catch (er){
            r = `${er} \n${data}`
            return r
        }
    } else {
        try {
        var response = await fetch(url, { method: 'GET', headers });
        var result = await response.json();
        var json = JSON.stringify(result,null,2)
        var aa = await exec(`echo ${json} > data.json`)
        let data = result['providers']['default']['proxies'];

        let final = "⏱ Type | Name | Delay\n";

        data.forEach(value => {
            let name = value['name'];
            let delay = value['history'][0]['delay']
            let type = value['type'];
            let color = delayColor(delay);
            final += `${color} ${type} | ${name} | ${delay} ms \n`;
        });
        return final
        } catch (b) {
            b = 'maaf error'
            return b
        }
    }
    } catch (error) {
        console.error('Error:', error);
        return error
    }
}


async function openClashRules() {
try {
    oc_secret = await exec('uci get openclash.config.dashboard_password')
    const url = `http://${oc_ip}:${oc_port}/rules`;
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Authorization': `Bearer ${oc_secret}`,
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Cookie': 'filemanager=ee057d392316be9bec05f297f2037536',
        'Referer': `http://${oc_ip}:${oc_port}/ui/yacd/?hostname=${oc_ip}&port=${oc_port}&secret=${oc_secret}`,
        'Sec-Gpc': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
    };
        const response = await fetch(url, { method: 'GET', headers });
        const result = await response.json();
        let data = result;
        let final = "Type | Payload | Proxy\n";
        for (let i = 0; i < data.rules.length; i++) {
          var rule = data.rules[i];
          var type = rule.type;
          var payload = rule.payload;
          var proxy = rule.proxy;
          var size = rule.size;
          final += `${type} | ${payload} | ${proxy}\n`;
          
        }
        return final
    } catch (error) {
        console.error('Error:', error);
        return error
    }
}
/*
get trafic all openclash
*/
async function getTrafic(){
try {
oc_secret = await exec('uci get openclash.config.dashboard_password')
var url = `ws://${oc_ip}:9090/connections?token=${oc_secret}`
const socket = new WebSocket(url)
socket.onmessage = async (event) => {
  const json = JSON.parse(event.data)
    let q = `Total download: ${format(json.downloadTotal)} | Total upload: ${format(json.uploadTotal)} | memory: ${format(json.memory)} | diupdate: ${date}`
    var out = await exec(`echo '${q}' > ./lib/trafic.txt`)
    setTimeout(() => {
        return
    }, 500);
}
socket.addEventListener('error', (error) => {
     return error
   });
} catch (e) {
    console.log(e)
    return e
}
}

module.exports = { openClashRules, openClashProxies, getTrafic }