source /root/node-bot-wrt/.env

curl -k -s -X POST https://api.telegram.org/bot$TOKEN/sendMessage -d chat_id=$USERID -d parse_mode=html --data-urlencode text="THE BOT IS RUNNING, WUZHHH 🚀" &> /dev/null