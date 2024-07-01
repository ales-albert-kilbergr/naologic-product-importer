import {
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  ProductImportRunner,
  ProductImportScheduler,
  ProductSeedImportRunner,
} from './services';
import {
  ProductImporterSharedModule,
  ProductFileReader,
  MONGO_IMPORT,
} from '../shared';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductImportRunnerController } from './controllers';
import { CONFIG_IMPORT } from '../shared';

let mongoMemoryServer: MongoMemoryServer;
@Module({
  imports: [CONFIG_IMPORT, MONGO_IMPORT, ProductImporterSharedModule],
  controllers: [ProductImportRunnerController],
  providers: [
    ProductFileReader,
    ProductSeedImportRunner,
    ProductImportRunner,
    ProductImportScheduler,
  ],
})
export class AppModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private productSeedImportRunner: ProductSeedImportRunner) {}

  public async onApplicationShutdown(): Promise<void> {
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  }

  public async onApplicationBootstrap(): Promise<void> {
    await this.productSeedImportRunner.run();
  }
}
