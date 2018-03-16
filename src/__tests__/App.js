import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it("renders create a cat form", ()=>{
  const app = mount(<App />)
  expect(app.find('.subtitle').text()).toEqual('Add a Cat')
})
it("links to cat index", ()=>{
  const app = mount(<App />)
  app.find('a#cats-link').simulate('click', {button: 0})
  expect(app.find('.subtitle').text()).toEqual('All the Cats')
})
