import ErrorPage from '@components/error/ErrorPage'

function Error() {
  return <ErrorPage urlRedirect={process.env.urlSunlight} loggedIn={false} />
}

export default Error
