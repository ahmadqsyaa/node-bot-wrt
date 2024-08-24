#!/bin/bash

help(){
    echo -e '***************************************'
    echo -e '***** SIMPLE GUI BOT - NODE - WRT *****'
    echo -e '***************************************'
    echo -e ''
    echo -e 'help, -h                show help usage' 
    echo -e 'install, -i                 install bot'
    echo -e 'uninstall, -rf            uninstall bot'
    echo -e 'changecfg, -cc            change config'
    echo -e 'backup, -bck              backup config'
    echo -e 'restore, -rst            restore config'
    echo -e 'update, -u                   update bot'
    echo -e 'upnode, -un             update node-bot'
    echo -e 'version, -v                 version bot'
    echo -e 'status, -s               cek status bot'
    echo -e 'start                         start bot'
    echo -e 'stop                           stop bot'
    echo -e 'restart                     restart bot'
    echo -e 'add_bot_cron, -cb              add cron'
    echo -e 'rm_bot_cron, -rcb             dell cron'
    echo -e '***************************************'
}
status(){
    pgrep -f /root/node-bot-wrt/index.js > /dev/null
    if [ $? -eq 0 ]; then
        echo -e "node-bot is running [$(pgrep -f /root/node-bot-wrt/index.js)]"
    else
        echo -e "node-bot not running"
    fi
}
version(){
    version=$(grep '"version":' /root/node-bot-wrt/package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo "version: $version" 
}
installpckg(){
    if [[ $(opkg list-installed | grep -c "^$1") == "0" ]]; then
        echo -e "Installing ${1}..." && opkg install $1
    fi
}
addCrontab() {
    if [ "$1" == "botcb" ]; then
        if crontab -l | grep -q 'cek-bot.sh'; then
            echo "crontab bot already exists"
            return 0
        fi
    else
        echo "add bot to crontab ..."
    fi

    tmpfile=$(mktemp)
    crontab -l >"$tmpfile"
    printf '%s\n' "$2" >>"$tmpfile"
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo "Successfully add crontab"
}
removeCrontab(){
    tmpfile=$(mktemp)
    crontab -l >"$tmpfile"
    if [ "$1" == "botcb" ]; then
        sed -i "/cek-bot.sh/d" "$tmpfile"
    fi
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo "successfully delete crontab"
}
createConfig(){
    sed -i "1s/.*/TOKEN='$(printf "%s" "$1")'/" /root/node-bot-wrt/.env
    sed -i "2s/.*/USERID='$(printf "%s" "$2")'/" /root/node-bot-wrt/.env
    sed -i "3s/.*/IPMODEM='$(printf "%s" "$3")'/" /root/node-bot-wrt/.env
    sed -i "4s/.*/PASSWORD='$(printf "%s" "$4")'/" /root/node-bot-wrt/.env
}
backup(){
    if [ -e "../.env" ]; then
        rm -rf ../.env
        cp /root/node-bot-wrt/.env /.env
        echo -e "backup config successfully ../.env" 
    else
        cp /root/node-bot-wrt/.env /.env
        echo -e "backup config successfully ../.env"
    fi
}
restore(){
    mv ../.env /root/node-bot-wrt/.env
    echo -e "restore config successfully"
}
changecfg(){
    while :; do
            echo -e "1 (TOKEN) 2 (USERID) 3 (IPMODEM) 4 (PASSWORD) || 0 (exit mode)"
            read -e -p "what do you want to change? eg: 1: " q
            if [ "${q}" == '1' ]; then
                read -e -q "enter new Token : " newtok
                sed -i "1s/.*/TOKEN='$(printf "%s" "$newtok")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '2' ]; then
                read -e -q "enter new Userid : " newusr
                sed -i "2s/.*/USERID='$(printf "%s" "$newusr")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '3' ]; then
                read -e -q "enter new ipmodem : " newip
                sed -i "3s/.*/IPMODEM='$(printf "%s" "$newip")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '4' ]; then
                read -e -q "enter new Token : " newpass
                sed -i "4s/.*/PASSWORD='$(printf "%s" "$newpass")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '0' ]; then 
                echo -e 'exit mode'
                exit 0
            break
            else
                echo -e "input error! Please only input 1 to 4 or 0"
            fi
        done 
}
uninstall(){
while :; do
            read -e -p "do you want to uinstall node-bot-wrt ? [y/n]: " q
            if [ "${q}" == 'y' ]; then
                echo -e "uninstalling node-bot-wrt ..."
                rm -r /root/node-bot-wrt
                rm -rf /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
                break
            elif [ "${q}" == 'n' ]; then 
                echo -e 'exit mode'
                exit 0
            break
            else
                echo -e "input error! Please only input 'y' or 'n'"
            fi
        done
}
upnode(){
    wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot.bak && chmod +x /usr/bin/node-bot.bak
    echo -e 'update node-bot successfully'
    rm -rf /usr/bin/node-bot
    mv /usr/bin/node-bot.bak /usr/bin/node-bot
}
install(){
    if [ -d "/root/node-bot-wrt" ]; then
        echo -e "node-bot-wrt already installed"
        while :; do
            read -e -p "do you want to reinstall node-bot-wrt ? [y/n]: " q
            if [ "${q}" == 'y' ]; then
                echo -e "uninstalling node-bot-wrt ..."
                rm -r /root/node-bot-wrt
                rm -rf /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
                break
            elif [ "${q}" == 'n' ]; then
                echo -e "exit installation mode"
                exit 0
            else
                echo -e "input error! Please only input 'y' or 'n'"
            fi
        done
    fi
    while :; do
        read -p "$(echo -e "please input BOT TOKEN : ")" TOKEN
        if [[ -z "${TOKEN}" ]]; then
            echo -e "TOKEN BOT cant be empty"
        else
            break
        fi
    done
    while :; do
        read -p "$(echo -e "please input USER ID : ")" USERID
        if [[ -z "${USERID}" ]]; then
            echo -e "USERID cant be empty"
        else
            break
        fi
    done
    read -p "(opsional), for modem huawei please input ip address : " IPMODEM
    read -p "(opsional), for modem huawei please input password : " PASSWORD
    echo -e "update package & install package ..."
    sleep 1
    opkg update
    installpckg "node-npm"
    installpckg "git"
    installpckg "git-http"
    installpckg "jq"
    installpckg "sysstat"
    installpckg "bash"
    installpckg "curl"
    installpckg "wget"
    installpckg "vnstat2"
    installpckg "vnstati"
    echo -e "installing bot ..."
    sleep 1
    cd
    git clone https://github.com/ahmadqsyaa/node-bot-wrt.git
    cd node-bot-wrt
    echo -e "installing dependencies NPM ..."
    sleep 1
    npm install && echo "npm install successful." || { echo "npm install failed."; exit 1; } 
    cp /root/node-bot-wrt/etc/init.d/node-bot /etc/init.d/
    cp /root/node-bot-wrt/.env.example /root/node-bot-wrt/.env
    cp /root/node-bot-wrt/lib/mmsms /usr/bin/
    cp /root/node-bot-wrt/lib/ht-api /usr/bin/
    chmod +x /usr/bin/ht-api /usr/bin/mmsms
    chmod +x /etc/init.d/node-bot
    chmod +x /root/node-bot-wrt/lib/*.sh /root/node-bot-wrt/lib/bot/*.sh
    createConfig "$TOKEN" "$USERID" "$IPMODEM" "$PASSWORD"
    echo -e "test send message ..."
    sleep 1
    /root/node-bot-wrt/lib/bot/booting.sh
    sleep 1
    echo -e "enable service ..."
    /etc/init.d/node-bot enable
    sleep 1
    echo -e "start service ..."
    /etc/init.d/node-bot start
    sleep 1
    addCrontab "botcb" "*/2 * * * *  /root/node-bot-wrt/lib/bot/cek-bot.sh"
    sleep 1
    echo -e "bot successfully installed ..."
    echo -e "join groups telegram https://t.me/infobot_wrt"
}
update(){
    read -p "$(echo -e "do you want to continue the update? [y/n]: ")" q
        if [ "${q}" == 'y' ]; then
            break
        else
            echo -e "okay, exit"
            exit 0
        fi
    cd /root/node-bot-wrt
    git pull origin master
    cp /root/node-bot-wrt/etc/init.d/node-bot /etc/init.d/
    cp /root/node-bot-wrt/lib/mmsms /usr/bin/
    cp /root/node-bot-wrt/lib/ht-api /usr/bin/
    chmod +x /usr/bin/ht-api /usr/bin/mmsms
    chmod +x /etc/init.d/node-bot
    chmod +x /root/node-bot-wrt/lib/*.sh /root/node-bot-wrt/lib/bot/*.sh
    /etc/init.d/node-bot enable
    /etc/init.d/node-bot start
}

case "${1}" in
-s|status)
  status
  ;;
-h|help)
  clear
  help
  ;;
-v|version)
  version
  ;;
-i|install)
  clear
  install
  ;;
-rf|uninstall)
  clear
  uninstall
  ;;
-u|update)
  clear
  update
  ;;
-un|upnode)
   upnode
   ;;
-bck|backup)
   backup
   ;;
-rst|restore)
   restore
   ;;
-cc|changecfg)
   changecfg
   ;;
-cb|add_bot_cron)
  addCrontab "botcb" "*/2 * * * *  /root/node-bot-wrt/lib/bot/cek-bot.sh"
  ;;
-rcb|rm_bot_cron)
  removeCrontab "botcb"
  ;;
start)
  /etc/init.d/node-bot start
  ;;
stop)
  /etc/init.d/node-bot stop
  ;;
restart)
  /etc/init.d/node-bot restart
  ;;
*)
  echo 'invalid params, -h for help'
  exit 1
  ;;
esac
