<!-- 
   CUIDADO 

   Quando editar esse readme, tome cuidado com as tags <br/> 
   elas são importantes para alinhar as imagens
-->


<div align="center">
   <img src=".github/brand.svg" height="90">
</div>

# Desafio web

O desafio proposto foi a criação de uma aplicação em React para a conversão do valor digitado em dólar para real.

A aplicação foi deployada na vercel em: https://stone-currency-tau.vercel.app/

Foram utilizadas as seguintes tecnologias:

- NextJS (React Framework)
- Typescript
- Cliente HTTP axios
- react-query
- styled-components
- docker

## Bibliotecas adicionais e suas justificativas:
- date-fns e date-fns-tz: Utilizada para formatar a data atual
- jotai: Um gerenciador de estados leve e minimalista para armazenar o valor da conversão do dólar para o real
- react-hook-form: Usada para gerenciar o formulário de conversão, optei utilizá-la por sua maneira simplificada de lidar com diferentes estados do fomulário.
- react-hydration-provider: Usada para renderizar o header apenas no lado do cliente.
- react-number-format: Input para formatar os valores digitados nos campos de Dólar e Taxa do estado.
- axios-mock-adapter: Utilizada para mockar os retornos do axios nos testes unitários


## Rodando o projeto localmente:

É possível rodar o projeto localmente utilizando o docker-compose apenas com o comando:

```
  docker-compose up --build
```

Ou se preferir rodar sem o docker:

```
- Garanta estar utilizando pelo menos a versão 14 do node e rode os seguintes comando no diretório root do projeto:

- yarn install (para baixar as dependências do projeto.)
- yarn run dev (para rodar em http://localhost:300)

OBS: utilize yarn test para rodar os testes unitários (Possui cobertura).
```

## Critérios de avaliação 

<img align="right" src=".github/closed-fist.svg" width="90">

### Entrega
- O resultado final está completo para ser executado?
- O resultado final atende ao que se propõe fazer?
- O resultado final atende totalmente aos requisitos propostos?
- O resultado final é visualmente elegante?

<img align="right" src=".github/thumbs-up.svg" width="90">

### Boas práticas
- O código está de acordo com o guia de estilo da linguagem?
- O código está bem estruturado?
- O código faz o bom uso de *Design Patterns*?
- O código possui testes?

<img align="right" src=".github/document.svg" width="90">

### Documentação
- O código foi entregue com um arquivo de _README_ claro de como instalar e codificar no projeto?
- O código possui comentários pertinentes?
- O código está em algum controle de versão?
- Os _commits_ são pequenos e consistentes?
- As mensagens de _commit_ são claras?

<br/>

### **Material de estudo**
- [Boas Práticas na Stone](https://github.com/stone-payments/stoneco-best-practices/blob/master/README_pt.md)
- [Airbnb Javascript](https://github.com/airbnb/javascript)


<!-- ~VARS~ -->
<!-- API -->
[QUOTATION_API]: https://docs.awesomeapi.com.br/api-de-moedas

<!-- URLS -->
[FIGMA_URL]: https://www.figma.com/file/y8IcDbllfaFAzXrEXR05PE/Teste-Front-Web-Stone

<!-- ASSETS -->
[FIGMA-IMAGE]: .github/figma-desafio.png
