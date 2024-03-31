import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('')
export class AppController {
  @Get('')
  healthCheck() {
    return 'This is Product service';
  }
}
