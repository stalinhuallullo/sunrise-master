import { InfoTableMembers } from 'interfaces/boxToDrag-interface'; 
import XLSX from 'xlsx'

export interface BasicInfoUpload {
    sheetDataBuffer: Buffer; 
  }
  
 
export function convertJSONtoCSV(data: InfoTableMembers[]) {
    const wb = XLSX.utils.book_new();
    const sheetData = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(wb, sheetData, 'Sheet 1');
    const sheetDataBuffer = XLSX.write(wb, {bookType: 'csv', type: 'buffer', bookSST: false});
  
    const result: BasicInfoUpload = {sheetDataBuffer}
    
    return result
}

