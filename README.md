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
	git clone https://github.com/ahmadqsyaa/node-bot-wrt
	```
- `step 3 select directory`

	```
	cd node-bot-wrt
	```
- `step 4 edit your bot token and userid`
 	* `save file ctrl + s` `exit ctrl + x`
    
	```terminal
	nano .env
	```
- `step 5 [optional] edit ip and pass, only for Huawei modem users`
 	* `save file ctrl + s` `exit ctrl + x`
    
	```terminal
	nano data
	```
- `step 6 install other packages & chmod *.sh`
	```sh
	chmod 755 install.sh && bash install.sh
	```
- `step 7 install pm2`

	```terminal
	npm install pm2 -g
	```
- `step 8 install dependencies npm`

	```terminal
	npn install
	```
- `last step start bot`

	```terminal
	pm2 start index.js --name bot
	```
`successful and nowwww ` [**usage**](#-usage) [**usage bot**](#-usage-bot)


### 💡 Usage

- `copy to startup`

	```terminal
	pm2 start /root/node-bot-wrt/index.js --name bot
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
### 🆘 Help & Contact 
* [**telegram**](https://t.me/rickk1kch)

<p align="center">tested openwrt 23.05.4 reyre</p>





