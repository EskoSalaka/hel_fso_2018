import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
import blogService from './services/blogs';
jest.mock('./services/blogs');

describe.only('<App />', () => {
  let app;

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it('only login form is rendered', () => {
      app.update();

      expect(app.find('LoginForm').length).toEqual(1);
      expect(app.find('Blogs').get(0)).toBeFalsy();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it('all 3 blogs are rendered', () => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      };

      localStorage.setItem('loggedInUser', JSON.stringify(user));
      app.setState({
        username: '',
        password: '',
        loggedinUsername: user.username,
        user: user.token,
        success: 'Logged in'
      });

      app.update();

      expect(app.find('LoginForm').get(0)).toBeFalsy();
      expect(app.find('Blog').length).toEqual(3);
    });
  });
});
