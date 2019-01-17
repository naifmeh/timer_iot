
function write_JSON_toFile(data, filename) {
    // Fonction pour ecrire les commentaires dans un fichier
    //Enregistrer aussi le nom dans un fichier
    const fs = require('fs');
    try {
    fs.writeFileSync(filename, JSON.stringify(data), {flag: 'w'});
    } catch(err) {
        console.log(err);
    }
    
}

function read_JSON_file(path) {
    const fs = require('fs');
    try {
        let obj = JSON.parse(fs.readFileSync(path, 'utf8'));
        return obj;
    } catch(err) {
        return undefined;
    }
}
module.exports.read_JSON_file = read_JSON_file;
module.exports.write_JSON_toFile = write_JSON_toFile;