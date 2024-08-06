const util = require('util');
const exe = util.promisify(require('child_process').exec);

async function exec(param) {
    try {
    const {stdout }= await exe(param);
        return stdout
    } catch (e){
        return e.stderr
    }
}


module.exports = exec
