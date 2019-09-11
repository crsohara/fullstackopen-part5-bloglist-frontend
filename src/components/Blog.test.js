import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('By default name and author are only details are shown', () => {

    const blog = {
      title: 'Nemesis games',
      author: 'James S.A. Corey',
      url: 'http://www.google.com',
      likes: '93',
      user: {
        username: 'jimbo',
        name: 'Donald Poirier'
      }
    }

    const user = {
      username: 'John'
    }

    const component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    )

    const blogName = component.container.querySelector('.blog__name')
    expect(blogName).toHaveTextContent(
      'Nemesis games James S.A. Corey'
    )

    const blogInfo = component.container.querySelector('.blog__info')
    expect(blogInfo).toHaveStyle('display: none')


  })

  test('Blog info is shown when blog post is clicked', () => {

    const blog = {
      title: 'Nemesis games',
      author: 'James S.A. Corey',
      url: 'http://www.google.com',
      likes: '93',
      user: {
        username: 'jimbo',
        name: 'Donald Poirier'
      }
    }

    const user = {
      username: 'John'
    }

    const component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    )

    const blogName = component.container.querySelector('.blog__name')
    fireEvent.click(blogName)

    const blogInfo = component.container.querySelector('.blog__info')
    expect(blogInfo).not.toHaveStyle('display: none')

    expect(blogInfo).toHaveTextContent('93 likes')
    expect(blogInfo).toHaveTextContent('Donald Poirier')

  })

})
