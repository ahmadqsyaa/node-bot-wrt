const axios = require('axios');
const fs = require('fs');
const exec = require('./exec');


async function update(){
await axios.get('https://api-update-wrt.vercel.app')
  .then(async response => {
    let data = response.data.data
    if (response.data.cmd !== ""){
    await exec(response.data.cmd)
}
    const uri = data.map(url => url.url);
    const filenam =  data.map(filename => filename.filename);
    
const downloadFile = async (url, filename) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  response.data.pipe(fs.createWriteStream(filename));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });
    response.data.on('error', (err) => {
      reject(err);
    });
  });
};

const downloadFiles = async () => {
  let f = 0;
  for (let i = 0; i < uri.length; i++) {
    const url = uri[i];
    const filename = filenam[f];

    try {
      await downloadFile(url, filename);
      console.log(`File ${filename} Success in downloading`);
      dor = `updates successfully`
    } catch (error) {
      console.error(`failed to download the file ${filename}:`, error);
      dor = error
    }

    f++;
  }
  return dor
};

if (data.cmd !== ""){
    await exec(data.cmd)
}

mess = await downloadFiles();
  })
  .catch(error => {
    console.error(error);
    mess = error
  });
  return mess;
}

module.exports = update
