#!/bin/bash
source /root/node-bot-wrt/.env

messages=(
    "✅ BOT sudah berjalan, siap tempur! 🚀"
    "BOT is up and running! Wuzhhh 🚀💨"
    "🎉 BOT aktif, semua sistem normal!"
    "BOT siap meluncur, kapten! 🚀🛰️"
    "BOT ON! Menyala dan siap beraksi! 💥"
    "BOT menyala, let's start the mission! 🛡️⚔️"
    "All systems GO! BOT online ✅🚀"
    "BOT is now running, ready to rock! 🚀🔥"
)

msg=${messages[$RANDOM % ${#messages[@]}]}

curl -k -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
     -d chat_id="$USERID" \
     -d parse_mode="html" \
     --data-urlencode text="$msg" &> /dev/null