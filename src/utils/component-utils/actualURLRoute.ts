import { NextRouter } from "next/router"

export const getActualPath = (router: NextRouter): string => { 
    const actualRoute: string = router.asPath.split('/')[2]

    const actualURLRoute = decodeURI(actualRoute)

    return actualURLRoute
}