import { Injectable, Logger } from '@nestjs/common';
import { workerData, parentPort } from 'worker_threads';
import * as fs from 'fs';
import * as readline from 'readline';
import { ProductFileReader } from '../shared';

@Injectable()
export class ProductImportWorker {
  private logger = new Logger(ProductImportWorker.name);

  constructor(private fileReader: ProductFileReader) {}

  public async run() {
    const { filePath, start, end, dataHeaders, workerIx } = workerData;

    this.logger.log(
      `Starting Product Import Worker ${workerIx} processing source from ${start} to ${end}`
    );

    const stream = fs.createReadStream(filePath, {
      start,
      end,
      highWaterMark: 1024,
    });
    const rl = readline.createInterface({
      input: stream,
    });

    let linesProcessed = 0;

    rl.on('line', (line) => {
      // Process the line
      linesProcessed++;
      const lineValues = this.fileReader.parseLine(line);

      const lineData = dataHeaders.reduce((acc, header, i) => {
        acc[header] = lineValues[i];
        return acc;
      }, {});
      console.log('LINE DATA', lineData);
      // For example, you could parse CSV lines here
    });

    rl.on('close', () => {
      parentPort.postMessage({ linesProcessed });
    });

    new Promise((resolve) => {
      setTimeout(() => {
        parentPort.postMessage('Hello from worker');
        resolve(null);
      }, 1000);
    });
  }
}
/**
 *  SiteSource: 'AIM',
  ItemID: '10309069',
  ManufacturerID: '445',
  ManufacturerCode: '10000599',
  ManufacturerName: 'Principle Business Enterprises',
  ProductID: '10019677',
  ProductName: 'PRINCIPLE BUSINESS SELECT� DISPOSABLE ABSORBENT UNDERWEAR',
  ProductDescription: 'Allows an active person to enjoy daily activities.  Users will find it easy to pull up and down, just like regular underwear, allowing for normal toileting.  Featuring a full rise waist panel, ample fabric allows for a better fit; top can be folded over for custom fit.  "Rustle-free" and more discreet under clothing; the softer, breathable cloth like fabric with non-binding security provides greater comfort.  Kufguard� (inner leg cuffs) to help prevent leakage. Tear away side seams for easy removal.  Compressed packaging with a "side dispenser" that neatly dispenses one product at a time. Latex free.',
  ManufacturerItemCode: '2602',
  ItemDescription: 'Underwear, Youth, l Select DAU, 15"-25", 38-65 lbs, Capacity 14.5 fl oz, 12/bg, 8 bg/cs (US Only)',
  ImageFileName: '',
  ItemImageURL: '',
  NDCItemCode: 'PBE 2602',
  PKG: 'cs',
  UnitPrice: '39.7700',
  QuantityOnHand: '0',
  PriceDescription: '',
  Availability: '14-21 Days',
  PrimaryCategoryID: '4',
  PrimaryCategoryName: 'Extended Care/Home Health',
  SecondaryCategoryID: '44',
  SecondaryCategoryName: 'Incontinence ',
  CategoryID: '478',
  CategoryName: 'Br',
  IsRX: undefined,
  IsTBD: undefined
 */
