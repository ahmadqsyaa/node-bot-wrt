import { domains } from '../lib/command.js'
import execute from '../lib/execute.js'
export const cmds = ["pingall"];
export const exec = (bot, msg, chatId, messageId) => {
    async function ping(domain) {
                    try {
                        const result = await execute(`ping -c 1 ${domain}`);
                        const timeMatch = result.match(/time=(\d+(\.\d+)?) ms/);
                        if (timeMatch) {
                            return `${domain} : ${Math.floor(parseFloat(timeMatch[1]))} ms`;
                        } else {
                            return `${domain} : timeout`;
                        }
                    } catch (error) {
                        return `${domain} : error`;
                    }
                }

                async function pingall(domains) {
                    const results1 = await Promise.all(domains.map(ping));
                    return results1;
                }

                pingall(domains).then(results => {
                    const text = results.join('\n'); 
                    bot.reply(`<blockquote>${text}</blockquote>`);
                });
};