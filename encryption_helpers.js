'use strict';
const crypto = require('crypto');
const path = require('path');
const fse = require('fs-extra');

const ENCRYPTION_KEY = create_hash(process.env.APP_SECRET, "hash_md5");  // Must be 256 bits (32 bytes), MD5 returns a 32byte hashed string



function create_hash(content, algorithm){

       let algs = {
              hash_sha256: crypto.createHash('sha256'),
              hash_md5: crypto.createHash('md5')
       }

       let selected_alg = algs[algorithm];

       return selected_alg.update(content, 'utf8').digest('hex');
}


const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
 let iv = crypto.randomBytes(IV_LENGTH); // Initialisation vector
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
 let textParts = text.split(':');
 let iv = Buffer.from(textParts.shift(), 'hex');
 let encryptedText = Buffer.from(textParts.join(':'), 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

// function init_encrypted_db_file(){

//        console.log("Initialising encrypted db file...")

//        let db = {};
 
//        PUSHUP_CONFIG.DB_KEYS.forEach( key => {
//          db[key] = ""
//        });

//        // db.authorised = true; // Just for testing    
//        let encrypted_db = encrypt(JSON.stringify(db));
//        fse.writeFileSync(json_db_path, encrypted_db); // Write it to file
//        console.log("encrypted DB written to file")
    
// }

module.exports = {
    decrypt,
    encrypt,
    create_hash,
    //init_encrypted_db_file
};