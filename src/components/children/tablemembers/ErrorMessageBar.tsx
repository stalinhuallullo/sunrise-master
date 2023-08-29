import { Collapse } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { CollapsableMessageAlert } from './CollapseErrorAlert'

const ErrorMessageBar = (props: {
  arrayBadHeaders: string[]
  arrayGoodHeaders: string[]
  arrayDuplicateManagerEmail: string[]
  arrayDuplicateEmails: string[]
  badRowFormat: string[]
}): JSX.Element => {
  const { t } = useTranslation()
  const { Panel } = Collapse

  return (
    <Collapse>
      <Panel
        header='We found some errors, click here to show/hide them'
        key='1'>
        {props.arrayBadHeaders.length > 0 && (
          <CollapsableMessageAlert
            translationTitle={t('uploadmembers:validate-columns')}
            arrayErrorInfo={props.arrayBadHeaders}
            arrayGoodInfo={props.arrayGoodHeaders}
            useTitle='headerError'
          />
        )}
        {props.arrayDuplicateManagerEmail.length > 0 && (
          <CollapsableMessageAlert
            translationTitle={t('uploadmembers:validate-columns-duplicate')}
            arrayErrorInfo={props.arrayDuplicateManagerEmail}
            useTitle='duplicateManagerEmailError'
          />
        )}
        {props.arrayDuplicateEmails.length > 0 && (
          <CollapsableMessageAlert
            translationTitle={t(
              'uploadmembers:validate-columns-duplicate-emails'
            )}
            arrayErrorInfo={props.arrayDuplicateEmails}
            useTitle='duplicateEmailError'
          />
        )}
        {props.badRowFormat.length > 0 && (
          <CollapsableMessageAlert
            translationTitle={t('uploadmembers:validate-rows')}
            arrayErrorInfo={props.badRowFormat}
            useTitle='rowFormatError'
          />
        )}
      </Panel>
    </Collapse>
  )
}

export default ErrorMessageBar
