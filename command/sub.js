import axios from 'axios'
import execute from '../lib/execute.js'
import fs from 'fs'
export const sub = async (bot, msg, chatId, messageId, text) => {
    var inp = text.split(' ').slice(1).join(' ');
                if (!inp) return bot.sendMessage(chatId, 'Wrong format, /sub vmess:// (support vmess,vless dll)')
                bot.sendMessage(chatId, 'loading',{reply_to_message_id:messageId})
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
                        bot.editMessageText(error, {
                            chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                        });
                    });
                async function sen() {
                    await bot.sendDocument(chatId, './proxy.yaml', {
                        "reply_to_message_id": messageId
                    })
                    await execute('rm -rf proxy.yaml')
                    await bot.editMessageText('success', {
                        chat_id: chatId,
                        message_id: messageId+1,
                        parse_mode: "html",
                        disable_web_page_preview: true
                    });
                    await bot.deleteMessage(chatId, messageId+1)
                }
}