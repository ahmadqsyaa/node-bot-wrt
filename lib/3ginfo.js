import execute from './execute.js'
async function triginfo(){
var cekin = await execute('opkg list | grep 3ginfo');
                if (!cekin) return 'luci-app-3ginfo-lite package not installed'
                var data = await execute('bash /usr/share/3ginfo-lite/3ginfo.sh');
                var json = data.match(/\{[\s\S]*\}/)[0];
                if (!data) return '3ginfo error'
                var p = JSON.parse(json)
                const result = 
`
╭───────────────────────────────╮
│ 🛰️  Modem     : ${p.modem}
│ 🏷️  Operator  : ${p.operator_name}
│ 📶 Signal    : ${p.signal}%
│ 📍 Location  : ${p.location}
│ ⚙️  Mode      : ${p.mode}
│ ⏰ Time      : ${p.conn_time}
│ 🌐 Protocol : ${p.protocol}
│ 🎛️  Port     : ${p.cport}
│ 🌡️ Temp     : ${p.mtemp}
│ ⬇️ Download : ${p.tx}
│ ⬆️ Upload   : ${p.rx}
│ 📡 RSRP     : ${p.rsrp}
│ 📶 RSRQ     : ${p.rsrq}
│ 📢 RSSI     : ${p.rssi}
│ 🟢 SINR     : ${p.sinr}
╰───────────────────────────────╯
`;
return result
}
export default triginfo