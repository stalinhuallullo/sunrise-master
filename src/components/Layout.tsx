import SideBar from './sidebar/SideBar'
import HeadingUploadMembers from './heading/HeadingUploadMembers'

export const Layout = ({
  children
}: {
  children?: JSX.Element | JSX.Element[]
}) => {
  return (
    <div className='parent-body'>
      <SideBar />
      <div className='main-content'>
        <HeadingUploadMembers />
        <main className='s-boxtodrag'>{children}</main>
      </div>
    </div>
  )
}
