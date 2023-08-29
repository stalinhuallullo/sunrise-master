import patterns from '@utils/data-utils/patternRegex'
import { sorter } from './sorter'
/* eslint-disable no-useless-escape */

export interface ColumnsData {
  title?: string
  dataIndex?: string
  key?: string
  width?: number
  sorter?: any
  multiple?: any
  render?: any
}

export const columns: ColumnsData[] = [
  {
    title: 'NAME',
    dataIndex: 'Name',
    key: 'Name',
    width: 130,
    sorter: (a: any, b: any) => sorter(a.Name, b.Name),
    multiple: 1
  },
  {
    title: 'COHORT',
    dataIndex: 'Cohort',
    key: 'Cohort',
    render: (cohorts: string) => {
      if (cohorts === undefined || cohorts === '') {
        return cohorts
      } else if (cohorts !== undefined && cohorts.split('::').length > 1) {
        const arrayCohort = cohorts.split('::')
        let countBad = 0
        arrayCohort.forEach((cohort) => {
          if (cohort.includes(':') && cohort.split(':').length > 2) {
            countBad++
          }
          if (!cohort.includes(':') && !patterns.invalidString.test(cohort)) {
            countBad++
          }
        })
        return countBad > 0 ? (
          <p style={{ color: 'red' }}>{cohorts}</p>
        ) : (
          cohorts
        )
      } else if (
        cohorts.split(',').length < 2 &&
        !patterns.invalidString.test(cohorts)
      ) {
        return <p style={{ color: 'red' }}>{cohorts}</p>
      } else {
        return cohorts
      }
    },
    width: 130,
    sorter: (a: any, b: any) => sorter(a.Cohort, b.Cohort),
    multiple: 2
  },
  {
    title: 'EMAIL ADDRESS',
    dataIndex: 'Email Address', // excel name column
    key: 'Email Address',
    render: (email: string) => {
      if (!patterns.invalidEmail.test(email)) {
        return <p style={{ color: 'red' }}>{email}</p>
      }
      return email
    },
    width: 170,
    sorter: (a: any, b: any) => sorter(a['Email Address'], b['Email Address']),
    multiple: 3
  },
  {
    title: "MANAGER'S EMAIL ADDRESS",
    dataIndex: 'Managers Email Address', // excel name column
    key: "Manager's Email Address",
    width: 170,
    sorter: (a: any, b: any) =>
      sorter(a['Managers Email Address'], b['Managers Email Address']),
    multiple: 4,
    render: (manager: string) => {
      if (manager === undefined || manager === '') {
        return manager
      } else if (manager !== undefined && manager.split('::').length > 1) {
        const arrayEmail = manager.split('::')
        let countBad = 0
        arrayEmail.forEach((email) => {
          if (!patterns.invalidEmail.test(email)) {
            countBad++
          }
        })
        return countBad > 0 ? (
          <p style={{ color: 'red' }}>{manager}</p>
        ) : (
          manager
        )
      } else if (
        manager.split('::').length < 2 &&
        !patterns.invalidEmail.test(manager)
      ) {
        return <p style={{ color: 'red' }}>{manager}</p>
      } else {
        return manager
      }
    }
  },
  {
    title: 'SKILLSET',
    dataIndex: 'Skillset',
    key: 'Skillset',
    width: 130,
    sorter: (a: any, b: any) => sorter(a.Skillset, b.Skillset),
    multiple: 5
  },
  {
    title: 'BUDGET',
    dataIndex: 'Budget',
    key: 'Budget',
    render: (budget: string) => {
      if (!patterns.invalidBudget.test(budget)) {
        return <p style={{ color: 'red' }}>{budget}</p>
      }
      return budget
    },
    width: 50,
    sorter: (a: any, b: any) => sorter(a.Budget, b.Budget),
    multiple: 7
  }
]

export function onChangeData(
  pagination: any,
  filters: any,
  sorter: any,
  extra: any
) {
  return 1
}
