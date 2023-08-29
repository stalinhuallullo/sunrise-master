import { Fragment } from 'react'
import { RiFileSearchFill } from 'react-icons/ri'
import useTranslation from 'next-translate/useTranslation'

const Empty = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <div className='s-box-v2'>
        <div className='s-empty-history'>
          <div className='s-icon-empty-history'>
            <RiFileSearchFill />
          </div>
          <p>{t('uploadmembers:empty-history-1')}</p>
          <p>{t('uploadmembers:empty-history-2')}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default Empty
