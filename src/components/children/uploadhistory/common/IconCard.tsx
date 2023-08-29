import { BsCheck } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'

const IconCard = (props: { issue: any }): JSX.Element => {
  if (props.issue === 0) {
    return <BsCheck className='s-icon s-green' />
  } else if (props.issue === 'error') {
    return <MdOutlineClose className='s-icon s-red' />
  }

  return <BsCheck className='s-icon' />
}
export default IconCard
