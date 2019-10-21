import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import styled from 'styled-components';
import axios from 'axios';
import moxios from 'moxios';
import { getMoxiosItem } from '../__mock__/http.js';


beforeEach(() => {
  moxios.install(axios.create({
    baseURL: 'mongodb://localhost'
  }))
})

afterEach(() => {
  moxios.uninstall(axios.create({
    baseURL: 'mongodb://localhost'
  }))
})

describe('App rendering', () => {
  it('App renders without crashing', () => {
  shallow(<App />);
  })

  it('renders one <AppDisplay/> component', () => {
    const component = shallow(<App />);
    expect(component.find("AppDisplay")).toHaveLength(1);
  })

  it('renders one <Header/> component', () => {
    const component = shallow(<App />);
    expect(component.find("Header")).toHaveLength(1);
  })

  it('Both <ButtonLeft/> and <ButtonRight/> are rendering when isHovering is true', () => {
    const component = shallow(<App />);
    component.setState({isHovering: true});
    expect(component.find("ButtonLeft")).toHaveLength(1);
    expect(component.find("ButtonRight")).toHaveLength(1);
  })

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
  })

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
});


describe('App state', () => {
  it('isHovering state changes on mouseEnter and mouseLeave', () => {
    const component = shallow(<App />);
    expect(component.state("isHovering")).toBe(false);
    component.find("Wrapper").simulate("mouseenter");
    expect(component.state("isHovering")).toBe(true);
    component.find("Wrapper").simulate("mouseleave");
    expect(component.state("isHovering")).toBe(false);
  })

  it('sliding state becomes true when ButtonLeft is clicked', () => {
    const component = shallow(<App />);
    component.setState({isHovering: true});
    expect(component.state("sliding")).toBe(false);

    component.find("ButtonLeft").simulate("click");
    expect(component.state("sliding")).toBe(true);
  })

  it('sliding state becomes true when ButtonRight is clicked', () => {
    const component = shallow(<App />);
    component.setState({isHovering: true});
    expect(component.state("sliding")).toBe(false);

    component.find("ButtonRight").simulate("click");
    expect(component.state("sliding")).toBe(true);
  })
});

describe('Button Clicks', () => {
  it('previousImage handler is invoked when ButtonLeft is clicked', () => {
    const mockFn = jest.fn();
    App.prototype.previousImage = mockFn;

    const component = shallow(<App />);
    component.setState({isHovering: true});

    component.find("ButtonLeft").simulate("click");
    expect(mockFn.mock.calls.length).toBe(1);
    component.find("ButtonLeft").simulate("click");
    expect(mockFn.mock.calls.length).toBe(2);
  })

  it('nextImage handler is invoked when ButtonRight is clicked', () => {
    const mockFn = jest.fn();
    App.prototype.nextImage = mockFn;

    const component = shallow(<App />);
    component.setState({isHovering: true});

    component.find("ButtonRight").simulate("click");
    expect(mockFn.mock.calls.length).toBe(1);
    component.find("ButtonRight").simulate("click");
    expect(mockFn.mock.calls.length).toBe(2);
  })
});

describe('Component Props', () => {
  it('ImageView component has property "direction"', () => {
    const component = shallow(<App />);
    const view = component.find("ImageView")
    expect(view.props().direction).toEqual('next');
    expect(view.props().direction).not.toEqual('testing');
  })

  it('ImageView component has property "sliding"', () => {
    const component = shallow(<App />);
    const view = component.find("ImageView")
    expect(view.props().sliding).toEqual(false);
    expect(view.props().sliding).not.toEqual(true);
  })

  it('All <Photo/> components have an order property', () => {
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
    const photo1 = component.find("Photo").at(0);
    const photo2 = component.find("Photo").at(1);
    const photo3 = component.find("Photo").at(2);
    expect(photo1.props().order).toEqual(0);
    expect(photo2.props().order).toEqual(1);
    expect(photo3.props().order).toEqual(2);
    expect(photo1.props().order).not.toEqual(1);
    expect(photo2.props().order).not.toEqual(2);
    expect(photo3.props().order).not.toEqual(3);
  })

  it('All <Image/> components have an src property', () => {
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
    const image1 = component.find("Image").at(0);
    const image2 = component.find("Image").at(1);
    const image3 = component.find("Image").at(2);
    expect(image1.props().src).toEqual("https://fec-project-photos.s3.us-east-2.amazonaws.com/image75.jpg");
    expect(image2.props().src).toEqual("https://fec-project-photos.s3.us-east-2.amazonaws.com/image35.jpg");
    expect(image3.props().src).toEqual("https://fec-project-photos.s3.us-east-2.amazonaws.com/image60.jpg");
    expect(image1.props().src).not.toEqual('test');
    expect(image2.props().src).not.toEqual('test');
    expect(image3.props().src).not.toEqual('test');
  })

  it('All <Text/> components have the passed in text value from items list', () => {
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
    const text1 = component.find("Text").at(0);
    const text2 = component.find("Text").at(1);
    const text3 = component.find("Text").at(2);
    expect(text1.text()).toEqual("Handmade Soft Tuna");
    expect(text2.text()).toEqual("Gorgeous Rubber Pants");
    expect(text3.text()).toEqual("Rustic Cotton Cheese");
    expect(text1.text()).not.toEqual('test');
    expect(text2.text()).not.toEqual('test');
    expect(text3.text()).not.toEqual('test');
  })
});


describe('Testing Component Mount', () => {

  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const component = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
  })

  it('makes an axios get request to the database on mount', () => {
    const getRequestSpy = jest.spyOn(axios, 'get')
    const component = shallow(<App />)
    expect(getRequestSpy).toBeCalled();
  })

})

describe('moxios', () => {
  it('test get', async () => {
    const expectedItem = {
      "imgObjects": [
          {
              "id": 10,
              "name": "Awesome Wooden Keyboard",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image10.jpg"
          },
          {
              "id": 37,
              "name": "Unbranded Fresh Towels",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image37.jpg"
          },
          {
              "id": 22,
              "name": "Ergonomic Plastic Bacon",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image22.jpg"
          },
          {
              "id": 62,
              "name": "Tasty Fresh Mouse",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image62.jpg"
          },
          {
              "id": 97,
              "name": "Handcrafted Granite Mouse",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image97.jpg"
          },
          {
              "id": 95,
              "name": "Licensed Metal Bike",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image95.jpg"
          },
          {
              "id": 85,
              "name": "Sleek Wooden Tuna",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image85.jpg"
          },
          {
              "id": 6,
              "name": "Handmade Plastic Salad",
              "photo": "https://fec-project-photos.s3.us-east-2.amazonaws.com/image6.jpg"
          }
      ],
      "_id": "5dad0822c8d7906c2220d952",
      "id": 1,
      "__v": 0
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({ status: 200, response: expectedItem })
    })
    const result = await getMoxiosItem(1)
    console.log(result)
    expect(result).toEqual(expectedItem)
  })
})