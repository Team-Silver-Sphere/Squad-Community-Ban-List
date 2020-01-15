import Router from 'koa-router';
import { ExportBan, ExportBanList } from 'database/models';

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

  ctx.body =
    (
      await ExportBan.distinct('steamID', {
        battlemetricsStatus: { $nin: ['deleted', 'deleted-errored'] }
      })
    ).join(':0\n') + ':0';
});

export default router;
