import * as amqplib from 'amqplib';
import { on } from "events";

(async () => {
  const virtualHost = 'test';
  const portNumber = 5672;
  const hostAddress = 'localhost';
  const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;
  const sendQueueName = 'test-send-queue';

  try {
    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    await channel.consume(sendQueueName, async (message) => {
      console.log(message && message.content.toString());

      if (message) {
        channel.ack(message);
      }
    });

    console.log('received message');
    // process.exit(0);
  } catch (e) {
    console.log(e);
  }
})()
