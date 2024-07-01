import { stringStub } from '@naologic/testing-common-stubs';
import { ObjectId } from 'mongodb';
import { ProductDataStub } from '../product-data/product-data.stub';
import { Product } from './product.schema';
import { ProductInfoStub } from '../product-info/product-info.stub';

export function ProductStub(override: Partial<Product> = {}): Product {
  return {
    id: new ObjectId().toHexString(),
    docId: `${stringStub(6)}-${stringStub(24)}`,
    data: ProductDataStub(),
    immutable: Math.random() > 0.5,
    deploymentId: stringStub(5),
    docType: stringStub(12),
    namespace: stringStub(12),
    companyId: new ObjectId().toHexString(),
    status: Math.random() > 0.5 ? 'active' : 'inactive',
    info: ProductInfoStub(),
    ...override,
  };
}

export function ProductListStub(count: number): Product[] {
  return Array(count)
    .fill(null)
    .map(() => ProductStub());
}
