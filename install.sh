#!/bin/bash

set -euo pipefail

info='\e[46;30m'
warn='\e[41;37m'
success='\e[42;30m'
end='\e[0m'

banner(){
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
    echo -e "\e[35m🚀 WELCOME TO SIMPLE GUI BOT - NODE - WRT 🚀\e[0m"
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
}

separator(){
    echo -e "\e[36m─────────────────────────────────────────────\e[0m"
}

help(){
    banner
    echo -e 'help, -h                       \e[33mshow help usage\e[0m' 
    echo -e 'install, -i                            \e[33minstall\e[0m'
    echo -e 'uninstall, -rf                   \e[33muninstall bot\e[0m'
    echo -e 'changecfg, -cc                   \e[33mchange config\e[0m'
    echo -e 'backup, -bck                     \e[33mbackup config\e[0m'
    echo -e 'restore, -rst                   \e[33mrestore config\e[0m'
    echo -e 'update, -u                          \e[33mupdate bot\e[0m'
    echo -e 'upnode, -un                    \e[33mupdate node-bot script\e[0m'
    echo -e 'version, -v                        \e[33mversion bot\e[0m'
    echo -e 'status, -s                      \e[33mcek status bot\e[0m'
    echo -e 'start                                \e[33mstart bot\e[0m'
    echo -e 'stop                                  \e[33mstop bot\e[0m'
    echo -e 'restart                            \e[33mrestart bot\e[0m'
    echo -e 'add_bot_cron, -cb                     \e[33madd cron\e[0m'
    echo -e 'rm_bot_cron, -rcb                    \e[33mdell cron\e[0m'
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
    echo -e "\e[35m✨ Join telegram group: https://t.me/infobot_wrt ✨"
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
}

status(){
    separator
    if pgrep -f /root/node-bot-wrt/index.js > /dev/null; then
        echo -e "$success ✅ node-bot is running [$(pgrep -f /root/node-bot-wrt/index.js)] $end"
    else
        echo -e "$warn ⚠️ node-bot not running $end"
    fi
    separator
}

version(){
    separator
    version=$(grep '"version":' /root/node-bot-wrt/package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo -e "$info 🔖 version: $version $end" 
    separator
}

installpckg(){
    if [[ $(opkg list-installed | grep -c "^$1") == "0" ]]; then
        echo -e "$success 📦 installing ${1}... $end" && opkg install $1
    fi
}

addCrontab(){
    if [ "$1" == "botcb" ]; then
        if crontab -l | grep -q 'cek-bot.sh'; then
            echo -e "$info ⏰ crontab bot already exists $end"
            return 0
        fi
    else
        echo -e "$info ➕ add bot to crontab ... $end"
    fi
    tmpfile=$(mktemp)
    crontab -l > "$tmpfile" 2>/dev/null || true
    echo "$2" >> "$tmpfile"
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$info ✅ successfully add crontab $end"
}

removeCrontab(){
    tmpfile=$(mktemp)
    crontab -l > "$tmpfile" 2>/dev/null || true
    if [ "$1" == "botcb" ]; then
        sed -i "/cek-bot.sh/d" "$tmpfile"
    fi
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$info 🗑️ successfully delete crontab $end"
}

createConfig(){
    sed -i "1s/.*/TOKEN='$(printf "%s" "$1")'/" /root/node-bot-wrt/.env
    sed -i "2s/.*/USERID='$(printf "%s" "$2")'/" /root/node-bot-wrt/.env
    sed -i "3s/.*/IPMODEM='$(printf "%s" "$3")'/" /root/node-bot-wrt/.env
    sed -i "4s/.*/PASSWORD='$(printf "%s" "$4")'/" /root/node-bot-wrt/.env
}

backup(){
    separator
    cp /root/node-bot-wrt/.env /root/node-bot-wrt/.env.backup
    echo -e "$success 💾 backup config successfully to .env.backup $end"
    separator
}

restore(){
    separator
    cp /root/node-bot-wrt/.env.backup /root/node-bot-wrt/.env
    echo -e "$success ♻️ restore config successfully $end"
    separator
}

changecfg(){
    separator
    while :; do
        echo -e "$info 1 (TOKEN) 2 (USERID) 3 (IPMODEM) 4 (PASSWORD) || 0 (exit) $end"
        read -e -p "Choose to change: " q
        case "$q" in
            1) read -e -p "New Token: " t; sed -i "1s/.*/TOKEN='$(printf "%s" "$t")'/" /root/node-bot-wrt/.env; break ;;
            2) read -e -p "New UserID: " u; sed -i "2s/.*/USERID='$(printf "%s" "$u")'/" /root/node-bot-wrt/.env; break ;;
            3) read -e -p "New IP Modem: " i; sed -i "3s/.*/IPMODEM='$(printf "%s" "$i")'/" /root/node-bot-wrt/.env; break ;;
            4) read -e -p "New Password: " p; sed -i "4s/.*/PASSWORD='$(printf "%s" "$p")'/" /root/node-bot-wrt/.env; break ;;
            0) echo "Exit"; exit 0 ;;
            *) echo -e "$warn Invalid input, try again $end" ;;
        esac
    done
    separator
}

uninstall(){
    while :; do
        read -e -p "$(echo -e "$info Do you want to uninstall node-bot-wrt? [y/n]: $end")" q
        if [[ "$q" == "y" ]]; then
            echo -e "$info Removing node-bot-wrt ... $end"
            rm -rf /root/node-bot-wrt /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
            break
        elif [[ "$q" == "n" ]]; then
            echo "Uninstall canceled"
            exit 0
        else
            echo -e "$warn Invalid input. Please enter y or n. $end"
        fi
    done
}

upnode(){
    wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot.bak && chmod +x /usr/bin/node-bot.bak
    echo -e "$success update node-bot script successfully $end"
    rm -f /usr/bin/node-bot
    mv /usr/bin/node-bot.bak /usr/bin/node-bot
}

reinstall() {
    echo -e "$warn Backing up configuration before reinstalling... $end"
    mkdir -p /tmp/bot-backup
    cp /root/node-bot-wrt/.env /tmp/bot-backup/.env.bak 2>/dev/null

    uninstall

    echo -e "$info Reinstalling the bot... $end"
    installSilent

    if [ -f /tmp/bot-backup/.env.bak ]; then
        echo -e "$info Restoring previous configuration... $end"
        cp /tmp/bot-backup/.env.bak /root/node-bot-wrt/.env
    fi

    echo -e "$success Reinstall complete with configuration restored! $end"
}

installSilent() {
    cd ~
    git clone https://github.com/ahmadqsyaa/node-bot-wrt.git
    cd node-bot-wrt

    cp .env.example .env

    echo -e "$info Installing NPM dependencies... $end"
    while true; do
        npm install && break || {
            read -p "$(echo -e "$warn npm install failed. Retry? (y/n): $end")" retry
            [[ "$retry" == "n" ]] && exit 1
        }
    done

    cp etc/init.d/node-bot /etc/init.d/
    cp lib/mmsms lib/ht-api /usr/bin/
    chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh

    /root/node-bot-wrt/lib/bot/booting.sh
    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start

    addCrontab "botcb" "*/2 * * * * /root/node-bot-wrt/lib/bot/cek-bot.sh"
}

install() {
    if [ -d "/root/node-bot-wrt" ]; then
        echo -e "$info node-bot-wrt already exists $end"
        read -e -p "Reinstall? [y/n]: " ans
        if [[ "$ans" == "y" ]]; then
            reinstall
        else
            echo -e "$warn Installation cancelled! $end"
        fi
        return
    fi

    read -p "$(echo -e "$info Enter BOT TOKEN: $end")" TOKEN
    read -p "$(echo -e "$info Enter USER ID: $end")" USERID
    read -p "$(echo -e "$info IP Address of Huawei/Nokia modem (optional): $end")" IPMODEM
    read -p "$(echo -e "$info Password (optional): $end")" PASSWORD

    opkg update
    for pkg in node-npm git git-http jq sysstat bash curl wget vnstat2 vnstati; do installpckg "$pkg"; done

    cd ~
    git clone https://github.com/ahmadqsyaa/node-bot-wrt.git
    cd node-bot-wrt

    cp .env.example .env
    createConfig "$TOKEN" "$USERID" "$IPMODEM" "$PASSWORD"

    echo -e "$info Installing NPM dependencies... $end"
    while true; do
        npm install && break || {
            read -p "$(echo -e "$warn npm install failed. Retry? (y/n): $end")" retry
            [[ "$retry" == "n" ]] && exit 1
        }
    done

    cp etc/init.d/node-bot /etc/init.d/
    cp lib/mmsms lib/ht-api /usr/bin/
    chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh

    /root/node-bot-wrt/lib/bot/booting.sh
    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start

    addCrontab "botcb" "*/2 * * * * /root/node-bot-wrt/lib/bot/cek-bot.sh"

    echo -e "$success Bot installed successfully! $end"
    echo -e "$info Join Telegram: https://t.me/infobot_wrt $end"
}

update(){
    read -e -p "$(echo -e "$info Continue update? [y/n]: $end")" q
    [[ "$q" != "y" ]] && echo "Update canceled" && exit 0

    cd /root/node-bot-wrt || { echo -e "$warn Directory not found! $end"; exit 1; }

    git pull origin master || { echo -e "$warn Git update failed $end"; exit 1; }
    
    npm i
    
    cp etc/init.d/node-bot /etc/init.d/
    cp lib/mmsms lib/ht-api /usr/bin/
    chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh

    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start

    echo -e "$success Update completed $end"
}

case "${1:-}" in
    -s|status) status ;;
    -h|help|"") help ;;
    -v|version) version ;;
    -i|install) clear; install ;;
    -rf|uninstall) clear; uninstall ;;
    -u|update) clear; update ;;
    -un|upnode) upnode ;;
    -bck|backup) backup ;;
    -rst|restore) restore ;;
    -cc|changecfg) changecfg ;;
    -cb|add_bot_cron) addCrontab "botcb" "*/2 * * * * /root/node-bot-wrt/lib/bot/cek-bot.sh" ;;
    -rcb|rm_bot_cron) removeCrontab "botcb" ;;
    start) /etc/init.d/node-bot start ;;
    stop) /etc/init.d/node-bot stop ;;
    restart) /etc/init.d/node-bot restart ;;
    *) echo 'Invalid command. Use -h for help.'; exit 1 ;;
esac