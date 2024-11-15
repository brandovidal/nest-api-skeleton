import { App } from './app';

async function bootstrap() {
  const app = await App();

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
