const BlockChain = require('./BlockChain');
const blockchain = new BlockChain();
blockchain.addblock({data:"hello 5"})
let prevTimestamp, nextTimestamp, timediff, avgtime;
const times = [];

//for calculating the average time taken to mine a block 
for (let i = 0; i < 10; i++) { 
    if (blockchain.chain.length > 0) {
        prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
    } else {
        prevTimestamp = Date.now(); 
    }

    const nextBlock = blockchain.addblock({ data: `This is block ${i}` });
    nextTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    timediff = nextTimestamp - prevTimestamp;
    times.push(timediff);

    avgtime = times.reduce((total, num) => total + num, 0) / times.length;

    console.log(`Time taken to mine block ${i} is: ${timediff}ms , avgTime: ${avgtime}ms `);
}
