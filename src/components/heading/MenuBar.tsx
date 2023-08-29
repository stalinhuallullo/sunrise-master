import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useUserInfoGlobalContent } from 'interfaces/userInfo-context'
import { UserGroups } from 'interfaces/userFromSunlight'
import ListOfGroups from '@components/sidebar/listofgroups/ListOfGroups'
import { IoIosArrowBack } from 'react-icons/io'
import HelpSide from '@components/sidebar/helpside/HelpSide'
import { sunlightMembersURL } from '@utils/component-utils/sunlightMembersURL'

const MenuBar = (): JSX.Element => {
  const { t } = useTranslation()

  const router = useRouter()
  const { asPath } = router

  const { userDataSession } = useUserInfoGlobalContent()
  const groupsData: UserGroups[] = userDataSession.groups!

  const [showMe, setShowMe] = useState(false)

  const toggle = () => {
    setShowMe(!showMe)
  }

  return (
    <>
      <article className='navbar-container'>
        <section onClick={toggle} className='navbar-containericon'>
          <GiHamburgerMenu />
        </section>
        <div
          className='link-menu'
          style={{ display: showMe ? 'block' : 'none' }}>
          <section>
            <Link href={sunlightMembersURL(groupsData)} passHref>
              <div className='s-menulistgroup'>
                <IoIosArrowBack /> <p> {t('sidebar:back-to-sunlight')}</p>
              </div>
            </Link>
          </section>

          <div className='s-divisor-menubar'>
            <p>Upload Members</p>
          </div>
          <section>
            <ListOfGroups groups={groupsData} location={asPath} />
          </section>
          <HelpSide />
        </div>
      </article>
    </>
  )
}
export default MenuBar
