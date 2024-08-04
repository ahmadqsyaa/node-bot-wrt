const { promisify } = require('util');
const { exec: execCallback } = require('child_process');

const execAsync = promisify(execCallback);

async function exec(param) {
    try {
        const { stdout, stderr } = await execAsync(param);
        if (stderr) {
            throw new Error(stderr);
        }
        return stdout.trim();
    } catch (error) {
        console.error('Error:', error.message);
        return error.message
    }
}

module.exports = exec
