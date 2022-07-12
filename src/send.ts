import * as amqplib from 'amqplib';

(async () => {
  const virtualHost = 'test';
  const portNumber = 5672;
  const hostAddress = 'localhost';
  const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;
  const sendQueueName = 'test-send-queue';

  try {
    console.log(`send start ${url}`);
    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    const send = async (queue: string, msg: Buffer) => {
      await channel.assertQueue(queue, {durable: true});
      channel.sendToQueue(queue, msg)
    }

    const message = {
      message: 'test',
      date: new Date().getTime()
    };

    // 送るメッセージの内容
    await send(sendQueueName, Buffer.from(JSON.stringify(message)));

    console.log('message send success', message);
    // process.exit(0)を実行してしまうと送信する前に落ちてしまう
    // process.exit(0);
  } catch (e) {
    console.log(e);
  }
})()
