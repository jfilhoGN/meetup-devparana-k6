import { group, sleep, check } from "k6";
// Httpx is a wrapper for the underlying http module in 'k6/http' (set global headers, timeouts, baseURL)
import { Httpx } from "https://jslib.k6.io/httpx/0.0.6/index.js";

import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

import {
  BASE_URL
} from "../userVariables.ts";


const urlHttpx = new Httpx({
  baseURL: `${BASE_URL}`,
  headers: { "Content-Type": "application/json" }
});

export function Cenario_Login(email, senha) {
  group(`Step /login.php `, () => {

    const vars = {};

    let res = urlHttpx.get("http://test.k6.io/my_messages.php");

    vars["csrftoken"] = res
      .html()
      .find("input[name=csrftoken]")
      .first()
      .attr("value");

    sleep(randomIntBetween(1, 3)); // Thinktime entre 1 e 3 segundos

    let body = { login: email, password: senha, redir: '1', csrftoken: `${vars["csrftoken"]}` }

    res = urlHttpx.post(`/login.php`, body, {tags:{type:`login`}});

  });

}