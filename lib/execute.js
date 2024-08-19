import { exec as originalExec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(originalExec);

const execute = async (param) => {
    try {
        const { stdout } = await exec(param);
        return stdout;
    } catch (e) {
        return e.stderr;
    }
};

export default execute