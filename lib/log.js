import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';
import os from 'os';

const tmpDir = os.tmpdir();

export const createLog = () => {
    return (error) => {
        const logPath = join(tmpDir, 'logs');
        const filePath = join(logPath, 'error-log.txt');

        if (!existsSync(logPath)) {
            mkdirSync(logPath, { recursive: true });  // 
        }

        const now = new Date();
        function formatDate(date) {
            const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const datePart = date.toLocaleDateString('en-GB', optionsDate).replace(/\//g, '-');
            const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const timePart = date.toLocaleTimeString([], optionsTime);
            return `${datePart.split('-').reverse().join('-')} ${timePart}`;
        }

        const date = formatDate(now);
        const errorType = error.name || 'UnknownError';
        const errorMessage = error.message || 'No error message';
        
        const logMessage = `[${date}] ${errorType}: ${errorMessage}\n`;
        appendFileSync(filePath, logMessage, 'utf8');
    };
};
