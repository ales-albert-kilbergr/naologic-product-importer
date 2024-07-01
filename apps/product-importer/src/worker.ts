import { NestFactory } from '@nestjs/core';
import { ProductImportWorkerModule } from './worker/worker.module';
import { ProductImportWorker } from './worker/worker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(
    ProductImportWorkerModule
  );
  const worker = app.get(ProductImportWorker);

  await worker.run();
}
bootstrap();
