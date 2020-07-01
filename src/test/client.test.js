import { app } from '../client/js/app';

describe('app function', () => {
  test('It should be a function', () => {
    expect(typeof app).toBe('function');
  });
});