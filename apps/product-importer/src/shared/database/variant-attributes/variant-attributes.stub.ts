import { stringStub } from '@naologic/testing-common-stubs';
import { VariantAttributes } from './variant-attributes.schema';

export function VariantAttributeStub(
  override: Partial<VariantAttributes> = {}
): VariantAttributes {
  return {
    packaging: stringStub(3),
    description: stringStub(64),
    ...override,
  } as VariantAttributes;
}
