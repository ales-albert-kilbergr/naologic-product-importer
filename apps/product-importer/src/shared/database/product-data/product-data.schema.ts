import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Variant } from '../variant/variant.schema';
import { ProductOption } from '../product-option/product-option.schema';
import { Image } from '../image/image.schema';

@Schema()
export class ProductData {
  @Prop({
    type: String,
    required: true,
  })
  public name!: string;

  @Prop({
    type: String,
    required: true,
  })
  public productType!: string;

  @Prop({
    type: String,
  })
  public shortDescription?: string;

  @Prop({
    type: String,
  })
  public description?: string;

  @Prop({
    type: String,
  })
  public vendorId?: string;

  @Prop({
    type: String,
  })
  public manufacturerId?: string;

  @Prop({
    type: String,
  })
  public storefrontPriceVisibility?: string;

  @Prop({ type: [Variant], default: [] })
  public variants!: Variant[];

  @Prop({ type: [ProductOption], default: [] })
  public options!: ProductOption[];

  @Prop({
    type: String,
  })
  public availability?: string;

  @Prop({
    type: String,
  })
  public isFragile?: boolean;

  @Prop({
    type: String,
  })
  public published?: string;

  @Prop({
    boolean: Boolean,
  })
  public isTaxable?: boolean;

  @Prop({ type: [Image] })
  public images!: Image[];

  @Prop({ type: String })
  public categoryId?: string;
}

export type ProductDataDocument = HydratedDocument<ProductData>;

export const ProductDataSchema = SchemaFactory.createForClass(ProductData);
