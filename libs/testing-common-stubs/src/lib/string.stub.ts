const ALPHABETICAL_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const ALPHANUMERIC_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a random testing string. This method is not cryptographically safe
 * and is only good to be used in testing not in real code.
 *
 * @param length  The length of the string to generate.
 * @returns random urn
 */
export function stringStub(
  length: number = 3 + Math.floor(Math.random() * 6)
): string {
  let result = '';
  const characters = ALPHANUMERIC_CHARS;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function alphabeticalCharStub() {
  const characters = ALPHABETICAL_CHARS;
  const charactersLength = characters.length;

  const character = characters.charAt(
    Math.floor(Math.random() * charactersLength)
  );

  return character;
}
