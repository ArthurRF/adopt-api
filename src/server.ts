import app from './shared/infra/http/app';

export default app.listen(process.env.PORT, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}.`);
});
