import { render, screen, waitFor } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '@utils/test-utils/createMockRouter'
import TableMembers from '@components/children/tablemembers/TableMembers'
import { mocked } from 'jest-mock'
import { Table } from 'antd'
import { BasicInfoFile } from 'interfaces/boxToDrag-interface'
import { GlobalContent, MyGlobalContext } from 'interfaces/members-context'
// import { onChangeData } from '@utils/columsData' another uses

const arrayMembers: BasicInfoFile = {
  filename: 'NewFile',
  newData: [
    {
      Name: 'Swati Achar',
      Cohort: 'Software Engineering',
      'Email Address': 'sachar@test.com',
      'Managers Email Address': 'wgage@test.com',
      Skillset: 'Managing Director',
      Budget: 350,
      key: 2
    }
  ]
}

export const contextData: GlobalContent = {
  arrayMembers: arrayMembers,
  setArrayMembers: () => {}
}

jest.mock('antd', () => ({
  Table: jest.fn(() => <div>Table</div>),
  Modal: jest.fn(() => <div>Modal</div>),
  Collapse: jest.fn(() => <div>Collapse</div>)
}))

describe('Table Members', () => {
  const mockedTable = mocked(Table)

  it('should renders TableMembers ok', () => {
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

    render(
      <MyGlobalContext.Provider value={contextData}>
        <RouterContext.Provider
          value={createMockRouter({
            query: { group: 'figma' },
            pathname: '/upload-members/figma'
          })}>
          <TableMembers />
        </RouterContext.Provider>
      </MyGlobalContext.Provider>
    )

    waitFor(() => {
      expect(mockedTable).toHaveBeenCalledTimes(1)
      expect(mockedTable).toHaveBeenLastCalledWith(
        {
          scroll: { x: 600 },
          dataSource: arrayMembers.newData,
          columns: [
            expect.objectContaining({ title: 'NAME' }),
            expect.objectContaining({ title: 'COHORT' }),
            expect.objectContaining({ title: 'EMAIL ADDRESS' }),
            expect.objectContaining({ title: 'MANAGERS EMAIL ADDRESS' }),
            expect.objectContaining({ title: 'SKILLSET' }),
            expect.objectContaining({ title: 'BUDGET' })
          ]
        },
        {}
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
