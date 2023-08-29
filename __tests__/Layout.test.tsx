import { render } from '@testing-library/react'
import { createMockRouter } from '@utils/test-utils/createMockRouter'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { Layout } from '@components/Layout'

describe('Layout', () => {
  it('should renders Layout ok', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { group: 'figma' },
          pathname: '/upload-members/figma'
        })}>
        <Layout></Layout>
      </RouterContext.Provider>
    )
    expect(true).toBe(true)
  })
})
