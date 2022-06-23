import { Inject } from '@nestjs/common';
import { getToken } from './metrics';

export function InjectMetric(
  name: string,
): (
  target: Record<string, unknown>,
  key: string | symbol,
  index?: number | undefined,
) => void {
  return Inject(getToken(name));
}
