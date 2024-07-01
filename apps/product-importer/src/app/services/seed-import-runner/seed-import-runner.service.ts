import { Injectable, Logger } from '@nestjs/common';
import * as rawData from '../../../assets/seed.json';
import { ProductStore } from '../../../shared';

/**
 * Import Product Seed Data into a database
 */
@Injectable()
export class ProductSeedImportRunner {
  private logger = new Logger(ProductSeedImportRunner.name);

  constructor(private productStore: ProductStore) {}

  public async run() {
    const logger = new Logger('Bootstrap');

    let importedCount = 0;
    for (let i = 0; i < rawData['data'].length; i++) {
      const data: Record<string, any> = rawData['data'][i];
      const exists = await this.productStore.productExists(data._id);

      data.data.productType = data.data.type;

      if (!exists) {
        logger.log(`Importing product ${data._id}`);

        await this.productStore.createProduct(data as any);
        importedCount++;
      }
    }

    logger.log(`Imported ${importedCount} products`);
  }
}
