import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';
import os from 'os';

const tmpDir = os.tmpdir();

export const createLog = () => {
    return (error) => {
        const logDir = join(tmpDir, 'logs');
        const filePath = join(logDir, 'error-log.txt');

        if (!existsSync(logDir)) {
            mkdirSync(logDir, { recursive: true });
        }

        const now = new Date();
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        const formattedDate = formatDate(now);
        const errorType = error.name || 'UnknownError';
        const errorMessage = error.message || 'No error message';
        const errorStack = error.stack ? `\nStack:\n${error.stack}` : '';

        const logMessage = 
`
########################
Time       : ${formattedDate}
Type       : ${errorType}
Message    : ${errorMessage}${errorStack}
########################
`;

        appendFileSync(filePath, logMessage, 'utf8');
    };
};