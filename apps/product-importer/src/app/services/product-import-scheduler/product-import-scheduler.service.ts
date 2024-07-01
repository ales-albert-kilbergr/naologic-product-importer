import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductImportRunner } from '../product-import-runner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductImportScheduler {
  private readonly logger = new Logger(ProductImportScheduler.name);

  constructor(
    private runner: ProductImportRunner,
    private config: ConfigService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async scheduleImport(): Promise<void> {
    // The runner is suppose to run once per day. If the previous run is still
    // running, it is high chance that something went wrong and the process
    // is kind of stuck.
    if (this.runner.isRunning()) {
      // @TODO catch as an exception and send to sentry or similar
      //   to be able to track this error.
      this.logger.error('Product import is already running');
      await this.runner.interrupt();
    }

    this.logger.log('Starting product import');

    await this.runner.run({
      filePath: this.config.get('productImporter.filePath'),
      parallelCount: this.config.get('productImporter.parallelCount'),
    });
  }
}
