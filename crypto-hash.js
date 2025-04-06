const crypto=require('crypto')
const hextobin=require("hex-to-binary")

//fun for creating the hash of the blocks data and return it into the hex format
const cryptoHash=(...input)=>{
const hash=crypto.createHash('sha256');
hash.update(input.join(''));
return hash.digest('hex')
}

module.exports=cryptoHash