#!/bin/sh
echo "╭───────────────────────────╮"
echo -e "├ hostname: $(uci get system.@system[0].hostname | tr -d '\0')"
echo -e "├ type: $(cat /proc/device-tree/model | tr -d '\0')"
echo -e "├ arsitekture: $(uname -m)"
echo -e "├ firmware: $(cat /etc/openwrt_release | grep DISTRIB_DESCRIPTION | cut -d "'" -f 2 | tr -d '\0')"
echo -e "├ platfom: $(cat /etc/openwrt_release | grep DISTRIB_TARGET | cut -d "'" -f 2 | tr -d '\0')"
echo -e "├ kernel: $(uname -r)"
echo -e "├ date: $(date +"%d %b %Y | %I:%M %p")"
echo -e "├ uptime: $(uptime | awk '{print $3,$4}' | sed 's/,.*//')"
echo -e "├ temperature: $(awk '{printf "%.2f°C\n", $1/1000}' /sys/class/thermal/thermal_zone0/temp)"
echo -e "├ load average: $(awk '{printf "%.0f%%", $1 * 100}' /proc/loadavg)"
echo -e "├ cpu usage: $(mpstat 1 1 | tail -n 1 | awk '{printf "%.2f%%", 100 - $NF}')"
echo "╰───────────────────────────╯"