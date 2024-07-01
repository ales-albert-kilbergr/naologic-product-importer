import { Module } from '@nestjs/common';
import { ProductFileReader, ProductStore } from './services';
import { ProductSchema } from './database';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [ProductFileReader, ProductStore],
  exports: [ProductFileReader, ProductStore],
})
export class ProductImporterSharedModule {}
