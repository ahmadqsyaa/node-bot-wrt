import axios from "axios";
import execute from "../lib/execute.js";

async function adguardm() {
    var cek = await execute("opkg list | grep adguardhome");
    if (!cek) return 'adguardhome in mot installed';
    var off = await execute("uci get AdGuardHome.AdGuardHome.enabled");
    if (off == 0) return 'adguardhome is off';
    try {
        var port = await execute('uci get AdGuardHome.AdGuardHome.httpport'); 
        
        var data = await axios.get(`http://127.0.0.1:${port}/control/status`);
        var status = data.data;
        
        var data1 = await axios.get(`http://127.0.0.1:${port}/control/stats`);
        var stats = data1.data;
        
        var version = status.version;
        var language = status.language;
        var dns = status.dns_addresses.join(' | ');
        var running = status.running;
        var protection = status.protection_enabled;
        var dns_port = status.dns_port;
        var http_port = status.http_port;
        var proc_time = Math.floor(stats.avg_processing_time * 1000) + ' ms';
        var dns_query = stats.num_dns_queries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var block_filter = stats.num_blocked_filtering.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        var block_pishing = stats.num_replaced_safebrowsing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
        var top_domain_query = stats.top_queried_domains.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `|${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}|`;
        }).join('\n'); 
        
        var top_client = stats.top_clients.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `|${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}|`;
        }).join('\n'); 
        
        var top_block_domain = stats.top_blocked_domains.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `|${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}|`;
        }).join('\n'); 
        
        var top_upstreams = stats.top_upstreams_responses.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `|${key} : ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}|`;
        }).join('\n'); 
        
        var top_upstreams_average = stats.top_upstreams_avg_time.slice(0, 5).map(obj => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            return `|${key} : ${Math.round(value * 1000) + ' ms'}|`;
        }).join('\n'); 

        var data = `
running : ${running}
port : ${http_port} 
version : ${version}
language : ${language}
dns address : 
${'| '+dns+' |'}
protection enabled : ${protection}
dns port : ${+dns_port}
avg processing time : ${proc_time}
dns queries : ${dns_query}
blocked filtering : ${block_filter}
safe browsing : ${block_pishing}
top queried domains : 
${top_domain_query}
top clients : 
${top_client}
top blocked_domains : 
${top_block_domain}
top upstreams_responses : 
${top_upstreams}
top upstreams_avg_time : 
${top_upstreams_average}
`;

        return data;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}

export default adguardm;