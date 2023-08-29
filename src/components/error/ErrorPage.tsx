import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { Fragment } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

type PropsErrorPage = {
  urlRedirect?: string
  loggedIn?: Boolean
}

const ErrorPage = ({
  urlRedirect = '',
  loggedIn
}: PropsErrorPage): JSX.Element => {
  const { t } = useTranslation()

  const errorComponent = (
    title: string,
    buttonText: string,
    icon: JSX.Element
  ): JSX.Element => {
    return (
      <Fragment>
        <div className='s-parent-error-container'>
          <div className='s-child-error-container'>
            <p className='s-error-title'>{title}</p>
            <Link href={urlRedirect} passHref>
              {loggedIn ? (
                <div className='s-button-return'>
                  {icon}
                  <p>{buttonText}</p>
                </div>
              ) : (
                <div className='s-button-return'>
                  <p>{buttonText}</p>
                  {icon}
                </div>
              )}
            </Link>
          </div>
        </div>
      </Fragment>
    )
  }

  return loggedIn
    ? errorComponent(t('common:wrong-url'), 'Back to Home', <IoIosArrowBack />)
    : errorComponent(
        t('common:session-expired'),
        'Log In',
        <IoIosArrowForward />
      )
}

export default ErrorPage
