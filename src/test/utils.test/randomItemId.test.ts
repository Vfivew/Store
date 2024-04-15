import {randomItemId} from '../../utils/randomItemId';

test('items should always have values', () => {
  const result = randomItemId();
  expect(['Coils', 'Rods']).toContain(result);
});

test('randomIndex should always be a number', () => {
  const result = randomItemId();
  const parsedIndex = parseInt(result);
  expect(Number.isNaN(parsedIndex)).toBe(true);
});
