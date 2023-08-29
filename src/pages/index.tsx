import { Layout } from '../components/Layout'
import { withSessionSsr } from '../lib/withSession'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import { useEffect } from 'react'
import { User } from 'interfaces/userFromSunlight'
import Home from '@components/children/home/home'

interface Props {
  user: User
}

const InitialPage = ({ user }: Props): JSX.Element => {
  const { setUserDataSession } = useUserInfoGlobalContent()

  useEffect(() => {
    setUserDataSession(user)
  }, [setUserDataSession, user])

  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default InitialPage

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user

    if (!user) {
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      }
    }

    return {
      props: {
        user: user
      }
    }
  }
)
