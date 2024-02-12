# Teste de Performance com K6

## Meetup DevParana

Este repositório tem como objetivo exemplificar como utilizar o K6 para testes de performance.

# Divisão das Pastas

- `common`: utilizada para ser armazenado conteúdo que será compartilhado entre todo o projeto, como exemplo funções globais e ou *utils*. 
- `data`: utilizada para ser amazenados todas as massas de dados que serão utilizados no desenvolvimento do script.
- `resources`: pasta deve ser utilizada para ser dividido seu processo de criação do script, nessa camada é interessante para cada fluxo ser criado um resource especifico, por exemplo em um teste que valide o fluxo de um usuário, para cada etapa que o usuário passe deve ser criado um resource (home, pesquisa, carrinho, checkout), a fim de garantir uma maior organização, desacoplamento e facilidade na manutenção. Caso tenha feito algum script em JMeter, a parte dos resources são os *Fragments* que temos em JMeter.
- `scenarios`: pasta com todos os cenários que serão testados no script, aqui nessa etapa é criado um arquivo de cenário para cada fluxo, caso seu script tenha 3 Fluxos, é necessário a criação de 3 cenários, esta etapa é compatível em JMeter com o `Thread Group`;
- `index.ts`: arquivo utilizado para inicializar o script, nele se encontra também as configurações de criação de VUs, tempo de execução e também métricas que são importantes para a execução no K6 Cloud. 
- `userVariables`: arquivo que contém todas as váriaveis de escopo global bem como o *Header* padrão para o script.

# Padronização escrita 

- O padrão da escrita é seguindo os padrões de [Clean Code](https://github.com/labs42io/clean-code-typescript), com uso de escrita `camelCase` para criação de variáveis e funções. 
- Por padrão, massa de dados que são utilizados em mais de 2 resources, a mesma deve ser inicializada no scenário e passada por parâmetro da função do resource a fim de evitar duplicação de código.

OBS: Dentro de cada arquivo é explicado cada parte do código para um melhor entendimento.

# Execução do script

Para executar o script basta entrar pelo terminal na pasta do projeto e executar o comando `k6 run index.ts`, a partir desse comando ele irá iniciar a execução seguindo as configurações que estão no `index`, nesse sentido tome **MUITO CUIDADO** com o número de **VUs** e tempo de execução pois seu teste pode impactar o ambiente produtivo. Sempre que for executar no momento da criação do script coloque **1VU** por um curto período de tempo (30s).

## Funções Internas

Dentro da pasta `common` você poderá encontrar funções que foram geradas especifícas, suprindo a necessidade de negócio, dentre as funções destaca-se:

- `chance(percent, callback)`: função que tem como objetivo realizar o funil de throughput para cada resource em especifico, abaixo segue um exemplo:
```javascript
chance(75, () => {
    Checkout_Cupom();
  });
// para que execute tudo que estiver dentro do escopo da função chance() a mesma deve passar por if na qual caso o valor gerado aleatório (0-100) seja igual ou menor ao valor pedido de throughput será executado.
``` 

- `sequencyItem(arrayOfItems)`: em k6 já existe uma função pronta para pegar valores aleatórios dentro de um arquivo de massa de dados, caso necessite que o dado seja pego em sequencial use a função `sequencyItem` que recebe como parâmetro sua lista de items e retorna um item seguindo a iteração que está havendo na execução em `k6`, abaixo um exemplo:
```javascript
const skus = [12233,1223344,12345]

let sku = sequencyItem(skus)

// output 1ª iteracao sku = 12233
// output 2ª iteracao sku = 1223344
// output 2ª iteracao sku = 12345

```

## Pratica

Para a pratica foi utilizado o site próprio do K6 para realizar testes de performance [https://test.k6.io/](https://test.k6.io/)

- **[Slide da Apresentação Meetup](./slide/K6%20para%20teste%20de%20performance.pdf)** 