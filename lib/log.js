import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createLog = () => {
    return (error) => {
        const logPath = join(__dirname, '../logs');
        const filePath = join(logPath, 'error-log.txt');
        
        if (!existsSync(logPath)) {
            mkdirSync(logPath);
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