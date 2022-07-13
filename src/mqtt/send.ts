import * as mqtt from 'mqtt';

(async () => {
  try {
    const host = 'localhost';
    const portNumber = 1883;
    const username = 'admin';
    const password = 'admin';

    const connectUrl = `mqtt://${host}:${portNumber}/`

    const client = await mqtt.connect(connectUrl,{
      clean: true,
      connectTimeout: 4000,
      username,
      password,
      reconnectPeriod: 1000,
    });

    client.on('connect', () => {
      console.log('send mqtt connected');

      const topicName = 'mqtt/example';
      const message = {
        message: 'mqtt test',
        date: new Date().getTime()
      };

      client.publish(topicName, JSON.stringify(message), (error) => {
        if (error) {
          console.error(error);
        }

        console.log('success send message', message);
      });
    });
  } catch (e) {
    console.log(e);
  }
})()
