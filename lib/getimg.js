/*
create https://github.com/ahmadqsyaa
copyright 2024 rick qsyaerick
*/
const fs = require('fs')
function getimg(dir,esx){
    let file = fs.readdirSync(dir)
    let filepng = []
    file.forEach(file =>{
        if (file.endsWith(esx)){
            filepng.push(file)
        }
    })
    return filepng
}
module.exports = getimg