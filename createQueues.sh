#!/bin/bash

# RabbitMQ APIの接続情報
host=192.168.11.16
port=5672
user=LTN0001
passwd=Latona2022002
vhost=data-platform

# JSON5ファイルからキュー名を取得
queue_file="./queues.json5"
queues=$(json5 "$queue_file" | jq -r '.[]')

# 各キューを作成
for queue in $queues; do
  echo "Creating queue: $queue"

  curl -u "$user:$passwd" -X PUT \
    "http://$host:15672/api/queues/$vhost/$queue" \
    -H "content-type: application/json" \
    -d '{"durable": true}'
done
