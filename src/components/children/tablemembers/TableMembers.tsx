import { Fragment, useEffect, useState } from 'react'
import { Table } from 'antd'
import { useGlobalContext } from 'interfaces/members-context'
import { columns, onChangeData } from 'utils/component-utils/tableColumns'
import useTranslation from 'next-translate/useTranslation'
import ModalConfirm from '../modals/ModalConfirm'
import { useRouter } from 'next/router'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import { uploadMembers } from '@utils/data-utils/submitData'
import ErrorMessageBar from './ErrorMessageBar'
import TableMembersControls from './TableMembersControls'

import {
  validateDuplicateEmails,
  validateDuplicateManagerEmail,
  validateHeaders,
  validateRows
} from '@utils/data-utils/validateTable'

const TableMembers = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [arrayBadHeaders, setArrayBadHeaders] = useState<string[]>([])
  const [arrayGoodHeaders, setArrayGoodHeaders] = useState<string[]>([])
  const [arrayDuplicateEmails, setArrayDuplicateEmails] = useState<string[]>([])
  const [badRowFormat, setBadRowFormat] = useState<string[]>([])
  const [arrayDuplicateManagerEmail, setArrayDuplicateManagerEmail] = useState<
    string[]
  >([])

  const { asPath } = useRouter()
  const actualRoute: string = asPath.split('/')[2]

  // User Info
  const { userDataSession } = useUserInfoGlobalContent()

  const showModal = () => setIsPopUpVisible(true)

  const { arrayMembers, setArrayMembers } = useGlobalContext()

  useEffect(() => {
    validateHeaders(arrayMembers, setArrayBadHeaders, setArrayGoodHeaders)
    validateRows(arrayMembers, setBadRowFormat)
    validateDuplicateManagerEmail(arrayMembers, setArrayDuplicateManagerEmail)
    validateDuplicateEmails(arrayMembers, setArrayDuplicateEmails)
  }, [arrayMembers])

  async function submitMembers() {
    showModal()
    await uploadMembers(userDataSession, arrayMembers, asPath)
    setIsPopUpVisible(false)
    router.push(`/history/${actualRoute}`)
  }

  function goBackBox() {
    router.reload()
  }

  function cleanMembers() {
    setArrayMembers({ newData: [], filename: '' })
  }

  function isThereAnError(): Boolean {
    return (
      badRowFormat.length > 0 ||
      arrayBadHeaders.length > 0 ||
      arrayDuplicateManagerEmail.length > 0 ||
      arrayDuplicateEmails.length > 0
    )
  }

  return (
    <Fragment>
      <div className='s-box-table'>
        {!isThereAnError() && (
          <article className='s-message-preview'>
            <p>{t('uploadmembers:data-preview')}</p>
          </article>
        )}
        {isThereAnError() && (
          <ErrorMessageBar
            arrayBadHeaders={arrayBadHeaders}
            arrayGoodHeaders={arrayGoodHeaders}
            arrayDuplicateManagerEmail={arrayDuplicateManagerEmail}
            arrayDuplicateEmails={arrayDuplicateEmails}
            badRowFormat={badRowFormat}
          />
        )}
        <Table
          showHeader={true}
          scroll={{ x: 600 }}
          pagination={{ pageSizeOptions: [10, 20, 50] }}
          dataSource={arrayMembers.newData}
          columns={columns}
          onChange={onChangeData}
          footer={() => (
            <TableMembersControls
              validateError={isThereAnError}
              submitMembers={submitMembers}
              cleanMembers={cleanMembers}
              tryAgain={goBackBox}
            />
          )}
        />
      </div>

      <ModalConfirm
        isModalVisible={isPopUpVisible}
        setIsModalVisible={setIsPopUpVisible}
      />

      {/* <ModalInfo
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      /> */}
    </Fragment>
  )
}

export default TableMembers
