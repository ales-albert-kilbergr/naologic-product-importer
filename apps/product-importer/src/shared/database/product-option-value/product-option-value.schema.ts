import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ProductOptionValue {
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
    required: true,
  })
  public value!: string;
}

export type ProductOptionValueDocument = HydratedDocument<ProductOptionValue>;

export const ProductOptionValueSchema =
  SchemaFactory.createForClass(ProductOptionValue);
