import { spawn } from 'child_process';

const start = () => {
  const child = spawn('node', ['main.js', ...process.argv.slice(2)], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });

  child.on('message', (msg) => {
    if (msg === 'restart') {
      child.kill();
      start();
    } else if (msg === 'stop') {
      child.kill();
    } else if (msg === 'uptime') {
        child.send(process.uptime());
    }
  });

  child.on('exit', (code) => {
    if (code !== null) {
      start();
    } else if (code == 'EFATAL'){
      child.kill();
      start();
    }
  });

  child.on('error', (err) => console.log(err));
};

start();