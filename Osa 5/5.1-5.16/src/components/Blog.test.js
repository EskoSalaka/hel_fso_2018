import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe.only('<Blog />', () => {
  const blog = {
    likes: 10,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code'
  };

  const mockAddLikeHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  let blogComponent;

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} />);
  });

  it('default renders only title and author of Blog', () => {
    const titleLine = blogComponent
      .find('BlogTitle')
      .dive()
      .find('.titleLine');
    const hiddenStuff = blogComponent.find('.togglableContent');
    console.log(titleLine.debug());

    expect(titleLine.text()).toContain(blog.title);
  });
});
