import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import App from './App.jsx';


it('App renders without crashing', () => {
 shallow(<App />);
});

it('Renders a styled component', () => {
  const component = shallow(<App />);
  component.setState({
    items: [{id: 20, name: 'Test Testing', imgObjects: [{id: 12, name: 'test', photo: 'aws.s3'}]}],
    position: 0,
    direction: 'next',
    sliding: false,
    isHovering: false,
  });
  expect(component.exists('AppDisplay')).toBe(true)
});

