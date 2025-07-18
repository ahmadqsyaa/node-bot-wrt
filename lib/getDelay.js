import execute from '../lib/execute.js';

const delayproxy = async (proxyName) => {
    try {
        let secret;
        let app;
        let config

        const oc = await execute('uci get openclash.config.enable')
        const neko = await execute('uci get neko.cfg.enabled')
        const nikki = await execute ('uci get nikki.config.enabled')
        if (parseInt(oc.trim(), 10) === 1) {
            secret = await execute('uci get openclash.config.dashboard_password');
            app = "openclash";
        } else if (parseInt(neko.trim(), 10) === 1) {
            config = await execute("uci -q get neko.cfg.selected_config");
            secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${config}`);
            app = "neko clash";
        } else if (parseInt(nikki.trim(), 10) === 1) {
            secret = await execute('uci get nikki.mixin.api_secret');
            app = "nikki";
        } else {
            bot.deleteMessage(chatId, messageId + 1);
            return bot.sendMessage(chatId, 'openclash or neko not running');
        }

        const headers = {
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            Authorization: `Bearer ${secret}`,
            Connection: 'keep-alive',
            'Content-Type': 'application/json',
            Cookie: 'filemanager=ee057d392316be9bec05f297f2037536',
            Referer: `http://127.0.0.1:9090/ui/yacd/`,
            'Sec-Gpc': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        };

        const respon = await fetch(`http://127.0.0.1:9090/providers/proxies`, { method: 'GET', headers });

        if (!respon.ok) {
            throw new Error(`Error fetching data: ${respon.statusText}`);
        }

        const hasil = await respon.json();
        const results = Object.entries(hasil.providers).filter(([key, value]) => value.vehicleType === "File");

        if (results.length > 0) {
    for (const [key, value] of results) {
        const cloudflareProxy = value.proxies.find(proxy => proxy.name === proxyName);

        if (cloudflareProxy) {
            if (cloudflareProxy.history && cloudflareProxy.history.length > 1) {
                const ping = cloudflareProxy.history.slice(-1)[0];
                return ping.delay;
            } else {
                console.log("History kurang dari 2 entri.");
                return 0; // Nilai default jika history kurang dari 2 entri
            }
        }
    }
} else {
    console.log("Tidak ditemukan entri dengan vehicleType 'File'.");
    return 0; 
}

    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
};

export default delayproxy;