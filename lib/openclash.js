import fs from 'fs';
import WebSocket from 'ws';
import execute from '../lib/execute.js';

const oc_ip = '127.0.0.1';
const oc_port = '9090';

const dat = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const format = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1073741824) {
    return `${(bytes / 1048576).toFixed(2)} MB`;
  } else {
    return `${(bytes / 1073741824).toFixed(2)} GB`;
  }
};

const date = dat.toLocaleString('id-ID', options);

const delayColor = (input) => {
  if (input === 0) {
    return '⬛️';
  } else if (input >= 1 && input <= 150) {
    return '🟩';
  } else if (input >= 151 && input <= 300) {
    return '🟨';
  } else if (input >= 301 && input <= 350) {
    return '🟧';
  } else {
    return '🟥';
  }
};

const zeus = async () => {
  const oc_secret = await execute('uci get openclash.config.dashboard_password');
  const url = `http://${oc_ip}:${oc_port}/proxies/GLOBAL/delay?timeout=5000&url=https%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`;
  const headers = {
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    Authorization: `Bearer ${oc_secret}`,
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
    Cookie: 'filemanager=ee057d392316be9bec05f297f2037536',
    Referer: `http://${oc_ip}:${oc_port}/ui/yacd/`,
    'Sec-Gpc': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
  };

  const response = await fetch(url, { method: 'GET', headers });
  const result = await response.json();
  return `ping GLOBAL ${result.delay}ms`;
};

const proxy = async () => {
  try {
    const oc_secret = await execute('uci get openclash.config.dashboard_password');
    const headers = {
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Authorization: `Bearer ${oc_secret}`,
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      Cookie: 'filemanager=ee057d392316be9bec05f297f2037536',
      Referer: `http://${oc_ip}:${oc_port}/ui/yacd/`,
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    };

    const respon = await fetch(`http://${oc_ip}:${oc_port}/providers/proxies`, { method: 'GET', headers });
    const hasil = await respon.json();
    const datak = hasil.providers.default.proxies;
    const nama = datak.map((proxy) => proxy.name);
    const type = datak.map((proxy) => proxy.type);

    let final = '⏱ Type | Name | Delay\n';

    for (let i = 0; i < nama.length; i++) {
      const name = nama[i];
      const url = `http://${oc_ip}:${oc_port}/proxies/${name}/delay?timeout=5000&url=https%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`;

      const response = await fetch(url, { method: 'GET', headers });
      const result = await response.json();
      const delay = result.delay !== undefined && result.delay !== null ? result.delay : 0;
      const color = delayColor(delay);

      final += `${color} ${type[i]} | ${name} | ${delay} ms \n`;
    }
    return final;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};


const rules = async () => {
  try {
    const oc_secret = await execute('uci get openclash.config.dashboard_password');
    const url = `http://${oc_ip}:${oc_port}/rules`;
    await zeus();
    const headers = {
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Authorization: `Bearer ${oc_secret}`,
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      Cookie: 'filemanager=ee057d392316be9bec05f297f2037536',
      Referer: `http://${oc_ip}:${oc_port}/ui/yacd/?hostname=${oc_ip}&port=${oc_port}&secret=${oc_secret}`,
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    };

    const response = await fetch(url, { method: 'GET', headers });
    const result = await response.json();
    const data = result;
    let final = 'Type | Payload | Proxy\n';
    for (let i = 0; i < data.rules.length; i++) {
      const rule = data.rules[i];
      const type = rule.type;
      const payload = rule.payload;
      const proxy = rule.proxy;
      final += `${type} | ${payload} | ${proxy}\n`;
    }
    return final;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

const getTrafic = async () => {
  try {
    const oc_secret = await execute('uci get openclash.config.dashboard_password');
    const url = `ws://${oc_ip}:${oc_port}/connections?token=${oc_secret}`;
    const socket = new WebSocket(url);
    socket.onmessage = async (event) => {
      const json = JSON.parse(event.data);
      const q = `Total download: ${format(json.downloadTotal)} | Total upload: ${format(json.uploadTotal)} | memory: ${format(json.memory)} | diupdate: ${date}`;
      await execute(`echo '${q}' > ./lib/trafic.txt`);
      setTimeout(() => {
        return;
      }, 2000);
    };
    socket.addEventListener('error', (error) => {
      return error;
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export { zeus, proxy, rules, getTrafic };