import ErrorPage from '@components/error/ErrorPage'

const Custom500 = (): JSX.Element => {
  return <ErrorPage urlRedirect={process.env.urlSunlight} loggedIn={false} />
}

export default Custom500
