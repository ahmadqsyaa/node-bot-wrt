[![usage](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_yHZOwYQuASrlFTLGuMndxwF971hwUSeTNA&usqp=CAU)](https://cdn.videy.co/Iz3ePEd7.mp4) 


<p align="center"><a href="https://t.me/infobot_wrt">joined groups telegram here 🫵</a></p>

### 📝 Requitmenst

* `node-npm v18++`
* `openwrt v23++`
* `nano`
* `git`
* `git-http`
* `jq`
* `bash`
* `sysstat`
* `speedtest` [**Installation**](https://blog.vpngame.com/openwrt/cara-install-speedtest-cli-di-openwrt)

### 📝 Depedenci NPM

* `axios`
* `dotenv`
* `node-telegram-bot-api`
*  `ws`

### ⚠️ read / iqro

* `before installation make sure your storage is not less than 150MB`
* `make sure your internet is stable when installing the package`

### 🪄 fast Installation
`1. copy and paste in terminal`

```bash
wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot && chmod +x /usr/bin/node-bot
```

`2. installing bot`

```bash
node-bot -i
```

### 🧑‍💻 manual Installation
`1. update package & install package`
```bash
opkg update && opkg install node-npm git git-http jq sysstat bash curl wget vnstat2 vnstati
```

`2. install node-bot`
```bash
wget https://raw.githubusercontent.com/ahmadqsyaa/node-bot-wrt/master/install.sh -O /usr/bin/node-bot && chmod +x /usr/bin/node-bot
```

`3. clone bot from github`
```bash
cd ~ && git clone https://github.com/ahmadqsyaa/node-bot-wrt.git && cd node-bot-wrt
```

`4. create config token bot, userid etc.`
```bash
cp .env.example .env && node-bot -cc
```

`5. install package npm`
```bash
npm i
```

`6. move file`
```bash
cp etc/init.d/node-bot /etc/init.d/
cp lib/mmsms lib/ht-api /usr/bin/
chmod +x /usr/bin/* /etc/init.d/node-bot lib/*/*.sh
```

`7. test send messages`
```bash
/root/node-bot-wrt/lib/bot/booting.sh
```

`8. enable bot & start bot`
```bash
/etc/init.d/node-bot enable
/etc/init.d/node-bot start
```

`9. add bot to crontab`
```bash
node-bot -cb
```
`10. bot is installed and ready to use`





`help usage`

```bash
node-bot -h
```
`update bot`

```bash
node-bot -u
```
`update node-bot`

```bash
node-bot -un
```

#### ⚒️ Command Bot

<code>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         OPENWRT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /dhcpl      View DHCP lease list
» /cmd        Run a terminal command
» /clear      Clear RAM cache
» /firewal    View all firewall rules
» /proc       CPU information
» /reboot     Reboot system
» /system     System information
» /cpustat    CPU and temperature info
» /service    Manage services (start, stop, etc.)
» /ifconfig   Network information
» /time       Get time from OpenWrt
» /process    View running processes
» /kill       Stop a running process
» /opkgin     Install OpenWrt packages
» /opkgupg    Upgrade OpenWrt packages
» /opkglist   List installed packages
» /opkgup     Update package list
» /vnstat     Display vnStat interface info
» /vnstati    Generate vnStat traffic image
» /startup    Startup configuration menu
» /crontab    Crontab configuration menu
» /adguard    AdGuard status
» /synctime   Sync time from the web
» /pingall    Ping all hosts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               DROIDMODEM / ANDROID 10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /droidnet   Droidmodem menu
» /droidsms   Send SMS from Android modem
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        MODEM HUAWEI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /infomodem  View modem information
» /deletesms  Delete SMS
» /getsms     View SMS inbox
» /getcount   Check SMS inbox count
» /sendsms    Send SMS
» /rebootmodem Reboot modem
» /setband    Change 4G band
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      MODEM MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /mmsms      Modem Manager menu
» /mmsmsd     Delete SMS via Modem Manager
» /mmsmss     Send SMS via Modem Manager
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      MODEM NOKIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /infonokia      Info modem nokia
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                              ADB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /adb        ADB menu
» /modpes     Toggle airplane mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        TOOL INJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /openclash  OpenClash menu
» /passwall   Passwall menu
» /ocrules    View OpenClash rules
» /ocproxy    View OpenClash proxies
» /octrafic   View OpenClash traffic
» /mihomo     Mihomo menu
» /miproxy    Check Mihomo proxies
» /neproxy    View NekoClash proxies
» /nerules    View NekoClash rules
» /netrafic   View NekoClash traffic
» /neko       NekoClash menu
» /yacd       Yacd dashboard (Meta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                              BOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /infobot    info detail bot, project, dan dependencies
» /uptime     View bot uptime
» /restartbot Restart the bot
» /stopbot    Stop the bot
» /button     Enable/disable keyboard buttons
» /command    Enable/disable command menu
» /setnamebot Set bot name
» /update     Update bot
» /readlog    View bot error logs
» /clearlog   Clear bot error logs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                              TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
» /curl       Download a file from the web
» /git        Git commands / clone repository
» /wget       Download a file from the web
» /ping       Ping Google or a custom host
» /cekbug     Ping a domain from a specific interface
» /sub        Convert vmess/vless etc. to proxy file
» /myip       View IP information
» /3ginfo     3ginfo-lite menu (4G modem info)
» /base64     Encode or decode base64
» /uuidgen    Generate UUID
» /speedtest  Perform a public speedtest
» /upfile     Upload file/photo/video to OpenWrt
» /dlfile     Send file/photo/video from OpenWrt
» /help       Show help information
» /traceroute Trace packet route to destination
» /nslookup   Resolve domain name to IP address
» /dnslookup  Query DNS records
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</code>

### 🆘 Help & Contact 
* [**telegram**](https://t.me/rickk1kch)

<p align="center">tested openwrt 23.05.4 reyre</p>





