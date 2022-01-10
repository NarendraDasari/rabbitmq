console.log(" --- THIS IS A DEMO FOR RabbitMQ(which is hosted as a docker conatiner) ------- ");
console.log(" --- Thsi file is a publisher code ------- ")
/* This publisher uses the ampq protocol to publish events to the RabbitMa excahnge(queue) with opening up a channel ---
NOTE : We atleast need one channel to start communicating with RabbitMQ HOST

docker rabbitmq command: docker run --name rabbitmq -p 5672:5672 rabbitmq

This js file will run on Node.js ..
*/


const amqp = require("amqplib");

const msg = {number: process.argv[2]}

send();
async function send(){
    try{

        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully with JobId: ${msg.number}`);
        await channel.close();
        await connection.close();
    }
    catch(ex){
        console.error(ex)
    }
}