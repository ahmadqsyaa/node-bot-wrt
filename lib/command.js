/*
    create rick qsyaerick
    github github.com/ahmadqsyaa
    telegram t.me/rickk1kch
    beri sedikit rezekinya kepada saya hehe 
    => https://saweria.co/rickbiz
*/
/*
button keyboard
*/
const keymenu = [
  ['/menu','/uuidgen', '/cpustat'],
  ['/ping', '/uptime','/time','/clear'],
  ['/setnamebot', '/command','/cmd','/stopbot'],
  ['/process','/kill', '/cekbug','/sub'],
  ['/restartbot','/speedtest','/firewall','/mmsmss'],
  ['/ocproxy','/ocrules','/octrafic','/openclash'],
  ['/passwall','/button','/mmsms','/mmsmsd',],
  ['/adb','/vnstat','/vnstati','/dhcpl'],
  ['/opkgup','/opkglist','/opkgin','/help'],
  ['/upfile','/dlfile','/service','/myip'],
  ['/getsms','/getcount','/infomodem','/sendsms'],
  ['/deletesms','/system','/proc','/ifconfig'],
  ['/reboot','/opkgupg','/update','/base64'],
  ['/curl','/wget','/git','/3ginfo']
];


/*
command
*/
const commands = [
    { command: 'service', description: 'service app start, stop dll' },
    { command: 'menu', description: 'show command bot' },
    { command: 'ping', description: 'ping google or ping a specified <host>'},
    { command: 'uptime', description: "view the bot's uptime" },
    { command: 'time', description: 'get the time from OpenWrt' },
    { command: 'clear', description: 'clear RAM cache' },
    { command: 'setnamebot', description: "set the bot's name" },
    { command: 'command', description: 'enable or disable the command menu' },
    { command: 'cmd', description: 'run a command as terminal' },
    { command: 'stopbot', description: 'stop the bot' },
    { command: 'process', description: 'view running application processes' },
    
    { command: 'kill', description: 'stop a running application process ' },
    { command: 'cekbug', description: 'ping to a domain to one of the interfaces' },
    { command: 'sub', description: 'system information' },
    { command: 'restartbot', description: 'restart the bot' },
    { command: 'speedtest', description: 'perform a public speedtest' },
    { command: 'firewall', description: 'view all firewall rules' },
    { command: 'mmsmss', description: 'send SMS with Modem Manager' },
    { command: 'ocproxy', description: 'view all OpenClash proxies' },
    { command: 'ocrules', description: 'view all OpenClash rules' },
    { command: 'octrafic', description: 'view OpenClash traffic' },
    
    { command: 'openclash', description: 'OpenClash menu' },
    { command: 'passwall', description: 'Passwall menu' },
    { command: 'button', description: 'enable or disable keyboard buttons' },
    { command: 'mmsms', description: 'Modem Manager menu' },
    { command: 'mmsmsd', description: 'delete SMS with Modem Manager' },
    { command: 'adb', description: 'ADB menu' },
    { command: 'vnstat', description: 'display vnstat information for the specified interface' },
    { command: 'vnstati', description: 'generate network monitoring images' },
    { command: 'dhcpl', description: 'view DHCP lease list' },
    { command: 'opkgup', description: 'update OpenWrt packages' },
    
    { command: 'opkglist', description: 'view installed packages' },
    { command: 'opkgin', description: 'install OpenWrt packages' },
    { command: 'help', description: 'display help information' },
    { command: 'upfile', description: 'upload a file, photo, video to OpenWrt with the specified document type' },
    { command: 'dlfile', description: 'send a file, photo, video from OpenWrt to the bot' },
    { command: 'getsms', description: 'SMS menu (only for Huawei modems)' },
    { command: 'getcount', description: 'view SMS inbox count (only for Huawei modems)' },
    { command: 'infomodem', description: 'view modem information (only for Huawei modems)' },
    { command: 'sendsms', description: 'send SMS (only for Huawei modems)' },
    { command: 'deletesms', description: 'delete SMS menu (only for Huawei modems)' },
    
    { command: 'system', description: 'system information' },
    { command: 'proc', description: 'CPU information' },
    { command: 'ifconfig', description: 'network information' },
    { command: 'reboot', description: 'reboot menu' },
    { command: 'opkgupg', description: 'upgrade OpenWrt packages' },
    { command: 'update', description: 'cek updates bot' },
    { command: 'base64', description: 'base64 decode and encode' },
    { command: 'curl', description: 'download a file from the web' },
    { command: 'wget', description: 'download a file from the web' },
    { command: 'git', description: 'git <command> / git clone' },
    
    { command: '3ginfo', description: '3ginfo-lite menu modem 4g'},
    { command: 'myip', description: 'my ip information'},
    { command: 'cpustat', description: 'status cpu and temperature'},
    { command: 'uuidgen', description: 'generate uuid'},

];
const listcomnd = commands.map(command => command.command);
/* */

/*
menu command
*/
const today = new Date();
const currentHour = today.getHours();
const hours = String(today.getHours()).padStart(2, '0');
const minutes = String(today.getMinutes()).padStart(2, '0');
const seconds = String(today.getSeconds()).padStart(2, '0');
const time = `${hours}:${minutes}:${seconds}`;

let greeting;

if (hours >= 5 && hours < 12) {
  greeting = "good morning 🌅";
} else if (hours >= 12 && hours < 15) {
  greeting = "good afternoon ☀️";
} else if (hours >= 15 && hours < 18) {
  greeting = "good evening 🌄";
} else {
  greeting = "good night 🌃";
}

const menu = `
<blockquote>
━━━━━━━━━━━━━━━━━━━━━━━━━━
 ${greeting} ${time}
 welcome to bot command 
 this is the command menu
━━━━━━━━━━━━━━━━━━━━━━━━━━
             					     OPENWRT
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /dhcpl view DHCP lease list
» /cmd run a command as terminal 
» /clear clear RAM cache 
» /firewal view all firewall rules 
» /proc CPU information 
» /reboot reboot menu 
» /system system information
» /cpustat informasi cpu and temperature
» /service service app start, stop dll
» /ifconfig network information
» /time get the time from OpenWrt
» /process view running application processes 
» /kill stop a running application process 
» /opkgin install OpenWrt packages
» /opkgupg upgrade OpenWrt packages
» /opkglist view installed packages
» /opkgup update OpenWrt packages
» /vnstat display vnstat information for the specified interface
» /vnstati generate network monitoring images
━━━━━━━━━━━━━━━━━━━━━━━━━━
		                MODEM HUAWEI
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /infomodem view modem information
» /deletesms delete SMS menu 
» /getsms SMS menu
» /getcount view SMS inbox count
» /sendsms send SMS
» /reboot reboot menu
━━━━━━━━━━━━━━━━━━━━━━━━━━
         		     MODEM MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /mmsms Modem Manager menu
» /mmsmsd delete SMS with Modem Manager
» /mmsmss send SMS with Modem Manager
━━━━━━━━━━━━━━━━━━━━━━━━━━
              							     ADB
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /adb ADB menu
━━━━━━━━━━━━━━━━━━━━━━━━━━
            					   TOOL INJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /openclash Openclash menu 
» /passwall Passwall menu
» /ocrules view all OpenClash rules
» /ocproxy view all OpenClash proxies
» /octrafic view all OpenClash trafic
━━━━━━━━━━━━━━━━━━━━━━━━━━
              						     BOT
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /uptime view the bot's uptime
» /restartbot restart the bot
» /stopbot stop the bot
» /button enable or disable keyboard buttons
» /command enable or disable the command menu
» /setnamebot set the bot's name
» /update update bot
━━━━━━━━━━━━━━━━━━━━━━━━━━
              						     TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━
» /curl download a file from the web
» /git git command / git clone
» /wget download a file from the web 
» /ping ping google or ping a specified host
» /cekbug ping to a domain to one of the interfaces
» /sub convert vmess,vless dll to file proxy
» /myip my ip information
» /3ginfo 3ginfo-lite menu modem 4g
» /base64 base64 decode and encode
» /uuidgen generate uuid
» /speedtest perform a public speedtest
» /upfile upload a file, photo ,video to OpenWrt with the specified document
» /dlfile send a file, photo ,video from OpenWrt to the bot
» /help display help information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if you like this bot don't forget to send a star on my <a href="https://github.com/ahmadqsyaa">github 🌟</a>
☕ <a href="https://saweria.co/rickbiz" >coffee</a>
</blockquote>
`; 


module.exports = { keymenu, commands, menu, listcomnd };
