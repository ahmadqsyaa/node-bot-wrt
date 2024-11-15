import fs from 'fs';
import WebSocket from 'ws';
import execute from '../lib/execute.js';

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


const miproxy = async () => {
  try {
    const mihomo_secret = await execute('uci get mihomo.mixin.api_secret');
    const mihomo_port = await execute('uci get mihomo.mixin.api_port')
    const mihomo_name = await execute('uci get mihomo.mixin.ui_name')
    const mihomo_dash = await execute('uci get mihomo.mixin.ui_url')
    
    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": `Bearer ${mihomo_secret}`,
        "Connection": "keep-alive",
        "Cookie": "filemanager=7327f9fe17c3ef34faa5d40883f7f33",
        "DNT": "1",
        "Host": "127.0.0.1:9090",
        "Referer": "http://127.0.0.1:9090/ui/*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    });

    const respon = await fetch(`http://127.0.0.1:9090/providers/proxies`, { method: 'GET', headers });
    const hasil = await respon.json();
    const datak = hasil.providers.default.proxies;
    const nama = datak.map((proxy) => proxy.name);
    const type = datak.map((proxy) => proxy.type);

    let final = '⏱ Type | Name | Delay\n';

    for (let i = 0; i < nama.length; i++) {
      const name = nama[i];
      const url = `http://127.0.0.1:9090/proxies/${name}/delay?timeout=5000&url=http:%2F%2Fwww.gstatic.com%2Fgenerate_204`;

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

const mizeus = async () => {
    const mihomo_secret = await execute('uci get mihomo.mixin.api_secret');
    const mihomo_port = await execute('uci get mihomo.mixin.api_port')
    const mihomo_name = await execute('uci get mihomo.mixin.ui_name')
    const mihomo_dash = await execute('uci get mihomo.mixin.ui_url')
    const url = `http://127.0.0.1:9090/proxies/GLOBAL/delay?timeout=5000&url=https%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`;
    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": `Bearer ${mihomo_secret}`,
        "Connection": "keep-alive",
        "Cookie": "filemanager=7327f9fe17c3ef34faa5d40883f7f33",
        "DNT": "1",
        "Host": "127.0.0.1:9090",
        "Referer": "http://127.0.0.1:9090/ui/*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    });
  const response = await fetch(url, { method: 'GET', headers });
  const result = await response.json();
  if (result.message){
    return result.message
  } else {
    return `ping GLOBAL ${result.delay}ms`
  }
};
export { mizeus, miproxy };