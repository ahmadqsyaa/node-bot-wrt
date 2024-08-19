import fs from 'fs';

const getimg = (dir, ext) => {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith(ext));
};

export default getimg;