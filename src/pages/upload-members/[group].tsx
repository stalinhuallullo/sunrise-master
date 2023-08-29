import { useEffect, useState } from 'react'

import { MyGlobalContext } from 'interfaces/members-context'

import { Layout } from 'components/Layout'
import BoxToDrag from 'components/children/boxtodrag/BoxToDrag'
import TableMembers from 'components/children/tablemembers/TableMembers'
import { BasicInfoFile } from 'interfaces/boxToDrag-interface'

import { withSessionSsr } from 'lib/withSession'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import { User } from 'interfaces/userFromSunlight'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { getActualPath } from '@utils/component-utils/actualURLRoute'

interface Props {
  user: User
}

const UploadMembersDinamic = ({ user }: Props): JSX.Element => {
  const [arrayMembers, setArrayMembers] = useState<BasicInfoFile>({
    newData: [],
    filename: ''
  })
  const router = useRouter()

  const { setUserDataSession } = useUserInfoGlobalContent()

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
    <MyGlobalContext.Provider value={{ arrayMembers, setArrayMembers }}>
      <Layout>
        {arrayMembers.newData.length !== 0 ? <TableMembers /> : <BoxToDrag />}
      </Layout>
    </MyGlobalContext.Provider>
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
