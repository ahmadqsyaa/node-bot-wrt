get_ram_status() {
    total_ram=$(free -m | awk 'NR==2{print $2}')
    free_ram_before=$(free -m | awk 'NR==2{print $7}')
    
    # Membersihkan cache RAM
    sync
    echo 3 > /proc/sys/vm/drop_caches
    rm -rf /tmp/luci*
    
    free_ram_after=$(free -m | awk 'NR==2{print $7}')
    erased_ram=$((free_ram_before - free_ram_after))
    
    echo "{\"ram_tersedia\": \"$total_ram\", \"sebelum\": \"$free_ram_before\", \"sesudah\": \"$free_ram_after\", \"cache_yang_dihapus\": \"$erased_ram\"}"
}

get_ram_status | jq .