// import {historial} from './data/historial'
// import {report} from './data/reports'
import { prisma } from '../../prisma/index'
 
async function main() {
/*  
  await prisma.historial.createMany({
    data: historial,
  }); */
}

main()
  .catch((e) => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });