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

const nezeus = async () => {
  const conf = await execute('uci -q get neko.cfg.selected_config')
  const neko_port = '9090'
  const neko_secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${conf}`)
  const url = `http://127.0.0.1:${neko_port}/group/GLOBAL/delay?url=https%3A%2F%2Fwww.gstatic.com%2Fgenerate_204&timeout=2000`;
  const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": `Bearer ${neko_secret}`,
        "Connection": "keep-alive",
        "Cookie": "filemanager=7327f9fe17c3ef34faa5d40883f7f33",
        "DNT": "1",
        "Host": `127.0.0.1:9090`,
        "Referer": `http://127.0.0.1:9090/ui/meta/?hostname=127.0.0.1&port=9090&secret=${neko_secret}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    });
  

  const response = await fetch(url, { method: 'GET', headers });
  const res = await response.json();
  const result = JSON.stringify(res).replace(/\{|\}|,/g, " ");
  return result
};

const neproxy = async () => {
  try {
  const conf = await execute('uci -q get neko.cfg.selected_config')
  const neko_port = '9090'
  const neko_secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${conf}`)
  const url = `http://127.0.0.1:${neko_port}/providers/proxies`
  const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": `Bearer ${neko_secret}`,
        "Connection": "keep-alive",
        "Cookie": "filemanager=7327f9fe17c3ef34faa5d40883f7f33",
        "DNT": "1",
        "Host": `127.0.0.1:9090`,
        "Referer": `http://127.0.0.1:9090/ui/meta/?hostname=127.0.0.1&port=9090&secret=${neko_secret}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    });

    const respon = await fetch(url, { method: 'GET', headers });
    const hasil = await respon.json();
    const datak = hasil.providers.default.proxies;
    const nama = datak.map((proxy) => proxy.name);
    const type = datak.map((proxy) => proxy.type);

    let final = '⏱ Type | Name | Delay\n';

    for (let i = 0; i < nama.length; i++) {
      const name = nama[i];
      const URL = `http://127.0.0.1:${neko_port}/proxies/${name}/delay?timeout=5000&url=https%3A%2F%2Fwww.gstatic.com%2Fgenerate_204`;

      const response = await fetch(URL, { method: 'GET', headers });
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


const nerules = async () => {
  try {
    const conf = await execute('uci -q get neko.cfg.selected_config')
    const neko_port = '9090'
    const neko_secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${conf}`)
    const url = `http://127.0.0.1:${neko_port}/rules`
    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Authorization": `Bearer ${neko_secret}`,
        "Connection": "keep-alive",
        "Cookie": "filemanager=7327f9fe17c3ef34faa5d40883f7f33",
        "DNT": "1",
        "Host": `127.0.0.1:9090`,
        "Referer": `http://127.0.0.1:9090/ui/meta/?hostname=127.0.0.1&port=9090&secret=${neko_secret}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    }); 

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

const negetTrafic = async () => {
  try {
    const conf = await execute('uci -q get neko.cfg.selected_config')
    const neko_port = '9090'
    const neko_secret = await execute(`awk -F':' '/secret/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2}' ${conf}`)
    const url = `ws://127.0.0.1:${neko_port}/connections?token=${neko_secret}`;
    const socket = new WebSocket(url);

    socket.onmessage = async (event) => {
      const json = JSON.parse(event.data);
      const q = `Total download: ${format(json.downloadTotal)} | Total upload: ${format(json.uploadTotal)} | memory: ${format(json.memory)} | diupdate: ${date}`;
      await execute(`echo '${q}' > ./lib/nekotrafic.txt.txt`);
    };

    setTimeout(() => {
      socket.close();
    }, 2000);

    socket.addEventListener('error', (error) => {
      return error;
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
export { nezeus, neproxy, nerules, negetTrafic };