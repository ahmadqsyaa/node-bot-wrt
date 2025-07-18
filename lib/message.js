import execute from './execute.js'
import fs from 'fs'
import { createLog } from './log.js';

const logError = createLog();
export const message = async (bot, cmd, msg, chatId, messageId, options) => {
    try {
    let command
    let text
    text = msg.body
    command = cmd
 
    const words = msg.body.trim().split(/\s+/);
    switch(cmd){
        case 'wget':
		case 'curl':
		case 'git':
			var param = msg.body.split(' ')[1];
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`${command} ${param}`)
			if (!data) return bot.editMessageText(`${command} error`, options)
			bot.editMessageText(data, options);
			break;
		case 'nslookup':
		case 'traceroute':
			var param = msg.body.split(' ')[1];
			if (!param) return bot.sendMessage(chatId, `required url! ex: ${command} google.com , help: ${command} -help`, {
				"reply_to_message_id": `${messageId}`
			});
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`${command} ${param}`)
			if (!data) return bot.editMessageText(`${command} error`, options)
			bot.editMessageText(data, options);
			break;
		case 'cpustat':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute("cpustat");
			bot.editMessageText(data, options);
			break
		case 'uuidgen':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var uuid = await execute("uuidgen");
			bot.editMessageText(uuid, options);
			break
		case 'opkgup':
		case 'opkgupdate':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute("opkg update");
			if (!data) return bot.sendMessage(chatId, 'opkg update failed')
			bot.editMessageText(data, options);
			break;
		case 'opkgupg':
		case 'opkgupgrade':
			var pkg = msg.body.split(' ')[1];
			if (!pkg) return bot.sendMessage(chatId, 'incorrect format, /opkgupg <package>')
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`opkg upgrade ${pkg}`);
			if (!data) return bot.sendMessage(chatId, 'opkg upgrade failed')
			bot.editMessageText(data, options);
			break;
		case 'opkgin':
		case 'opkginstall':
			var pack = msg.body.split(' ')[1];
			if (!pack) return bot.sendMessage(chatId, 'What package do you want to install?, ex: /opkgin luci-app-openclash')
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`opkg install ${pack}`);
			if (!data) return bot.sendMessage(chatId, 'opkg install failed')
			bot.editMessageText(data, options);
			break;
		case 'opkglist':
			var list = msg.body.split(' ')[1];
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			if (!list) {
				return bot.editMessageText('wrong format, /opkglis <package>', options)
			} else {
				var data = await execute(`opkg list-installed | grep ${list}`)
			}
			if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
			bot.editMessageText(data, options);
			break;
		case 'vnstat':
			var in1 = words.slice(1).join(' ');
			if (!in1) {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`vnstat`)
				if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
				bot.editMessageText(data, options);
			} else {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`vnstat ${in1}`)
				if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
				bot.editMessageText(data, options);
			}
			break;
		case 'vnstati':
		    var parm = words.slice(1).join(' ');
		    if (!parm){
			bot.sendMessage(chatId, 'vnstati menu (br-lan), please select below\ncustom interface /vnstati <interface>', {
				reply_markup: {
					inline_keyboard: [
						[{text: '5 menit',callback_data: 'stat-5'},{text: 'br-lan',callback_data: 'stat-b'}],
						[{text: 'daily',callback_data: 'stat-d'},{text: 'hourly',callback_data: 'stat-h'}],
						[{text: 'monthly',callback_data: 'stat-m'},{text: 'top',callback_data: 'stat-t'}],
						[{text: 'yearly',callback_data: 'stat-y'},{text: 'all',callback_data: 'stat-all'}],
						[{text: 'menu', callback_data: 'menu'}, {text: 'cancel', callback_data: 'cancel'}]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
		    } else {
		        bot.sendMessage(chatId, `vnstati ${parm}, please select below`, {
				reply_markup: {
					inline_keyboard: [
						[{text: '5 menit',callback_data: `vnstati -5 10 -i ${parm} -o 5minute.png`},{text: parm,callback_data: `vnstati -s -i ${parm} -o summary.png`}],
						[{text: 'daily',callback_data: `vnstati -d -i ${parm} -o daily.png`},{text: 'hourly',callback_data: `vnstati -h -i ${parm} -o hourly.png`}],
						[{text: 'monthly',callback_data: `vnstati -m -i ${parm} -o monthly.png`},{text: 'top',callback_data: `vnstati --top 5 -i ${parm} -o top.png`}],
						[{text: 'yearly',callback_data: `vnstati -y -i ${parm} -o yearly.png`},{text: 'all',callback_data: `vnsall ${parm}`}],
						[{text: 'menu', callback_data: 'menu'}, {text: 'cancel', callback_data: 'cancel'}]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
		    }
			break;
		case 'command':
			bot.sendMessage(chatId, 'settings command', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'on',
								callback_data: 'on-com'
							},
							{
								text: 'off',
								callback_data: 'off-com'
							}],
							[{
								text: 'update',
								callback_data: 'up-com'
							},
							{
								text: 'cancel',
								callback_data: 'cancel'
							}]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'button':
			bot.sendMessage(chatId, 'please select by clicking the button below.', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'button keyboard on',
								callback_data: 'b-on'
							},
							{
								text: 'button keyboard off',
								callback_data: 'b-off'
							}],
							[{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'mmsms':
			bot.sendMessage(chatId, 'the mmsms menu for modem assemblies.\nget sms can just error because there are too many sms.', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'get sms',
								callback_data: 'mm-g'
							},
							{
								text: 'del sms all/id',
								callback_data: 'mm-d'
							}],
							[{
								text: 'send sms',
								callback_data: 'mm-s'
							},
							{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'mmsmsd':
			var id = msg.body.split(' ')[1];
			if (!id) return bot.sendMessage(chatId, 'wrong format, /mmsmsd <id>', {
				reply_to_message_id: messageId
			})
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`mmsms -d ${id}`);
			bot.editMessageText(data, options);
			break
		case 'mmsmss':
			var bodym = words.slice(1).join(' ');
			if (!bodym) return bot.sendMessage(chatId, 'wrong format, /mmsmss <nohp> <messagebody>', )
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`mmsms -s ${bodym}`);
			bot.editMessageText(data, options);
			break
		case 'getsms':
			bot.sendMessage(chatId, 'please select by clicking the button below.', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'get 1 sms',
								callback_data: '1'
							},
							{
								text: 'get 5 sms',
								callback_data: '5'
							}],
							[{
								text: '1 sms outbox',
								callback_data: '1-1'
							},
							{
								text: '5 sms outbox',
								callback_data: '5-5'
							}],
							[{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'getcount':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute("ht-api -c");
			if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
			bot.editMessageText(`<blockquote>${data}</blockquote>`, options);
			break;
		case 'infomodem':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute("ht-api -i");
			if (!data) return bot.editMessageText(`total errors when running ${text}`, {
				reply_to_message_id: messageId
			})
			bot.editMessageText(`<blockquote>${data}</blockquote>`, options);
			break;
		case 'sendsms':
			var noHP = msg.body.split(' ')[1];
			var messg = words.slice(1).join(' ');
			if (!noHP || !messg) return bot.sendMessage(chatId, 'wrong format, /sendsms <08xxxx/628xxx> <message>', {
				reply_to_message_id: messageId
			})
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`ht-api -s ${noHP} ${messg}`);
			if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
			bot.editMessageText(data, options);
			break;
		case 'deletesms':
			var id = msg.body.split(' ')[1];
			if (!id) {
				bot.sendMessage(chatId, 'please select delete id or delete all', {
					reply_markup: {
						inline_keyboard: [
							[{
									text: 'delete id',
									callback_data: 'del-id'
								},
								{
									text: 'delete all',
									callback_data: 'del-all'
								}],
								[{
									text: 'cancel',
									callback_data: 'cancel'
								}
							]
						]
					},
					"reply_to_message_id": `${messageId}`
				});
			} else {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`ht-api -d ${id}`);
				if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
				bot.editMessageText(data, options);
			}
			break;
		case 'dhcpl':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute('bash ./lib/sh/netcl.sh');
			if (!data) return bot.editMessageText(`total errors when running ${text}`, {
				reply_to_message_id: messageId
			})
			bot.editMessageText(data, options);
			break
		case 'process':
			const app = msg.body.split(' ')[1];
			if (!app) return bot.sendMessage(chatId, 'wrong format, /process <apprunning>', {
				reply_to_message_id: messageId
			});

			bot.sendMessage(chatId, "loading", {
				reply_to_message_id: `${messageId}`
			});
			var data = await execute(`ps | grep ${app}`);
			if (!data) return bot.editMessageText(`total errors when running ${text}`, {
				reply_to_message_id: messageId
			});

			editMessageText(data, {
				reply_to_message_id: messageId
			});
			break
		case 'kill':
			var id = msg.body.split(' ')[1];
			if (!id) return bot.sendMessage(chatId, 'Wrong format, /kill <id>', {
				reply_to_message_id: messageId
			});
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			try {
				const data = await execute(`kill ${id}`);
				if (!data) return bot.editMessageText(`total errors when running ${text}`, {
					reply_to_message_id: messageId
				});
				bot.editMessageText(data, options);
			} catch (error) {
				bot.editMessageText(`Error: ${error.message}`, {
					reply_to_message_id: messageId
				});
			}
			break;
		case 'proc':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			try {
				const data = await execute('cat /proc/stat');
				if (!data) return bot.editMessageText(`total errors when running ${text}`, {
					reply_to_message_id: messageId
				});
				bot.editMessageText(data, options);
			} catch (error) {
				bot.editMessageText(`Error: ${error.message}`, {
					reply_to_message_id: messageId
				});
			}
			break;
		case 'cekbug':
			const eth = msg.body.split(' ')[1];
			const bug = msg.body.split(' ')[2];
			if (!eth) return bot.sendMessage(chatId, '/cekbug <interface> <bug.com/ip>', {
				reply_to_message_id: messageId
			});
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": messageId
			});
			try {
				const data = await execute(`timeout 10 ping -c 1 -I ${eth} ${bug}|awk "NR==2"|awk -F 'time=' '{print $2}'|awk -F. '{print $1}'`);
				if (!data) return bot.editMessageText(`timeout`, options);
				bot.editMessageText(data, options);
			} catch (error) {
				bot.editMessageText(`Error: ${error.message}`, options);
			}
			break;
		case 'system':
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute('bash ./lib/sh/info.sh');
			if (!data) return edit(`total errors when running ${text}`)
			bot.editMessageText(`<blockquote>${data}</blockquote>`, options);
			break;
		case 'ifconfig':
			var faces = msg.body.split(' ').slice(1).join(' ');
			if (!faces) {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute('ifconfig')
				if (!data) return bot.editMessageText(`total errors when running ${text}`, options)
				await bot.editMessageText(data, options);
			} else {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`ifconfig ${faces}`)
				if (!data) return bot.editMessageText(`total errors when running ${text +faces}`, options)
				await bot.editMessageText(data, options);
			}
			break
		case 'update':
		    bot.sendMessage(chatId, 'for update type in terminal node-bot -u, ,node-bot -h for help', {reply_to_message_id: messageId})
		    break
		case 'ping':
			var host = msg.body.split(' ').slice(1).join(' ');
			try{
			if (!host) {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`(ping -c 1 google.com | awk -F'=' '/time/ {print $4}')`)
				if (!data) return bot.editMessageText(`ping timeout.`, options)
				await bot.editMessageText(`ping google.com ${data}`, options);
			} else {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`(ping -c 1 ${host} | awk -F'=' '/time/ {print $4}')`)
				if (!data) return bot.editMessageText(`ping timeout.`, options)
				await bot.editMessageText(`ping ${host} ${data}`, options);
			}
			} catch (error) {
			    console.log(error)
			    bot.sendMessage(chatId, error)
			}
			break;
		case 'reboot':
			bot.sendMessage(chatId, 'do you want to continue with the menu ⚠️?', {
				reply_markup: {
					inline_keyboard: [
							[{
								text: 'yes',
								callback_data: 'reopenwrt'
							}],
							[{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				"reply_to_message_id": `${msgId}`
			});
			break
		case 'rebootmodem':
			bot.sendMessage(chatId, 'do you want to continue with the menu ⚠️?', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'yes',
								callback_data: 'remodem'
							}],
							[{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				"reply_to_message_id": `${msgId}`
			});
			break
		case 'base64':
			var textin = msg.body.split(' ').slice(1).join(' ');
			if (!textin) return bot.sendMessage(chatId, '/base64 <text>', {
				reply_to_message_id: messageId
			})
			bot.sendMessage(chatId, textin, {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'decode',
								callback_data: `decode`
							},
							{
								text: 'encode',
								callback_data: `encode`
							}
						]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break
		case 'adb':
			bot.sendMessage(chatId, 'adb menu.', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'adb info',
								callback_data: 'a-i'
							},
							{
								text: 'adb sms',
								callback_data: 'a-s'
							}],
							[{
								text: 'adb refresh net',
								callback_data: 'a-r'
							},
							{
								text: 'adb device',
								callback_data: 'a-d'
							}
						]
					]
				},
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'crontab':
                fs.promises.readFile('/etc/crontabs/root', 'utf8')
                    .then(data => {
                        bot.sendMessage(chatId, `please select the menu\n\n<b>${data}</b>`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                            text: 'add crontab',
                                            callback_data: 'add-cntb'
                                        },
                                        {
                                            text: 'delete crontab (line)',
                                            callback_data: 'dell-cntb'
                                        }
                                    ]
                                ]
                            },
                            "reply_to_message_id": `${messageId}`,
                            "parse_mode": "html"
                        });
                    })
                    .catch(err => {
                        if (err.code === 'ENOENT') {
                            bot.sendMessage(chatId, 'file contab not found', {reply_to_message_id: messageId})
                        }
                    });
                break
            case 'startup':
                fs.promises.readFile('/etc/rc.local', 'utf8')
                    .then(data => {
                        bot.sendMessage(chatId, `please select the menu\n\n<b>${data}</b>`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{
                                            text: 'add startup',
                                            callback_data: 'add-start'
                                        },
                                        {
                                            text: 'delete startup (line)',
                                            callback_data: 'dell-start'
                                        }
                                    ]
                                ]
                            },
                            "reply_to_message_id": `${messageId}`,
                            "parse_mode": "html"
                        });
                    })
                    .catch(err => {
                        if (err.code === 'ENOENT') {
                            bot.sendMessage(chatId, 'file startup not found',{reply_to_message_id:messageId 
                                
                            })
                        }
                    });
                break
        default:
    }
    } catch (err){
        bot.sendMessage(chatId, `status : error\ncommand : ${cmd}\nmessage : ${err.message}`, {
				reply_to_message_id: messageId
			});
    }
}