import { spawn } from 'child_process';
import execute from './lib/execute.js'
const start = () => {
  console.log("starting child process...");
  
  const child = spawn('node', ['main.js', ...process.argv.slice(2)], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });
  child.on('message', async (msg) => {
    switch (msg) {
      case 'restart':
        restart(child);
        console.log('restart')
        break;
      case 'stop':
        child.kill();
        break;
      case 'uptime':
        child.send(process.uptime());
        break;
      default:
        console.log(`message from child: ${msg}`);
    }
  });

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`child exited with code ${code}. Restarting in 10 seconds...`);
      setTimeout(() => start(), 10000);
    }
  });

  child.on('error', (err) => console.error(`child process error: ${err.message}`));
};

const restart= (child) => {
  child.kill();
  console.log('restarting child process in 10 seconds...');
  setTimeout(() => execute('node-bot restart'), 10000);
};

start();