import React from 'react'
import { mount } from 'enzyme'
import LocalInfo from '../LocalInfo'

const body = `
  <h2>Section 1</h2>
  <p>Paragraph 1 in Section 1</p>
  <p>Paragraph 2 in Section 1</p>
  <h2>Section 2</h2>
  <p>Paragraph 1 in Section 2</p>
  <h2>Section 3</h2>
  <p>Paragraph 1 in Section 3 <a href="/test">Test Link</a></p>
`

describe('ui/shared/components/SeoContent/LocalInfo', () => {
  it('splits content into correct number of sections', () => {
    const wrapper = mount(<LocalInfo body={body} />)
    const sections = wrapper.find('CollapsibleSection')
    expect(sections.length).toBe(3)
  })

  it('contains correct section and paragraph content', () => {
    const wrapper = mount(<LocalInfo body={body} />)
    const section = wrapper.find('CollapsibleSection').at(1)
    expect(section.find('h2').text()).toBe('Section 2')
    expect(section.render().find('p').text()).toBe('Paragraph 1 in Section 2')
  })

  it('contains multiple paragraphs', () => {
    const wrapper = mount(<LocalInfo body={body} />)
    const section = wrapper.find('CollapsibleSection').at(0)
    const paragraphs = section.render().find('p')
    expect(paragraphs.length).toBe(2)
    expect(paragraphs.first().text()).toBe('Paragraph 1 in Section 1')
    expect(paragraphs.next().text()).toBe('Paragraph 2 in Section 1')
  })

  it('sets tagging for embedded links', () => {
    const wrapper = mount(<LocalInfo body={body} />)
    const section = wrapper.find('CollapsibleSection').at(2)
    const links = section.render().find('a')
    expect(links.first().attr('data-tag_item')).toBe('link')
  })
})
