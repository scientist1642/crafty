import React from 'react';

import { render } from '@testing-library/react-native';

import AssetsScreen from '../AssetsScreen';
import { renderWithClient } from '../../tests/utils';

it('renders initial number of elements', async () => {
  renderWithClient(<AssetsScreen />);
});
