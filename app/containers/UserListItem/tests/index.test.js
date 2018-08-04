/**
 * Test the repo list item
 */

import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'components/ListItem';
import UserListItem from '../UserListItem';

describe.only('<UserListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'sinisbad123'
      },
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(<UserListItem item={item} />);
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });
});
