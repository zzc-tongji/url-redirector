const fs = require('fs');
const path = require('path');

const express = require('express');
const ip = require('ip');
const syncRequest = require('sync-request');

// China mainland IP List

const chinaMainlandIpListPath = `${__dirname}${path.sep}china-mainland-ip-list.txt`;
let chinaMainlandIpList = [];

const refreshChinaIpListPath = () => {
  let content;
  try {
    content = syncRequest('GET', 'https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt').getBody().toString();
  } catch (error) {
    return;
  }
  fs.writeFileSync(chinaMainlandIpListPath, content, 'utf8');
  chinaMainlandIpList = content.split('\n');
  console.log();
  console.log(`Refresh China mainland IP list at ${Date()}.`);
  console.log();
};

refreshChinaIpListPath();
setInterval(refreshChinaIpListPath, 1296000000 /* 15 days */);

// Config

const configPath = `${__dirname}${path.sep}config.json`;
let config;

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  config = {
    'port': 80,
    'china-mainland-ip': 'https://www.baidu.com',
    'non-china-mainland-ip': 'https://www.google.com',
    'status-code': 302
  };
  fs.writeFile(configPath, JSON.stringify(config, null, '  '), 'utf8', () => { });
}

// Log

console.log('Server \'url-redirector\' starts.');
console.log();
console.log(config);
console.log();

// Server

const app = express();

app.get(
  '*',
  (req, res) => {
    let chinaMainlandIp = false;
    const sourceIp = req.get('X-Real-IP') ? req.get('X-Real-IP') /* nginx */ : req.ip;
    for (let subnet of chinaMainlandIpList) {
      if (ip.cidrSubnet(subnet).contains(sourceIp)) {
        chinaMainlandIp = true;
        break;
      }
    }
    console.log(`${sourceIp} - ${chinaMainlandIp ? '' : 'not'} from the mainland of China`);
    res.redirect(config['status-code'], chinaMainlandIp ? config['china-mainland-ip'] : config['non-china-mainland-ip'] + req.url);
  }
);

app.listen(
  config.port,
  () => {
    console.log(`Server 'url-redirector' is listening on port ${config.port}.`);
    console.log();
  }
);
