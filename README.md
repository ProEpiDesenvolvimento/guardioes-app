# Guardiões da Saúde App
Repositório do aplicativo [Guardiões da Saúde](https://linktr.ee/guardioesdasaude).

## Como baixar a última versão do app

Por enquanto o procedimento funciona apenas para celulares android.

Entre em [releases](https://github.com/proepidesenvolvimento/guardioes-app/releases) e procure pelo link com uma tag verde chamada 'lastest release'. Ao encontrar, desinstale o aplicativo que já está no seu celular (caso exista) e baixe o arquivo 'app-release.apk'.

Possivelmente essa versão tem bugs que serão consertados no futuro e é instável, ou seja, pode dar erros.

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
