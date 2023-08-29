import ErrorPage from '@components/error/ErrorPage'

const Custom404 = (): JSX.Element => {
  return <ErrorPage urlRedirect={process.env.urlSunrise} loggedIn={true} />
}

export default Custom404
