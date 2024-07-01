import { stringStub } from './string.stub';

/**
 * Generate random URL for testing purposes.
 */
export function urlStub() {
  // Generate a random URL
  const protocol = Math.random() > 0.5 ? 'http' : 'https';
  const domain = `${stringStub(10)}.${stringStub(2)}`;
  const path = stringStub(10);

  return `${protocol}://${domain}/${path}`;
}
