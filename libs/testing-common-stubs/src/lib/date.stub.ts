const DEFAULT_MIN_YEAR = 2020;
const DEFAULT_MAX_YEAR = 2030;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace dateStub {
  export interface Options {
    minYear?: number;
    maxYear?: number;
  }
}

/**
 * Generate random date for testing purposes.
 * @returns
 */
export function dateStub(options: dateStub.Options = {}): Date {
  const minYear = options.minYear || DEFAULT_MIN_YEAR;
  const maxYear = options.maxYear || DEFAULT_MAX_YEAR;

  const randomDate = new Date();

  randomDate.setFullYear(
    Math.floor(Math.random() * (maxYear - minYear)) + minYear
  );
  randomDate.setMonth(Math.floor(Math.random() * 12));
  randomDate.setDate(Math.floor(Math.random() * 31));
  randomDate.setHours(Math.floor(Math.random() * 24));
  randomDate.setMinutes(Math.floor(Math.random() * 60));
  randomDate.setSeconds(Math.floor(Math.random() * 60));
  randomDate.setMilliseconds(Math.floor(Math.random() * 1000));

  return randomDate;
}
