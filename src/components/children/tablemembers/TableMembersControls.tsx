import useTranslation from 'next-translate/useTranslation'

import { Button } from 'antd'

const TableMembersControls = (props: {
  validateError: () => Boolean
  submitMembers: () => Promise<void>
  cleanMembers: () => void
  tryAgain: () => void
}): JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      {props.validateError() ? (
        <Button
          type='dashed'
          style={{ backgroundColor: '#e24045' }}
          onClick={props.tryAgain}>
          {t('uploadmembers:dont')}
        </Button>
      ) : (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button type='ghost' onClick={props.cleanMembers}>
            {t('uploadmembers:cancel')}
          </Button>
          <Button type='primary' onClick={props.submitMembers}>
            {t('uploadmembers:continue')}
          </Button>
        </div>
      )}
    </>
  )
}

export default TableMembersControls
