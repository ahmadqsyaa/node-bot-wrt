import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import execute from './lib/execute.js';
import { createLog } from './lib/log.js';

const logError = createLog();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const addCommand = (cmd) => {
  commands.push(cmd);
};

const readDir = (cmdir) => {
  const files = fs.readdirSync(cmdir);
  for (let file of files) {
    const fullPath = path.join(cmdir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readDir(fullPath);
    } else if (path.extname(fullPath) === '.js') {
      import(fullPath).then(module => addCommand(module.default || module));
    }
  }
};

function checkInternet() {
  return new Promise((resolve) => {
    dns.lookup('telegram.org', (err) => {
      if (err && err.code === "ENOTFOUND") {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export const runNodeBot = async () => {
try {
  await new Promise((resolve) => {
    readDir(path.join(__dirname, './command'));
    resolve(true);
  });

  const bot = new TelegramBot(process.env.TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const userName = msg.chat.username;
    let text;
    
    if (msg.text) {
      msg.body = msg.text;
    } else if (msg.caption) {
      msg.body = msg.caption;
    } else {
      msg.body = "";
    }
    if (!msg.body) return
    const isCmd = msg.body.startsWith('/');
    if (!isCmd) return
    //const cmd = msg.body.trim().replace('/', "").split(" ")[0].toLowerCase();
    const cmd = msg.body
		.replace('/', "")
		.trim()
		.split(/ +/)
		.shift()
		.toLowerCase(); 
    //console.log(msg.body)
    const userIds = process.env.USERID.split(',')
    
    const owner = userIds.some(id => id.trim() === chatId.toString());
    
    const msgden = `<blockquote>USER: @${userName}\nID: ${chatId}\n⚠️ ACCESS DENIED ⚠️\n\nJika kamu owner dari bot ini, silahkan ganti USERID anda dengan mengetik diterminal node-bot -cc dan ketik 2 lalu masukkan userid anda <b>${chatId}</b> lalu restart service.</blockquote>`;
    if (!owner) return bot.sendMessage(chatId,msgden,{
        parse_mode: 'html',
    reply_to_message_id: messageId
    })
    const options = {
		chat_id: chatId,
		message_id: messageId + 1,
		parse_mode: "html",
		disable_web_page_preview: true
	}
	if (msg.body === '/restartbot'){
	    await bot.sendMessage(chatId, 'successful restart bot, please wait about 10 seconds', {
	            reply_to_message_id: messageId
	        })
	    process.send('restart') 
	}
	
    const caseMsg = await import('./lib/message.js');
    caseMsg.message(bot, cmd, msg, chatId, messageId, options);
    switch (cmd) {
	    case 'start':
	        bot.sendMessage(chatId, `<b>Hi @${msg.from.username}, please click the menu button to view all bot commands.</b>`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: 'menu',
                                callback_data: 'menu'
                            }]
                        ]
                    },
                    reply_to_message_id: messageId,
                    parse_mode: "html"
                }); 
	        break
	    case 'stopbot':
			bot.sendMessage(chatId, 'are you sure you want to stop bots?', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'yes',
								callback_data: 'stop bot'
							}],
							[{
								text: 'nooooo',
								callback_data: 'cancel'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
			break;
   default:
   
   }
    bot.reply = (text) => {
    bot.editMessageText(`<b>${text}</b>`, {
        chat_id: chatId,
        message_id: messageId + 1,
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
    };
    bot.send = (text) => {
    bot.sendMessage(chatId, text, {
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
    };

      for (let command of commands) {
        if (command.cmds && command.cmds.includes(cmd)) {
          await bot.sendChatAction(chatId, 'typing'); 
          await bot.sendMessage(chatId, "loading..", {
                    reply_to_message_id: messageId
                });
          await command.exec(bot, msg, chatId, messageId);
        }
      }
    
  });
  bot.on('callback_query', async (query) => {
    const module = await import('./lib/callback.js');
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;
    module.callback(bot, query, chatId, messageId, data);
  });
  bot.on('video', (msg) => {
      const fileName = msg.video.file_id;
      bot.sendMessage(msg.chat.id, `<blockquote>video uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilevideo.mp4 for example /upfile /root/video.mp4</blockquote>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true
    })
  });
  bot.on('photo', (msg) => {
      const fileName = msg.photo[3].file_id;
      bot.sendMessage(msg.chat.id, `<blockquote>photo uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/namefilephoto.png for example /upfile /root/img.png</blockquote>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
  });
  bot.on('document', (msg) => {
      const fileName = msg.document.file_name
      bot.sendMessage(msg.chat.id, `<blockquote>${fileName} uploaded successfully, if you want to upload to server reply to the file with the text /upfile /path/dir for example /upfile /root</blockquote>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true
    });
  });
  bot.on('polling_error', (error) => {
    logError(error)
    if (error.response && error.response.statusCode) {
        if (error.response.statusCode === 409) {
            bot.sendMessage(process.env.USERID, '⚠️ bot is already running in the background, force off the bot ..');
            process.send('stop')
        } else if (error.response.statusCode === 401) {
            bot.sendMessage(process.env.USERID, 'The API token used is invalid. Make sure the token used is correct and registered in BotFather, please check token and restart service.');
            process.send('stop')
        } else {
            bot.sendMessage(process.env.USERID, `${error.message}\nforce restart service`)
            process.send('restart')
        }
    }
    console.log(error)
  });
} catch (e){
    const isOnline = await checkInternet();
    logError(e)
    if(!isOnline) {
        logError('internet off detected!!')
    }
    console.log(e)
}
};

runNodeBot();
