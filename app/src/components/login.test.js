import React from 'react';
import { render } from '@testing-library/react';
//import chai, { expect } from 'chai';
import Login from './login';
import { configure, shallow, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Start Game/i);
  expect(linkElement).toBeInTheDocument();
});

