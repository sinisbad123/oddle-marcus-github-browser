import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the addressing of Oddle devs', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>This project is made for Oddle and its developers and testers only</section>
      )
    ).toBe(true);
  });
});
