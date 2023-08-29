import { Fragment } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IsActiveSection, validPath } from 'utils/component-utils/classLink'
import MenuBar from './MenuBar'

const HeadingUploadMembers = (): JSX.Element => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const actualRoute: string = asPath.split('/')[2]

  return (
    <Fragment>
      <MenuBar />
      <div className='s-titlepage'>
        <div className='s-texttitle'>{t('common:upload-members')}</div>
        <p className='s-paragraphtitle'>
          {t('uploadmembers:preview')}
          <br></br>
          {t('uploadmembers:file')}{' '}
        </p>
      </div>
      <div className='s-tabs'>
        <div
          data-testid='button-upload1'
          className={IsActiveSection(
            'upload-members',
            'active-tab',
            'no-active-tab',
            's-blocktabmember'
          )}>
          <Link href={'/upload-members/' + validPath(actualRoute)} passHref>
            <p>{t('uploadmembers:up-members')}</p>
          </Link>
        </div>
        <div
          data-testid='button-upload2'
          className={IsActiveSection(
            'history',
            'active-tab',
            'no-active-tab',
            's-blocktabmember'
          )}>
          <Link href={'/history/' + validPath(actualRoute)} passHref>
            <p>{t('uploadmembers:up-history')}</p>
          </Link>
        </div>
        {/*  <span
          className={
            props.type === 'warning' ? 's-circlelight-notification' : 'hide'
          }>
          <BsCircleFill size={10} />
        </span> */}
        <section className='s-texttabempty'>
          <p>U</p>
        </section>
      </div>
    </Fragment>
  )
}

export default HeadingUploadMembers
