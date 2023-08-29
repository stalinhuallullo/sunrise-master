import { Layout } from 'components/Layout'
import UploadHistory from 'components/children/uploadhistory/UploadHistory'
import { withSessionSsr } from 'lib/withSession'
import { User } from 'interfaces/userFromSunlight'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { getActualPath } from 'utils/component-utils/actualURLRoute'

const HOTJAR_APP_ID = Number(
  String(process.env.NEXT_PUBLIC_HOTJAR_ID)
) as number
const HOTJAR_APP_SV = Number(
  String(process.env.NEXT_PUBLIC_HOTJAR_SV)
) as number

interface Props {
  user: User
}

const UploadMembersDinamic = ({ user }: Props): JSX.Element => {
  const router = useRouter()

  const { setUserDataSession } = useUserInfoGlobalContent()

  useEffect(() => {
    hotjar.initialize(HOTJAR_APP_ID, HOTJAR_APP_SV)
  }, [])

  useEffect(() => {
    const groupNameByRoute = getActualPath(router)
    const userNotAdmin: boolean | undefined = user.groups?.some(
      (userGroup) => userGroup.name.trim() !== groupNameByRoute.trim()
    )

    if (userNotAdmin) {
      message.warning(
        'You are not an administrator of this group ' + groupNameByRoute
      )
      router.push('/')
    }

    setUserDataSession(user)
  }, [router, setUserDataSession, user])

  return (
    <Layout>
      <UploadHistory type='' />
    </Layout>
  )
}

export default UploadMembersDinamic

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
