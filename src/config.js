import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
import Promise from 'bluebird';
//import './wdyr';

if (__DEV__) {
  // replace global promise with Bluebird
  //global.Promise = Promise;
}

export { queryClient };
