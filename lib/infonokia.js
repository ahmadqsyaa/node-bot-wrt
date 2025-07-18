import http from 'http';

function formatUptime(seconds) {
    const months = Math.floor(seconds / (30 * 24 * 3600));
    seconds %= 30 * 24 * 3600;
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    const parts = [];
    if (months) parts.push(`${months}mo`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds) parts.push(`${seconds}s`);
    return parts.join(' ');
}

export async function fetchRouterStatus(hostname) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            path: '/prelogin_status_web_app.cgi',
            method: 'GET',
        };

        const req = http.request(options, res => {
            let data = '';

            res.on('data', chunk => data += chunk);

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    let output = '';

                    const dev = json.device_info?.[0];
                    const topo = json.ntwtopo_cfg?.[0];
                    if (dev && topo) {
                        output += `🛠️ Router Info\n`;
                        output += `📡 Model          : ${dev.ModelName}\n`;
                        output += `🏭 Vendor         : ${dev.Vendor}\n`;
                        output += `🔢 Serial Number  : ${dev.SerialNumber}\n`;
                        output += `⚙️ Hardware Ver   : ${dev.HardwareVersion}\n`;
                        output += `💿 Software Ver   : ${dev.SoftwareVersion}\n`;
                        output += `🌐 IP Address     : ${topo.IPAddress}\n`;
                        output += `🧬 MAC Address    : ${topo.MACAddress}\n`;
                        output += `📶 Root Device    : ${topo.isRoot === "1" ? "✅ Yes" : "❌ No"}\n`;
                        output += `⏱️ Uptime         : ${formatUptime(dev.UpTime)} (${dev.UpTime}s)\n\n`;
                    }

                    const devices = json.device_cfg?.filter(d => d.Active === 1) || [];
                    const aliasMap = Object.fromEntries((json.alias_cfg || []).map(d => [d.MACAddress.toLowerCase(), d]));
                    output += `🖥️ Perangkat Online (${devices.length})\n`;
                    if (devices.length === 0) {
                        output += `⚠️ Tidak ada perangkat online.\n\n`;
                    } else {
                        devices.forEach(dev => {
                            const mac = dev.MACAddress.toLowerCase();
                            const alias = aliasMap[mac];
                            const name = alias?.HostAlias || alias?.HostName || '📱 Unknown';
                            output += `• ${name} | 💻 ${dev.IPAddress} | 🧬 ${dev.MACAddress}\n`;
                        });
                        output += `\n`;
                    }

                    const wan = json.wan_conns?.[0]?.ipConns?.[0];
                    output += `🌍 WAN IP Detail\n`;
                    if (wan) {
                        output += `📶 Status         : ${wan.ConnectionStatus}\n`;
                        output += `🌐 IPv4           : ${wan.ExternalIPAddress}\n`;
                        output += `🌐 IPv6           : ${wan.X_CT_COM_IPv6IPAddress}\n`;
                        output += `🚪 Gateway        : ${wan.DefaultGateway}\n`;
                        output += `🚪 IPv6 Gateway   : ${wan.X_CT_COM_DefaultIPv6Gateway}\n`;
                        output += `🧭 DNS Servers    : ${wan.DNSServers}\n`;
                        output += `🧭 IPv6 DNS       : ${wan.X_CT_COM_IPv6DNSServers}\n`;
                        output += `📏 Subnet Mask    : ${wan.SubnetMask}\n\n`;
                    } else {
                        output += `⚠️ WAN IP detail not found.\n\n`;
                    }

                    const stat5G = json.cell_5G_stats_cfg?.[0]?.stat;
                    const isValid5G = stat5G &&
                        [stat5G.RSRPCurrent, stat5G.RSRQCurrent, stat5G.SNRCurrent].some(v => v !== -32768);
                    output += `📡 5G Cell Stats\n`;
                    if (isValid5G) {
                        if (stat5G.RSRPCurrent !== -32768) output += `📶 RSRP: ${stat5G.RSRPCurrent}\n`;
                        if (stat5G.RSRQCurrent !== -32768) output += `📶 RSRQ: ${stat5G.RSRQCurrent}\n`;
                        if (stat5G.SNRCurrent !== -32768)  output += `📶 SNR : ${stat5G.SNRCurrent}\n`;
                        output += `📊 Signal Strength Level: ${stat5G.SignalStrengthLevel}\n\n`;
                    } else {
                        output += `⚠️ No valid 5G signal data.\n\n`;
                    }

                    const statLTE = json.cell_LTE_stats_cfg?.[0]?.stat;
                    output += `📡 LTE Cell Stats\n`;
                    if (statLTE) {
                        output += `📶 RSRP: ${statLTE.RSRPCurrent}\n`;
                        output += `📶 RSRQ: ${statLTE.RSRQCurrent}\n`;
                        output += `📶 RSSI: ${statLTE.RSSICurrent}\n`;
                        output += `📶 SNR : ${statLTE.SNRCurrent}\n`;
                        output += `📊 Signal Strength Level: ${statLTE.SignalStrengthLevel}\n`;
                    } else {
                        output += `⚠️ LTE stats not available.\n`;
                    }

                    resolve(output);
                } catch (err) {
                    //reject(`❌ Failed to parse JSON: ${err.message}`);
                    return("there is an error, make sure the modem ip in the config file is correct or you can change it using node-bot -cc")
                }
            });
        });

        req.on('error', err => {
            return("there is an error, make sure the modem ip in the config file is correct or you can change it using node-bot -cc")
            //reject(`❌ Request failed: ${err.message}`);
        });

        req.end();
    });
}