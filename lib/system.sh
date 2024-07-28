#!/bin/sh
#https://github.com/ahmadqsyaa/TELEXWRT/blob/main/plugins/tools/menu/system.sh
SYSTEM_REPORT="
╔════════❖══════════❖════════╗\n
                          𐌌Ꝋ𐌍𐌉𐌕Ꝋ𐌓𐌉𐌍Ᏽ 𐌁Ꝋ𐌕    \n
╚════════❖══════════❖════════╝\n
 ➥ 𝙷𝚘𝚜𝚝𝚗𝚊𝚖𝚎 : $(uci get system.@system[0].hostname | tr -d '\0')\n
 ➥ 𝙼𝚘𝚍𝚎𝚕 : $(cat /proc/device-tree/model | tr -d '\0')\n
 ➥ 𝙰𝚛𝚜𝚒𝚝𝚎𝚔𝚝𝚞𝚛 : $(uname -m)\n
 ➥ 𝙵𝚒𝚛𝚖𝚠𝚊𝚏𝚎 : $(cat /etc/openwrt_release | grep DISTRIB_DESCRIPTION | cut -d "'" -f 2 | tr -d '\0')\n
 ➥ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : $(cat /etc/openwrt_release | grep DISTRIB_TARGET | cut -d "'" -f 2 | tr -d '\0')\n
 ➥ 𝙺𝚎𝚛𝚗𝚎𝚕 : $(uname -r)\n
 ➥ 𝙳𝚊𝚝𝚎 : $(date +"%d %b %Y | %I:%M %p")\n
 ➥ 𝚄𝚙𝚝𝚒𝚖𝚎 : $(uptime | awk '{print $3,$4}' | sed 's/,.*//')\n
 ➥ 𝚃𝚎𝚖𝚙 : $(awk '{printf "%.2f°C\n", $1/1000}' /sys/class/thermal/thermal_zone0/temp)\n
 ➥ 𝙻𝚘𝚊𝚍 𝚊𝚟𝚎𝚛𝚊𝚐𝚎 : $(awk '{printf "%.0f%%", $1 * 100}' /proc/loadavg)\n
 ➥ 𝙲𝙿𝚄 𝚞𝚜𝚊𝚐𝚎 : $(mpstat 1 1 | tail -n 1 | awk '{printf "%.2f%%", 100 - $NF}')\n
 ▰▱▰▱▰▱▰▰▱▰▱▰▱▰▱▰▱▰▱▰▱\n
                              𝙏𝙀𝙇𝙀𝙓𝙒𝙍𝙏 2024\n
╚════════❖══════════❖════════╝ \n
"

echo $SYSTEM_REPORT