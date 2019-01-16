
function write_JSON_toFile(data, filename) {
    // Fonction pour ecrire les commentaires dans un fichier
    //Enregistrer aussi le nom dans un fichier
    const fs = require('fs');
    try {
    fs.writeFileSync(filename, JSON.stringify(data));
    } catch(err) {
        console.err(err);
    }
    
}

function read_JSON_file(path) {
    const fs = require('fs');
    let obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    return obj;
}
module.exports.read_JSON_file = read_JSON_file;
module.exports.write_JSON_toFile = write_JSON_toFile;