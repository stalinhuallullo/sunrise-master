import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../src/utils/test-utils/createMockRouter'
import SideBar from '../src/components/heading/MenuBar'

describe('HeadingUploadMembers component', () => {
  it('It should renders HeadingUploadMembers component', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { group: 'figma' },
          asPath: '/upload-members/figma'
        })}>
        <SideBar />
      </RouterContext.Provider>
    )
    expect(true).toBe(true)
  })
})
