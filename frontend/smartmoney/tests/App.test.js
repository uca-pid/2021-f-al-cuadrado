import Landing from "../src/components/landing/Landing";
import { mount } from 'enzyme';
import React from 'react';

test('01 - Test', () => {
  const langing = mount(<Landing/>);
  console.log(langing.layout)
});