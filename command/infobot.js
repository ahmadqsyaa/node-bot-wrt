import execute from '../lib/execute.js';

export const cmds = ["infobot"];

export const exec = async (bot, msg, chatId, messageId) => {
  const nodev = await execute('node -v');
  
  try {
    const output = await execute("npm list --depth=0 --json", { encoding: "utf8" });
    const data = JSON.parse(output);

    const lines = [];

    lines.push(`Node.js Version: ${nodev.trim()}`);
    lines.push(`Project Name   : ${data.name}`);
    lines.push(`Version        : ${data.version}`);
    lines.push(`Dependencies   :`);

    const deps = data.dependencies || {};
    for (const [name, info] of Object.entries(deps)) {
      lines.push(`  - ${name} @${info.version}`);
    }

    const result = lines.join("\n");
    bot.reply(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
};