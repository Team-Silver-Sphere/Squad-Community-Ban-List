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

  if (!exportBanList.generated) {
    ctx.body =
      '// This export ban list has yet to be generated. Please try again later.';
    return;
  }

  const exportBanListPath = path.resolve(
    `./export-ban-lists/${exportBanList._id}.txt`
  );
  if (!fs.existsSync(exportBanListPath)) {
    ctx.body =
      '// Looks like this ban list has accidentally been deleted. Please contact a system admin.';
    return;
  }

  ctx.body = fs.readFileSync(exportBanListPath, 'utf8');
});

export default router;
