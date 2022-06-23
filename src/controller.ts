import { Controller, Get, Res } from '@nestjs/common';
import * as client from 'prom-client';

@Controller()
export class PrometheusController {
  @Get()
  async index(@Res() response: any): Promise<void> {
    response.header('Content-Type', client.register.contentType);
    response.send(await client.register.metrics());
  }
}
