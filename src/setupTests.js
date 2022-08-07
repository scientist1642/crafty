import { setupServer } from 'msw/node';
import { handlers } from './tests/utils';
import { setLogger } from '';
import 'whatwg-fetch';
global.XMLHttpRequest = require('xmlhttprequest');
import { cleanup } from '@testing-library/react-native';
//import '@testing-library/jest-dom/extend-expect';

//import 'react-native-gesture-handler/jestSetup';

/*import fetch, { Headers } from 'node-fetch';
global.fetch = fetch;
global.Headers = Headers;*/

export const server = setupServer(...handlers);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  //cleanup();
});
//afterEach(cleanup);
// Clean up after the tests are finished.
afterAll(() => server.close());
