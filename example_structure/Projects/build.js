const fs = require('fs');

const project = process.argv[2];
if (!project) {
    throw new Error('Expected project on CLI');
}
const template = JSON.parse(fs.readFileSync(`${project}/${project}.template.json`));
const content = fs.readdirSync('../.');
const filtered = content.filter((x) => {
    return x.indexOf('.') === -1 && x !== 'Projects'
})

var zipFile = '';

filtered.forEach(directory => {
    if (template.Resources[directory]) {
        console.log(`Updating ${directory}`);
        // zipFile = fs.readFileSync(`../${directory}/index.js`, 'utf8').replace(/ \/\/\s+eslint-disable-line.*/g,'').replace(/\"/g, "\"");
        zipFile = fs.readFileSync(`../${directory}/index.js`, 'utf8').replace(/\s+\/\/\s+eslint-disable-line.*/g,'');
        zipFile = zipFile.replace(/\/\*.*\*\//g, '').replace(/(^[ \t]*\n)/gm, "").replace(/\"/g, "\"");
        zipFile = zipFile.replace(/^\s*\n/gm,'')
	console.log(`Code Length: ${zipFile.length}`);
        if (zipFile.length < 4096) {
            template.Resources[directory].Properties.Code.ZipFile = zipFile;
        }
        else {
            zipFile = fs.readFileSync(`../${directory}/uglify/index.js`, 'utf8');
            if (zipFile.length < 4096) {
                template.Resources[directory].Properties.Code.ZipFile = zipFile;
                
            }
            else {
                throw(`${directory}: ZipFile length cannot exceed 4096 characters`)
            }
        }
        
    }
});

//if ("StateMachine" in template.Resources) {
if (template.Resources.hasOwnProperty("StateMachine")) {
    template.Resources.StateMachine.Properties.DefinitionString['Fn::Sub'] = fs.readFileSync(`${project}/${project}.machine.json`, 'utf8').replace(/\"/g, "\"");;
};

fs.writeFileSync(`${project}/${project}.template.json`, JSON.stringify(template), 'utf8');
