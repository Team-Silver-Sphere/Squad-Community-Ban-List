import Router from 'koa-router';

const router = new Router();

router.get('/:id', async (ctx) => {
  ctx.body = 'Placeholder';
});

export default router;
