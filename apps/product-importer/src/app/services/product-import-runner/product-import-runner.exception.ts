export class ProductImportRunnerException extends Error {}

export class ProductImportRunnerAlreadyRunningException extends ProductImportRunnerException {
  constructor() {
    super('Import Product Runner is already running');
  }
}

export class ProductImportRunnerSourceFileNotFoundException extends ProductImportRunnerException {
  constructor(public readonly filePath: string) {
    super(
      `Cannot start Import Product Runner. Source file "${filePath}" not found.`
    );
  }
}
