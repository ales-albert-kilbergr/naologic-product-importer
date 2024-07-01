import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductData } from '../product-data/product-data.schema';
import { ProductInfo } from '../product-info/product-info.schema';

@Schema()
export class Product {
  @Prop()
  public id!: string;

  @Prop()
  public docId!: string;

  @Prop({ type: ProductData })
  public data!: ProductData;

  @Prop()
  public immutable?: boolean;

  @Prop()
  public deploymentId?: string;

  @Prop()
  public docType?: string;

  @Prop()
  public namespace?: string;

  @Prop()
  public companyId?: string;

  @Prop()
  public status!: string;

  @Prop({ type: ProductInfo })
  public info!: ProductInfo;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
