import handler from '@pages/api/download/members/index'
import { createMocks } from 'node-mocks-http'
import { s3Instance } from '@utils/aws-utils/awsClient'
import { downloadingS3File } from '@utils/aws-utils/getPresignedUrl'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

jest.mock('@utils/aws-utils/awsClient')
jest.mock('@aws-sdk/client-s3')
jest.mock('@aws-sdk/s3-request-presigner')

const s3Clients = s3Instance as jest.Mocked<typeof s3Instance>
const getSignedUrlMock = getSignedUrl as jest.MockedFunction<
  typeof getSignedUrl
>

describe('/api/historial', () => {
  it('should returna a s3 url', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'file.xlsx'
      }
    })

    const bucketParams = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: 'file.xlsx'
    }

    getSignedUrlMock
      .mockResolvedValueOnce('www.aws.com')
      .mockResolvedValueOnce('hola.com')

    const mock =
      'https://miprimerbucket-mery.s3.us-east-1.amazonaws.com/okcsv_format_example%202_2022-2-18_19-31-18-346.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA42STFZ2YOMF3NH5L%2F20220224%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220224T164115Z&X-Amz-Expires=900&X-Amz-Signature=9062ab69c472390519efa9873d590398544485403a05bbf85374805fc7cc85f0&X-Amz-SignedHeaders=host&x-id=GetObject'
    s3Clients.send.mockResolvedValue({ isMock: mock } as never)

    await downloadingS3File(bucketParams)

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveProperty('url')
    expect(getSignedUrlMock).toHaveBeenCalledTimes(2)
  })
})
