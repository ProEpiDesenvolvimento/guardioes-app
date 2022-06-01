# Guardiões da Saúde App

Repositório do aplicativo [Guardiões da Saúde](https://linktr.ee/guardioesdasaude).

## Como baixar a última versão do app

Por enquanto o procedimento funciona apenas para celulares android.

Entre em [releases](https://github.com/proepidesenvolvimento/guardioes-app/releases) e procure pelo link com uma tag verde chamada 'lastest release'. Ao encontrar, desinstale o aplicativo que já está no seu celular (caso exista) e baixe o arquivo 'app-release.apk'.

Possivelmente essa versão tem bugs que serão consertados no futuro e é instável, ou seja, pode dar erros.

## Instalar dependências

```shell
$ npm install
```

## Configurando variáveis de ambiente

Crie um arquivo **.env** na pasta do projeto com as linhas:

```shell
API_URL=
ONESIGNAL_APP_ID=
```

**O API_URL é a url da sua aplicação rodando no repositório [guardioes_api](https://github.com/ProEpiDesenvolvimento/guardioes-api).**

Para atualizar as edições no arquivo, basta modificar o _import_ ou executar o comando:

```shell
$ npx react-native start --reset-cache
```

E então, execute o app novamente.

É possível criar configurações diferentes para produção e desenvolvimento com arquivos **.env.production** e **.env.development**.

Caso você queira usar o live reload, abra outro terminal e rode o seguinte comando e deixe ele rodando:

```shell
npx react-native start
```

ou para resetar o cache antes de iniciar:

```shell
npx react-native start --reset-cache
```

## Executando

```shell
$ npx react-native run-android
```

ou

```shell
$ npx react-native run-ios
```

Caso a sua máquina não possa rodar a aplicação, nesse [link](https://reactnative.dev/docs/running-on-device) tem uma tutorial de como usar seu celular como plataforma para rodar o aplicativo.

## Possíveis erros:

### Node:

Se certifique que a sua versão do **node** e do **npm** estão atualizadas. Neste [link](https://nodejs.org/pt-br/download/releases/) você poderá ver as relações entre as versões do node e do npm.

### NPM:

O node pode apresentar algumas vulnerabilidades que serão acusadas pelo próprio node ao rodar o comando _npm install_. Essa vulnerabilidades podem gerar problemas então recomenda-se rodar o comando:

```Shell
npm audit fix --force
```

O node também recomenda alguns comandos para consertar as vulnerabilidades.

### VS Code:

Um possível erro pode ser relacionado ao VS Code. Ao usar o VS Code para ativar o live reload pelo celular pode dar alguns erros de compatibilidade e por isso recomenda-se o uso do terminal nativo da maquina.

## License & copyright

ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo

Licensed under the [Apache License 2.0](LICENSE.md).
