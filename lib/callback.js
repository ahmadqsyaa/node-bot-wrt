import fs from 'fs';
import { listmenu, keymenu } from './command.js';
import { proxy, zeus } from './openclash.js';
import { miproxy, mizeus } from './mihomo.js';
import { neproxy, nezeus } from './neko.js';
import execute from './execute.js';
import getimg from './getimg.js';
import { commands } from './command.js';
import adb from './adb.js';
import { createLog } from './log.js';


const logError = createLog();

function clean(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.error(`Error reading the file: ${err}`);
        fs.writeFile(filePath, data.split('\n').filter(line => line.trim()).join('\n'), 'utf8', (err) => {
            if (err) return err;
            return 'OK';
        });
    });
}

export const callback = async (bot, query, chatId, messageId, data) => {
    try { 
        const options = {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "html",
            disable_web_page_preview: true
        };
        const option = {
            parse_mode: "html",
            disable_web_page_preview: true,
            reply_to_message_id: messageId
        };
        const rik = {
            reply: (text) => {
                bot.sendMessage(chatId, text, option);
            },
            delete: () => {
                bot.deleteMessage(chatId, messageId);
            }
        };

        const opskey = {
            reply_markup: JSON.stringify({
                keyboard: keymenu,
                one_time_keyboard: true
            })
        };

        var messag = query.message.text;

        switch (data) {
            case 'cancel':
                await bot.editMessageText('canceled', options);
                await rik.delete();
                break;
            case 'menu':
                bot.editMessageText(listmenu, options)
                bot.sendMessage(chatId, 'choose an option:', {
                    reply_markup: JSON.stringify({
                        keyboard: keymenu,
                        one_time_keyboard: true
                    }),
                    disable_web_page_preview: true
                });
                break;
			case 'stop bot':
				rik.reply('successfully terminate bot')
				await execute('/etc/init.d/node-bot stop')
				break;
			case 'proxy':
				bot.editMessageText('loading', options)
				proxy().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'zeus':
				bot.editMessageText('loading', options)
				zeus().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'miproxy':
				bot.editMessageText('loading', options)
				miproxy().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'mizeus':
				bot.editMessageText('loading', options)
				mizeus().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'neproxy':
				bot.editMessageText('loading', options)
				neproxy().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'nezeus':
				bot.editMessageText('loading', options)
				nezeus().then(data => {
					bot.editMessageText(`<blockquote>${data}</blockquote>`, options)
				}).catch(error => {
					bot.editMessageText(error, options)
				});
				break
			case 'learn-oc':
				bot.editMessageText(query.message.text, {
					chat_id: chatId,
					message_id: messageId,
					parse_mode: "html",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[{
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
						]
					},

				});
				break;
			case 'up-oc':
				bot.editMessageText("loading", options);
				var vold = await execute("opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}'")
				await execute('bash ./usr/share/openclash/openclash_update.sh')
				var vnew = await execute("opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}'")
				if (vold == vnew) {
					return bot.editMessageText('Openclash is already at latest version', options)
				} else {
					return bot.editMessageText(`Openclash updated to ${vnew}`, options)
				}
				break;
			case 'up-core-oc':
				var oc_app_old = await execute("echo -e $(opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}')");
				var core_old = await execute("echo -e $(/etc/openclash/core/clash -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
				var core_tun_old = await execute("echo -e $(/etc/openclash/core/clash_tun -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
				var core_meta_old = await execute("echo -e $(/etc/openclash/core/clash_meta -v 2>/dev/null |awk -F ' ' '{print $3}' 2>/dev/null)");
				bot.editMessageText("cek version openclash", options);
				await execute("sh /usr/share/openclash/openclash_update.sh 'one_key_update' >/dev/null 2>&1 &")
				await bot.editMessageText("update berjalan", options);
				var oc_app_new = await execute("echo -e $(opkg status luci-app-openclash 2>/dev/null |grep 'Version' | awk -F 'Version: ' '{print$2}')");
				var core_new = await execute("echo -e $(/etc/openclash/core/clash -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
				var core_tun_new = await execute("echo -e $(/etc/openclash/core/clash_tun -v 2>/dev/null |awk -F ' ' '{print $2}' 2>/dev/null)");
				var core_meta_new = await execute("echo -e $(/etc/openclash/core/clash_meta -v 2>/dev/null |awk -F ' ' '{print $3}' 2>/dev/null)");
				await bot.editMessageText("success", options);

				function cekup(par, am, res) {
					if (par == am) {
						let suu = `${res} is already at latest version`
						return suu
					} else {
						let suu = `${res} updated to ${am}`
						return suu
					}
				}
				var app = cekup(oc_app_old, oc_app_new, 'openclash app')
				var cnew = cekup(core_old, core_new, 'Dev core')
				var ctn = cekup(core_tun_old, core_tun_new, 'TUN core')
				var cmn = cekup(core_meta_old, core_meta_new, 'Meta core')
				var rest = `
	${app}
	${cnew}
	${ctn}
	${cmn}
	`
				await bot.editMessageText(rest, options);
				break;
			case "stat-5":
				await bot.editMessageText("loading", options);
				await execute("vnstati -5 10 -i br-lan -o 5.png");
				var img5 = '5.png';
				await bot.sendPhoto(chatId, img5, {
					caption: img5
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-d":
				await bot.editMessageText("loading", options);
				await execute("vnstati -d -i br-lan -o daily.png");
				var imgD = 'daily.png';
				await bot.sendPhoto(chatId, imgD, {
					caption: imgD
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-h":
				await bot.editMessageText("loading", options);
				await execute("vnstati -h -i br-lan -o hourly.png");
				var imgH = 'hourly.png';
				await bot.sendPhoto(chatId, imgH, {
					caption: imgH
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-m":
				await bot.editMessageText("loading", options);
				await execute("vnstati -m -i br-lan -o monthly.png");
				var imgM = 'monthly.png';
				await bot.sendPhoto(chatId, imgM, {
					caption: imgM
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-b":
				await bot.editMessageText("loading", options);
				await execute("vnstati -s -i br-lan -o summary.png");
				var imgB = 'summary.png';
				await bot.sendPhoto(chatId, imgB, {
					caption: imgB
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-y":
				await bot.editMessageText("loading", options);
				await execute("vnstati -y -i br-lan -o yearly.png");
				var imgY = 'yearly.png';
				await bot.sendPhoto(chatId, imgY, {
					caption: imgY
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-t":
				await bot.editMessageText("loading", options);
				await execute("vnstati --top 5 -i br-lan -o top.png");
				var imgT = 'top.png';
				await bot.sendPhoto(chatId, imgT, {
					caption: imgT
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;

			case "stat-all":
				await bot.editMessageText("loading", options);

				const vnsts = [
					"vnstati -5 -i br-lan -o 5.png",
					"vnstati -s -i br-lan -o summary.png",
					"vnstati -h -i br-lan -o hourly.png",
					"vnstati -d -i br-lan -o daily.png",
					"vnstati -m -i br-lan -o monthly.png",
					"vnstati -y -i br-lan -o yearly.png",
					"vnstati --top 5 -i br-lan -o top.png"
				];

				for (const cmd of vnsts) {
					await execute(cmd);
				}

				const imgAll = await getimg('./', '.png');
				for (const img of imgAll) {
					const photo = fs.readFileSync(`./${img}`);
					await bot.sendPhoto(chatId, photo);
				}
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
				break;
			case "on-com":
				bot.editMessageText("the command is active, please exit the chat \nand wait a few seconds. if it hasn't appeared yet \ntry again.", options);
				await bot.setMyCommands(commands);
				break;
			case "off-com":
				bot.editMessageText("command is inactive, please exit the chat and wait a few seconds.", options);
				await bot.deleteMyCommands();
				break;
			case "up-com":
				await bot.deleteMyCommands();
				bot.editMessageText("command update successfully, please exit the chat and wait a few seconds.", options);
				await bot.setMyCommands(commands);
				break;
			case "b-on":
				bot.editMessageText('display keyboard buttons', options);
				const opskey = {
					reply_markup: JSON.stringify({
						keyboard: keymenu,
						one_time_keyboard: true
					}),
					reply_to_message_id: messageId,
					parse_mode: 'html',
					disable_web_page_preview: true
				};
				bot.sendMessage(chatId, 'Choose an option:', opskey);
				break;
			case "b-off":
				await bot.deleteMessage(chatId, messageId);
				await bot.sendMessage(chatId, 'keyboard button has been removed', {
					reply_markup: {
						remove_keyboard: true
					},
					reply_to_message_id: `${messageId-1}`
				});
				break;
			case "mm-g":
				bot.editMessageText("loading", options);
				var data = await execute("mmsms -r");
				bot.editMessageText(data, options);
				break;
			case "mm-d":
				bot.editMessageText("do you want to delete all sms ?\nyes or no \nfyi: delete by id use /mmsmsd<id>", {
					chat_id: chatId,
					message_id: messageId,
					reply_markup: {
						inline_keyboard: [
							[{
									text: 'yes',
									callback_data: 'yak'
								},
								{
									text: 'nooo',
									callback_data: 'cancel'
								}
							]
						]
					}
				});
				break;
			case "mm-s":
				bot.editMessageText("to send sms use /mmsmss <nohp> <message>", options);
				break;
			case 'yak':
				bot.editMessageText("loading", options);
				var data = await execute("mmsms -d");
				bot.editMessageText(`success ${data}`, options);
				break
			case "1":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("ht-api -r 1");
					var result = `<blockquote>${data}</blockquote>`;
					bot.editMessageText(result, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "5":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("ht-api -r 5");
					var result = `<blockquote>${data}</blockquote>`;
					bot.editMessageText(result, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "1-1":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("ht-api -r 1 2");
					var result = `<blockquote>${data}</blockquote>`;
					bot.editMessageText(result, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "5-5":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("ht-api -r 5 2");
					var result = `<blockquote>${data}</blockquote>`;
					bot.editMessageText(result, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;
			case "del-id":
				bot.editMessageText("please type /deletesms id", options);
				break;

			case "del-all":
				bot.editMessageText("do you want to delete all sms ?\n yes or no \nfyi: delete by id use /deletesms <id>", {
					chat_id: chatId,
					message_id: messageId,
					reply_markup: {
						inline_keyboard: [
							[{
									text: 'yes',
									callback_data: 'hem'
								},
								{
									text: 'noooo',
									callback_data: 'cancel'
								}
							]
						]
					},
				});
				break;

			case "hem":
				await bot.editMessageText("loading", options);
				try {
					var data = await execute("ht-api -d");
					bot.editMessageText(`success ${data}`, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;
			case "remodem":
				bot.editMessageText("loading", options);
				try {
					bot.editMessageText("success reboot modem", options);
					await execute("ht-api -o");
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "reopenwrt":
				bot.editMessageText("loading", options);
				try {
					bot.editMessageText("rebootting ...", options);
					await execute("reboot");
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;
			case 'decode':
				var decode = atob(messag)
				await bot.editMessageText(`<code>${decode}</code>`, {
					chat_id: chatId,
					message_id: messageId,
					"parse_mode": "html"
				});
				break
			case 'encode':
				var encode = btoa(messag)
				console.log(messag)
				await bot.editMessageText(`<code>${encode}</code>`, {
					chat_id: chatId,
					message_id: messageId,
					"parse_mode": "html"
				});
				break
			case "a-i":
				bot.editMessageText("loading", options);
				try {
					var data = await adb();
					bot.editMessageText(data, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "a-s":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("bash ./lib/sh/adb-sms.sh");
					bot.editMessageText(data, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "a-r":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("bash ./lib/sh/adb-refresh-network.sh");
					bot.editMessageText(data, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;

			case "a-d":
				bot.editMessageText("loading", options);
				try {
					var data = await execute("bash ./lib/sh/adb-deviceinfo.sh");
					bot.editMessageText(data, options);
				} catch (error) {
					bot.editMessageText(`Error: ${error.message}`, options);
				}
				break;
		case "add-cntb":
        await bot.editMessageText('please send what you want to input to contab\n\nsend <b>exit</b> to exit or cancel', options);
        bot.once('message', async (response) => {
            var mess = response.text;
            if (mess == "exit") return bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})
            if (!mess) return bot.sendMessage(chatId, 'input null')
            await execute(`echo "\n${mess}" >> /etc/crontabs/root`)
            await clean('/etc/crontabs/root')
            var contab = await execute('cat /etc/crontabs/root')
            await bot.sendMessage(chatId, `success input <u>${mess}</u> to contab\n\n<b>${contab}</b>`, {
                "reply_to_message_id": `${messageId}`,
                "parse_mode": "html"
            })
        });
        break;
    
    case "dell-cntb":
        await clean('/etc/crontabs/root')
        let contab = await execute('cat /etc/crontabs/root')
        await bot.editMessageText(`please send me the number of lines you want to delete in contab.\n\n<b>${contab}</b>\n\nexample: 2\nsend <b>exit</b> to exit or cancel`, options)
        bot.once('message', async (response) => {
            var mess = response.text;
            const regex = /^\d+$/;
            if (regex.test(mess)){
                var gets = await execute(`sed -n '${mess}p' /etc/crontabs/root`)
                await execute(`sed -i '${mess}d' /etc/crontabs/root`)
                await clean('/etc/crontabs/root')
                let contab = await execute('cat /etc/crontabs/root')
                return bot.sendMessage(chatId, `success delete <s>${gets}</s>\n<b>${contab}</b>`, {
                    parse_mode: "html",
                    reply_to_message_id: messageId
                })
            } else if(mess == 'exit'){bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})
                return bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})                
            } else {
                return bot.sendMessage(chatId, 'input invalid or input only number.',{reply_to_message_id: messageId})
            }
        });
        break;
    
    case "add-start":
        await bot.editMessageText('please send what you want to input to startup\n\nsend <b>exit</b> to exit or cancel', options);
        bot.once('message', async (response) => {
            var mess = response.text;
            if (mess == "exit") return bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})
            if (!mess) return bot.sendMessage(chatId, 'input null')
            await execute(`sed -i "/exit 0/i${mess}" "/etc/rc.local"`)
            await clean('/etc/rc.local')
            var startup = await execute('cat /etc/rc.local')
            await bot.sendMessage(chatId, `success input <u>${mess}</u> to startup\n\n<b>${startup}</b>`, {
                "reply_to_message_id": `${messageId}`,
                "parse_mode": "html"
            })
        });
        break;
    
    case "dell-start":
        await clean('/etc/rc.local')
        let startup = await execute('cat /etc/rc.local')
        await bot.editMessageText(`please send me the number of lines you want to delete in startup.\n\n<b>${startup}</b>\n\nexample: 2\nsend <b>exit</b> to exit or cancel`, options)
        bot.once('message', async (response) => {
            var mess = response.text;
            const regex = /^\d+$/;
            if (regex.test(mess)){
                var gets = await execute(`sed -n '${mess}p' /etc/rc.local`)
                var deleted = await execute(`sed -i '${mess}d' /etc/rc.local`)
                await clean('/etc/rc.local')
                let startup = await execute('cat /etc/rc.local')
                return bot.sendMessage(chatId, `success delete <s>${gets}</s>\n<b>${startup}</b>`, {
                    parse_mode: "html",
                    reply_to_message_id: messageId
                })
            } else if(mess == 'exit'){bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})
                return bot.sendMessage(chatId, 'exit ✅',{reply_to_message_id: messageId})                
            } else {
                return bot.sendMessage(chatId, 'input invalid or input only number.',{reply_to_message_id: messageId})
            }
            
        });
        break;
        case 'sfile':
            await bot.sendDocument(chatId, './logs/error-log.txt');
        break;
				// end 
		default:
		}

		//
		if (data.includes("service")) {
			await bot.editMessageText("loading", options);
			var act = data.split(' ')[1];
			var app = query.message.text.split(' ')[1];
			var data = await execute(`/etc/init.d/${app} ${act}`)
			if (data == "") {
				await bot.editMessageText(`success ${app} ${act}`, options);
			} else {
				await bot.editMessageText(`service ${app} not found`, options);
			}
		} else
		if (data.includes("passwall") || data.includes("openclash") || data.includes("mihomo") || data.includes("neko")) {
			await bot.editMessageText("loading", options);
			var app = data.split(' ')[0];
			var act = data.split(' ')[1]
			var data = await execute(`/etc/init.d/${app} ${act}`)
			if (data == "") {
				await bot.editMessageText(`success ${app} ${act}`, options);
			} else {
				await bot.editMessageText(`service ${app} not found`, options);
			}
		} else 
		if (data.includes('vnstati')){
		    try{
		    await bot.editMessageText("loading", options);
		    const acak = data.match(/(\S+\.png)$/);
		    const filename = acak ? acak[0] : null;
		    await execute(data);
				await bot.sendPhoto(chatId, filename, {
					caption: filename
				});
				await bot.editMessageText("success", options);
				await bot.deleteMessage(chatId, messageId);
				await execute('rm -rf *.png');
		    } catch (error){
		        bot.editMessageText(error, options)
		    }
		}
		if (data.includes('vnsall')) {
		const parms = data.split(' ')[1];
        const vnsts1 = [
            `vnstati -5 -i ${parms} -o 5.png`,
            `vnstati -s -i ${parms} -o summary.png`,
            `vnstati -h -i ${parms} -o hourly.png`,
            `vnstati -d -i ${parms} -o daily.png`,
            `vnstati -m -i ${parms} -o monthly.png`,
            `vnstati -y -i ${parms} -o yearly.png`,
            `vnstati --top 5 -i ${parms} -o top.png`
        ];

        for (const cmd1 of vnsts1) {
            await execute(cmd1);
        }
        const imgAll1 = await getimg('./', '.png');
       
        for (const img1 of imgAll1) {
            const photos = fs.readFileSync(`./${img1}`);
            await bot.sendPhoto(chatId, photos);
        }
        
        await bot.editMessageText("success", options);
        await bot.deleteMessage(chatId, messageId);
        await execute('rm -rf *.png');
} 
		
		
	} catch (err) {
	    logError(err)
	    bot.sendMessage(chatId, `status : error\ndata-calback : ${data}\nmessage : ${err.message}`, {
				reply_to_message_id: messageId
			}); 
	}
};