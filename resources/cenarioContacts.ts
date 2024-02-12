import { group, sleep, check } from "k6";
// Httpx is a wrapper for the underlying http module in 'k6/http' (set global headers, timeouts, baseURL)
import { Httpx } from "https://jslib.k6.io/httpx/0.0.6/index.js";

import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

import {
  headers_default,
  BASE_URL
} from "../userVariables.ts";


const urlHttpx = new Httpx({
  baseURL: `${BASE_URL}`,
});

export function Cenario_Contacts() {
  group(`Step /contacts.php `, () => {
  
    let res = urlHttpx.get(`/contacts.php`);
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
    
    sleep(randomIntBetween(1, 3)); // Thinktime entre 1 e 3 segundos
  });

}
