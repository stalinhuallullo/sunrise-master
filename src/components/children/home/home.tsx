import React, { Fragment } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { dataUrls } from '../../../../config/url'
import Link from 'next/link'

import { FaLayerGroup } from 'react-icons/fa'
import DownloadTemplate from '../boxtodrag/downloadtemplate/DownloadTemplate'
const Home = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className='s-box-v2'>
        <div className='s-welcome'>
          <div className='s-iconUpload'>
            <FaLayerGroup />
          </div>
          <p className='s-textclickhere'>{t('uploadmembers:welcome-text')}</p>
          <p className='s-textclickhere'>{t('uploadmembers:welcome-text2')}</p>
        </div>
      </div>
      <div className='s-box-footer'>
        <DownloadTemplate />
        <div className='s-textclickherrtod'>
          <Link href={dataUrls.URLs.guide} passHref>
            <p>{t('uploadmembers:guide')}</p>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}
export default Home
