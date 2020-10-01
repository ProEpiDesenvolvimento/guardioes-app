# Diagrama de Casos de Uso

![Diagrama de Cados de Uso](https://i.ibb.co/DkSXQnN/casos.png)

## Descrição dos Casos de Uso

### US01 - Logar no sistema
|                 |                                                                                  |
|:---------------:|:--------------------------------------------------------------------------------:|
|    Descrição    |                        Usuário realiza login no sistema.                         |
|     Atores      |                                     Usuário                                      |
|  Pré-condições  | Usuário deve acessar o aplicativo do sistema em um aparelho celular com internet |
|  Pós-condições  |       Usuário deve ter acesso às funcionalidades que caibam do sistema        |
| Fluxo Principal | 1. Usuário abre aplicativo <br> 2. Usuário digita login e senha <br> 3. Usuário clica em "Entrar"|
|Fluxo de exceções||

### US02 - Informar sobre saúde
|||
|:--:|:--:|
|Descrição| Usuário deve responder rapidamente uma pergunta: "como você está se sentindo hoje?"|
|     Atores      |                                   Usuário |
|Pré-condições| Usuário está logado no sistema|
|Pós-condições| Usuário receberá uma notificação do seu relato da pergunta|
|Fluxo Principal| 1. Usuário entra no sistema <br> 2. Usuário responde a pergunta clicando em "sim" ou  "não"|
|Fluxo de exceções||

### US03 - Visualizar alertas
|||
|:--:|:--:|
|Descrição| Usuário pode visualizar os alertas notificados pelo sistema sobre o seu status nos últimos dias|
|     Atores      |                                   Usuário, Sistema|
|Pré-condições| Usuário realizou US02 |
|Pós-condições| Os alertas da saúde do usuário irá informar o status dos últimos dias|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário realiza US02 <br> 3. Sistema informa status do usuário|
|Fluxo de exceções|1. Usuário não realiza US02|

### US04 - Visualizar estatísticas
|||
|:--:|:--:|
|Descrição|Usuário pode ver as estatísticas de sua saúde|
|     Atores      |                                   Usuário, Sistema |
|Pré-condições| Usuário realizou US02|
|Pós-condições|Usuário pode visualizar as estatísticas de sua saúde|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário realiza US02 <br> 3. Usuário clica na aba Diário <br> 4. Sistema calcula quantidade de respostas da US02 <BR> 5. Sistema gera estatísticas e informa ao usuário <br> 6. Usuário visualiza estatísticas|
|Fluxo de exceções|1. Usuário não realiza US02|

### US05 - Visualizar calendário

|||
|:--:|:--:|
|Descrição|Usuário pode visualizar calendário com as informações respondidas depois da US02 |
|     Atores      |                                   Usuário |
|Pré-condições|Usuário está logado no sistema|
|Pós-condições|Usuário pode visualizar as informações do mês do calendário, quando respondido US02, um círculo com a cor de sua resposta será marcado no dia com a resposta informada|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário realiza US02 <br> 3. Usuário clica na aba Diário <br> 4. Usuário visualiza calendário|
|Fluxo de exceções||

### US06 - Visualizar participações
|||
|:--:|:--:|
|Descrição|Usuário ver quantidade de participações que realizou|
|     Atores   | Usuário, Sistema |
|Pré-condições|Usuário realizou US02|
|Pós-condições|Usuário visualiza o número de partições que realizou em US02|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário realiza US02 <br> 3. Usuário clica na aba Diário <br> 4. Sistema calcula quantidade de participações <BR> 5. Sistema gera total de participações <br> 6. Usuário visualiza participações|
|Fluxo de exceções|1. Usuário não realiza US02|

### US07 - Visualizar dicas
|||
|:--:|:--:|
|Descrição|Usuário visualiza dicas do combate ao coronavírus|
|     Atores      | Usuário |
|Pré-condições|Usuário está logado no sistema|
|Pós-condições|Usuário pode ler dicas e informações a respeito do combate contra o corona vírus|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário clica em dicas <br> 3. Usuário seleciona dica desejada |
|Fluxo de exceções||

### US08 - Ver notícias
|||
|:--:|:--:|
|Descrição|Usuário visualiza notícias dos guardiões da saúde do combate ao coronavírus|
|     Atores      | Usuário |
|Pré-condições|Usuário está logado no sistema|
|Pós-condições|Usuário pode ler notícias sobre o combate contra o coronavírus|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário clica em notícias <br> 3. Usuário seleciona notícia desejada|
|Fluxo de exceções||


### US09 - Visualizar quantidade de sintomáticos
|||
|:--:|:--:|
|Descrição|Usuário visualiza a quantidade de pessoas e a porcentagem sintomáticas de uma determinada região|
|     Atores      |  Usuário, Sistema |
|Pré-condições|Usuário está logado no sistema|
|Pós-condições|Usuário pode ver a porcentagem e quantidade de pessoas com sintomas do coronavírus|
|Fluxo Principal|1. Usuário entra no sistema <br> 2. Usuário clica na aba Mapa <br> 3. Sistema calcula porcentagem de sintomáticos <BR> 4. Usuário visualiza porcentagem de sintomáticos em uma determina área|
|Fluxo de exceções||
