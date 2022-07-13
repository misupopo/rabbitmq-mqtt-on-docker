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
      console.log('receive mqtt connected');

      const topicName = 'mqtt/example';

      client.subscribe(topicName);

      client.on('message', (topic, payload) => {
        console.log(topic,payload.toString());
      });
    });
  } catch (e) {
    console.log(e);
  }
})()
