import assert from "assert";

export function toCharacterLength(buffer: Buffer): number {
  let cursor = 0;
  let length = 0;

  // inspect current byte and see if it has headers
  // increase length by 1 while moving cursor past bytes representing the accounted for character
  while (cursor < buffer.length) {
    const byte = buffer[cursor];
    if (byte >> 4 === 0b1111) {
      length++;
      cursor += 4;
      continue;
    }
    if (byte >> 5 === 0b111) {
      length++;
      cursor += 3;
      continue;
    }

    if (byte >> 6 === 0b11) {
      length++;
      cursor += 2;
      continue;
    }
    length++;
    cursor++;
  }

  return length;
}

assert.deepEqual(toCharacterLength(Buffer.from("Gödel")), 5);
assert.deepEqual(toCharacterLength(Buffer.from("")), 0);
assert.deepEqual(toCharacterLength(Buffer.from("AbCdEfG")), 7);
assert.deepEqual(toCharacterLength(Buffer.from("this is 🔥")), 9);
assert.deepEqual(toCharacterLength(Buffer.from("𐌰")), 1);

console.log("Assertions passed");
