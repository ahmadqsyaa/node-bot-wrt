#!/bin/bash

info='\e[46;30m'
warn='\e[41;37m'
success='\e[42;30m'
end='\e[0m'

help(){
    echo -e '\e[31m────────────────────────────────────────────── \e[0m'
    echo -e '\e[31m───────| \e[0m \e[35mSIMPLE GUI BOT - NODE - WRT\e[0m \e[31m|───────\e[0m'
    echo -e '\e[31m──────────────────────────────────────────────\e[0m'
    echo -e ''
    echo -e 'help, -h                       \e[33mshow help usage\e[0m' 
    echo -e 'install, -i                            \e[33minstall\e[0m'
    echo -e 'uninstall, -rf                   \e[33muninstall bot\e[0m'
    echo -e 'changecfg, -cc                   \e[33mchange config\e[0m'
    echo -e 'backup, -bck                     \e[33mbackup config\e[0m'
    echo -e 'restore, -rst                   \e[33mrestore config\e[0m'
    echo -e 'update, -u                          \e[33mupdate bot\e[0m'
    echo -e 'upnode, -un                    \e[33mupdate node-bot\e[0m'
    echo -e 'version, -v                        \e[33mversion bot\e[0m'
    echo -e 'status, -s                      \e[33mcek status bot\e[0m'
    echo -e 'start                                \e[33mstart bot\e[0m'
    echo -e 'stop                                  \e[33mstop bot\e[0m'
    echo -e 'restart                            \e[33mrestart bot\e[0m'
    echo -e 'add_bot_cron, -cb                     \e[33madd cron\e[0m'
    echo -e 'rm_bot_cron, -rcb                    \e[33mdell cron\e[0m'
    echo -e '\e[31m──────────────────────────────────────────────\e[0m'
}
status(){
    pgrep -f /root/node-bot-wrt/index.js > /dev/null
    if [ $? -eq 0 ]; then
        echo -e "$success node-bot is running [$(pgrep -f /root/node-bot-wrt/index.js)]$end"
    else
        echo -e "$warn node-bot not running $end"
    fi
}
version(){
    version=$(grep '"version":' /root/node-bot-wrt/package.json | sed -E 's/.*"version": "(.*)".*/\1/')
    echo "$info version: $version $end" 
}
installpckg(){
    if [[ $(opkg list-installed | grep -c "^$1") == "0" ]]; then
        echo -e "$success installing ${1}... $end" && opkg install $1
    fi
}
addCrontab() {
    if [ "$1" == "botcb" ]; then
        if crontab -l | grep -q 'cek-bot.sh'; then
            echo -e "$info crontab bot already exists $end"
            return 0
        fi
    else
        echo -e "$info add bot to crontab ... $end"
    fi

    tmpfile=$(mktemp)
    crontab -l >"$tmpfile"
    printf '%s\n' "$2" >>"$tmpfile"
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$info successfully add crontab $end"
}
removeCrontab(){
    tmpfile=$(mktemp)
    crontab -l >"$tmpfile"
    if [ "$1" == "botcb" ]; then
        sed -i "/cek-bot.sh/d" "$tmpfile"
    fi
    crontab "$tmpfile" && rm -f "$tmpfile"
    echo -e "$info successfully delete crontab $end"
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
        echo -e "$success backup config successfully ../.env $end" 
    else
        cp /root/node-bot-wrt/.env /.env
        echo -e "$success backup config successfully ../.env $end"
    fi
}
restore(){
    mv ../.env /root/node-bot-wrt/.env
    echo -e "$success restore config successfully $end"
}
changecfg(){
    while :; do
            echo -e "$info 1 (TOKEN) 2 (USERID) 3 (IPMODEM) 4 (PASSWORD) || 0 (exit mode) $end"
            read -e -p "what do you want to change? eg: 1 : "  q
            if [ "${q}" == '1' ]; then
                read -e -p "enter new Token : " newtok
                sed -i "1s/.*/TOKEN='$(printf "%s" "$newtok")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '2' ]; then
                read -e -p "enter new Userid : " newusr
                sed -i "2s/.*/USERID='$(printf "%s" "$newusr")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '3' ]; then
                read -e -p "enter new ipmodem : " newip
                sed -i "3s/.*/IPMODEM='$(printf "%s" "$newip")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '4' ]; then
                read -e -p "enter new Password : " newpass
                sed -i "4s/.*/PASSWORD='$(printf "%s" "$newpass")'/" /root/node-bot-wrt/.env 
                break
            elif [ "${q}" == '0' ]; then 
                echo -e 'exit mode'
                exit 0
            break
            else
                echo -e "$warn input error! Please only input 1 to 4 or 0 $end"
            fi
        done 
} 
uninstall(){
while :; do
            read -e -p "$info do you want to uinstall node-bot-wrt ? [y/n]: $end" q
            if [ "${q}" == 'y' ]; then
                echo -e "$info uninstalling node-bot-wrt ... $end"
                rm -r /root/node-bot-wrt
                rm -rf /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
                break
            elif [ "${q}" == 'n' ]; then 
                echo -e 'exit mode'
                exit 0
            break
            else
                echo -e "$warn input error! Please only input 'y' or 'n' $end"
            fi
        done
}
upnode(){
    wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot.bak && chmod +x /usr/bin/node-bot.bak
    echo -e "$success update node-bot successfully $end"
    rm -rf /usr/bin/node-bot
    mv /usr/bin/node-bot.bak /usr/bin/node-bot
}
install(){
    if [ -d "/root/node-bot-wrt" ]; then
        echo -e "$info node-bot-wrt already installed $end"
        while :; do
            read -p "$(echo -e "$info do you want to reinstall node-bot-wrt ? [y/n]: $end")" q
            if [ "${q}" == 'y' ]; then
                echo -e "$info uninstalling node-bot-wrt ... $end"
                rm -r /root/node-bot-wrt
                rm -rf /usr/bin/ht-api /usr/bin/mmsms /etc/init.d/node-bot
                break
            elif [ "${q}" == 'n' ]; then
                echo -e "exit installation mode"
                exit 0
            else
                echo -e "$warn input error! Please only input 'y' or 'n' $end"
            fi
        done
    fi
    while :; do
        read -p "$(echo -e "$info please input BOT TOKEN : $end")" TOKEN
        if [[ -z "${TOKEN}" ]]; then
            echo -e "$warn TOKEN BOT cant be empty$end"
        else
            break
        fi
    done
    while :; do
        read -p "$(echo -e "$info please input USER ID : $end")" USERID
        if [[ -z "${USERID}" ]]; then
            echo -e "$warn USERID cant be empty$end"
        else
            break
        fi
    done
    read -p "$(echo -e "$info (opsional), for modem huawei please input ip address : $end")" IPMODEM
    read -p "$(echo -e "$info (opsional), for modem huawei please input password : $end")" PASSWORD
    echo -e "$info update package & install package ... $end"
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
    echo -e "$info installing dependencies NPM ... $end"
    sleep 1
    retry=true
    while $retry; do
    npm install && {
    echo -e "$success npm install successful.$end"
    retry=false
    } || {
    read -p "$(echo -e "$warn npm install failed. retry? (y/n): $end")" answer
    case "$answer" in
      [yY] )
        echo -e "$info ietrying npm install...$end"
        ;;
      [nN] )
        echo -e "$warn installation aborted.$end"
        exit 1
        ;;
      * )
        echo -e "$warn invalid input. Please enter y or n.$end"
        ;;
    esac
    }
    done
    cp /root/node-bot-wrt/etc/init.d/node-bot /etc/init.d/
    cp /root/node-bot-wrt/.env.example /root/node-bot-wrt/.env
    cp /root/node-bot-wrt/lib/mmsms /usr/bin/
    cp /root/node-bot-wrt/lib/ht-api /usr/bin/
    chmod +x /usr/bin/ht-api /usr/bin/mmsms
    chmod +x /etc/init.d/node-bot
    chmod +x /root/node-bot-wrt/lib/*/*.sh
    createConfig "$TOKEN" "$USERID" "$IPMODEM" "$PASSWORD"
    echo -e "$info test send message ... $end"
    sleep 1
    /root/node-bot-wrt/lib/bot/booting.sh
    sleep 1
    echo -e "$info enable service ... $end"
    /etc/init.d/node-bot enable
    sleep 1
    echo -e "$info start service ... $end"
    /etc/init.d/node-bot start
    sleep 1
    addCrontab "botcb" "*/2 * * * *  /root/node-bot-wrt/lib/bot/cek-bot.sh"
    sleep 1
    echo -e "$success bot successfully installed ... $end"
    echo -e "$info join groups telegram https://t.me/infobot_wrt $end"
}
update() {
    while :; do
        read -p "$(echo -e "$info Do you want to continue the update? [y/n]: $end")" q
        if [[ "$q" == "y" || "$q" == "Y" ]]; then
            echo -e "$info Starting update process...$end"
            
            # Navigasi ke direktori proyek
            cd /root/node-bot-wrt || {
                echo -e "$error Failed to change directory. Exiting.$end"
                exit 1
            }
            
            # Tarik pembaruan dari Git
            git pull origin master || {
                echo -e "$error Failed to pull updates from Git. Exiting.$end"
                exit 1
            }

            # Salin file dan set izin
            cp /root/node-bot-wrt/etc/init.d/node-bot /etc/init.d/
            cp /root/node-bot-wrt/lib/mmsms /usr/bin/
            cp /root/node-bot-wrt/lib/ht-api /usr/bin/
            chmod +x /usr/bin/ht-api /usr/bin/mmsms
            chmod +x /etc/init.d/node-bot
            chmod +x /root/node-bot-wrt/lib/*/*.sh

            # Aktifkan dan mulai layanan
            /etc/init.d/node-bot enable
            /etc/init.d/node-bot start
            
            echo -e "$info Update completed successfully.$end"
            break
        elif [[ "$q" == "n" || "$q" == "N" ]]; then
            echo -e "$info Update canceled. Exiting.$end"
            exit 0
        else
            echo -e "$warn Invalid input. Please enter 'y' or 'n'.$end"
        fi
    done
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
