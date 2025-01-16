'use strict';
import { exec } from 'child_process';

const executeCommand = (command) => 
    new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                return reject(stderr || error.message);
            }
            resolve(stdout.trim());
        });
    });

const fetchDeviceInfo = async (device) => {
    try {
        const [props, uptime, uname, meminfo, battery, su] = await Promise.all([
            executeCommand(`adb -s ${device} shell getprop`),
            executeCommand(`adb -s ${device} shell uptime`),
            executeCommand(`adb -s ${device} shell uname -a`),
            executeCommand(`adb -s ${device} shell cat /proc/meminfo`),
            executeCommand(`adb -s ${device} shell dumpsys battery`),
            executeCommand(`adb -s ${device} shell su -v`).catch(() => '/system/bin/sh: su: not found'),
        ]);

        const properties = {
            'ro.serialno': 'device_id',
            'ro.product.brand': 'device_brand',
            'ro.product.model': 'device_model',
            'ro.product.device': 'device_code',
            'ro.board.platform': 'device_soc',
            'dalvik.vm.isa.arm.variant': 'device_cpu',
            'ro.build.version.release': 'device_version',
            'ro.build.version.sdk': 'device_sdk',
            'ro.build.version.security_patch': 'device_security',
        };

        const deviceInfo = {};
        props.split('\n').forEach(line => {
            for (const prop in properties) {
                if (line.includes(`[${prop}]`)) {
                    const value = line.split(']: [')[1].replace(']', '').trim();
                    deviceInfo[properties[prop]] = value;
                }
            }
        });

        const uptimeMatch = uptime.match(
            /(\d{2}:\d{2}:\d{2})\s+up\s+([^,]+),\s+(\d+)\s+users?,\s+load\s+average:\s+([\d.]+),\s+([\d.]+),\s+([\d.]+)/
        );
        const uptimeInfo = uptimeMatch
            ? {
                current_time: uptimeMatch[1],
                uptime: uptimeMatch[2].trim(),
                users: parseInt(uptimeMatch[3]),
                load_average: {
                    '1m': parseFloat(uptimeMatch[4]),
                    '5m': parseFloat(uptimeMatch[5]),
                    '15m': parseFloat(uptimeMatch[6]),
                },
            }
            : { error: 'Failed to parse uptime.' };

        const unameParts = uname.split(' ');
        const kernelInfo = { device_uname: { kernel: unameParts[2], arch: unameParts[12] || 'Unknown' } };

        const memParts = meminfo.split('\n');
        const totalMem = parseInt(memParts[0].match(/\d+/)[0]);
        const freeMem = parseInt(memParts[1].match(/\d+/)[0]);
        const totalGB = (totalMem + freeMem) / (1024 * 1024);
        const memInfo = { device_memory: `${totalGB.toFixed(0)} GB` };

        const batteryInfo = {};
        battery.split('\n').forEach(line => {
            if (line.includes('level:')) {
                batteryInfo.battery_level = `${line.split(': ')[1].trim()}%`;
            }
            if (line.includes('voltage:')) {
                batteryInfo.battery_voltage = `${(parseInt(line.split(': ')[1]) / 1000).toFixed(2)} V`;
            }
            if (line.includes('temperature:')) {
                batteryInfo.battery_temperature = `${(parseInt(line.split(': ')[1]) / 10)} °C`;
            }
        });

        const isRooted = !su.includes('not found');
        const rootInfo = isRooted ? { device_root: true, su_version: su.trim() } : { device_root: false };

        return { ...deviceInfo, ...uptimeInfo, ...kernelInfo, ...memInfo, ...batteryInfo, ...rootInfo };
    } catch (error) {
        throw new Error(`Failed to fetch device info: ${error.message}`);
    }
};

const fetchMessages = async (device) => {
    try {
        const command = `adb -s ${device} shell content query --uri content://sms --projection date_sent,date,address,body`;
        const stdout = await executeCommand(command);

        const lines = stdout.trim().split('Row: ');
        lines.shift();

        return lines.map(line => {
            const pairs = line.split(',');
            const inbox = {};
            pairs.forEach(pair => {
                const [key, value] = pair.split('=').map(s => s.trim());
                if (key === 'body') {
                    inbox.message = line.substring(line.indexOf('body=') + 5);
                } else if (key === 'date') {
                    const timestamp = parseInt(value);
                    inbox.received = {
                        date: new Date(timestamp).toLocaleDateString(),
                        time: new Date(timestamp).toLocaleTimeString(),
                    };
                } else if (key && value) {
                    inbox[key] = value;
                }
            });
            return inbox;
        });
    } catch (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
};

export { fetchDeviceInfo, fetchMessages };
