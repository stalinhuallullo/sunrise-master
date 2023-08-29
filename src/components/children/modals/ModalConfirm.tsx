import React from 'react'
import { Modal } from 'antd'
import { GrCircleAlert } from 'react-icons/gr'
import { MdFileUpload } from 'react-icons/md'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

interface TypeState {
  isModalVisible: boolean
  setIsModalVisible: (c: boolean) => void
}

export default function ModalConfirm({
  isModalVisible,
  setIsModalVisible
}: TypeState) {
  const { t } = useTranslation()

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { query } = useRouter()

  return (
    <>
      {query.group === 'abc' ? (
        <Modal
          maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          cancelText={t('uploadmembers:modal-cancel-text')}
          okText={t('uploadmembers:modal-ok-text')}
          title={
            <section className='modal-alert-icon'>
              <GrCircleAlert />
            </section>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p className='modal-text-up'>{t('uploadmembers:modal-members')}</p>
          <p className='modal-text-bottom'>
            {t('uploadmembers:modal-members-question')}
          </p>
        </Modal>
      ) : (
        <Modal
          footer={null}
          maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          title={
            <section className='modal-alert-icon' style={{ stroke: '#DADADA' }}>
              <MdFileUpload />
            </section>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p className='modal-text-up'>
            {t('uploadmembers:modal-updated-text')}
          </p>
          <section
            style={{
              backgroundColor: 'rgba(184, 184, 184, 1)',
              maxWidth: '530px',
              margin: '30px 50px',
              display: 'flex',
              borderRadius: '50px',
              height: '8px'
            }}>
            <p
              style={{
                backgroundColor: '#64C28D',
                width: '60%',
                borderRadius: '50px'
              }}>
              .
            </p>
            <p
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.24)',
                width: '40%',
                borderRadius: '50px'
              }}>
              .
            </p>
          </section>
          <p className='modal-subtext-bottom' style={{ marginBottom: '20px' }}>
            {t('uploadmembers:modal-updated-subtext')}
          </p>
        </Modal>
      )}
    </>
  )
}
