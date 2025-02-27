const sass = require('sass');
const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { fileURLToPath } = require('url');

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compileAndSave = async (sassFile) => {
    const dest = sassFile.replace(path.extname(sassFile), ".css");

    fs.writeFile(dest, sass.compile(sassFile).css, (err) => {
        if (err) console.log(err);
        console.log(`Compiled ${sassFile} to ${dest}`);
    });
}

const processFiles = async (parent) => {
    let files = await readdir(parent, { withFileTypes: true});
    for (const file of files) {
        if (file.isDirectory()) {
            await processFiles(path.join(parent, file.name));
        }
        if (path.extname(file.name) === '.scss') {
            await compileAndSave(path.join(parent, file.name));
        }
    }
}

for (const folder of ["styles","blocks"]) {
    try {
        processFiles(path.join(__dirname, "blog", folder));
    } catch (err) {
        console.error(err);
    }
}

fs.watch('.', {recursive: true}, (eventType, fileName) => {
    if (path.extname(fileName) === ".scss" && eventType === "change") {
        compileAndSave(path.join(__dirname, fileName));
    }
})