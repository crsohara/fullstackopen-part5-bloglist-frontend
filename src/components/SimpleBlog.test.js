import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  test('Renders title, author, and likes', () => {

    const blog = {
      title: 'Nemesis games',
      author: 'James S.A. Corey',
      likes: '27',
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Nemesis games'
    )
    expect(component.container).toHaveTextContent(
      'James S.A. Corey'
    )
    expect(component.container).toHaveTextContent(
      '27'
    )

  })


})
