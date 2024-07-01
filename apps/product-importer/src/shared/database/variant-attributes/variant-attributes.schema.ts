import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class VariantAttributes {
  @Prop()
  packaging!: string;

  @Prop()
  public description!: string;
}

export type VariantAttributesDocument = HydratedDocument<VariantAttributes>;

export const VariantAttributesSchema =
  SchemaFactory.createForClass(VariantAttributes);
