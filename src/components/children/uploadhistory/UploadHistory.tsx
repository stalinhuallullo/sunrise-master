import { Fragment, useCallback, useEffect, useState } from 'react'
import { List } from 'antd'
import HistoryCard from './common/HistoryCard'
import { fetcherGet } from 'utils/fetch-api/methods'
import { HistoryData, HistoryJson } from 'interfaces/historyData-interface'
import Loading from './loadinghistory/Loading'
import Empty from './emptyhistory/Empty'
import { useRouter } from 'next/router'

const UploadHistory = (props: { type: string }): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const { asPath } = useRouter()
  const groupName: string = asPath.split('/')[2]
  const [historyArray, setHistoryArray] = useState<HistoryData[]>([])

  const fnHistoryArray = useCallback(async () => {
    const dataHistory: HistoryJson = await fetcherGet(
      `/api/historial/${groupName}`
    )
    if (dataHistory.status === '200') {
      const sortedArray = dataHistory.data.sort((a: any, b: any) => b.id - a.id)
      setHistoryArray(sortedArray)
    } else {
      setHistoryArray([])
    }
    setLoading(false)
  }, [groupName])

  useEffect(() => {
    fnHistoryArray()
  }, [fnHistoryArray])

  const viewUploadHistory = (
    loading: boolean,
    historyArray: HistoryData[]
  ): JSX.Element => {
    if (loading) {
      return <Loading />
    } else if (historyArray.length === 0) {
      return <Empty />
    }
    return (
      <List
        itemLayout='horizontal'
        dataSource={historyArray}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          position: 'bottom'
        }}
        renderItem={(item) => (
          <HistoryCard item={item} type='warning' key={item.key} />
        )}
      />
    )
  }

  return <Fragment>{viewUploadHistory(loading, historyArray)}</Fragment>
}

export default UploadHistory
