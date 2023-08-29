import { createMocks } from 'node-mocks-http'
import { s3Instance } from '@utils/aws-utils/awsClient'
import handler from '@pages/api/upload/index'
import { getFormattedTime } from '@utils/data-utils/timestamp'
import { uploadingObject } from '@utils/aws-utils/putObjectAws'

jest.mock('@utils/aws-utils/awsClient')
jest.mock('@aws-sdk/client-s3')

const s3Client = s3Instance as jest.Mocked<typeof s3Instance>

describe('/api/upload-file', () => {
  test('should return an object with data, status', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        newData: [{ user: 'name1' }, { user: 'name2' }],
        fileName: 'testupload.xls'
      }
    })

    const mock = {
      $metadata: {
        httpStatusCode: 200
      }
    }

    const params = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: 'testupload' + getFormattedTime() + '.xlsx',
      Body: '<Buffer 50 4b 03 04 0a 00 00 00 00 00 da ba 56 54 d6 92 7c 11 5a 01 00 00 5a 01 00 00 11 00 00 00 64 6f 63 50 72 6f 70 73 2f 63 6f 72 65 2e 78 6d 6c 3c 3f 78 ... 14613 more bytes>'
    }

    s3Client.send.mockResolvedValue(mock as never)
    const response = await uploadingObject(params)

    expect(response?.$metadata.httpStatusCode).toEqual(200)

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)

    expect(JSON.parse(res._getData())).toHaveProperty('data')

    expect(JSON.parse(res._getData())).toHaveProperty('status')
  })
})
