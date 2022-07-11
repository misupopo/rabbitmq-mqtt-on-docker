import * as amqplib from 'amqplib';

(async () => {
  const url = 'amqp://admin:admin@localhost:5672/';

  try {
    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    const send = async (queue: string, msg: Buffer) => {
      await channel.assertQueue(queue, {durable: true});
      channel.sendToQueue(queue, msg)
    }

    await send('test', Buffer.from(JSON.stringify({
      test: 'test'
    })));

    console.log('message send success')
  } catch (e) {
    console.log(e);
  }
})()
