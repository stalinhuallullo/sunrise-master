import { createMocks } from 'node-mocks-http'
import getHistorial from '@pages/api/historial/[groupName]'
import postHistorial from '@pages/api/historial/index'
import handlerReport from '@pages/api/historial/reports/[id]'

import { historial } from '../prisma/seeds/data/historial'
import { execSync } from 'child_process'
import { join } from 'path'
import { reports } from '../prisma/seeds/data/reports'

describe('Unit Testing for Prisma - Historial & Report', () => {
  beforeEach(async () => {
    const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma')
    execSync(`${prismaBinary} db push`)
  })

  it('HISTORIAL: POST & GET - Should return all the Historials from an specified groupName', async () => {
    // MOCK REQUEST - POST METHOD - CREATE HISTORIAL
    const { req: requestPost, res: responsePost } = createMocks({
      method: 'POST',
      params: { groupName: 'Moonshot' },
      body: historial[0]
    })

    // HTTP REQ TO CREATE AN HISTORIAL
    await postHistorial(requestPost, responsePost)

    const { data: resHistorial } = JSON.parse(responsePost._getData())
    // GETTING ALL HISTORIALS JUST CREATED
    expect(resHistorial.filename).toBe(historial[0].filename)

    // MOCK REQUEST - GET METHOD - CREATE HISTORIAL
    const { req: reqGetHistorial, res: resGetHistorial } = createMocks({
      method: 'GET',
      params: { groupName: 'Moonshot' }
    })

    await getHistorial(reqGetHistorial, resGetHistorial)

    const { data: historials } = JSON.parse(resGetHistorial._getData())
    // GETTING HISTORIALS BY GROUPNAME
    expect(historials[0].groupName).toBe(historial[0].groupName)
  })

  it('REPORT: POST - GET - Should return all the reports from an specified historialId', async () => {
    // MOCK REQUEST - POST METHOD - CREATE HISTORIAL
    const { req: requestPost, res: responsePost } = createMocks({
      method: 'POST',
      params: { groupName: 'Moonshot' },
      body: historial[0]
    })

    // HTTP REQ TO CREATE AN HISTORIAL
    await postHistorial(requestPost, responsePost)

    // MOCK REQUEST - POST METHOD - CREATE REPORT
    const { req: reqPostReport, res: resPostReport } = createMocks({
      method: 'POST',
      query: { id: '1' },
      body: reports[0]
    })

    // HTTP REQ TO CREATE AN REPORT
    await handlerReport(reqPostReport, resPostReport)
    const { data: resReport } = JSON.parse(resPostReport._getData())

    // GETTING ALL REPORTS JUST CREATED
    expect(resReport.name).toBe(reports[0].name)

    // MOCK REQUEST - GET METHOD - GET REPORTS
    const { req: reqGet, res: resGet } = createMocks({
      method: 'GET',
      query: { id: '1' }
    })

    // HTTP REQ TO GET AN REPORT
    await handlerReport(reqGet, resGet)

    const { data: reportsData } = JSON.parse(resGet._getData())
    // db find report by id
    expect(reportsData[0].name).toBe(reports[0].name)
    expect(reportsData[0].email).toBe(reports[0].email)
    expect(reportsData[0].description).toBe(reports[0].description)
  })
})
