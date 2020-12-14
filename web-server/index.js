import { connect } from 'scbl-lib/db';

import server from './src/app.js';

const PORT = process.env.PORT || 80;

connect()
  .then(() => {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(console.log);
