export type Historial = {
    filename: string,
    filenameOrigin: string, 
    userName: string,
    userId: string
    groupId: string,
    dateCreated: Date,
    groupName: string,
    status: string,
}
export const historial: Historial[] = [
    {
        filename: 'filename',
        filenameOrigin: 'filenameOrigin',
        userName: 'Miluska',
        groupName: 'Moonshot',
        userId: '1',
        groupId: '1ba1va1',
        dateCreated: new Date(
            'Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)'
          ), 
        status: 'ok',
    },
    {
        filename: 'filename2',
        filenameOrigin: 'filenameOrigin',
        userName: 'Miluska',
        groupName: 'Moonshot',
        userId: '2',
        groupId: '1ba1va1',
        dateCreated: new Date(
            'Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)'
          ),
        status: 'ok',
    }, 
  ];