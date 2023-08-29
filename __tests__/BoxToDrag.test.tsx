import { RouterContext } from 'next/dist/shared/lib/router-context'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DraggerProps } from 'antd/lib/upload'
import { createMockRouter } from '@utils/test-utils/createMockRouter'
import BoxToDrag from '@components/children/boxtodrag/BoxToDrag'

const elementRenderer = ({ onUploadComplete = () => {} }) => (
  <RouterContext.Provider
    value={createMockRouter({
      query: { group: 'figma' },
      pathname: '/upload-members/figma'
    })}>
    <BoxToDrag onUploadComplete={onUploadComplete} />
  </RouterContext.Provider>
)

jest.mock('antd', () => {
  const antd = jest.requireActual('antd')
  const { Upload } = antd
  const { Dragger } = Upload

  const MockedDragger = (props: DraggerProps) => {
    return (
      <Dragger
        {...props}
        customRequest={({ onSuccess }: any) => {
          setTimeout(() => {
            onSuccess('ok')
          }, 0)
        }}
      />
    )
  }

  return { ...antd, Upload: { ...Upload, Dragger: MockedDragger } }
})

describe('Unit Test Component: <BoxToDrag />', () => {
  it('renders', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { group: 'figma' },
          pathname: '/upload-members/figma'
        })}>
        <BoxToDrag />
      </RouterContext.Provider>
    )

    const inputFile = await waitFor(() =>
      screen.findByTestId('input-file-data-csv')
    )

    expect(inputFile).toBeInTheDocument()
  })

  it('should completes the file upload', async () => {
    const onUploadComplete = jest.fn()

    const membersCSV = `Name,Cohort,Email Address,Manager's Email Address,Skillset,Budget
    Brandon Barnts,Software Engineering,bbarnts@test.com,sachar@test.com,Head of Marketing,350`

    render(elementRenderer({ onUploadComplete }))

    const file = new File([membersCSV], 'members.csv', { type: 'binary' })

    const uploadDragger = await waitFor(() =>
      screen.findByTestId('input-file-data-csv')
    )

    userEvent.upload(uploadDragger, file)

    await waitFor(() => {
      expect(onUploadComplete).toHaveBeenCalled()
    })
  })
})
