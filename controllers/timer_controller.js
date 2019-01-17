
const io_utils = require('../utils/io_utils');

module.exports.handle_timer = function handle_timer(information, timer) {
    let PORT = 33333;
    let HOST = '127.0.0.1';

    io_utils.write_JSON_toFile({"timer": information}, __dirname+'/timer.json');

    let dgram = require('dgram');
    let client = dgram.createSocket('udp4');
    client.send(timer.toString(), 0, information.length, PORT, HOST, function(err, bytes) {
        if(err) throw err;
        console.log("UDP message sent");
        client.close();
    })
}

module.exports.handle_infos = function handle_infos(prof, etudiant, timer, deadline) {
    io_utils.write_JSON_toFile({"prof": prof, "etudiant": etudiant, "timer":timer, "deadline": deadline},
                __dirname+"/infos.json");
  
}

module.exports.read_infos = function read_infos() {
    return io_utils.read_JSON_file(__dirname+"/infos.json");
}

module.exports.handle_comment = function handle_comment(comment) {
    //return [{"author":"naif","text":"Good"}];
    try {
        let comments = io_utils.read_JSON_file(__dirname+"/comments.json");
        console.log(comments);
        if(comments === undefined) {
            comments = {"comments":[]};
        }
        comments.comments.unshift(comment);
        
        io_utils.write_JSON_toFile(comments, __dirname+'/comments.json');
        
        return comments.comments;
    } catch(err) {
        console.log(err);
        return [];
    }
}

module.exports.read_comments = () => {
    try {
        let comments = io_utils.read_JSON_file(__dirname+"/comments.json");
        
        return comments.comments;
    } catch(err) {
        console.log(err);
        return [];
    }
}