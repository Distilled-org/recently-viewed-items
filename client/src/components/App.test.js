import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import App from './App.jsx';


it('App renders without crashing', () => {
 shallow(<App />);
});
