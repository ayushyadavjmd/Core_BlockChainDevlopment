const Block=require('./Block')
const cryptoHash=require('./crypto-hash')
class BlockChain{
    constructor(data)
    {//Intializing the chain with genesis blck
       this.chain=[Block.genesis()];
     
    }
    //function fr adding the blocks into the chain 
     addblock(data){
        const newBlock=Block.mineblock({
            prevBlock:this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newBlock);
     
}

//function fr checking that the chain is valid or not 
static isValid(chain){
    if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){return false};
    for(let i=1;i<chain.length;i++)
    {
        const {timestamp,prevHash,hash,nonce,difficulty,data}=chain[i];
        const lastdifficulty=chain[i-1].difficulty;
        const realHash=chain[i-1].hash;
        if(realHash!==prevHash){return false;}
        const validatehash=cryptoHash(timestamp,prevHash,nonce,difficulty,data);
        if(validatehash!==hash)return false;
        if(Math.abs(lastdifficulty-difficulty)>1)return false;
    }
    return true; 
}

// fnc fr replacing the chain with upcoming chain  it selects the longest chain and inserts it into the current chain
 replace(chain)
{ 
    
    if(chain.length <= this.chain.length){
        console.error('The incoming chain is not longer enough to select! ');
        return ;
    }
    if(!BlockChain.isValid(chain)){
        console.error("This is not valid chain! ");
        return;
    }
    this.chain=chain;
}
}

const blocks=new BlockChain();


console.log(blocks)
const result=BlockChain.isValid(blocks.chain)
console.log(result)
module.exports=BlockChain;