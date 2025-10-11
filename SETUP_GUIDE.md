# Guia de Configuração - Projeto Guardiões da Saúde

## 📋 Resumo dos Problemas Encontrados

Este documento detalha os problemas encontrados ao configurar o projeto React Native "Guardiões da Saúde" e as soluções aplicadas, além de recomendações para evitar esses problemas no futuro.

## 🚨 Problemas Identificados

### 1. **Conflito de Compatibilidade Java/Gradle**
- **Problema**: Java 11 instalado com Gradle 5.5 (incompatível)
- **Sintoma**: `Unsupported class file major version 61`
- **Causa**: Gradle 5.5 não suporta Java 11

### 2. **Build Tools Corrompidos**
- **Problema**: Android Build Tools 33.0.0 corrompido
- **Sintoma**: `Build Tools revision 33.0.0 is corrupted`
- **Causa**: Instalação incompleta ou corrompida

### 3. **Conflitos de Classes R**
- **Problema**: Classes R duplicadas durante minificação
- **Sintoma**: `Type androidx.transition.R is defined multiple times`
- **Causa**: Conflitos entre bibliotecas AndroidX

### 4. **Configuração Incorreta do jenv**
- **Problema**: JAVA_HOME apontando para Java 17, mas sistema usando Java 11
- **Sintoma**: Comandos executando com versão errada do Java

## ✅ Soluções Aplicadas

### 1. **Atualização do Gradle**
```bash
# Antes: gradle-5.5-all.zip
# Depois: gradle-6.7.1-all.zip
```
**Arquivo**: `android/gradle/wrapper/gradle-wrapper.properties`

### 2. **Atualização do Android Gradle Plugin**
```gradle
// Antes: classpath("com.android.tools.build:gradle:3.5.0")
// Depois: classpath("com.android.tools.build:gradle:4.2.2")
```
**Arquivo**: `android/build.gradle`

### 3. **Mudança de Build Tools**
```gradle
// Antes: buildToolsVersion = "33.0.0"
// Depois: buildToolsVersion = "30.0.2"
```
**Arquivo**: `android/build.gradle`

### 4. **Desabilitação da Minificação para Debug**
```gradle
debug {
    signingConfig signingConfigs.debug
    minifyEnabled false  // Era: enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
}
```
**Arquivo**: `android/app/build.gradle`

### 5. **Uso do jenv para Gerenciar Java**
```bash
# Configuração correta do jenv
jenv exec npx react-native run-android
```

### 6. **Remoção de Opções Depreciadas**
```properties
# Removido: android.enableR8=false
```
**Arquivo**: `android/gradle.properties`

## 🎯 Abordagens Ideais (Sem Downgrades)

### 1. **Manter Compatibilidade de Versões**

#### **Configuração Ideal do Gradle:**
```properties
# Para React Native 0.64.4 + Java 11
distributionUrl=https\://services.gradle.org/distributions/gradle-6.9-all.zip
```

#### **Android Gradle Plugin Compatível:**
```gradle
classpath("com.android.tools.build:gradle:4.2.2")
```

### 2. **Configuração Correta do Ambiente**

#### **Java Version Manager (jenv):**
```bash
# Instalar Java 11
brew install openjdk@11

# Configurar jenv
jenv add /usr/local/opt/openjdk@11
jenv local 11

# Verificar configuração
jenv exec java -version
```

#### **Variáveis de Ambiente:**
```bash
export JAVA_HOME=$(jenv javahome)
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 3. **Instalação do Watchman**

#### **Instalação via Homebrew (macOS):**
```bash
# Instalar Watchman
brew install watchman

# Verificar instalação
watchman --version
```

#### **Instalação via npm (alternativa):**
```bash
# Instalação global
npm install -g watchman

# Verificar instalação
watchman --version
```

#### **Por que o Watchman é necessário:**
- **File watching** para hot reload
- **Performance** melhorada no Metro bundler
- **Compatibilidade** com React Native
- **Detecção de mudanças** em arquivos

### 4. **Configuração Correta do Android SDK**

#### **Build Tools Recomendados:**
```bash
# Instalar versões estáveis
sdkmanager "build-tools;30.0.3"
sdkmanager "platform-tools"
sdkmanager "platforms;android-33"
```

#### **Verificação de Integridade:**
```bash
# Verificar se build-tools estão íntegros
ls -la $ANDROID_HOME/build-tools/30.0.3/
```

### 4. **Configuração de Proguard/R8**

#### **Para Debug (sem minificação):**
```gradle
debug {
    minifyEnabled false
    shrinkResources false
}
```

#### **Para Release (com minificação otimizada):**
```gradle
release {
    minifyEnabled true
    shrinkResources true
    proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
}
```

### 5. **Configuração de Dependências**

#### **Resolução de Conflitos:**
```json
{
  "resolutions": {
    "react": "17.0.1",
    "react-native": "0.64.4"
  }
}
```

#### **Instalação com Flags Corretas:**
```bash
npm install --legacy-peer-deps
# ou
yarn install --ignore-engines
```

## 🔧 Scripts de Desenvolvimento

### **Scripts Adicionados ao package.json:**
```json
{
  "scripts": {
    "start:legacy": "NODE_OPTIONS=--openssl-legacy-provider react-native start",
    "android:legacy": "NODE_OPTIONS=--openssl-legacy-provider react-native run-android"
  }
}
```

### **Uso dos Scripts:**
```bash
# Desenvolvimento completo
npm run start:legacy    # Terminal 1
npm run android:legacy  # Terminal 2

# Ou usando jenv (recomendado)
jenv exec npm run android
```

## 📝 Checklist de Configuração Ideal

### **Pré-requisitos:**
- [ ] Node.js 16.x ou 18.x (LTS)
- [ ] Java 11 (via jenv)
- [ ] **Watchman** (para file watching)
- [ ] Android SDK com Build Tools 30.0.3+
- [ ] Gradle 6.9+
- [ ] Android Gradle Plugin 4.2.2+

### **Configuração do Projeto:**
- [ ] Arquivo `.env` com variáveis necessárias
- [ ] Dependências instaladas com `--legacy-peer-deps`
- [ ] Configuração correta do `jenv`
- [ ] Build Tools íntegros e funcionais
- [ ] Minificação desabilitada para debug

### **Verificação Final:**
- [ ] `jenv exec java -version` mostra Java 11
- [ ] `adb devices` lista dispositivos
- [ ] `npm run android` executa sem erros
- [ ] App inicia no emulador/dispositivo

## 🚀 Recomendações para Novos Projetos

### 1. **Usar Versões LTS**
- Node.js 18.x LTS
- Java 11 ou 17 LTS
- React Native 0.72+ (mais recente)

### 2. **Configurar Ambiente Corretamente**
```bash
# Usar nvm para Node.js
nvm install 18
nvm use 18

# Usar jenv para Java
jenv add /usr/local/opt/openjdk@11
jenv local 11
```

### 3. **Manter Dependências Atualizadas**
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar React Native
npx react-native upgrade
```

### 4. **Usar Ferramentas de Desenvolvimento**
- **Android Studio** para gerenciar SDK
- **jenv** para gerenciar versões Java
- **nvm** para gerenciar versões Node.js

## 🔍 Troubleshooting Comum

### **Erro: "Unsupported class file major version"**
```bash
# Solução: Verificar versão do Java
jenv exec java -version
# Deve mostrar Java 11
```

### **Erro: "Build Tools corrupted"**
```bash
# Solução: Reinstalar build-tools
rm -rf $ANDROID_HOME/build-tools/33.0.0
sdkmanager "build-tools;30.0.3"
```

### **Erro: "Classes R defined multiple times"**
```gradle
// Solução: Desabilitar minificação para debug
debug {
    minifyEnabled false
}
```

### **Erro: "Gradle version incompatible"**
```properties
# Solução: Atualizar Gradle
distributionUrl=https\://services.gradle.org/distributions/gradle-6.9-all.zip
```

### **Erro: "Watchman not found" ou problemas de hot reload**
```bash
# Solução: Instalar Watchman
brew install watchman

# Verificar se está funcionando
watchman --version
watchman watch-list
```

### **Erro: "Metro bundler not detecting changes"**
```bash
# Solução: Reiniciar Watchman
watchman shutdown-server
watchman watch-del-all

# Reiniciar Metro
npx react-native start --reset-cache
```

## 📚 Referências

- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Android Gradle Plugin Compatibility](https://developer.android.com/studio/releases/gradle-plugin)
- [jenv Documentation](https://www.jenv.be/)
- [Gradle Compatibility Matrix](https://docs.gradle.org/current/userguide/compatibility.html)

---

**Criado em**: $(date)  
**Versão do Projeto**: 3.4.3  
**React Native**: 0.64.4  
**Status**: ✅ Funcionando
