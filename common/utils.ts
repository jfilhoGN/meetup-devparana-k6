
// Papaparse for CSV parsing (https://www.papaparse.com/)
import { scenario } from 'k6/execution';


export function chance(percent, callback) {
  return Math.random() * 100 <= percent ? callback() : null;
}

function sequencyItem(arrayOfItems) {
  return arrayOfItems[scenario.iterationInTest]
}
