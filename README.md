### REQUIREMENTS OPENWRT

* `node`
* `node-npm`
* `nano`
* `git`
* `git-http`
* `jq`
* `bash`
* `sysstat`
* `speedtest`

### DEPENDENCIES NPM

* `pm2`
* `axios`
* `dotenv`
* `node-telegram-bot-api`
*  `ws`

### QUICK INSTALLATION
`step 1 update package`

```terminal
opkg update && opkg install node node-npm nano git git-http jq bash sysstat speedtest
```
`step 2 clone code`

```terminal
cd && git clone https://github.com/ahmadqsyaa/node-bot-wrt && cd node-bot-wrt
```
`step 3 Input your bot token and userid`
```terminal
nano .env
```
`step 4 [optional] Only for Huawei modem users (ip default and password admin)`
```terminal
nano data
```
`step 5 install other packages & chmod *.sh`
```sh
chmod 755 install.sh && bash install.sh
```
`step 6 install package and start bot`

```terminal
npm i && npm install pm2 -g && pm2 start index.js --name bot
```
`successful and now `[usage](#usage-bot)
### USAGE

`start bot && copy to startup`

```terminal
pm2 start /root/node-bot-wrt/index.js --name bot
```
`stop bot`

```terminal
pm2 stop bot
```
`restart bot`

```terminal
pm2 restart bot
```
`auto restart bot 30 minutes`

```terminal
pm2 restart bot --cron "*/30 * * * *" 
```

### USAGE BOT

`step 1 open telegram and chat bot and type`
```bot command
/start
```

### HELP & CONTACT
* [**telegram**](https://t.me/rickk1kch)


