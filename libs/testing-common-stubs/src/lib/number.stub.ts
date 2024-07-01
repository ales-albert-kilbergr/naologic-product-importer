// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace numberStub {
  export interface Options {
    min?: number;
    max?: number;
  }
}

export function numberStub(options: numberStub.Options) {
  const min = options.min || Number.MIN_SAFE_INTEGER;
  const max = options.max || Number.MAX_SAFE_INTEGER;

  return Math.floor(Math.random() * (max - min)) + min;
}
