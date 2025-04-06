const express=require('express')
const bodyParser=require('body-parser')

const PubSub=require('./publicsubscribe')
const BlockChain=require('./BlockChain')
const request=require('request')

const app=express();
app.use(bodyParser.json())
const blockchain=new BlockChain();
const pubsub=new PubSub({blockchain});

const DEFAULT_PORT=9000;
//
const ROOT_NODE_ADD=`http://localhost:${DEFAULT_PORT}` ;

setTimeout(()=>{
    pubsub.broadcastChain()
},1000)

//fr getting the data from the chain
app.get("/api/data",(req,res)=>{
        res.json(blockchain.chain)
})

//fr inserting the data into the chain also redirects to the get api and displays the data
app.post('/api/mine',(req,res)=>{
         const {data}=req.body;
         blockchain.addblock({data});
         pubsub.broadcastChain();
        
        
       res.redirect('/api/data')
})

//fr syncing the chain with to all the peers
const syncChain=()=>{
    request({url:`${ROOT_NODE_ADD}/api/data`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const chain=JSON.parse(body);
            console.log('syncing chain...',chain);
            blockchain.replace(chain);
            console.log('chain synced!')
        }
    })
}

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFAULT_PORT+Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT||DEFAULT_PORT;
app.listen(PORT,()=>{
   
    console.log(`working on port ${PORT}`)
    syncChain();
})