import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';

try {
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let running = false

function start() {
    if (running) return
    running = true
    const args = [join(__dirname, 'main.js'), ...process.argv.slice(2)];
    setupMaster({ exec: args[0], args: args.slice(1) });

    const p = fork()
        .on('message', (msg) => {
            console.log(msg)
        })
        .on('error', (error) => {
            console.error('Error occurred in the child process:', error);
        })
        .on('exit', (code, signal) => {
            console.error(`Child process exited with code: ${code}, signal: ${signal}`);
            running = false
        })
        .on('disconnect', () => {
            console.log('Child process disconnected');
        })
        .on('polling_error', (error) => {
            console.error('Polling error:', error);
        });
}
start()
} catch (error){
    console.log(error)
}