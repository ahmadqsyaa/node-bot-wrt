/*
create rick qsyaerick
github github.com/ahmadqsyaa
telegram t.me/rickk1kch

credits:
https://github.com/yagop/node-telegram-bot-api
https://github.com/helmiau/PHPTeleBotWrt
https://github.com/ahlulmukh/nilou-bot-case
https://github.com/ahmadqsyaa/TELEXWRT
https://github.com/EdyDevz/TgBotWRT
https://github.com/ahmadqsyaa/hw-tools-script
https://chatgpt.com

beri sedikit rezekinya kepada saya hehe 
> https://saweria.co/rickbiz

sengaja tidak saya encode biar sama sama bisa belajar,
tetapi jangan dijual belikan ya
*/

require('dotenv').config();
const {keymenu, commands, menu, listcomnd} = require('./lib/command')
const Telegram = require('node-telegram-bot-api');
const exec = require('./lib/exec');
const getimg = require('./lib/getimg');
const getword = require('./lib/getword');
const modpes = require('./lib/adb');
const update = require('./lib/update');
const {  zeus, proxy1, proxy2, proxy3 , rules, getTrafic } = require('./lib/openclash')
const bot = new Telegram(process.env.TOKEN, {polling: true});
const axios = require('axios').default;
const fs  = require('fs')
const path = require('path')


/*
cek file
*/
function checkFileExists(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

const fileTypes = new Map([
    ['.jpg', 'photo'],
    ['.jpeg', 'photo'],
    ['.png', 'photo'],
    ['.mp4', 'video'],
    ['.avi', 'video'],
    ['.mov', 'video'],
  ]);

/*
url update
*/
const urlup = 'https://api-update-wrt.vercel.app'
/*
sticker
*/
const listicker = [
    "CAACAgUAAxkBAAITz2aZxxbAVp9DVW-RipAXq_0JmB71AAKGAgAChX2RVaaBoqTXKYClNQQ",
    "CAACAgUAAxkBAAITvGaZxX-5JRXkvuW0ZOrbvhBUCcEFAAIqBQACwXOBVIu76bQNt87lNQQ",
    "CAACAgUAAxkBAAITzmaZxxTOP8KDTxPvD3yDiwNvfR70AAKhAgACP-1ZVu9CnufmcbvgNQQ",
    "CAACAgQAAxkBAAIT0GaZx5UCj-vrwTuKQTQ71XQIOK-NAAL0FwACpvFxHj5_8b9eIo1SNQQ",
    "CAACAgUAAxkBAAIT0WaZx7yqcEj-zrVz8CapUvmzuCfMAAL4CgAC0B2xV6HBly-F4RuvNQQ",
    "CAACAgUAAxkBAAIT0maZx-Qzqi4EOQecYu_NCyRfZvjCAAJwAgACXLsgVn0d3Kyd2dn6NQQ",
    "CAACAgUAAxkBAAIW12aeT-N8Q4fwGfJEkzt3WPUWcISCAAIwAQACAo0wNaCAW49_Tl-vNQQ",
    "CAACAgUAAxkBAAIW2GaeUCBIM5HOCdZ-nrInjMfRAlTIAAI4AQACAo0wNSIqVAlP0-u2NQQ",
    "CAACAgUAAxkBAAIW2WaeUEVkNYphrc_BnS3dSiJZZgdhAALmAQACR6OgVsHxkvEfzJSINQQ",
];


try {
    
/*keyboard button*/
const opskey = {
  reply_markup: JSON.stringify({
    keyboard: keymenu,
    one_time_keyboard: true
  })
};

//speedtest
function formas(bytes) {
    const mbps = bytes / 125000;
    return mbps.toFixed(2) + ' mbps';
}

function formats(bytes) {
    if (bytes < 1024) {
        return bytes + ' KB';
    } else if (bytes < 1048576) {
        return (bytes / 1024).toFixed(2) + ' MB';
    } else if (bytes < 1073741824) {
        return (bytes / 1048576).toFixed(2) + ' GB';
    } else {
        return (bytes / 1073741824).toFixed(2) + ' TB';
    }
}
/* 
uptime
*/
function format(uptime) {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours} jam ${minutes} menit ${seconds} detik`;
}
function getUptime() {
    const uptime = process.uptime();
    return `Uptime bot: ${format(uptime)}`;
}

async function getip() {
  try {
    var response = await axios.get('http://ip-api.com/json');
    var data = response.data;
    var ip = data.query;
    var country = data.country;
    var region = data.regionName;
    var city = data.city;
    var lat = data.lat;
    var lon = data.lon;
    var timezone = data.timezone;
    var isp = data.isp;

    result = `
 <blockquote>
╭───────────────────────────╮
├ ip: ${ip}
├ country: ${country}
├ region: ${region}
├ city: ${city}
├ lat: ${lat}
├ lon: ${lon}
├ timezone: ${timezone}
├ isp: ${isp}
╰───────────────────────────╯
</blockquote>
`;

    return result;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
/*
message bot
*/
bot.on('message',async (msg)=> {
  let type;
  let body;

  if (msg.text) {
    type = "text";
    body = msg.text;
  } else if (msg.photo) {
    type = "photo";
    body = msg.caption || "";
  } else if (msg.video) {
    type = "video";
    body = msg.caption || "";
  } else if (msg.document) {
    type = "document";
    body = msg.caption || "";
  } else if (msg.audio) {
    type = "audio";
    body = msg.caption || "";
  } else if (msg.voice) {
    type = "voice";
    body = "";
  } else if (msg.sticker) {
    type = "sticker";
    body = "";
  } else if (msg.contact) {
    type = "contact";
    body = "";
  } else if (msg.location) {
    type = "location";
    body = "";
  } else if (msg.venue) {
    type = "venue";
    body = msg.venue.title || "";
  } else {
    type = "unknown";
    body = "";
  }
  const chatId = msg.chat.id;
  const dari = msg.from.first_name+' '+msg.from.last_name
  const m = body
  const msgId = msg.message_id
  const owner = chatId == process.env.USERID ? true : false;
  const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body)
      ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi)
      : ".";
  const isCmd = body.startsWith(prefix)
  const words = body.trim().split(/\s+/);
  const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
  const ops = {
    chat_id: chatId,
    message_id: msgId+1,
  };
  const opp = {
    chat_id: chatId,
    message_id: msgId+1,
    "parse_mode":"html",
    disable_web_page_preview: true
  };
  var reply = (text) => {
      bot.sendMessage(chatId, `${text}`,{"reply_to_message_id":`${msgId}`})
  }
  var edit = (text) => {
      bot.editMessageText(text,ops);
  }
  console.log(msg)

  if (!owner) return bot.sendMessage(chatId, "kamu bukan owner dari bot ini",{"reply_to_message_id":`${msgId}`}); 
  if (!isCmd) return
/*
start case
*/
  switch(command){
    // start command
    case 'start':
        bot.sendMessage(chatId, `Hi ${dari}, please click the menu button to view all bot commands.`,{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'menu',
            callback_data: 'menu'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'menu':
        await bot.sendMessage(chatId,menu, {"reply_to_message_id":`${msgId}`,"parse_mode":"html"})
        bot.sendMessage(chatId, 'Choose an option:', opskey);
    break;
    case 'setnamebot':
        var name = words.slice(1).join(' ');
        if (!name){
            return reply('incorrect format, /setnamebot <name>')
        } else {
            await bot.setMyName({ name: `${name}` });
            return reply (`success renamed the bot to ${name}`)
        }
    break;
    case 'cmd':
        var commd = words.slice(1).join(' ');
        if (!commd) return reply('type /cmd <terminal command>, for example /cmd rm -rf /filesysteim')
        var data = await exec(commd)
        if (!data) return edit(`${commd} terjadi error`)
        bot.sendMessage(chatId, data,{"reply_to_message_id":`${msgId}`});
    break;
    case 'uptime':
        var ups = getUptime()
        bot.sendMessage(chatId, ups, {"reply_to_message_id":`${msgId}`})
    break;
    case 'time':
        var data = await exec(`date +"%d %b %Y | %I:%M %p"`)
        bot.sendMessage(chatId,data, {"reply_to_message_id":`${msgId}`})
    break;
    case 'restartbot':
        bot.sendMessage(chatId,"success restart bot", {"reply_to_message_id":`${msgId}`})
        await exec('pm2 restart all')
    break;
    case 'stopbot':
        bot.sendMessage(chatId, 'are you sure you want to stop bots?',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'yes',
            callback_data: 'stopp'
          },
          {
            text: 'nooooo',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'speedtest':
        await bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        try {
    var stdout = await exec("speedtest --accept-license --f json");
    var data = JSON.parse(stdout);
    const waktu = new Date(data.timestamp).toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false
    });
     if (data.type == "result") {
            var result = `
<b>
timestamp: ${waktu}
ping: ${data.ping.latency+' ms'}
download: ${formas(data.download.bandwidth)}
upload: ${formas(data.upload.bandwidth)}
isp: ${data.isp}
ip: ${data.interface.externalIp}
server: ${data.server.host}
nameserver: ${data.server.name}
location: ${data.server.location}
result url: <a href="${data.result.url}">link</a>
</b>
`;
            console.log(result);
            await bot.editMessageText("success", opp);
            await await bot.sendPhoto(chatId, data.result.url,{"caption":result,"parse_mode":"html",}); 
        } else {
            console.log("Data tidak valid");
            await bot.editMessageText(`<blockquote>${data+'\nPlease try again'}</blockquote>`, opp);
        }
    } catch (error) {
        console.log(error);
        await bot.editMessageText(`<blockquote>${error+'\nPlease try again'}</blockquote>`, opp);
    }  
    break;
    case 'clear':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('bash ./lib/clear.sh')
        var res = JSON.parse(data)
        result = 
`
<blockquote>
╭───────────────────────────╮
├ free ram: ${formats(res.ram_tersedia)}
├ before: ${formats(res.sebelum)}
├ after: ${formats(res.sesudah)}
├ remove: ${formats(res.cache_yang_dihapus)}
╰───────────────────────────╯
</blockquote>
`
        bot.editMessageText(result, opp);
    break;
    case 'firewall':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('uci -q show firewall  | grep "@rule"')
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break;
    case 'service':
    var name = m.split(' ')[1];
    if (!name) return reply('/service <appname>')
    bot.sendMessage(chatId, `service ${name}`,{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'start',
            callback_data: 'service start'
          },
          {
            text: 'stop',
            callback_data: 'service stop'
          },
          {
            text: 'restart',
            callback_data: 'service restart'
          },
          {
            text: 'other',
            callback_data: 'service-other'
          } 
        ]
      ]},"reply_to_message_id":`${msgId}`
  }); 
    
    break
    case 'ocproxy':
        bot.sendMessage(chatId, 'choose one of the proxy versions that works, recommend using v0.3.7',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'yacd v0.3.7',
            callback_data: 'p-v1'
          },
          {
            text: 'yacd v0.3.7',
            callback_data: 'p-v2'
          },
          {
            text: 'yacd v0.2.13',
            callback_data: 'p-v3'
          },
          {
            text: 'zeus ⚡',
            callback_data: 'zeus'
          } 
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'ocrules':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        try {
        var data = await openClashRules()
        bot.editMessageText(data, ops);
        } catch (e){
            bot.editMessageText(e, ops);
        }
    break;
    case 'octrafic':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        try {
        gets = await getTrafic()
        var data = await exec('cat lib/trafic.txt')
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
        } catch (e){
            bot.editMessageText(e, ops);
        }
    break;
    case 'passwall':
        bot.sendMessage(chatId, 'menu passwall',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'start',
            callback_data: 'start-ps'
          },
          {
            text: 'stop',
            callback_data: 'stop-ps'
          },
          {
            text: 'restart',
            callback_data: 'restart-ps'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break
    case 'openclash':
        bot.sendMessage(chatId, 'menu openclash',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'start',
            callback_data: 'start-oc'
          },
          {
            text: 'stop',
            callback_data: 'stop-oc'
          },
          {
            text: 'restart',
            callback_data: 'restart-oc'
          },
          {
            text: 'others',
            callback_data: 'learn-oc'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break
    case 'adb':
        bot.sendMessage(chatId, 'adb menu.',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'adb info',
            callback_data: 'a-i'
          },
          {
            text: 'adb sms',
            callback_data: 'a-s'
          },
          {
            text: 'adb refresh net',
            callback_data: 'a-r'
          },
          {
            text: 'adb device',
            callback_data: 'a-d'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'modpes':
       await bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
       await bot.editMessageText("success", ops);
       await exec("bash /lib/modpes.sh")
    break
    case 'wget':
    case 'curl':
    case 'git':
       var param = m.split(' ')[1];
       bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
       var data = await exec(`${command} ${param}`)
       if (!data) return edit(`${command} error`)
       bot.editMessageText(data, ops);
    break;
    case 'cpustat':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec("cpustat");
        bot.editMessageText(data, ops);
    break
    case 'uuidgen':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec("uuidgen");
        bot.editMessageText(data, ops);
    break
    case 'opkgup':
    case 'opkgupdate':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec("opkg update");
        if (!data) return reply('opkg update failed')
        bot.editMessageText(data, ops);
    break;
    case 'opkgupg':
    case 'opkgupgrade':
        var pkg = m.split(' ')[1];
        if (!pkg) return reply('incorrect format, /opkgupg <package>')
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`opkg upgrade ${pkg}`);
        if (!data) return reply('opkg upgrade failed')
        bot.editMessageText(data, ops);
    break;
    case 'opkgin':
    case 'opkginstall':
        var pack = m.split(' ')[1];
        if (!pack) return reply('What package do you want to install?')
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`opkg install ${pack}`);
        if (!data) return reply('opkg install failed')
        bot.editMessageText(data, ops);
    break;
    case 'opkglist':
        var list = m.split(' ')[1];
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        if (!list){
           return edit('wrong format, /opkglis <package>')
        } else {
           var data = await exec(`opkg list-installed | grep ${list}`) 
        }
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break;
    case 'vnstat':
        var in1 = words.slice(1).join(' ');
        if (!in1) {
            bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec(`vnstat`)
            if (!data) return edit(`total errors when running ${m}`)
            bot.editMessageText(data, ops);
        } else {
            bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec(`vnstat ${in1}`)
            if (!data) return edit(`total errors when running ${m}`)
            bot.editMessageText(data, ops);
        }
    break;
    case 'vnstati':
        bot.sendMessage(chatId, 'vnstati menu, please select below',{reply_markup: {
        inline_keyboard: [
        [ {
            text: '5 menit',
            callback_data: 'stat-5'
          },
          {
            text: 'daily',
            callback_data: 'stat-d'
          },
          {
            text: 'hourly',
            callback_data: 'stat-h'
          },
          {
            text: 'monthly',
            callback_data: 'stat-m'
          },
          {
            text: 'lainnya',
            callback_data: 'stat-l'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'upfile':
    var filedir = words.slice(1).join(' ');
    if (!filedir) return reply('wrong format, send the document, photo & video, \nthen reply with the command /upfile /path/img.jpg or /path/video.mp4 \ndocument not require filename /upfile /path')
    bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
    const replyToMessage = msg.reply_to_message;
    if (replyToMessage) {
        let fileId
        let fileName
        if (replyToMessage.document){
            fileName = replyToMessage.document.file_name
            fileId = replyToMessage.document.file_id
        } else if (replyToMessage.photo){
            fileName = ""
            fileId = replyToMessage.photo[3].file_id
        } else if (replyToMessage.video) {
            fileName = ""
            fileId = replyToMessage.video.file_id
        }
        var file = await bot.getFile(fileId);
        var token = process.env.TOKEN
        var fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        try {
        let localFilePath
        if (replyToMessage.document){
            localFilePath = `${filedir}/${fileName}`; 
        } else {
            localFilePath = filedir;
        }
            var data = await exec(`wget -O "${localFilePath}" "${fileUrl}"`)
            bot.editMessageText(`success upload file to ${localFilePath}`, ops);
            } catch (er){
                bot.editMessageText(`failed upload ${er}`, ops);

            }
    }
    break; 
    case 'dlfile':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var path = words.slice(1).join(' ');
        if (!path) {
            return edit('wrong format, example: /dlfile /root/file.zip or /img.png or /video.mp4')
        } else {
            checkFileExists(path)
             .then(async (exists) => {
               if (exists) {
                   var fileExtension = path.toLowerCase().match(/\.[0-9a-z]+$/);
                   if (fileExtension && fileTypes.has(fileExtension[0])) {
                       if (fileTypes.get(fileExtension[0]) == "video"){
                           await bot.sendVideo(chatId, path);
                           edit(`successful video download ${path}`)
                       } else if (fileTypes.get(fileExtension[0]) == "photo"){
                           await bot.sendPhoto(chatId, path);
                           edit(`successful img download ${path}`)
                       }
                   } else {
                       await bot.sendDocument(chatId, path);
                       edit(`successful ${fileTypes.get(fileExtension[0])} download ${path}`) 
                   }
               } else {
                  edit(`files ${path} not found`)
               }
             })
             .catch((error) => {
               console.error(error);
               edit(error)
             }); 
        }
    break;
    case 'command':
        bot.sendMessage(chatId, 'settings command', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'on',
            callback_data: 'on-com'
          },
          {
            text: 'off',
            callback_data: 'off-com'
          },
          {
            text: 'update',
            callback_data: 'up-com'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'button':
        bot.sendMessage(chatId, 'please select by clicking the button below.',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'button keyboard on',
            callback_data: 'b-on'
          },
          {
            text: 'button keyboard off',
            callback_data: 'b-off'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break
    case '3ginfo':
        var cekin = await exec('opkg list | grep 3ginfo');
        if (!cekin) return reply("luci-app-3ginfo-lite package not installed")
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('bash /usr/share/3ginfo-lite/3ginfo.sh');
        if (!data) return edit(`total errors when running ${m}`)
        var p = JSON.parse(data)
result = 
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
        bot.editMessageText(result, {
            chat_id: chatId,
            message_id: msgId+1,
            "parse_mode":"html",
            reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'more',
            callback_data: '3gmore'
          }
        ]
      ]}
        });
    break
    case 'mmsms':
        bot.sendMessage(chatId, 'the mmsms menu for modem assemblies.\nget sms can just error because there are too many sms.',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'get sms',
            callback_data: 'mm-g'
          },
          {
            text: 'del sms all/id',
            callback_data: 'mm-d'
          },
          {
            text: 'send sms',
            callback_data: 'mm-s'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'mmsmsd':
        var id = m.split(' ')[1];
        if (!id) return reply('wrong format, /mmsmsd <id>')
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`mmsms -d ${id}`);
        bot.editMessageText(data, ops);
    break
    case 'mmsmss':
        var bodym = words.slice(1).join(' ');
        if (!bodym) return reply('wrong format, /mmsmss <nohp> <messagebody>')
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`mmsms -s ${bodym}`);
        bot.editMessageText(data, ops);
    break
    case 'getsms':
        bot.sendMessage(chatId, 'please select by clicking the button below.',{reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'get 1 sms',
            callback_data: '1'
          },
          {
            text: 'get 5 sms',
            callback_data: '5'
          },
          {
            text: '1 sms outbox',
            callback_data: '1-1'
          },
          {
            text: '5 sms outbox',
            callback_data: '5-5'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break;
    case 'getcount':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec("ht-api -c");
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break;
    case 'infomodem':
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec("ht-api -i");
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break;
    case 'sendsms':
        var noHP = m.split(' ')[1];
        var messg = m.split(' ')[2];
        if (!noHP || !messg) return reply('wrong format, /sendsms <08xxxx/628xxx> <message>')
        bot.sendMessage(chatId, "loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`ht-api -s ${noHP} ${messg}`);
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break;
    case 'deletesms':
        var id = m.split(' ')[1];
        if (!id ) { bot.sendMessage(chatId, 'please select delete id or delete all', {reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'delete id',
            callback_data: 'del-id'
          },
          {
            text: 'delete all',
            callback_data: 'del-all'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
        } else {
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`ht-api -d ${id}`);
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
        }
    break;
    case 'dhcpl':
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('bash ./lib/netcl.sh');
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, opp);
    break
    case 'process':
        var app = m.split(' ')[1];
        if (!app) return reply('wrong format, /process <apprunning>')
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`ps | grep ${app}`);
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break
    case 'kill':
        var id = m.split(' ')[1];
        if (!id) return reply('Wrong format, /kill <id>')
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`kill ${id}`);
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break
    case 'proc':
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('cat /proc/stat');
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, ops);
    break
    case 'cekbug':
        var eth = m.split(' ')[1];
        var bug = m.split(' ')[2];
        if (!eth | !bug) return reply('/cekbug <interface> <bug.com/ip>')
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec(`timeout 10 ping -c 1 -I ${eth} ${bug}|awk "NR==2"|awk -F 'time=' '{print $2}'|awk -F. '{print $1}'`);
        if (!data) return edit(`timeout`)
        bot.editMessageText(data, ops); 
    break
    case 'sub':
    var text = words.slice(1).join(' ');
    if (!text) return reply('Wrong format, /sub vmess:// (support vmess,vless dll)')
    var url = encodeURIComponent(text);
    var api = `https://sub.bonds.id/sub2?target=clash&url=${url}&insert=false&config=base%2Fdatabase%2Fconfig%2Fstandard%2Fstandard_redir.ini&filename=proxy.yaml&emoji=false&list=true&udp=true&tfo=true&expand=false&scv=true&fdn=false&sort=false&new_name=true`
    axios({
       method: 'get',
       url: api,
       responseType: 'arraybuffer'
    })
    .then(response => {
    var fileData = Buffer.from(response.data, 'binary');
    fs.writeFileSync('proxy.yaml', fileData);
    sen()
    })
    .catch(error => {
    console.error(error);
    bot.editMessageText(error, ops);
    });
    async function sen(){
    await bot.sendDocument(chatId,'./proxy.yaml',{"reply_to_message_id":msgId})
    await exec('rm -rf proxy.yaml')
    await bot.editMessageText('success', ops);
    await bot.deleteMessage(chatId,msgId+1)
    }
    break
    case 'system':
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await exec('bash ./lib/info.sh');
        if (!data) return edit(`total errors when running ${m}`)
        bot.editMessageText(data, opp);
    break;
    case 'ifconfig':
        var faces = words.slice(1).join(' ');
        if (!faces){
            bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec('ifconfig')
            if (!data) return edit(`total errors when running ${m}`)
            await bot.editMessageText(data, ops);
        } else {
            bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec(`ifconfig ${faces}`)
            if (!data) return edit(`total errors when running ${m +faces}`)
            await bot.editMessageText(data, ops);
        }
    break
    case 'ping':
        var host = words.slice(1).join(' ');
        if (!host){
            bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec(`(ping -c 1 google.com | awk -F'=' '/time/ {print $4}')`)
            if (!data) return edit(`total errors when running ${m}/ ping timeout`)
            await bot.editMessageText(`ping google.com ${data}`, ops);
        } else {
            bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
            var data = await exec(`(ping -c 1 ${host} | awk -F'=' '/time/ {print $4}')`)
            if (!data) return edit(`total errors when running ${m} ${host} timeout`)
            await bot.editMessageText(`ping ${host} ${data}`, ops);
        }
    break;
    case 'help':
    case 'bantuan':
    case 'h':
        reply('if you need help please chat me @rickk1kch')
    break
    case 'reboot':
        bot.sendMessage(chatId, 'please choose reboot modem or reboot openwrt.', {reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'reboot modem',
            callback_data: 'remodem'
          },
          {
            text: 'reboot openwrt',
            callback_data: 'reopenwrt'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break
    case 'myip':
        bot.sendMessage(chatId,"loading",{"reply_to_message_id":`${msgId}`});
        var data = await getip()
        await bot.editMessageText(data, opp);
    break
    case 'base64':
       var text = words.slice(1).join(' ');
       if(!text) return reply('/base64 <text>')
       bot.sendMessage(chatId, text, {reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'decode',
            callback_data: `decode`
          },
          {
            text: 'encode',
            callback_data: `encode`
          }
        ]
      ]},"reply_to_message_id":`${msgId}`
  });
    break
    case 'update':
        bot.sendMessage(chatId,"check for updates..",{"reply_to_message_id":`${msgId}`});
        fs.readFile('./package.json', 'utf8',async (err, data) => {
            try{
                await axios.get(urlup)
                .then(async response => {
                    await bot.editMessageText(response.status, ops)
                    var datak = JSON.parse(data);
                    var versiono = datak.version; 
                    var versionn = response.data.version;
                    if (versiono !== versionn){
                        console.log(`[SYSTEM UPDATE] ada update dari ${versiono} ke ${versionn}`)
                        await bot.editMessageText(response.data.desc,{
                            chat_id: chatId,
                            message_id: msgId+1,
                            parse_mode:"html",
                            reply_markup: {
                                inline_keyboard: [
                                    response.data.callback
                            ]}                            
                        })
                    } else {
                        bot.editMessageText(response.data.message, {
                            chat_id: chatId,
                            message_id: msgId+1,
                            parse_mode:"html"
                        });
                        console.log('[SYSTEM UPDATE] tidak ada update')
                    }
                })
                .catch(error => {
                    console.log(`[SYSTEM UPDATE] axios error ${error}`)
                    bot.editMessageText(`axios error ${error}`, ops);
                });
            } catch (e) {
                bot.editMessageText(e,ops);
                console.log(`[SYSTEM UPDATE] error ${e}`)
            }
        })
    break
    default:
    /*selain command diatas mau diapain? */
    var end = await getword(command,listcomnd)
    await bot.sendMessage(chatId,`Maybe this is what you mean? /${end}`,{"reply_to_message_id":`${msgId}`}); 
    let ranstick = listicker[Math.floor(Math.random() * listicker.length)];
    bot.sendSticker(chatId,ranstick)
  }

});
/*
 end case
*/

/*
button callback handler
*/
bot.on('callback_query',async function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const cbk = callbackQuery.message;
  var messag = callbackQuery.message.text
  
  const opts = {
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
  };
  var reply = (text) => {
      bot.sendMessage(cbk.chat.id, text,{"reply_to_message_id":cbk.message_id})
  }

  if (action == "cancel"){
     await bot.editMessageText("Canceled", opts);
     await bot.deleteMessage(cbk.chat.id,cbk.message_id)
  } else 
  if (action == "on-com"){
    bot.editMessageText("the command is active, please exit the chat \nand wait a few seconds. if it hasn't appeared yet \ntry again.", opts);
    await bot.setMyCommands(commands)
  } else 
  if (action == "off-com"){
    bot.editMessageText("command is inactive, please exit the chat and wait a few seconds.", opts);
    await bot.deleteMyCommands();
  } else
  if (action == "up-com"){
    await bot.deleteMyCommands();
    bot.editMessageText("command update successfully, please exit the chat and wait a few seconds.", opts); 
    await bot.setMyCommands(commands)
  } else
  if (action == "1"){
    bot.editMessageText("loading", opts);
    var data = await exec("ht-api -r 1");
    bot.editMessageText(data, opts);
  } else
  if (action == "5"){
    bot.editMessageText("loading", opts);
    var data = await exec("ht-api -r 5");
    bot.editMessageText(data, opts);
  } else
  if (action == "1-1"){
    bot.editMessageText("loading", opts);
    var data = await exec("ht-api -r 1 2");
    bot.editMessageText(data, opts);
  } else
  if (action == "5-5"){
    bot.editMessageText("loading", opts);
    var data = await exec("ht-api -r 5 2");
    bot.editMessageText(data, opts);
  } else 
  if (action == "menu"){
    bot.editMessageText(menu, {
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    "parse_mode":"html"
  });
    bot.sendMessage(cbk.chat.id, 'Choose an option:', opskey);
  } else 
  if (action == "remodem"){
    bot.editMessageText("loading", opts);
    bot.editMessageText("success reboot modem", opts);
    var data = await exec("ht-api -o");
  } else 
  if (action == "reopenwrt"){
    bot.editMessageText("loading", opts);
    var data = await exec("reboot");
    bot.editMessageText("rebootting ...", opts);
  } else 
  if (action == "del-id"){
      bot.editMessageText("please type /delete <idsms>", opts);
  } else 
  if (action == "del-all"){
    bot.editMessageText("do you want to delete all sms ?\n es or no \nfyi: delete by id use /deletesms <id>",{
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'yes',
            callback_data: 'hem'
          },
          {
            text: 'noooo',
            callback_data: 'cancel'
          }
        ]
      ]},
  } );
  } else 
  if (action == "hem"){
    await bot.editMessageText("loading", opts);
    var data = await exec("ht-api -d");
    bot.editMessageText(`success ${data}`, opts);
  } else 
  if (action == "restart-ps"){
    bot.editMessageText("loading", opts);
    var data = await exec("ht-api -d");
    bot.editMessageText(data, opts);
  } else 
  if (action == "start-oc"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/openclash start");
    bot.editMessageText(data, opts);
  } else 
  if (action == "stop-oc"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/openclash stop");
    bot.editMessageText(data, opts);
  } else 
  if (action == "restart-oc"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/openclash restart");
    bot.editMessageText(data, opts);
  } else 
  if (action == "learn-oc"){
    bot.editMessageText("menu openclash",{
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    reply_markup: {
        inline_keyboard: [        [
          {
            text: 'update oc',
            callback_data: 'up-oc'
          },
          {
            text: 'update core',
            callback_data: 'up-core-oc'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},
  } );
  } else 
  if (action == "up-oc"){
    bot.editMessageText("loading", opts);
    var vold = await exec("opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}'")
    await exec('bash ./usr/share/openclash/openclash_update.sh')
    var vnew = await exec("opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}'")
    if (vold == vnew){
        return edit('Openclash is already at latest version')
    } else {
        return edit(`Openclash updated to ${vnew}`)
    }
  } else 
  if (action == "up-core-oc"){
    bot.editMessageText("loading", opts);
    var oc_app_old = await exec("echo -e $(opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}')");
	var core_old = await exec("echo -e $(/etc/openclash/core/clash -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
	var core_tun_old = await exec("echo -e $(/etc/openclash/core/clash_tun -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
	var core_meta_old = await exec("echo -e $(/etc/openclash/core/clash_meta -v 2>/dev/null |awk -F ' ' '{print $3}' 2>/dev/null)");
	bot.editMessageText("cek version openclash", opts);
	await exec("sh /usr/share/openclash/openclash_update.sh 'one_key_update' >/dev/null 2>&1 &")
	await bot.editMessageText("update berjalan", opts);
	var oc_app_new = await exec("echo -e $(opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}')");
	var core_new = await exec("echo -e $(/etc/openclash/core/clash -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
	var core_tun_new = await exec("echo -e $(/etc/openclash/core/clash_tun -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
	var core_meta_new = await exec("echo -e $(/etc/openclash/core/clash_meta -v 2>/dev/null |awk -F ' ' '{print $3}' 2>/dev/null)");
	await bot.editMessageText("success", opts);
	function cekup(par,am,res){
	    if (par == am){
	        let suu = `${res} is already at latest version`
	        return suu
	    } else {
	        let suu = `${res} updated to ${am}`
	        return suu
	    }
	}
	var app = cekup(oc_app_old,oc_app_new,'openclash app')
	var cnew = cekup(core_old,core_new, 'Dev core')
	var ctn = cekup(core_tun_old,core_tun_new, 'TUN core')
	var cmn = cekup(core_meta_old,core_meta_new, 'Meta core')
	var rest = `
	${app}
	${cnew}
	${ctn}
	${cmn}
	`
	await bot.editMessageText(rest, opts);
  } else 
  if (action == "stat-5"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati -5 10 -i br-lan -o 5.png");
    var img = '5.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-d"){
    bot.editMessageText("loading", opts);
    var data = await exec("vnstati -d -i br-lan -o daily.png");
    var img = 'daily.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-h"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati -h -i br-lan -o hourly.png");
    var img = 'hourly.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-m"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati -m -i br-lan -o monthly.png");
    var img = 'monthly.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-b"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati -s -i br-lan -o summary.png");
    var img = 'summary.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-y"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati -y -i br-lan -o yearly.png");
    var img = 'yearly.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-t"){
      bot.editMessageText("loading", opts);
    var data = await exec("vnstati --top 5 -i br-lan -o top.png");
    var img = 'top.png'
    await bot.sendPhoto(cbk.chat.id, img);
   await bot.editMessageText('success', opts);
   await bot.deleteMessage(cbk.chat.id,cbk.message_id)
   await exec('rm -rf *.png')
  } else 
  if (action == "stat-all"){
      bot.editMessageText("loading", opts);
        var vnsts = ["vnstati -5 -i br-lan -o 5.png","vnstati -s -i br-lan -o summary.png","vnstati -h -i br-lan -o hourly.png","vnstati -d -i br-lan -o daily.png",
        "vnstati -m -i br-lan -o monthly.png","vnstati -y -i br-lan -o yearly.png","vnstati --top 5 -i br-lan -o top.png"]
        for (let i = 0; i < vnsts.length; i++) {
            await exec(vnsts[i])
        }
        var img = await getimg('./','.png')
        for (let i = 0; i < img.length; i++) {
            var  photo = fs.readFileSync('./'+img[i]);
            await bot.sendPhoto(cbk.chat.id, photo);
        }
        await bot.deleteMessage(cbk.chat.id,cbk.message_id)
        await exec('rm -rf *.png')
  }
  if (action == "stat-l"){
      bot.editMessageText("other vnstati menu, please select below",{
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'br-lan',
            callback_data: 'stat-b'
          }, 
          {
            text: 'yearly',
            callback_data: 'stat-y'
          },
          {
            text: 'top',
            callback_data: 'stat-t'
          },
          {
            text: 'all',
            callback_data: 'stat-all'
          },
          {
            text: 'cancel',
            callback_data: 'cancel'
          }
        ]
      ]},
  } );
  } else 
  if (action == "b-on"){
    bot.editMessageText('display keyboard buttons', opts);
    bot.sendMessage(cbk.chat.id, 'Choose an option:', opskey);
  } else 
  if (action == "b-off"){
    await bot.deleteMessage(cbk.chat.id,cbk.message_id)
    await bot.sendMessage(cbk.chat.id, 'keyboard button has been removed',{reply_markup: {remove_keyboard: true,},"reply_to_message_id":`${cbk.message_id-1}`
  });
  } else 
  if (action == 'stopp'){
      bot.editMessageText("successfully terminate bots", opts); 
      await exec('pm2 stop all')
  } else 
  if (action == "p-v1"){
    try {
    var data = await proxy1()
    bot.editMessageText(data, opts);
    } catch (e){
        bot.editMessageText(data, opts);
    }
  } else
  if (action == "p-v2"){
    try {
    var data = await proxy2()
    bot.editMessageText(data, opts);
    } catch (e){
        bot.editMessageText(data, opts);
    }
  } else
  if (action == "p-v3"){
    try {
    var data = await proxy3()
    bot.editMessageText(data, opts);
    } catch (e){
        bot.editMessageText(data, opts);
    }
  
  } else 
  if (action == "zeus"){
    try {
    var data = await zeus()
    bot.editMessageText(data, opts);
    } catch (e){
        bot.editMessageText(data, opts);
    }
  } else
  if (action == "a-i"){
    bot.editMessageText("loading", opts);
    var data = await adb()
    bot.editMessageText(data, opts);
  } else
  if (action == "a-s"){
    bot.editMessageText("loading", opts);
    var data = await exec("bash ./lib/adb-sms.sh");
    bot.editMessageText(data, opts);
  } else
  if (action == "a-r"){
    bot.editMessageText("loading", opts);
    var data = await exec("bash ./lib/adb-refresh-network.sh");
    bot.editMessageText(data, opts);
  } else
  if (action == "a-d"){
    bot.editMessageText("loading", opts);
    var data = await exec("bash ./lib/adb-deviceinfo.sh");
    bot.editMessageText(data, opts);
  } else 
  if (action == "start-ps"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/passwall start");
    bot.editMessageText(data, opts);
  } else 
  if (action == "stop-ps"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/passwall stop");
    bot.editMessageText(data, opts);
  } else 
  if (action == "restart-ps"){
    bot.editMessageText("loading", opts);
    var data = await exec("/etc/init.d/passwall restart");
    bot.editMessageText(data, opts);
  } else 
  if (action == "mm-g"){
    bot.editMessageText("loading", opts);
    var data = await exec("mmsms -r");
    bot.editMessageText(data, opts);
  } else
  if (action == "mm-d"){
    bot.editMessageText("do you want to delete all sms ?\nyes or no \nfyi: delete by id use /mmsmsd<id>",{
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'yes',
            callback_data: 'yak'
          },
          {
            text: 'nooo',
            callback_data: 'cancel'
          }
        ]
      ]},
  } );
  } else 
  if (action == "mm-s"){
      bot.editMessageText("to send sms use /mmsmss <nohp> <message>", opts);
  } else 
  if (action.includes("service")){
      await bot.editMessageText("loading", opts);
      var act = action.split(' ')[1];
      var app = messag.split(' ')[1];
      var data = await exec(`/etc/init.d/${app} ${act}`)
      if (data == ""){
         await bot.editMessageText(`success ${app} ${act}`, opts); 
      } else {
         await bot.editMessageText(`service ${app} not found`, opts);
      }
  } else 
  if (action == "service-other"){
      bot.editMessageText(messag,{
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    reply_markup: {
        inline_keyboard: [
        [
          {
            text: 'enable',
            callback_data: 'service enable'
          },
          {
            text: 'disable',
            callback_data: 'service disable'
          },
          {
            text: 'reload',
            callback_data: 'service reload'
          } 
        ]
      ]},
  } );
  } else 
  if (action == "yak"){
    bot.editMessageText("loading", opts);
    var data = await exec("mmsms -d");
    bot.editMessageText(`success ${data}`, opts);
  } if (action == "updates"){
    await bot.editMessageText("downloading..", opts);
    await update()
     .then(async output => {
       console.log(output);
       await bot.editMessageText(output, opts);
       await bot.editMessageText("restart the bot, please wait 1 to 10 seconds to use the bot.", opts);
       await exec('pm2 restart all')
     })
     .catch(async error => {
       console.error(error);
       await bot.editMessageText(error, opts);
     });
  } else 
  if (action.includes("decode")){
    var decode = atob(messag)
    await bot.editMessageText(`<code>${decode}</code>`, {
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    "parse_mode":"html"
  });
  } else 
  if (action.includes("encode")){
    var encode = btoa(messag)
    await bot.editMessageText(`<code>${encode}</code>`, {
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    "parse_mode":"html"
  });
  } else 
  if (action == "3gmore"){
    var dor = await exec('bash /usr/share/3ginfo-lite/3ginfo.sh');
    if (!dor) return edit(`total errors when running ${m}`)
    var data = JSON.parse(dor)
result = 

`
<blockquote>
╭───────────────────────────╮
├ conn_time = ${data.conn_time}
├ conn_time_sec = ${data.conn_time_sec}
├ conn_time_since = ${data.conn_time_since}
├ rx = ${data.rx}
├ tx = ${data.tx}
├ modem = ${data.modem}
├ mtemp = ${data.mtemp}
├ firmware = ${data.firmware}
├ cport = ${data.cport}
├ protocol = ${data.protocol}
├ csq = ${data.csq}
├ signal = ${data.signal}
├ operator_name = ${data.operator_name}
├ operator_mcc = ${data.operator_mcc}
├ operator_mnc = ${data.operator_mnc}
├ location = ${data.location}
├ mode = ${data.mode}
├ registration = ${data.registration}
├ simslot = ${data.simslot}
├ imei = ${data.imei}
├ imsi = ${data.imsi}
├ iccid = ${data.iccid}
├ lac_dec = ${data.lac_dec}
├ lac_hex = ${data.lac_hex}
├ tac_dec = ${data.tac_dec}
├ tac_hex = ${data.tac_hex}
├ tac_h = ${data.tac_h}
├ tac_d = ${data.tac_d}
├ cid_dec = ${data.cid_dec}
├ cid_hex = ${data.cid_hex}
├ pci = ${data.pci}
├ earfcn = ${data.earfcn}
├ pband = ${data.pband}
├ s1band = ${data.s1band}
├ s1pci = ${data.s1pci}
├ s1earfcn = ${data.s1earfcn}
├ s2band = ${data.s2band}
├ s2pci = ${data.s2pci}
├ s2earfcn = ${data.s2earfcn}
├ s3band = ${data.s3band}
├ s3pci = ${data.s3pci}
├ s3earfcn = ${data.s3earfcn}
├ s4band = ${data.s4band}
├ s4pci = ${data.s4pci}
├ s4earfcn = ${data.s4earfcn}
├ rsrp = ${data.rsrp}
├ rsrq = ${data.rsrq}
├ rssi = ${data.rssi}
├ sinr = ${data.sinr}
╰───────────────────────────╯
</blockquote>
`
await bot.editMessageText(result, {
    chat_id: cbk.chat.id,
    message_id: cbk.message_id,
    "parse_mode":"html"
  });
  
}
/* */
  
  
});

/* otomatis deteksi document file*/
bot.on('document', (msg) => {
    const fileName = msg.document.file_name;
    bot.sendMessage(msg.chat.id,`${fileName} uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/dir for example /upfile /root`);
});

bot.on('photo', (msg) => {
    const fileName = msg.photo[3].file_id;
    bot.sendMessage(msg.chat.id,`photo uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilephoto.png for example /upfile /root/img.png`);
});

bot.on('video', (msg) => {
    const fileName = msg.video.file_id;
    bot.sendMessage(msg.chat.id,`video uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilevideo.mp4 for example /upfile /root/video.mp4`);
});

} catch (err) {
    bot.sendMessage(process.env.USERID,`[FILE CORRUPTION OCCURS]: ${err.message}`);
    console.error(err)
}
