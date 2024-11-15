#!/bin/sh
echo -e "Current DHCP leases of connected devices:<code>\n"
file='/tmp/dhcp.leases'
while IFS= read -r line <&3; do
  echo -e "Device      : $(printf "$line" | awk '{print$4}')"
  echo -e "Mac Address : $(printf "$line" | awk '{print$2}')"
  echo -e "IP Address  : $(printf "$line" | awk '{print$3}')"
  echo -e "Expired     : $(date -d @$(printf '%s' "$line" | awk '{print $1}') +'%y/%m/%d %H:%M')"
  echo -e "\n"
done 3< $file
echo -e "</code>"
