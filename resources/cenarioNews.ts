import { group, sleep, check } from "k6";
// Httpx is a wrapper for the underlying http module in 'k6/http' (set global headers, timeouts, baseURL)
import { Httpx } from "https://jslib.k6.io/httpx/0.0.6/index.js";

import {
  BASE_URL
} from "../userVariables.ts";


const urlHttpx = new Httpx({
  baseURL: `${BASE_URL}`,
});

export function Cenario_News() {
  group(`Step /news.php `, () => {
  
    let res = urlHttpx.get(`/news.php`, {tags: {type: 'news'}});
    
  });

}