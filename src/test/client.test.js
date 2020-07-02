//import { app } from '../client/js/app';
import { updateUi } from '../client/js/Ui';
describe('app function', () => {
  test('It should be a function', () => {
      expect( typeof updateUi ).toBe( 'function' );
  });
});  