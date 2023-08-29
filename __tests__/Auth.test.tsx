import { createMocks } from 'node-mocks-http'
import apiRouteLogin from '@pages/api/login'
import apiRouteLogout from '@pages/api/logout'
import { fetchSunlight } from '../src/utils/fetch-api/fetchSunlight'

jest.mock('../src/utils/fetch-api/fetchSunlight', () => {
  return {
    fetchSunlight: jest.fn()
  }
})
;(
  fetchSunlight as jest.MockedFunction<typeof fetchSunlight>
).mockResolvedValueOnce({
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6Ik1pbHVza2EgUm9tZXJvIiwiZW1haWwiOiJtaWx1c2thLnJvbWVyb0AyYTA4MzkyMzQ2LmNvbSIsInVzZXJJZCI6IjJhMDgzOTIzNDYiLCJncm91cHMiOlt7Im5hbWUiOiJHb29nbGUiLCJncm91cF9pZCI6IjQxZmEyZGIxNjEifSx7Im5hbWUiOiJGYWNlYm9vayIsImdyb3VwX2lkIjoiYmE0ZDI4OWI1ZCJ9XX0.N4JC-CILthAlGpmTs_SHHE18ksweL2lKscrX2DY17_w'
})

describe('Testing AUTH', () => {
  it('Should return a empty user and a then valid user', async () => {
    const { req: loginReq, res: loginRes } = createMocks({
      method: 'POST',
      headers: {
        referer: 'https://localhost:4200/',
        host: 'localhost:3001'
      },
      query: {
        token:
          '6588e254da9ada77f8cd05a8793926357b254698b5b0bfca7590ae18820d8a4f'
      },
      session: {}
    })

    const userExpected = {
      user: {
        userName: 'Miluska Romero',
        email: 'miluska.romero@2a08392346.com',
        userId: '2a08392346',
        groups: [
          { name: 'Google', group_id: '41fa2db161' },
          { name: 'Facebook', group_id: 'ba4d289b5d' }
        ]
      }
    }

    // login request doenst have a session originally
    expect(loginReq.session).toMatchObject({})
    // http petition to login endpoint
    await apiRouteLogin(loginReq, loginRes)

    expect(fetchSunlight).toHaveBeenCalledTimes(1)
    // login after make a http petition does have a session
    expect(loginReq.session).toMatchObject(userExpected)
    // status and redirect
    expect(loginRes._getStatusCode()).toBe(307)
    expect(loginRes._getRedirectUrl()).toBe('/')
  })
  it('Should logout user', async () => {
    const { req: logoutReq, res: logoutRes } = createMocks({
      method: 'GET'
    })

    // http petition to logout endpoint
    await apiRouteLogout(logoutReq, logoutRes)

    const logoutResponse = {
      message: 'Succesfully logout',
      status: '200'
    }

    expect(logoutReq.session).toMatchObject({})
    expect(logoutRes._getStatusCode()).toBe(200)
    expect(JSON.parse(logoutRes._getData())).toEqual(logoutResponse)
  })
})
