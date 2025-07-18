import axios from "axios";
import execute from "../lib/execute.js";

async function adguardm() {
    var cek = await execute("opkg list | grep adguardhome");
    if (!cek) return '⚠️ adguardhome is not installed';
    var off = await execute("uci get AdGuardHome.AdGuardHome.enabled");
    if (off == 0) return '🛑 adguardhome is off';
    try {
        var port = await execute('uci get AdGuardHome.AdGuardHome.httpport'); 
        
        var data = await axios.get(`http://127.0.0.1:${port}/control/status`);
        var status = data.data;
        
        var data1 = await axios.get(`http://127.0.0.1:${port}/control/stats`);
        var stats = data1.data;
        
        var version = status.version;
        var language = status.language;
        var dns = status.dns_addresses.join(' | ');
        var running = status.running ? '✅ yes' : '❌ no';
        var protection = status.protection_enabled ? '✅ enabled' : '❌ disabled';
        var dns_port = status.dns_port;
        var http_port = status.http_port;
        var proc_time = Math.floor(stats.avg_processing_time * 1000) + ' ms ⚡';
        var dns_query = stats.num_dns_queries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var block_filter = stats.num_blocked_filtering.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var block_pishing = stats.num_replaced_safebrowsing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
        var top_domain_query = stats.top_queried_domains.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `| ${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} |`;
        }).join('\n'); 
        
        var top_client = stats.top_clients.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `| ${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} |`;
        }).join('\n'); 
        
        var top_block_domain = stats.top_blocked_domains.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `| ${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} |`;
        }).join('\n'); 
        
        var top_upstreams = stats.top_upstreams_responses.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `| ${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} |`;
        }).join('\n'); 
        
        var top_upstreams_average = stats.top_upstreams_avg_time.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `| ${key} : ${Math.round(value * 1000) + ' ms ⚡'} |`;
        }).join('\n'); 

        var data = `
─────────────────────────────
✨ <b>AdGuardHome Status</b> ✨
─────────────────────────────
🟢 Running         : ${running}
🌐 HTTP Port       : ${http_port}
🧩 Version         : ${version}
💬 Language        : ${language}
🔧 DNS Address     : 
| ${dns} |
🛡️ Protection      : ${protection}
📡 DNS Port       : ${dns_port}
⚡ Avg Proc Time  : ${proc_time}
🔎 DNS Queries    : ${dns_query}
🚫 Blocked Filter : ${block_filter}
🛑 Safe Browsing  : ${block_pishing}

🔥 <b>Top Queried Domains</b> 🔥
${top_domain_query}

👥 <b>Top Clients</b> 👥
${top_client}

⛔ <b>Top Blocked Domains</b> ⛔
${top_block_domain}

🌎 <b>Top Upstreams Responses</b> 🌎
${top_upstreams}

⚡ <b>Top Upstreams Avg Time</b> ⚡
${top_upstreams_average}
─────────────────────────────
`;

        return data;
    } catch (error) {
        console.error("Error:", error);
        return '❗ Error fetching AdGuardHome data';
    }
}

export default adguardm;