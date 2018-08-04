import { shallow, mount } from 'enzyme';
import React from 'react';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ReposList from '../index';

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<ReposList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <ReposList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should not render any items if something was not found', () => {
    const renderedComponent = shallow(
      <ReposList repos={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
