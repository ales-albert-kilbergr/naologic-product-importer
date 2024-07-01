import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductOptionValue } from '../product-option-value/product-option-value.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ProductOption {
  @Prop({
    type: String,
    required: true,
  })
  public id!: string;

  @Prop({
    type: String,
    required: true,
  })
  public name!: string;

  @Prop({
    type: String,
  })
  public dataField?: string;

  @Prop({ type: [ProductOptionValue], default: [] })
  public values!: ProductOptionValue[];
}

export type ProductOptionDocument = HydratedDocument<ProductOption>;

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);
