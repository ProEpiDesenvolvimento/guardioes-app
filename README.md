<p align="center">
   <a href="https://linktr.ee/guardioesdasaude">
      <img width="340" height="242" src="https://raw.githubusercontent.com/proepidesenvolvimento/guardioes-app/feature/UpdateReadme/doc/logo-pt-comum.png" alt="Guardiões da Saúde">
   </a>
</p>

<p align="center">
  O Guardiões da Saúde é um aplicativo de vigilância participativa, tem como objetivo a capacidade e fortalecimento de detecção de surtos e emergências em saúde      pública.
</p>

<br> 
<div align="center">

[![NPM Version][npm-image]][npm-url]
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/proepidesenvolvimento/guardioes-app/blob/master/LICENSE.md)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)  

</div>

## Overview
- **[Telas](https://github.com/proepidesenvolvimento/guardioes-app/tree/feature/UpdateReadme#telas)** 
- **[Baixar última versão do app](https://github.com/proepidesenvolvimento/guardioes-app/tree/feature/UpdateReadme#como-baixar-a-%C3%BAltima-vers%C3%A3o-do-app)**
- **[Ambiente de Desenvolvimento](https://github.com/proepidesenvolvimento/guardioes-app/tree/feature/UpdateReadme#ambiente-de-desenvolvimento)**
- **[Contribuindo](https://github.com/proepidesenvolvimento/guardioes-app/tree/feature/UpdateReadme#contribuindo)**
- **[License & copyright](https://github.com/proepidesenvolvimento/guardioes-app/tree/feature/UpdateReadme#license--copyright)**

----

## Telas

<p align="center">
   <img src="https://raw.githubusercontent.com/proepidesenvolvimento/guardioes-app/feature/UpdateReadme/doc/gif-telas.gif" alt="Guardiões da Saúde">
</p>

## Como baixar a última versão do app

Por enquanto o procedimento funciona apenas para celulares android.

Entre em [releases](https://github.com/proepidesenvolvimento/guardioes-app/releases) e procure pelo link com uma tag verde chamada 'lastest release'. Ao encontrar, desinstale o aplicativo que já está no seu celular (caso exista) e baixe o arquivo 'app-release.apk'.

Possivelmente essa versão tem bugs que serão consertados no futuro e é instável, ou seja, pode dar erros.

## Ambiente de Desenvolvimento

### Baixando e Configurando Variáveis de Ambiente
1. Clone esse repositório em um local de sua preferência no seu computador
```shel
$ cd "diretorio de sua preferencia"
$ git clone https://github.com/proepidesenvolvimento/guardioes-app.git
```

2. Após clonar o repositório, crie um arquivo **.env** na pasta do projeto com as linhas:
```
API_URL = 
APP_ID =
```
*Esses dados estão disponíveis com algum desenvolvedor do app.*

### Instalando dependências  

1. Utilize o comando para instalar as dependências do projeto
```
$ npm install
```

### Se estiver no macOS com emulador do iOS
2. Acesse a pasta ios e rode o comando pod install:
```
$ cd ios
$ pod install
$ cd ..
```
Isso instalará dependências para o iOS

### Executando o Projeto

1. Por fim, para executar o projeto rode:

Se estiver no macOS:
```
$ react-native run-ios
```

Caso esteja no Windows ou Linux
```
$ npx react-native run-android
```

## Contribuindo

1. Fork project
2. Crie sua branch com feature (`git checkout -b feature/featureName`)
3. Commite suas mudanças (`git commit -am 'Add some feature'`)
4. Dê um push na branch (`git push origin feature/featureName`)
5. Crie o pull request

----
## License & copyright

ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo

Licensed under the [Apache License 2.0](LICENSE.md).
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
