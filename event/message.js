import execute from '../lib/execute.js'
import {
	rules,
	getTrafic
} from '../lib/openclash.js'
import triginfo from '../lib/3ginfo.js'
import fs from 'fs'
export const messageEvent = async (bot, msg) => {
  try {
	const chatId = msg.chat.id;
	const messageId = msg.message_id;
	const options = {
		chat_id: chatId,
		message_id: messageId + 1,
		parse_mode: "html",
		disable_web_page_preview: true
	}
	let text
	if (msg.text) {
		text = msg.text;
	} else if (msg.photo) {
		text = msg.caption || "";
	} else if (msg.video) {
		text = msg.caption || "";
	} else if (msg.document) {
		text = msg.caption || "";
	} else if (msg.audio) {
		text = msg.caption || "";
	} else if (msg.voice) {
		text = "";
	} else if (msg.sticker) {
		text = "";
	} else if (msg.contact) {
		text = "";
	} else if (msg.location) {
		text = "";
	} else if (msg.venue) {
		text = msg.venue.title || "";
	} else {
		text = "";
	}
	const prefix = /^[°#+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(text) ?
		text.match(/^[°#+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) :
		".";
	const command = text
		.replace(prefix, "")
		.trim()
		.split(/ +/)
		.shift()
		.toLowerCase();
	const words = text.trim().split(/\s+/);
	switch (command) {
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
                    "reply_to_message_id": `${messageId}`,
                    "parse_mode": "html"
                }); 
	        break
		case 'time':
			var data = await execute(`date +"%d %b %Y | %H:%text"`)
			bot.sendMessage(chatId, data, {
				reply_to_message_id: messageId
			})
			break;
		case 'restartbot':
			bot.sendMessage(chatId, "success restart bot", {
				reply_to_message_id: messageId
			})
			await execute('/etc/init.d/node-bot restart')
			break;
		case '3ginfo':
			bot.sendMessage(chatId, "loading", {
				reply_to_message_id: messageId
			})
			var gets = await triginfo()
			bot.editMessageText(gets, options)
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
				"reply_to_message_id": `${messageId}`
			});
			break;
		case 'firewall':
			bot.sendMessage(chatId, "loading", {
				reply_to_message_id: messageId
			});
			var data = await execute('uci -q show firewall  | grep "@rule"')
			if (!data) return bot.editMessageText('firewall error', options);
			bot.editMessageText(data, options);
			break;
		case 'service':
			var name = text.split(' ')[1];
			if (!name) return bot.sendMessage(chatId, '/service <appname>', {
				reply_to_message_id: messageId
			})
			bot.sendMessage(chatId, `service ${name}`, {
				reply_markup: {
					inline_keyboard: [
						    [{
								text: 'start',
								callback_data: 'service start'
							},
							{
								text: 'stop',
								callback_data: 'service stop'
							}],
							[{
								text: 'restart',
								callback_data: 'service restart'
							},
							{
								text: 'enable',
								callback_data: 'service enable'
							}],
							[{
							    text: 'disable',
							    callback_data: 'service disable'
							},
							{
							    text: 'reload',
							    callback_data: 'service reload'
							}],
							[{
							    text: 'cancel',
							    callback_data: 'cancel'
							  
							}]
					]
				},
				reply_to_message_id: messageId
			});
			break;
		case 'ocproxy':
			bot.sendMessage(chatId, 'choose get proxy or zeus ⚡', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'get proxy',
								callback_data: 'proxy'
							}],
							[{
								text: 'zeus ⚡',
								callback_data: 'zeus'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
			break;
		case 'ocrules':
			bot.sendMessage(chatId, "loading", {
				reply_to_message_id: messageId
			});
			rules().then(data => {
				bot.editMessageText(`<blockquote>${data}</blockquote>`, {
					chat_id: chatId,
					message_id: messageId + 1,
					parse_mode: "html",
					disable_web_page_preview: true
				})
			}).catch(error => {
				bot.editMessageText(error, {
					chat_id: chatId,
					message_id: messageId + 1,
					parse_mode: "html",
					disable_web_page_preview: true
				})
			});
			break;
		case 'octrafic':
			bot.sendMessage(chatId, "loading", {
				reply_to_message_id: messageId
			});
			getTrafic()
			var data = await execute('cat lib/trafic.txt')
			bot.editMessageText(`<blockquote>${data}</blockquote>`, {
				chat_id: chatId,
				message_id: messageId + 1,
				parse_mode: "html",
				disable_web_page_preview: true
			})
			break;
		case 'passwall':
			bot.sendMessage(chatId, 'menu passwall', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'passwall start'
							},
							{
								text: 'stop',
								callback_data: 'passwall stop'
							}],
							[{
								text: 'restart',
								callback_data: 'passwall restart'
							},
							{
								text: 'cancel',
								callback_data: 'cancel'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
			break
		case 'openclash':
			bot.sendMessage(chatId, 'menu openclash', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'start',
								callback_data: 'openclash start'
							},
							{
								text: 'stop',
								callback_data: 'openclash stop'
							}],
							[{
								text: 'restart',
								callback_data: 'openclash restart'
							},
							{
								text: 'others',
								callback_data: 'learn-oc'
							}
						]
					]
				},
				reply_to_message_id: messageId
			});
			break;
		case 'modpes':
			await bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			await bot.editMessageText("success", options);
			await execute("bash ./lib/sh/modpes.sh")
			break;
		case 'wget':
		case 'curl':
		case 'git':
			var param = text.split(' ')[1];
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
			var pkg = text.split(' ')[1];
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
			var pack = text.split(' ')[1];
			if (!pack) return bot.sendMessage(chatId, 'What package do you want to install?, ex: /opkgin luci-app-openclash')
			bot.sendMessage(chatId, "loading", {
				"reply_to_message_id": `${messageId}`
			});
			var data = await execute(`opkg install ${pack}`);
			if (!data) return bot.sendMessage(chatId, 'opkg install failed')
			bot.editMessageText(data, options);
			break;
		case 'opkglist':
			var list = text.split(' ')[1];
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
			var id = text.split(' ')[1];
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
			var noHP = text.split(' ')[1];
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
			var id = text.split(' ')[1];
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
			const app = text.split(' ')[1];
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
			var id = text.split(' ')[1];
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
			const eth = text.split(' ')[1];
			const bug = text.split(' ')[2];
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
			var faces = text.split(' ').slice(1).join(' ');
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
			var host = text.split(' ').slice(1).join(' ');
			try{
			if (!host) {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`(ping -c 1 google.com | awk -F'=' '/time/ {print $4}')`)
				if (!data) return bot.editMessageText(`total errors when running ${text}/ ping timeout`, options)
				await bot.editMessageText(`ping google.com ${data}`, options);
			} else {
				bot.sendMessage(chatId, "loading", {
					"reply_to_message_id": `${messageId}`
				});
				var data = await execute(`(ping -c 1 ${host} | awk -F'=' '/time/ {print $4}')`)
				if (!data) return bot.editMessageText(`total errors when running ${text} ${host} timeout`, options)
				await bot.editMessageText(`ping ${host} ${data}`, options);
			}
			} catch (error) {
			    console.log(error)
			    bot.sendMessage(chatId, error)
			}
			break;
		case 'reboot':
			bot.sendMessage(chatId, 'please choose reboot modem or reboot openwrt.', {
				reply_markup: {
					inline_keyboard: [
						[{
								text: 'reboot modem',
								callback_data: 'remodem'
							}],
							[{
								text: 'reboot openwrt',
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
		case 'base64':
			var textin = text.split(' ').slice(1).join(' ');
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
			//end
	    }
	} catch(err){
	    bot.sendMessage(chatId, `Error: ${err}`, {reply_to_message_id: messageId})
	}

};