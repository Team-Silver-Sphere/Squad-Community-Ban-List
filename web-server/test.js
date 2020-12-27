import { createDiscordWebhookMessage } from 'scbl-lib/utils';

async function main() {
  const [webhook, message] = createDiscordWebhookMessage(
    'https://discordapp.com/api/webhooks/792818741859057664/TvpeHodxrhtFuas9JnoeO6tkZ9sI3isjOu05uXHJ6oN9P5nKDnSr6PcOoMdcp38IexdT'
  );

  message.setTitle('This is a test!');
  message.setDescription('This is a test description!');

  await webhook.send(message);
}

main().then(() => {
  console.log('Done.');
});
