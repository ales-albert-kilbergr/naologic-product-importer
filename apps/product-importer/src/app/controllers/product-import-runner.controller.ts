import { Controller, Get, Post } from '@nestjs/common';
import { ProductImportRunner } from '../services';

@Controller('product-import-runner')
export class ProductImportRunnerController {
  constructor(private runner: ProductImportRunner) {}

  @Get('status')
  public getStatus() {
    return {
      status: this.runner.getStatus(),
    };
  }

  @Post('run')
  public async run() {
    // Only start the process, don't wait for it to finish
    this.runner.run({
      filePath: 'assets/images40.txt',
      parallelCount: 4,
    });

    return {
      status: this.runner.getStatus(),
    };
  }
}
