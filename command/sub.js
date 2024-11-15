import axios from 'axios'
import execute from '../lib/execute.js'
import fs from 'fs'
export const cmds = ["sub"];
export const exec = async (bot, msg, chatId, messageId) => {
        var inp = msg.body.split(' ').slice(1).join(' ');
                if (!inp) return bot.sendMessage(chatId, 'Wrong format, /sub vmess:// (support vmess,vless dll)')
                var url = encodeURIComponent(inp);
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
                        bot.reply(error);
                    });
                async function sen() {
                    try {
                    await bot.sendDocument(chatId, './proxy.yaml', {
                        "reply_to_message_id": messageId
                    })
                    await execute('rm -rf proxy.yaml')
                    await bot.reply('success');
                    bot.deleteMessage(chatId, messageId+1)
                    } catch (e){
                        bot.reply(e)
                    }
                }
};