import { createDiscordWebhookMessage } from './index.js';

export default async function (url) {
  const [hook] = createDiscordWebhookMessage(url);

  await hook.send("Hello! We're just testing your Discord webhook!");
}
