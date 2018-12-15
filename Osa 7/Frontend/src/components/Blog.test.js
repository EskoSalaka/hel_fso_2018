import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe.only('<Blog />', () => {
  const blog = {
    likes: 10,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'www.microsoft.com'
  };

  const mockAddLikeHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  let blogComponent;
  let hiddenStuff;
  let titleLine;

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} />);
  });

  it('default renders only title and author of Blog', () => {
    titleLine = blogComponent
      .find('BlogTitle')
      .shallow()
      .find('.titleLine');

    hiddenStuff = blogComponent.find('HiddenLines');

    expect(titleLine.text()).toContain(blog.title);
    expect(titleLine.text()).toContain(blog.author);
    expect(hiddenStuff.get(0)).toBeFalsy();
  });

  it('hidden lines will show after pressing the title', () => {
    titleLine = blogComponent
      .find('BlogTitle')
      .shallow()
      .find('.titleLine');

    titleLine.at(0).simulate('click');

    hiddenStuff = blogComponent.find('HiddenLines');

    expect(titleLine.text()).toContain(blog.title);
    expect(titleLine.text()).toContain(blog.author);
    expect(hiddenStuff.get(0)).not.toBeFalsy();

    hiddenStuff = hiddenStuff.shallow();
    expect(hiddenStuff.text()).toContain(blog.likes);
    expect(hiddenStuff.text()).toContain(blog.url);
  });
});
