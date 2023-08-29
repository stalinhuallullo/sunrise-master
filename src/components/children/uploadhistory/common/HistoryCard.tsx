import { AiFillFile } from 'react-icons/ai'
import IconCard from './IconCard'
import { HistoryData } from 'interfaces/historyData-interface'
import { formatTime } from '@utils/data-utils/formatTime'
import { downloadCSV, downloadS3File } from '@utils/download-utils/downloadCSV'
import { fetcherGet } from '@utils/fetch-api/methods'
import { useEffect, useState } from 'react'

const HistoryCard = (props: {
  item: HistoryData
  type: string
}): JSX.Element => {
  const [historialId] = useState(props.item.filename.split('_')[0])
  const [errors, setErros] = useState(0)

  const countErrors = async (historialId: string) => {
    const { data } = await fetcherGet(`/api/historial/reports/${historialId}`)
    const numberErrors = data.length
    setErros(numberErrors)
  }

  useEffect(() => {
    countErrors(historialId)
  }, [historialId])

  return (
    <div className='s-boxhistoryfiles'>
      <div className='s-blockfileicon'>
        <div className={errors ? 's-icon-size s-red' : 's-icon-size s-green'}>
          <IconCard issue={errors ? 'error' : 0} />
        </div>
      </div>
      <div className='s-blockfiledetails'>
        <div className='blockfiledetails1'>
          <div className='s-iconfiledetail'>
            <AiFillFile />
          </div>
          <div className='s-blockfiledetails1-name'>
            <div
              className='text-block-9'
              onClick={() => downloadS3File(props.item.filename)}>
              {props.item.filenameOrigin}
            </div>
          </div>
        </div>
        <div className='s-blockfiledetails2'>
          <div className='s-blockfiledetails2-isues'>
            <div className='text-block-11'>{errors > 0 ? errors : ''}</div>
          </div>
          {errors > 0 ? (
            <div
              onClick={() => downloadCSV(historialId, props.item.dateCreated)}
              className='s-blockfiledetails2-download'>
              <div className='text-block-10'>Download Report</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className='s-blockfiledetail3'>
          <div className='s-blockfiledetail3-name'>
            <div className='text-block-12'>{props.item.userName}</div>
          </div>
          <div className='s-blockfiledetail3-date'>
            <div className='text-block-13'>
              {formatTime(new Date(props.item.dateCreated))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryCard
