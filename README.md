### REQUIREMENTS OPENWRT

* `node`
* `node-npm`
* `nano`
* `git`
* `git-http`
* `jq`
* `sysstat`
* `speedtest`

### DEPENDENCIES NPM

* `pm2`
* `axios`
* `dotenv`
* `node-telegram-bot-api`
* `axios`
*  `ws`

### QUICK INSTALLATION
`step 1`

```
opkg update && opkg install node node-npm nano git git-http jq sysstat speedtest
```
`step 2`

```
cd && git clone https://github.com/ahmadqsyaa/node-bot-wrt && cd node-bot-wrt
```
`step 3 Input your bot token and userid`
```
nano .env
```
`step 4 Enter the IP address and password of the modem if you are using a Huawei modem!`
```
nano data
```
`step 5`

```


```


```
npm install pm2 -g && pm2 start index.js --name bot
```
