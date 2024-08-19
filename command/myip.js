import axios from 'axios'
export const myip = async (bot, msg, chatId, messageId, text) => {
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

           var result = `
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
    
    bot.sendMessage(chatId, "loading", {
                    "reply_to_message_id": `${messageId}`
                });
                var data = await getip().then(response => {
                    bot.editMessageText(response, {
                    chat_id: chatId,
                            message_id: messageId+1,
                            parse_mode: "html",
                            disable_web_page_preview: true
                });
                })
}