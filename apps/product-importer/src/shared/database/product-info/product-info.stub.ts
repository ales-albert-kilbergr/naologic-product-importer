import { ProductInfo } from './product-info.schema';
import { dateStub, stringStub } from '@naologic/testing-common-stubs';
import { ObjectId } from 'mongodb';
import * as crypto from 'crypto';

export function ProductInfoStub(
  override: Partial<ProductInfo> = {}
): ProductInfo {
  return {
    createdBy: new ObjectId().toHexString(),
    createdAt: dateStub().toISOString(),
    updatedBy: new ObjectId().toHexString(),
    updatedAt: dateStub().toISOString(),
    deletedBy: null,
    deletedAt: null,
    dataSource: stringStub(3),
    companyStatus: stringStub(3),
    transactionId: new ObjectId().toHexString(),
    skipEvent: false,
    userRequestId: crypto.randomUUID(),
    ...override,
  } as ProductInfo;
}
