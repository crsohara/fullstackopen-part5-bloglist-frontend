import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

  test('Event is fired twice when button is pressed twice', () => {

    const onClick = jest.fn()
    const blog = {
      title: 'Nemesis games',
      author: 'James S.A. Corey',
      likes: '27',
    }

    const component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(onClick.mock.calls.length).toBe(2)
  })


})
