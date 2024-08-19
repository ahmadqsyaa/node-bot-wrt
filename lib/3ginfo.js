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
<blockquote>
╭───────────────────────────╮
├ modem: ${p.modem}
├ operator: ${p.operator_name}
├ signal: 📶 ${p.signal+'%'}
├ location: ${p.location}
├ mode: ${p.mode}
├ time: ${p.conn_time}
├ protocol: ${p.protocol}
├ port: ${p.cport}
├ rx: ${p.rx}
├ tx: ${p.tx}
├ rsrp: ${p.rsrp}
├ rsrq: ${p.rsrq}
├ rssi: ${p.rssi}
├ sinr: ${p.sinr}
╰───────────────────────────╯
</blockquote>
`
return result
}
export default triginfo