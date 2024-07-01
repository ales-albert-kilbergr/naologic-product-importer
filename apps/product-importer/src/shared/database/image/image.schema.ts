import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Image {
  @Prop()
  public fileName?: string;

  @Prop()
  public cdnLink?: string;

  @Prop()
  public i?: number;

  @Prop()
  public alt?: string;
}

export type ImageDocument = HydratedDocument<Image>;

export const VariantImageSchema = SchemaFactory.createForClass(Image);
