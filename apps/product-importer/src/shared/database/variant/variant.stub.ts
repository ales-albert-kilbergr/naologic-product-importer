import { numberStub, stringStub } from '@naologic/testing-common-stubs';
import { Variant } from './variant.schema';
import { VariantAttributeStub } from '../variant-attributes/variant-attributes.stub';
import { ImageListStub } from '../image/image.stub';

export function VariantStub(override: Partial<Variant> = {}): Variant {
  return {
    id: stringStub(12),
    available: Math.random() > 0.5,
    attributes: VariantAttributeStub(),
    cost: numberStub({ min: 0 }),
    currency: stringStub(3).toUpperCase(),
    depth: numberStub({ min: 0 }),
    description: stringStub(64),
    dimensionUom: stringStub(2).toUpperCase(),
    height: numberStub({ min: 0 }),
    width: numberStub({ min: 0 }),
    manufacturerItemCode: `SN${numberStub({ min: Math.pow(10, 5) })}`,
    manufacturerItemId: String(numberStub({ min: Math.pow(10, 8) })),
    packaging: stringStub(2).toUpperCase(),
    price: numberStub({ min: 0 }),
    volume: numberStub({ min: 0 }),
    volumeUom: stringStub(2).toUpperCase(),
    weight: numberStub({ min: 0 }),
    weightUom: stringStub(2).toUpperCase(),
    optionName: stringStub(64),
    optionItemsPath: `${stringStub(8)}.${stringStub(6)}`,
    sku: stringStub(24),
    active: Math.random() > 0.5,
    images: ImageListStub(Math.floor(Math.random() * 5) + 1),
    ...override,
  } as Variant;
}

export function VariantListStub(count: number): Variant[] {
  return Array.from({ length: count }, () => VariantStub());
}
