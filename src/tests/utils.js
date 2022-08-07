import { render } from '@testing-library/react-native';

import { rest } from 'msw';
import * as React from 'react';
import { assetsPage1 } from './mockObjects';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//console.log(assetsPage1);
export const handlers = [
  rest.get('*/assets', (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    return res(ctx.status(200), ctx.json(assetsPage1));
  }),
  rest.post('*/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Chuck Norris',
      })
    );
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );
}
