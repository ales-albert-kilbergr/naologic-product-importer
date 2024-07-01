import { stringStub } from '@naologic/testing-common-stubs';
import { ProductOptionValue } from './product-option-value.schema';

export function ProductOptionValueStub(
  override: Partial<ProductOptionValue> = {}
): ProductOptionValue {
  return {
    id: stringStub(12),
    name: stringStub(64),
    value: stringStub(64),
    ...override,
  } as ProductOptionValue;
}

export function ProductOptionValueList(count: number): ProductOptionValue[] {
  return Array(count)
    .fill(null)
    .map(() => ProductOptionValueStub());
}
