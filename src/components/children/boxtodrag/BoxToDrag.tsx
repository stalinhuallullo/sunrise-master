import { useState } from 'react'
import { MdFileUpload } from 'react-icons/md'
import useTranslation from 'next-translate/useTranslation'
import { dataUrls } from '../../../../config/url'
import { useGlobalContext } from 'interfaces/members-context'
import { Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import DownloadTemplate from './downloadtemplate/DownloadTemplate'
import { setUploadFileToArray } from '@utils/data-utils/fileToArray'
import ModalInfo from 'components/children/modals/ModalInfo'

const { Dragger } = Upload

type PropsBoxToDrag = {
  onUploadComplete?: () => void
}

const BoxToDrag = ({
  onUploadComplete = () => {}
}: PropsBoxToDrag): JSX.Element => {
  const { t } = useTranslation()
  const { setArrayMembers } = useGlobalContext()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const handleFileUpload = ({ file }: UploadChangeParam) => {
    const { status } = file

    if (status === 'done') {
      onUploadComplete()
      // This show a pop up when the user upload a file
      // message.success(`${file.name} file uploaded successfully.`)
      setUploadFileToArray(file, setArrayMembers, setIsModalVisible)
    }
  }

  return (
    <>
      <div className='s-box-v2'>
        <Dragger
          multiple={false}
          maxCount={1}
          data-testid='input-file-data-csv'
          accept='.csv,.xlsx'
          onChange={handleFileUpload}>
          <div className='s-clickhere'>
            <div className='s-iconUpload'>
              <MdFileUpload data-testid='file-image' />
            </div>
            <div className='s-textclickhere'>
              {t('uploadmembers:click-here')}
              <br></br>
              {t('uploadmembers:upload')}
            </div>
            {isModalVisible ? (
              <ModalInfo
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            ) : null}
          </div>
        </Dragger>
      </div>

      <div className='s-box-footer'>
        <DownloadTemplate />
        <div className='s-textclickherrtod'>
          <a target='_blank' href={dataUrls.URLs.guide} rel='noreferrer'>
            <p>{t('uploadmembers:guide')}</p>
          </a>
        </div>
      </div>
    </>
  )
}

export default BoxToDrag
