import axios from 'axios'
export const cmds = ["myip"];
export const exec = async (bot, msg, chatId, messageId) => {
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
                var data = await getip().then(response => {
                    bot.reply(response);
                })
};