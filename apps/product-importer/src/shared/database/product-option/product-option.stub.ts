import { stringStub } from '@naologic/testing-common-stubs';
import { ProductOption } from './product-option.schema';
import { ProductOptionValueList } from '../product-option-value/product-option-value.stub';

export function ProductOptionStub(
  override: Partial<ProductOption> = {}
): ProductOption {
  return {
    ...override,
    id: stringStub(6),
    name: stringStub(12),
    dataField: stringStub(12),
    values: ProductOptionValueList(Math.floor(Math.random() * 10) + 1),
  };
}

export function ProductOptionListStub(count: number) {
  return Array.from({ length: count }, () => ProductOptionStub());
}
