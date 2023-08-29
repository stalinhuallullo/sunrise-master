import { Fragment } from 'react'
import Link from 'next/link'
import { IsActive } from 'utils/component-utils/classLink'
import { UserGroups } from 'interfaces/userFromSunlight'

const ListOfGroups = (Props: {
  groups: UserGroups[]
  location: string
}): JSX.Element => {
  const actualRoute: string[] = Props.location.split('/')

  const locationRoute = (route: string[]): string => {
    if (route.length === 2) {
      return 'upload-members'
    }
    return `${actualRoute[1]}`
  }

  const itemLink = (item: UserGroups): JSX.Element => {
    return (
      <Link
        href={`/${locationRoute(actualRoute)}/[id]`}
        as={`/${locationRoute(actualRoute)}/${item.name}`}
        key={item.group_id}
        passHref>
        <div
          className={IsActive(item.name, 's-listgroup-active', 's-listgroup')}>
          {item.name}
        </div>
      </Link>
    )
  }

  return (
    <Fragment>
      <div className='s-sidebargrouplinks'>
        {Props.groups ? Props.groups.map((item) => itemLink(item)) : 'Loading'}
      </div>
    </Fragment>
  )
}

export default ListOfGroups
