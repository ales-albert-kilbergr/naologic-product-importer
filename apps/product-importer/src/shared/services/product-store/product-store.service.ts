import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../database';
import { Model } from 'mongoose';

@Injectable()
export class ProductStore {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  public async createProduct(product: Product | Product[]): Promise<string[]> {
    const productsInput = Array.isArray(product) ? product : [product];
    const products = await this.productModel.insertMany(productsInput);

    return products.map((product) => product.id);
  }

  public async productExists(productId: string): Promise<boolean> {
    const product = await this.productModel.exists({ _id: productId }).exec();

    return !!product;
  }
}
