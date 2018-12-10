import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
  const blog = {
    likes: 10,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code'
  };

  it('renders title, author and likes', () => {
    const sblogComponent = shallow(<SimpleBlog blog={blog} />);
    const titleauthor = sblogComponent.find('.titleauthor');
    const likes = sblogComponent.find('.likes');

    expect(titleauthor.text()).toContain(blog.title);
    expect(titleauthor.text()).toContain(blog.author);
    expect(likes.text()).toContain(blog.likes);
  });

  it('clicking the like button twice calls event handler twice', () => {
    const mockHandler = jest.fn();

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const likeButton = blogComponent.find('button');
    likeButton.simulate('click');
    likeButton.simulate('click');

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
