import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '@utils/test-utils/createMockRouter'
import UploadMembers from '@components/heading/HeadingUploadMembers'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    }
  }
}))

describe('HeadingUploadMembers component', () => {
  it('It should renders HeadingUploadMembers component', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { group: 'figma' },
          asPath: '/upload-members/figma'
        })}>
        <UploadMembers type='hola' />
      </RouterContext.Provider>
    )
    expect(true).toBe(true)
  })
})
