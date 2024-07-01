import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VariantAttributes } from '../variant-attributes/variant-attributes.schema';
import { Image } from '../image/image.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Variant {
  @Prop()
  public id!: string;

  @Prop()
  public available!: boolean;

  @Prop({ type: VariantAttributes })
  public attributes!: VariantAttributes;

  @Prop()
  public cost?: number;

  @Prop()
  public currency?: string;

  @Prop()
  public depth?: number;

  @Prop()
  public description?: string;

  @Prop()
  public dimensionUom?: string;

  @Prop()
  public height?: number;

  @Prop()
  public width?: number;

  @Prop()
  public manufacturerItemCode?: string;

  @Prop()
  public manufacturerItemId?: string;

  @Prop()
  public packaging?: string;

  @Prop()
  public price?: number;

  @Prop()
  public volume?: number;

  @Prop()
  public volumeUom?: string;

  @Prop()
  public weight?: number;

  @Prop()
  public weightUom?: string;

  @Prop()
  public optionName?: string;

  @Prop()
  public optionsPath?: string;

  @Prop()
  public optionItemsPath?: string;

  @Prop()
  public sku?: string;

  @Prop()
  public active?: boolean;

  @Prop({ type: [Image] })
  public images?: Image[];

  @Prop()
  public itemCode?: string;
}

export type VariantDocument = HydratedDocument<Variant>;

export const VariantSchema = SchemaFactory.createForClass(Variant);
