import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { dataUrls } from '../../../../config/url'

const HelpSide = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className='s-helpside'>
      <div className='s-texttitleneedhelp'>{t('sidebar:need-help')}</div>
      <Link href={dataUrls.URLs.sunlightsupport} passHref>
        <div className='s-textparagraphhelp'>
          {t('sidebar:contact-1')} {t('sidebar:contact-2')}
          {t('sidebar:contact-3')} {t('sidebar:contact-4')}
        </div>
      </Link>
    </div>
  )
}

export default HelpSide
