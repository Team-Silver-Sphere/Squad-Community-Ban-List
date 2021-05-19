import { connect as connectToDB } from 'scbl-lib/db';
import { PORT } from 'scbl-lib/config';

import { server, client } from './src/app.js';

async function main() {
  // Prepare the Nextjs client.
  await client.prepare();

  // Connect to the database.
  await connectToDB();

  // Make the server listen to incoming traffic.
  server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
}

main();
