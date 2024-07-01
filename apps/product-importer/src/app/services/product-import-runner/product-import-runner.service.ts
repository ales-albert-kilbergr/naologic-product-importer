import { Injectable } from '@nestjs/common';
import {
  ProductImportRunnerAlreadyRunningException,
  ProductImportRunnerSourceFileNotFoundException,
} from './product-import-runner.exception';
import * as path from 'path';
import { Worker } from 'worker_threads';
import { ProductFileReader } from '../../../shared';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProductImportRunner {
  export type Status = 'IDLE' | 'RUNNING' | 'COMPLETED' | 'ERROR';

  export interface ProductImportRunnerParams {
    filePath: string;
    parallelCount: number;
  }
}

@Injectable()
export class ProductImportRunner {
  private status: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'ERROR' = 'IDLE';

  constructor(private fileReader: ProductFileReader) {}

  public isRunning() {
    return this.status === 'RUNNING';
  }

  public getStatus() {
    return this.status;
  }

  public async run(params: ProductImportRunner.ProductImportRunnerParams) {
    if (this.isRunning()) {
      throw new ProductImportRunnerAlreadyRunningException();
    }

    const filePath = path.resolve(__dirname, params.filePath);

    const sourceFileExists = await this.fileReader.fileExists(filePath);

    if (!sourceFileExists) {
      throw new ProductImportRunnerSourceFileNotFoundException(filePath);
    }

    const firstLine = await this.fileReader.readFirstLine(filePath);
    const dataHeaders = this.fileReader.parseLine(firstLine);
    const firstLineSize = this.fileReader.getLineSize(firstLine);

    const fileSize = await this.fileReader.getFileSize(filePath);
    const chunkSize = Math.ceil(fileSize / params.parallelCount);

    for (let i = 0; i < params.parallelCount; i++) {
      // Process the file in chunks
      const start = i * chunkSize + firstLineSize;
      const end =
        i === params.parallelCount - 1 ? fileSize : (i + 1) * chunkSize - 1;
      const workerFilePath = path.resolve(__dirname, './worker.js');
      const worker = new Worker(workerFilePath, {
        workerData: { filePath, start, end, dataHeaders, workerIx: i },
      });

      worker.on('message', (msg) => {
        console.log('WORKER MESSAGE', msg);
      });
    }
  }

  public async interrupt() {}
}
