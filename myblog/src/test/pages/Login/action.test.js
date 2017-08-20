import { startLogin } from '../../../../src/pages/Login/action.js';
import { LOGIN_STARTED } from '../../../../src/pages/Login/actionType.js';
describe('TopMenu', () => {
  it('should create an action to start login', () => {
    const action = startLogin();
    expect(action.type).toBe(LOGIN_STARTED);
  })
})
