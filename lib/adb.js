const exec = require('./exec');

async function adb(){
    const battery_status = await exec('adb shell dumpsys battery');
    const signal_status = await exec("adb shell dumpsys telephony.registry | grep -A 20 'mServiceState'");
    const device_model = await exec('adb shell getprop ro.product.model');
    const android_ver = await exec('adb shell getprop ro.build.version.release');
    const bat = battery_status.match(/level: (\d+)/)
    const stat = battery_status.match(/status: (\d+)/)
    if (bat){
        const level = bat[1]
        const status = stat[1]
        
        if (status == 2){
            let stat = 'charging'
        } else 
        if (status == 3){
            let stat = 'discharging'
        } else 
        if (status == 5){
            let stat = 'full'
        } else {
            let stat = 'tidak diketahui'
        }
        res = `
        device : ${device_model}\r
        os : ${android_ver}\r
        status : ${stat}\r
        level battery : ${level} %\r
        `
        return res
    }
}


module.exports = adb 
