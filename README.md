# Guardiões da Saúde App
Repositório do aplicativo [Guardiões da Saúde](https://linktr.ee/guardioesdasaude).

## Instalar dependências
```
$ npm install
```

## Configurando variáveis de ambiente

Crie um arquivo **.env** na pasta do projeto com as linhas:
```
API_URL = 
APP_ID =
```
* Esses dados estão disponíveis com algum desenvolvedor do app.

Para atualizar as edições no arquivo, basta modificar o *import* ou executar o comando:
```
$ npx react-native start --reset-cache
```
* E então, execute o app novamente.

É possível criar configurações diferentes para produção e desenvolvimento com arquivos **.env.production** e **.env.development**.

## Executando
```
$ npx react-native run-android
```
ou
```
$ npx react-native run-ios
```

## License & copyright

ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo

Licensed under the [Apache License 2.0](LICENSE.md).
