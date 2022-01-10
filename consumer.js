
console.log(" --- THIS IS A DEMO FOR RabbitMQ publish and Subscribe(which is hosted as a docker conatiner) ------- ");
console.log(" --- Thsi file is a consumer code ------- ")
/* This publisher uses the ampq protocol to publish events to the RabbitMa excahnge(queue) with opening up a channel ---
NOTE : We atleast need one channel to start communicating with RabbitMQ HOST

docker rabbitmq command: docker run --name rabbitmq -p 5672:5672 rabbitmq
This js file will run on Node.js ..
*/


const amqp = require("amqplib");

subscribeAndRead();
async function subscribeAndRead() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            channel.ack(message);
            //"7" == 7 true
            //"7" === 7 false

           // if (input.number == 7 ) 
          //     
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}