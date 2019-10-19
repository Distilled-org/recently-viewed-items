import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import App from './App.jsx';
import axios from 'axios';
import moxios from 'moxios';

describe('App rendering', () => {
  it('App renders without crashing', () => {
  shallow(<App />);
  });

  it('renders one <AppDisplay/> component', () => {
    const component = shallow(<App />);
    expect(component.find("AppDisplay")).toHaveLength(1);
  });

  it('renders one <Header/> component', () => {
    const component = shallow(<App />);
    expect(component.find("Header")).toHaveLength(1);
  });

  it('ImageView renders if state contains items', () => {
    const component = shallow(<App />);
    component.setState({
      items: [{
          "id": 75,
          "name": "Handmade Soft Tuna",
          "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image75.jpg"
      },
      {
          "id": 35,
          "name": "Gorgeous Rubber Pants",
          "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image35.jpg"
      }]
    })
    expect(component.find("ImageView")).toHaveLength(1);
  });

  it('renders one <Photo/>, <Text/> and <Image/> component for each item passed to state from data', () => {
    const component = shallow(<App />);
    component.setState({
      items: [{
          "id": 75,
          "name": "Handmade Soft Tuna",
          "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image75.jpg"
      },
      {
          "id": 35,
          "name": "Gorgeous Rubber Pants",
          "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image35.jpg"
      },
      {
          "id": 60,
          "name": "Rustic Cotton Cheese",
          "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image60.jpg"
      }]
    })
    expect(component.find("Photo")).toHaveLength(3);
    expect(component.find("Text")).toHaveLength(3);
    expect(component.find("Image")).toHaveLength(3);
  })


// it('Renders a styled component', () => {
//   const component = shallow(<App />);
//   component.setState({
//     items: [{
//       id: 10,
//       imgObjects: [{id: 20, name: 'Test Testing', photo: `https://fec-project-photos.s3.us-east-2.amazonaws.com/image20.jpg`}]
//     }],
//     position: 0,
//     direction: 'next',
//     sliding: false,
//     isHovering: false,
//   });
//   expect(component.exists('AppDisplay')).toBe(true)
//   expect(component.exists('Info_Bar')).toBe(true)
// });

// check for state change of .isHovering on mouse over
// check for the array length - 1 to be the same as the number of Photo renders
// check that Text actually display's the image.name property
// check that Image src property is the same as the url



});