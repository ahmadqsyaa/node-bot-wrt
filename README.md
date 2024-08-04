[![usage](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_yHZOwYQuASrlFTLGuMndxwF971hwUSeTNA&usqp=CAU)](https://cdn.videy.co/Iz3ePEd7.mp4) 

### 📝 Requitmenst

* `node-npm v14++`
* `nano`
* `git`
* `git-http`
* `jq`
* `bash`
* `sysstat`
* `speedtest` [**Installation**](https://blog.vpngame.com/openwrt/cara-install-speedtest-cli-di-openwrt)

### 📝 Depedenci NPM

* `pm2`
* `axios`
* `dotenv`
* `node-telegram-bot-api`
*  `ws`

### 🪄 Quick Installation
- `step 1 update package and install package`
  
	```terminal
	opkg update && opkg install node-npm nano git git-http jq bash sysstat
	```
- `step 2 clone project`

	```terminal
	cd && git clone https://github.com/ahmadqsyaa/node-bot-wrt
	```
- `step 3 select directory`

	```
	cd node-bot-wrt
	```
- `step 4 rename file .env.example to .env`
    
	```terminal
	mv .env.example .env
	```
- `step 5 edit your bot token and userid. require!!!`
    		- `It is recommended to use a file manager, then edit the .env file in the /root/node-bot-wrt/.env`
 	- `if use nano` `save file ctrl + s` `exit ctrl + x`
	```terminal
	nano .env 
	```
- `step 6 install other packages & permision 
	```sh
	chmod 755 install.sh && bash install.sh
	```
- `step 7 install pm2`

	```terminal
	npm install pm2 -g
	```
- `step 8 install dependencies npm`

	```terminal
	npm install
	```
- `last step start bot`

	```terminal
	pm2 start index.js --name bot
	```
`successful and nowwww ` [**usage**](#-usage) [**usage bot**](#-usage-bot)


### 💡 Usage

- `copy to startup`

	```terminal
	cd /root/node-bot-wrt && pm2 start index.js --name bot
	```
 - `copy to schedule task`

	```terminal
	*/15 * * * * pm2 restart bot
	```
- `start bot`

	```
	pm2 start bot
	```
- `stop bot`

	```terminal
	pm2 stop bot
	```
- `restart bot`

	```terminal
	pm2 restart bot
	```
- `auto restart bot 30 minutes`

	```terminal
	pm2 restart bot --cron "*/30 * * * *" 
	```

### 💡 Usage Bot

- `step 1 open telegram and chat bot and type`
  
	```bot command
	/start
	```
[![Alt Text](https://i.ibb.co/6vCfmpK/Screenshot-20240729-112953.png)](#)


#### ⚒️ Command Bot

━━━━━━━━━━━━━━━━━━━━━━━━━━
                      OPENWRT
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /dhcpl view DHCP lease list
- » /cmd run a command as terminal 
- » /clear clear RAM cache 
- » /firewal view all firewall rules 
- » /proc CPU information 
- » /reboot reboot menu 
- » /system system information
- » /cpustat informasi cpu and temperature
- » /service service app start, stop dll
- » /ifconfig network information
- » /time get the time from OpenWrt
- » /process view running application processes 
- » /kill stop a running application process 
- » /opkgin install OpenWrt packages
- » /opkgupg upgrade OpenWrt packages
- » /opkglist view installed packages
- » /opkgup update OpenWrt packages
- » /vnstat display vnstat information for the specified interface
- » /vnstati generate network monitoring images
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      MODEM HUAWEI
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /infomodem view modem information
- » /deletesms delete SMS menu 
- » /getsms SMS menu
- » /getcount view SMS inbox count
- » /sendsms send SMS
- » /reboot reboot menu
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      MODEM MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /mmsms Modem Manager menu
- » /mmsmsd delete SMS with Modem Manager
- » /mmsmss send SMS with Modem Manager
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      ADB
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /adb ADB menu
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      TOOL INJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /openclash Openclash menu 
- » /passwall Passwall menu
- » /ocrules view all OpenClash rules
- » /ocproxy view all OpenClash proxies
- » /octrafic view all OpenClash traffic
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      BOT
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /uptime view the bot's uptime
- » /restartbot restart the bot
- » /stopbot stop the bot
- » /button enable or disable keyboard buttons
- » /command enable or disable the command menu
- » /setnamebot set the bot's name
- » /update update bot
━━━━━━━━━━━━━━━━━━━━━━━━━━
                      TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━
- » /curl download a file from the web
- » /git git command / git clone
- » /wget download a file from the web 
- » /ping ping google or ping a specified host
- » /cekbug ping to a domain to one of the interfaces
- » /sub convert vmess,vless dll to file proxy
- » /myip my ip information
- » /3ginfo 3ginfo-lite menu modem 4g
- » /base64 base64 decode and encode
- » /uuidgen generate uuid
- » /speedtest perform a public speedtest
- » /upfile upload a file, photo, video to OpenWrt with the specified document
- » /dlfile send a file, photo, video from OpenWrt to the bot
- » /help display help information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 🆘 Help & Contact 
* [**telegram**](https://t.me/rickk1kch)

<p align="center">tested openwrt 23.05.4 reyre</p>





