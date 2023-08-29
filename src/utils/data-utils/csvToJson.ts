import { InfoTableMembers } from 'interfaces/boxToDrag-interface'; 
import XLSX from 'xlsx'

export interface BasicInfoUpload {
    sheetDataBuffer: Buffer; 
  }
  
 
export function convertCSVtoJSON(result: string | ArrayBuffer | null | undefined): InfoTableMembers[] {
  const workbook: XLSX.WorkBook = XLSX.read(result, { type: 'binary' })
  // almacena los datos obtenidos
  let data: InfoTableMembers[] = []
  // recorre cada hoja de trabajo para leer (aquí solo se lee la primera tabla por defecto)
  for (const sheet in workbook.Sheets) { 
    if (workbook.Sheets[workbook.SheetNames[0]]) {
      // usa el método sheet_to_json para convertir Excel a datos json
      data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {defval: ''}))
      // break; // Si solo se toma la primera tabla, descomenta esta línea
    }
  }

  return data
}

