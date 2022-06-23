## NestJS module for Prometheus

> This library has taken an idea from the **[@willsoto/nestjs-prometheus](https://github.com/willsoto/nestjs-prometheus)**

### Installation

```bash
# npm
$ npm install --save nest-prometheus

# yarn
$ yarn add nest-prometheus
```

### Usage

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';

@Module({
  imports: [PrometheusModule.register()],
})
export class AppModule {}
```

By default, this will register a `/metrics` endpoint that will return the [default metrics](https://github.com/siimon/prom-client#default-metrics).

### Changing the metrics http endpoint

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/mymetrics',
    }),
  ],
})
export class AppModule {}
```

### Disabling default metrics collection

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
})
export class AppModule {}
```

### Configuring the default metrics

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        // See https://github.com/siimon/prom-client#configuration
        config: {},
      },
    }),
  ],
})
export class AppModule {}
```

## Injecting individual metrics

```typescript
// module.ts
import { Module } from '@nestjs/common';
import { PrometheusModule, makeCounterProvider } from 'nest-prometheus';
import { Service } from './service';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    Service,
    makeCounterProvider({
      name: 'metric_name',
      help: 'metric_help',
    }),
  ],
})
export class AppModule {}
```

```typescript
// service.ts
import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';
import { InjectMetric } from 'nest-prometheus';

@Injectable()
export class Service {
  constructor(@InjectMetric('metric_name') public counter: Counter<string>) {}
}
```

## Setting default labels

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultLabels: {
        app: 'My app',
      },
    }),
  ],
})
export class AppModule {}
```

See the [docs](https://github.com/siimon/prom-client#default-labels-segmented-by-registry) for more information.

## Available metrics

#### [Counter](https://github.com/siimon/prom-client#counter)

```typescript
import { makeCounterProvider } from 'nest-prometheus';
```

#### [Gauge](https://github.com/siimon/prom-client#gauge)

```typescript
import { makeGaugeProvider } from 'nest-prometheus';
```

#### [Histogram](https://github.com/siimon/prom-client#histogram)

```typescript
import { makeHistogramProvider } from 'nest-prometheus';
```

#### [Summary](https://github.com/siimon/prom-client#summary)

```typescript
import { makeSummaryProvider } from 'nest-prometheus';
```

## Providing a custom controller

If you need to implement any special logic or have access to the controller (e.g., to customize [Swagger](https://docs.nestjs.com/openapi/introduction)),
you can provide your own controller (or subclass) of the default controller.

Here is a basic example which should be enough to extend or customize in any way you might need.

```typescript
// my-custom-controller.ts
import { PrometheusController } from 'nest-prometheus';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
class MyCustomController extends PrometheusController {
  @Get()
  async index(@Res() response: Response) {
    await super.index(response);
  }
}
```

```typescript
import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nest-prometheus';
import { MyCustomController } from './my-custom-controller';

@Module({
  imports: [
    PrometheusModule.register({
      controller: MyCustomController,
    }),
  ],
})
export class AppModule {}
```

&NewLine;

#### Change Log

> See [Changelog](CHANGELOG.md) for more information.

#### Contributing

> Contributions welcome! See [Contributing](CONTRIBUTING.md).

#### Author

> **Mostafa Gholami** [`mst-ghi`](https://github.com/mst-ghi)
