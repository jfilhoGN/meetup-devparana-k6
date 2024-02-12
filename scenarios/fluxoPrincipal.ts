import { Cenario_Contacts } from "../resources/cenarioContacts.ts";
import { Cenario_News } from "../resources/cenarioNews.ts";
import { Cenario_Login } from "../resources/cenarioLogin.ts";

// Papaparse for CSV parsing (https://www.papaparse.com/)
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
// SharedArray provides a more memory-efficient way of dealing with potentially large CSV files
import { SharedArray } from "k6/data";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.3.0/index.js";
import { chance } from "../common/utils.ts";


// Exemplo de import do usuário do csv
// Para o K6 é necessário ter a primeira linha com as informações de cada coluna do CSV
const users = new SharedArray("users", function () {
  return papaparse.parse(open("../data/usuarios.csv"), {
    header: true,
  }).data;
});

export function fluxo_principal() {
  // Como o K6 precisa da primeira linha com as informações, o atributo email de usuario é o atributo identico ao que está dando nome no CSV
  var usuario = randomItem(users);
  var userEmail = usuario.username
  var userSenha = usuario.password

  Cenario_Contacts();
  Cenario_News();

  chance(50, () => {
    Cenario_Login(userEmail, userSenha);
  });
}

