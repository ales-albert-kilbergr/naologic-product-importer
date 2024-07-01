import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ProductInfo {
  @Prop()
  public createdBy!: string;

  @Prop()
  public createdAt!: string;

  @Prop()
  public updatedBy!: string;

  @Prop()
  public updatedAt!: string;

  @Prop()
  public deletedBy?: string;

  @Prop()
  public deletedAt?: string;

  @Prop()
  public dataSource!: string;

  @Prop()
  public companyStatus!: string;

  @Prop()
  public transactionId!: string;

  @Prop()
  public skipEvent!: boolean;

  @Prop()
  public userRequestId!: string;
}

export type ProductInfoDocument = HydratedDocument<ProductInfo>;

export const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);
