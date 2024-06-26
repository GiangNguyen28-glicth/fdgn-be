import { Application } from '@fdgn/common';
import { AppModule } from './app.module';
Application.bootstrap(AppModule, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  },
});
