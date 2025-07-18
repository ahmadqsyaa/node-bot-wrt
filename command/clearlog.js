import execute from '../lib/execute.js';
import fs from 'node:fs/promises';
import path from 'node:path';

export const cmds = ["clearlog"];
export const exec = async (bot, msg, chatId, messageId) => {
  const logDir = './logs';
  try {
    const files = await fs.readdir(logDir);
    await Promise.all(files.map(file => {
      const filePath = path.join(logDir, file);
      return fs.unlink(filePath);
    }));
    await bot.reply('clear log success ✅');
  } catch (error) {
    console.error("Error clearing logs:", error);
    await bot.reply('error clearing logs.');
  }
};