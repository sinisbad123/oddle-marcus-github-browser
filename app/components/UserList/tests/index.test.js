import { shallow, mount } from 'enzyme';
import React from 'react';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import UserList from '../index';

describe('<UserList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<UserList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <UserList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should not render any items if something was not found', () => {
    const renderedComponent = shallow(
      <UserList userList={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
