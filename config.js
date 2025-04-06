const initially_difficulty=2;
const MINE_RATE=1000;
// It's the 1st block of the blckchn
const Genesis_Block={
    timestamp:"29/03/2025",
 
    prevHash:"0x000000000000",
    hash:"0x000000000000",
   
    nonce:0,
    difficulty:initially_difficulty,
    
    
    data:[]
    
};
module.exports={Genesis_Block,MINE_RATE};