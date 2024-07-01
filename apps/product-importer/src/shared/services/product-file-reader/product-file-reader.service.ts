import { Injectable } from '@nestjs/common';
import { access, stat } from 'fs/promises';
import { constants, createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Product } from '../../database';

@Injectable()
export class ProductFileReader {
  public async fileExists(filePath: string): Promise<boolean> {
    try {
      await access(filePath, constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async readFirstLine(filePath: string): Promise<string> {
    const stream = createReadStream(filePath);
    const rl = createInterface({
      input: stream,
    });

    return new Promise<string>((resolve) => {
      rl.on('line', (line) => {
        // For example, you could parse CSV lines here
        rl.close();

        resolve(line);
      });
    });
  }

  public parseLine(line: string): string[] {
    return line.split('\t'); // Assuming a comma-separated values file
  }

  public getLineSize(line: string): number {
    return Buffer.byteLength(line, 'utf-8');
  }

  public async getFileSize(filePath: string): Promise<number> {
    const stats = await stat(filePath);
    return stats.size;
  }

  public mapLineToProduct(raw: Record<string, any>) {
    /*
    const product: Product = {
      id: raw['ItemID'],
      data: {
        name: raw['ProductNme'],
        //productType:
      } as any,
    };
    */
  }
}
