#!/bin/bash


success='\e[46;30m[SUCCESS]\e[0m'
warn='\e[41;37m[WARN]\e[0m'
info='\e[42;30m[INFO]\e[0m'



banner(){
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
    echo -e "\e[35m     🚀 WELCOME TO SIMPLE GUI BOT - NODE - WRT 🚀\e[0m"
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
}

separator(){
    echo -e "\e[36m─────────────────────────────────────────────\e[0m"
}

help(){
    banner
    echo -e 'help, -h                            \e[33mshow help usage\e[0m' 
    echo -e 'install/reinstall, -i                       \e[33minstall\e[0m'
    echo -e 'uninstall, -rf                        \e[33muninstall bot\e[0m'
    echo -e 'changecfg, -cc                        \e[33mchange config\e[0m'
    echo -e 'backup, -bck                          \e[33mbackup config\e[0m'
    echo -e 'restore, -rstr                       \e[33mrestore config\e[0m'
    echo -e 'update, -u                               \e[33mupdate bot\e[0m'
    echo -e 'upnode, -un                         \e[33mupdate node-bot\e[0m'
    echo -e 'version, -v                             \e[33mversion bot\e[0m'
    echo -e 'status, -s                           \e[33mcek status bot\e[0m'
    echo -e 'start, -str                               \e[33mstart bot\e[0m'
    echo -e 'stop, -stp                                 \e[33mstop bot\e[0m'
    echo -e 'restart, -rst                           \e[33mrestart bot\e[0m'
    echo -e 'add_bot_cron, -cb                          \e[33madd cron\e[0m'
    echo -e 'rm_bot_cron, -rcb                         \e[33mdell cron\e[0m'
    echo -e 'chekupd, -cu                           \e[33mcheck update\e[0m'
    echo -e 'test_live                         \e[33mtest running live\e[0m'
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
    echo -e "\e[35m✨ Join telegram group: https://t.me/infobot_wrt ✨"
    echo -e "\e[35m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\e[0m"
}

status(){
    separator
    if pgrep -f /root/node-bot-wrt/index.js > /dev/null; then
        echo -e "$success ✅ node-bot is running [$(pgrep -f /root/node-bot-wrt/index.js)] "
    else
        echo -e "$warn ⚠️ node-bot not running "
    fi
    separator
}

version(){
    separator
    version=$(grep '"version":' /root/node-bot-wrt/package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo -e "$info 🔖 version: $version " 
    separator
}

installpckg(){
    if [[ $(opkg list-installed | grep -c "^$1") == "0" ]]; then
        echo -e "$info 📦 installing package ${1}... "
        if opkg install "$1" >/dev/null 2>&1; then
           echo -e "$success package ${1} installed "
        else
           echo -e "$warn failed to install package ${1} "
        fi
    fi
}

addCrontab(){
    if [ "$1" == "botcb" ]; then
        if crontab -l | grep -q 'cek-bot.sh'; then
            echo -e "$info ⏰ crontab bot already exists "
            return 0
        fi
    else
        echo -e "$info ➕ add bot to crontab ... "
    fi
    tmpfile=$(mktemp)
    crontab -l > "$tmpfile" 2>/dev/null || true
    echo "$2" >> "$tmpfile"
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$success ✅ add crontab "
}

removeCrontab(){
    tmpfile=$(mktemp)
    crontab -l > "$tmpfile" 2>/dev/null || true
    if [ "$1" == "botcb" ]; then
        sed -i "/cek-bot.sh/d" "$tmpfile"
    fi
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$successs 🗑️ delete crontab "
}

createConfig(){
    sed -i "1s/.*/TOKEN='$(printf "%s" "$1")'/" /root/node-bot-wrt/.env
    sed -i "2s/.*/USERID='$(printf "%s" "$2")'/" /root/node-bot-wrt/.env
    sed -i "3s/.*/IPMODEM='$(printf "%s" "$3")'/" /root/node-bot-wrt/.env
    sed -i "4s/.*/PASSWORD='$(printf "%s" "$4")'/" /root/node-bot-wrt/.env
}

backup(){
    separator
    mkdir -p /tmp/bot-backup
    cp /root/node-bot-wrt/.env /tmp/bot-backup/.env.bak 2>/dev/null
    echo -e "$success 💾 backup config to /tmp/bot-backup/.env.bak "
    separator
}

restore(){
    separator
    cp /tmp/bot-backup/.env.bak /root/node-bot-wrt/.env 2>/dev/null
    echo -e "$success ♻️ restore config "
    separator
}

changecfg(){
    separator
    while :; do
        echo -e "$info 1 (TOKEN) 2 (USERID) 3 (IPMODEM) 4 (PASSWORD) || 0 (exit) "
        read -e -p "choose to change: " q
        case "$q" in
            1) read -e -p "New Token: " t; sed -i "1s/.*/TOKEN='$(printf "%s" "$t")'/" /root/node-bot-wrt/.env; break ;;
            2) read -e -p "New UserID: " u; sed -i "2s/.*/USERID='$(printf "%s" "$u")'/" /root/node-bot-wrt/.env; break ;;
            3) read -e -p "New IP Modem: " i; sed -i "3s/.*/IPMODEM='$(printf "%s" "$i")'/" /root/node-bot-wrt/.env; break ;;
            4) read -e -p "New Password: " p; sed -i "4s/.*/PASSWORD='$(printf "%s" "$p")'/" /root/node-bot-wrt/.env; break ;;
            0) echo "Exit"; exit 0 ;;
            *) echo -e "$warn Invalid input, try again " ;;
        esac
    done
    separator
}

uninstall(){
    while :; do
        read -e -p "$(echo -e "$info do you want to uninstall node-bot-wrt? [y/n]: ")" q
        if [[ "$q" == "y" ]]; then
            /etc/init.d/node-bot stop
            echo -e "$info removing node-bot-wrt ... "
            rm -rf /root/node-bot-wrt /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
            break
        elif [[ "$q" == "n" ]]; then
            echo -e "$info uninstall canceled"
            exit 0
        else
            echo -e "$warn invalid input. Please enter y or n. "
        fi
    done
}
human_readable() {
    local size=$1
    local units=('B' 'KB' 'MB' 'GB' 'TB')
    local i=0
    while [ $size -ge 1024 ] && [ $i -lt 4 ]; do
        size=$((size/1024))
        i=$((i+1))
    done
    echo "${size}${units[$i]}"
}

print_line() {
    echo "$@"
}

print_fs_summary() {
	local DeviceInfo=$(df -k $1 2>/dev/null | awk 'BEGIN{Total=0;Free=0} NR>1 && $6=="'$1'"{Total=$2;Free=$4}END{Used=Total-Free;printf"%.0f\t%.0f\t%.1f\t%.0f",Total*1024,Used*1024,(Total>0)?((Used/Total)*100):0,Free*1024}' 2>/dev/null)
	local Total=$(echo "$DeviceInfo" | cut -f 1)
	local Used=$(echo "$DeviceInfo" | cut -f 2)
	local UsedPercent=$(echo "$DeviceInfo" | cut -f 3)
	local Free=$(echo "$DeviceInfo" | cut -f 4)

	local TotalMB=$((Total / 1024 / 1024))
	local FreeMB=$((Free / 1024 / 1024))

	[ "$Total" -gt 0 ] && print_line "$2:" \
		"total: $(human_readable $Total)," \
		"used: $(human_readable $Used)," \
		"free: $(human_readable $Free)"

	if [ "$TotalMB" -lt 250 ]; then
		echo "$warn total disk size is only ${TotalMB}MB (<250MB)"
	fi

	if [ "$FreeMB" -lt 150 ]; then
		echo "$warn free space is only ${FreeMB}MB, installation may fail!"
	fi
}

print_disk() {
	local Overlay=$(awk '$3=="overlayfs"{print $2}' /proc/mounts 2>/dev/null)
	if [ "$Overlay" != "" ]; then
		print_fs_summary /overlay "RootFS"
	fi
	if [ "$Overlay" == "" ] || [ "$Overlay" != "/" ]; then
		print_fs_summary / "RootFS"
	fi
}

chekupd(){
    LOCAL_VERSION=$(jq -r '.version' package.json 2>/dev/null)
    REMOTE_VERSION=$(wget -qO- https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/package.json | jq -r '.version')
    if [ "$LOCAL_VERSION" = "$REMOTE_VERSION" ]; then
       echo -e "$info latest version"
    else
       read -p "$(echo -e "$info update $REMOTE_VERSION available, want to continue update? (y/n)")" answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
       update
    else
    echo -e "$warn exit"
    exit 1
    fi
    fi
}

upnode(){
    wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot.bak && chmod +x /usr/bin/node-bot.bak
    echo -e "$success update node-bot script successfully "
    /root/node-bot-wrt/lib/bot/booting.sh "update node-bot script successfully"
    rm -f /usr/bin/node-bot
    mv /usr/bin/node-bot.bak /usr/bin/node-bot
}

reinstall() {
    /etc/init.d/node-bot stop
    echo -e "$info backing up configuration before reinstalling... "
    mkdir -p /tmp/bot-backup
    cp /root/node-bot-wrt/.env /tmp/bot-backup/.env.bak 2>/dev/null

    uninstall
    echo -e "$success remove node-bot-wrt"
    sleep 2
    echo -e "$info reinstalling the bot... "
    installSilent

    if [ -f /tmp/bot-backup/.env.bak ]; then
        echo -e "$info Restoring previous configuration... "
        cp /tmp/bot-backup/.env.bak /root/node-bot-wrt/.env
    fi

    echo -e "$success reinstall complete with configuration restored! "
    
    /root/node-bot-wrt/lib/bot/booting.sh
    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start

    addCrontab "botcb" "*/2 * * * * /root/node-bot-wrt/lib/bot/cek-bot.sh"

    /root/node-bot-wrt/lib/bot/booting.sh "reinstall node-bot-wrt successfully"
}

installSilent() {
    cd ~
    git clone https://github.com/ahmadqsyaa/node-bot-wrt.git
    cd node-bot-wrt

    echo -e "$info installing NPM dependencies... "
    while true; do
        npm install && break || {
            read -p "$(echo -e "$warn npm install failed. Retry? (y/n): ")" retry
            [[ "$retry" == "n" ]] && exit 1
        }
    done

    cp etc/init.d/node-bot /etc/init.d/
    cp lib/mmsms lib/ht-api /usr/bin/
    chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh

}

install() {
    
cat << EOF
$(printf '\033[1;32m')           ▄▀▄     ▄▀▄ $(printf '\033[0m')
$(printf '\033[1;32m')          ▄█░░▀▀▀▀▀░░█▄ $(printf '\033[0m')
$(printf '\033[1;32m')      ▄▄  █░░░░░░░░░░░█  ▄▄ $(printf '\033[0m')
$(printf '\033[1;32m')     █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█ $(printf '\033[0m')
$(printf '\033[1;35m')▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ $(printf '\033[0m')
$(printf '\033[1;35m')█$(printf '\033[1;39m') █▀█ █▀█ █▀▀ █▄░█ █░█░█ █▀█ ▀█▀ $(printf '\033[1;35m')█ $(printf '\033[0m')
$(printf '\033[1;35m')█$(printf '\033[1;39m') █▄█ █▀▀ ██▄ █░▀█ ▀▄▀▄▀ █▀▄ ░█░ $(printf '\033[1;35m')█ $(printf '\033[0m')
$(printf '\033[1;35m')█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█$(printf '\033[0m')
EOF
cat << EOF
$(printf '\033[1;31m')──────────────────────────────────────────────────$(printf '\033[0m')
EOF
    if [ -d "/root/node-bot-wrt" ]; then
        echo -e "$info node-bot-wrt already exists "
        read -p "$(echo -e "$info reinstall? [y/n]: ")" ans
        if [[ "$ans" == "y" ]]; then
            clear
            reinstall
        else
            echo -e "$warn installation cancelled! "
        fi
        return
    fi
    sleep 1
    echo -e "$info checking the os version"
    sleep 2
    if [ -f /etc/openwrt_release ]; then
    openwrt_release=$(grep "^DISTRIB_RELEASE=" /etc/openwrt_release | cut -d"'" -f2)
    ver="$openwrt_release"
	elif [ -f /etc/os-release ]; then
    os_release=$(grep "^VERSION_ID=" /etc/os-release | cut -d'"' -f2)
    ver="$os_release"
	else
    echo -e "$warn unable to detect OpenWrt version."
    exit 1
	fi
	major="${ver%%.*}"
	if [ "$major" = "23" ] || [ "$major" = "24" ]; then
    echo -e "$success openWrt $ver [OK]"
	else
    echo -e "$warn openWrt $ver is not supported. please install it manually "
    exit 1
	fi
    sleep 2
    print_disk
    clear
    backup="/tmp/bot-backup/.env.bak"
    target="/root/node-bot-wrt/.env"
    if [ -f "$backup" ]; then
       echo -e "$info backup file found : $backup"
       echo -e "1) use backup"
       echo -e "2) enter new data"
       read -p "$(echo -e "$info choose [1/2]:")" pilih

    if [ "$pilih" = "1" ]; then
        cp "$backup" "$target"
        echo -e "$successs backup successfully restored"
        clear
    elif [ "$pilih" = "2" ]; then
        clear
        read -p "$(echo -e "$info Enter BOT TOKEN: ")" TOKEN
        read -p "$(echo -e "$info Enter USER ID: ")" USERID
        read -p "$(echo -e "$info IP Address of Huawei/Nokia modem (optional): ")" IPMODEM
        read -p "$(echo -e "$info Password (optional): ")" PASSWORD
        echo -e "$success data saved"
        clear
    else
        echo -e "$warn failed, choose [1/2]"
        exit 1
    fi
    else
        read -p "$(echo -e "$info Enter BOT TOKEN: ")" TOKEN
        read -p "$(echo -e "$info Enter USER ID: ")" USERID
        read -p "$(echo -e "$info IP Address of Huawei/Nokia modem (optional): ")" IPMODEM
        read -p "$(echo -e "$info Password (optional): ")" PASSWORD
        echo -e "$success data saved"
        clear
    fi
    sleep 1
    echo -e "$info update package"
    opkg update
    clear
    for pkg in node-npm git git-http jq sysstat bash curl wget vnstat2 vnstati coreutils-base64; do installpckg "$pkg"; done
    #speedtest
    read -p "$(echo -e "$info do you want to install speedtest? (y/n):")" answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
    wget --no-check-certificate "https://raw.githubusercontent.com/vitoharhari/speedtest/main/install-speedtest" -P /root/ \
    && chmod 777 /root/install-speedtest \
    && bash /root/install-speedtest 2>/dev/null
    else
    echo -e "$info skip install speedtest, continue next step"
    clear
    fi
    
    cd ~
    echo -e "$info clonning bot"
    if git clone https://github.com/ahmadqsyaa/node-bot-wrt.git; then
       echo -e "$success clone repository"
    else
       echo -e "$warn clone repository failed"
       exit 1
    fi
    cd node-bot-wrt

    cp .env.example .env
    createConfig "$TOKEN" "$USERID" "$IPMODEM" "$PASSWORD"

    echo -e "$info installing the npm module"
    while true; do
        npm install && break || {
            read -p "$(echo -e "$warn npm install failed. Retry? (y/n): ")" retry
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
    clear
    
    echo -e "$success bot installed complete!  "
    echo -e "$info Join Telegram: https://t.me/infobot_wrt "
    /root/node-bot-wrt/lib/bot/booting.sh "Join Telegram: https://t.me/infobot_wrt"
}

update(){
    version=$(grep '"version":' /root/node-bot-wrt/package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo -e "$info old version: $version " 
    read -e -p "$(echo -e "$info continue update? [y/n]: ")" q
    [[ "$q" != "y" ]] && echo "update canceled" && exit 0

    cd /root/node-bot-wrt || { echo -e "$warn directory not found! "; exit 1; }
    
    mkdir -p /tmp/bot-backup
    cp /root/node-bot-wrt/.env /tmp/bot-backup/.env.bak 2>/dev/null
    
    /etc/init.d/node-bot stop
    
    git pull origin master || { echo -e "$warn Git update failed "; exit 1; }
    
    npm i
    
    cp etc/init.d/node-bot /etc/init.d/
    cp lib/mmsms lib/ht-api /usr/bin/
    chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh
    if [ -f /tmp/bot-backup/.env.bak ]; then
        cp /tmp/bot-backup/.env.bak /root/node-bot-wrt/.env
    fi
    
    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start

    echo -e "$success update completed "
    /root/node-bot-wrt/lib/bot/booting.sh "update node-bot-wrt successfully"
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
    -rstr|restore) restore ;;
    -cc|changecfg) changecfg ;;
    -cb|add_bot_cron) addCrontab "botcb" "*/2 * * * * /root/node-bot-wrt/lib/bot/cek-bot.sh" ;;
    -rcb|rm_bot_cron) removeCrontab "botcb" ;;
    -str|start) /etc/init.d/node-bot start ;;
    -stp|stop) /etc/init.d/node-bot stop ;;
    -rst|restart) /etc/init.d/node-bot restart ;;
    test_live) node-bot stop && cd && cd node-bot-wrt && node index ;;
    -cu|chekupd) chekupd ;;
    *) echo -e '\e[41;37m[WARN]\e[0m invalid command. Use -h for help.'; exit 1 ;;
esac
