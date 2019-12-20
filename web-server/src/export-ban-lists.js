import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import { ExportBanList } from 'database/models';

const router = new Router();

router.get('/:id', async ctx => {
  const exportBanList = await ExportBanList.findOneAndUpdate(
    { _id: ctx.params.id },
    { lastFetched: Date.now() }
  );

  // throw 404 if not found
  if (exportBanList === null) {
    ctx.status = 404;
    return;
  }

  const exportBanListPath = path.resolve(
    `./web-server/export-ban-lists/${exportBanList._id}.txt`
  );
  if (!fs.existsSync(exportBanListPath))
    fs.writeFileSync(
      path.resolve(`./web-server/export-ban-lists/${exportBanList._id}.txt`),
      `// ID: ${exportBanList._id}, Name: ${exportBanList.name}, Owner: ${exportBanList.owner}\n// Config: ${exportBanList.config}`
    );

  ctx.body = fs.readFileSync(exportBanListPath, 'utf8');
});

export default router;
