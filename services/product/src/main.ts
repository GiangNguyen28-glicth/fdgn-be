import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { AppModule } from './app.module';

function initTrackingProcessEvent() {
  const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];
  signalsNames.forEach(signalName =>
    process.on(signalName, signal => {
      console.log(`Retrieved signal: ${signal}, application terminated`);
      process.exit(0);
    }),
  );

  process.on('uncaughtException', (error: Error) => {
    console.error({ err: error });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      console.error({ err });
      process.exit(1);
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          // don't compress responses with this request header
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors(options);
  app.setGlobalPrefix('api/v1');
  initTrackingProcessEvent();
  const config = new DocumentBuilder()
    .setTitle('Product Service API')
    .setDescription('The Product Service API Description')
    .setVersion('1.0')
    .addTag('Product Service')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3002);
}
bootstrap();
