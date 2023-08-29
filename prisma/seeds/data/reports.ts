export type Report = {
    name: string,
    email: string, 
    description: string
    historialId: number
}
export const reports: Report[] = [
    {
        name: 'Juan Perez',
        email: 'Juancito@outlookcom', 
        description: 'Invalid email',
        historialId: 1
    },
    {
        name: 'Juan 12',
        email: 'Juancito@outlookcom', 
        description: 'Invalid name',
        historialId: 1
    },
    {
        name: 'Juan Perez',
        email: 'Juancito@outlookcom', 
        description: 'Email repeated',
        historialId: 1
    },
  ];