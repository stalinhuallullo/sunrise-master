import { useRouter } from "next/router"

export const validPath = (path: string): string => { 

  const resultPath = path !== undefined ? path : ''

  return resultPath
}

export const IsActive = (route: string, activeClass: string, nonActiveClass: string): string => {

    const router = useRouter()

    const actualRoute: string = router.asPath.split('/')[2]
    const cleanRoute: string = actualRoute ? actualRoute.replaceAll('%20', ' ') : actualRoute

    if(route === cleanRoute){
      return activeClass
    }
    else return nonActiveClass
  }

export const IsActiveSection = (route: string, activeClass: string, nonActiveClass: string, blockClass: string): string => {
    const router = useRouter()

    const actualRoute: string = router.asPath.split('/')[1]
    

    if(actualRoute === ''){
      return `${nonActiveClass} ${blockClass}` 
    }

    if(route===actualRoute){
      return activeClass
    }
    else return nonActiveClass
  }
