import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // app.enableCors(
  //   {
  //     origin: [
  //       'http://localhost:4200'
  //     ],
  //     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  //     preflightContinue: false,
  //     optionsSuccessStatus: 204,
  //     credentials: true,
  //     allowedHeaders: [
  //       'Accept',
  //       'Content-Type',
  //       'Authorization',
  //     ]
  //   });

  app.enableCors();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.header('Content-Type: application/json');
  next();
});
await app.listen(3000);

}

bootstrap();
