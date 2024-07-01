import { stringStub } from '@naologic/testing-common-stubs';
import { ProductData } from './product-data.schema';
import { ObjectId } from 'mongodb';
import { VariantListStub } from '../variant/variant.stub';
import { ProductOptionListStub } from '../product-option/product-option.stub';
import { ImageListStub } from '../image/image.stub';

export function ProductDataStub(
  override: Partial<ProductData> = {}
): ProductData {
  return {
    name: stringStub(12),
    productType: stringStub(12),
    shortDescription: stringStub(64),
    description: stringStub(256),
    vendorId: `${stringStub(6)}-${stringStub(24)}`,
    manufacturerId: new ObjectId().toHexString(),
    storefrontPriceVisibility: stringStub(12),
    variants: VariantListStub(Math.floor(Math.random() * 10) + 1),
    options: ProductOptionListStub(Math.floor(Math.random() * 5) + 1),
    availability: Math.random() > 0.5 ? 'available' : 'unavailable',
    isFragile: Math.random() > 0.5,
    published: Math.random() > 0.5 ? 'published' : 'unpublished',
    isTaxable: Math.random() > 0.5,
    images: ImageListStub(Math.floor(Math.random() * 5) + 1),
    categoryId: new ObjectId().toHexString(),
    ...override,
  };
}
