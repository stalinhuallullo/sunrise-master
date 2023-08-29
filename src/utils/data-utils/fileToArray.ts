import { UploadFile } from 'antd/lib/upload/interface';
import { convertCSVtoJSON } from './csvToJson';

export function setUploadFileToArray(
  file: UploadFile<any>,
  setArrayMembers: any,
  setIsModalVisible: any
) {
  const reader = new FileReader();
  reader.onload = function (p) {
    const result = p.target?.result;
    const data = convertCSVtoJSON(result);
    const newData = data.map((x) =>
      Object.fromEntries(
        Object.entries(x).map(([headerName, cellValue]) => {
          // delete space before and after the text
          if (typeof cellValue === 'string') {
            cellValue = cellValue.trim();
          }
          // transform to lowercase emails, to avoid problems in sunlight
          if (
            headerName === 'Email Address' ||
            headerName === 'Managers Email Address'
          ) {
            cellValue.toLowerCase();
          }
          // set empty string in budget as undefined, because budget is treated as number later
          if (headerName === 'Budget' && cellValue === '') {
            cellValue = undefined;
          }
          return [headerName, cellValue];
        })
      )
    );
    if(newData.length===0){
      setIsModalVisible(true)
    } else {
      setArrayMembers({ newData: newData, filename: file.name.split('.')[0] });
    }
  };
  const infoFileBlob = file.originFileObj as Blob;
  if (file.name.split('.').pop() === 'csv') {
    reader.readAsText(infoFileBlob);
  } else {
    reader.readAsBinaryString(infoFileBlob);
  }
}
