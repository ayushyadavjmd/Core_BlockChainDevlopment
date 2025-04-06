const {Genesis_Block,MINE_RATE}=require("./config")
const hextobin=require("hex-to-binary")
const cryptoHash=require('./crypto-hash')

//Defining the Block class
class Block{
  
  //Constructor for the Block class
    constructor({timestamp,data, hash, prevHash,nonce,difficulty})
    {
        this.timestamp=timestamp;
        this.data=data;
        this.hash=hash;
        this.prevHash=prevHash;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }

    // (Implemented once)static function to create and return the genesis block (first block) to the BlockChain class 
    static genesis(){
        return new this(Genesis_Block);
    }

    //function for mining the block and then it will return the new block 
    static mineblock({prevBlock,data}){
        let {difficulty}=prevBlock;
        let nonce = 0;
const prevHash = prevBlock.hash;
const timestamp = Date.now();
let hash;

//Loop untill we find the hash that meets the difficulty criteria
do {
    nonce++;
    difficulty=Block.adjustDiff({timestamp,originalBlock:prevBlock})
    hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
} while (hextobin(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

return new Block({ prevHash, timestamp, hash, nonce, difficulty, data });


    }
//function for adjust difficulty
 static adjustDiff({timestamp,originalBlock}){
    let {difficulty}=originalBlock;
    if(difficulty<1)return 1;
  const diff=timestamp-originalBlock.timestamp ;
  
  if(diff<MINE_RATE){
    return difficulty+1;
  }
    return difficulty-1;
  }
}

module.exports=Block;
