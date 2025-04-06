const redis=require('redis');
const {createClient}=redis;
const blockchain=require('./BlockChain')

//Defining the channels for the publishers and subscribers
const Channel={
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}

//Defining the class of Publishers & Subscribers 
class PubSub{
       constructor({blockchain}){
        this.blockchain=blockchain;
        this.Publisher=createClient();
        this.Subscriber=createClient();
        this.Subscriber.subscribe(Channel.BLOCKCHAIN);
        this.Subscriber.subscribe(Channel.TEST);
        this.Subscriber.on('message',(channel,message)=>{
                this.handleMessage(channel,message);
        })
       }
       handleMessage(channel,message){
               console.log(`Message received. Channel: ${channel}. Message: ${message}`);
               const parseMessage=JSON.parse(message);
               if(channel===Channel.BLOCKCHAIN){
                this.blockchain.replace(parseMessage);
               }
       }

       //for publish the message to the chnls
       publish({channel,message}){
        this.Publisher.publish(channel,message)
       }
       //for broadcasting the all the channels 
       broadcastChain(){
        this.publish({
            channel:Channel.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        })
       }
      

}

module.exports=PubSub;