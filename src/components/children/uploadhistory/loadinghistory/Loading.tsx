import { Fragment } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loading = (): JSX.Element => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: '#64c28d' }} spin />
  )

  return (
    <Fragment>
      <div className='s-box-v2'>
        <div className='s-empty-history'>
          <div className='s-icon-empty-history'>
            <Spin indicator={antIcon} />
          </div>
          <p>Loading...</p>
        </div>{' '}
      </div>
    </Fragment>
  )
}

export default Loading
