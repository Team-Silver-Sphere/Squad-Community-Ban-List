import { port } from 'core/config/web-server';

import server from './src/app.js';

server.listen(port, () => console.log(`Server started on port ${port}`));
