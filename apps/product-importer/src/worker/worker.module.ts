import { Module } from '@nestjs/common';
import { ProductImportWorker } from './worker.service';
import { ProductImporterSharedModule } from '../shared';
import { CONFIG_IMPORT, MONGO_IMPORT } from '../shared/imports';

@Module({
  imports: [CONFIG_IMPORT, MONGO_IMPORT, ProductImporterSharedModule],
  providers: [ProductImportWorker],
  exports: [],
})
export class ProductImportWorkerModule {}
