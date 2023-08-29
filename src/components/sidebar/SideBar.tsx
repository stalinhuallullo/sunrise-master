import { Fragment } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import ListOfGroups from './listofgroups/ListOfGroups'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { UserGroups } from 'interfaces/userFromSunlight'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import HelpSide from './helpside/HelpSide'
import { sunlightMembersURL } from '@utils/component-utils/sunlightMembersURL'

const SideBar = (): JSX.Element => {
  const router = useRouter()
  const { asPath } = router

  const { t } = useTranslation()

  const { userDataSession } = useUserInfoGlobalContent()
  const groupsData: UserGroups[] = userDataSession.groups!

  return (
    <Fragment>
      <div className='s-sidebargroups'>
        <div className='s-sidebargroup'>
          <div className='s-backtos'>
            <div className='iconbacktos'>
              <IoIosArrowBack />
            </div>
            <Link href={sunlightMembersURL(groupsData)} passHref>
              <div className='s-textbacktos'>
                {t('sidebar:back-to-sunlight')}
              </div>
            </Link>
            <div></div>
          </div>
          <div className='s-titlesidebar'>
            <div className='s-texttitles'>{t('common:upload-members')}</div>
          </div>
          <ListOfGroups groups={groupsData} location={asPath} />
        </div>
        <HelpSide />
      </div>
    </Fragment>
  )
}

export default SideBar
