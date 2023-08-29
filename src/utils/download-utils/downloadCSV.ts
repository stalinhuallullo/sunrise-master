import { formatTime } from "@utils/data-utils/formatTime";
import { fetcher, fetcherGet } from "@utils/fetch-api/methods" 
import XLSX from 'xlsx'
 
export const downloadCSV = async (historialId: string, date: Date) => { 
    const { data } = await fetcherGet(`/api/historial/reports/${historialId}`) 
    const wb = XLSX.utils.book_new();
    const sheetData = XLSX.utils.json_to_sheet(data);
    const dateTime = formatTime(new Date(date))
    XLSX.utils.book_append_sheet(wb, sheetData, 'Sheet 1');
    XLSX.writeFile(wb, `Sunrise_Users_Report_${dateTime}.csv`, {bookType: 'csv', type: 'buffer', bookSST: false}); 
}

export const downloadS3File = async (name: string) => {
    const urlFileFromS3 = await fetcher('/api/download/members', { name })
    window.location.href = urlFileFromS3.url
  }