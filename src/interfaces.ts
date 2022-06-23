import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import * as client from 'prom-client';

export interface PrometheusDefaultMetrics {
  enabled: boolean;
  config?: client.DefaultMetricsCollectorConfiguration;
}

export interface PrometheusOptions {
  controller?: Type<unknown>;
  path?: string;
  defaultMetrics?: PrometheusDefaultMetrics;
  defaultLabels?: Object;
}

export interface PrometheusOptionsFactory {
  createPrometheusOptions(): Promise<PrometheusOptions> | PrometheusOptions;
}

export interface PrometheusAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PrometheusOptionsFactory>;
  useClass?: Type<PrometheusOptionsFactory>;
  inject?: any[];
  controller?: PrometheusOptions['controller'];
}
