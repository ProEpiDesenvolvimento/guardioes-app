export default {
  lang: {
    code: 'en',
  },
  genderChoices: {
    cisWoman: 'Cis Woman',
    cisMan: 'Cis Man',
    transWoman: 'Trans Woman',
    transMan: 'Trans Man',
    nonBinary: 'Non Binary',
  },
  raceChoices: {
    white: 'White',
    indian: 'Indigenous',
    mix: 'Multiracial',
    black: 'Afrodescendant',
    asian: 'Asian',
  },
  selector: {
    label: 'Select',
    cancelButton: 'Cancel',
    groupError: 'You must select the group',
    codeError: 'You must enter the identification code',
    codeFormatError: 'The code must contain only digits',
  },
  birthDetails: {
    format: 'DD-MM-YYYY',
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
  },
  initialscreen: {
    welcome: 'Welcome',
    signup: 'Sign up',
    login: 'Login',
  },
  share: {
    riskGroupLabel: 'Is he/she part of the risk group?',
    educationalInstitution:
      'Is he/she a member of any educational institution?',
  },
  login: {
    title: 'Login',
    email: 'Email',
    password: 'Password',
    loginbutton: 'Login',
    forgetbutton: 'Forgot your password?',
    awesomeAlert: {
      accessing: 'Working',
    },
    errorMessages: {
      emailPwdWrong: 'Email or password invalid',
      emailPwdCantBeBlank: "Email or password can't be blank",
    },
  },
  register: {
    title: 'Sign up',
    name: 'Name:',
    gender: 'Gender:',
    race: 'Race:',
    birth: 'Birthdate:',
    country: 'Birth country:',
    originCountry: ' is your home country?',
    email: 'Email:',
    password: 'Password:',
    passwordCondition: 'Password must be at leats 8 characters long.',
    signupButton: 'Sign up',
    editProfile: 'Edit Profile',
    emptyName: 'Name cannot be empty',
    localRequired: 'State and City must be filled',
    nationalityRequired: 'Nationality cannot be left blank',
    nationalityRequired2:
      'We need your Nationality to show you information about your country',
    nameRequired: 'Name and date of birth must be completed\n',
    genderRequired: 'Race and gender must be filled in',
    kinshipRequired: 'Relationship must be completed',
    geralError: 'An error occurred, please try again later.',
    confirmDeleteUser: 'Delete user',
    confirmDeleteUser2: 'Do you want to delete this user?',
    selectImage: 'Select profile image',
    pickPhoto: 'Take a picture',
    library: 'Select from Gallery',
    removePhoto: 'Remove photo',
    fieldNotBlank: 'Fields cannot be empty',
    fieldNotBlank2:
      'Email\nPassword\n\nWe need this information to complete your registration',
    emptyDate: 'Date of birth must be completed',
    emptyLocation: 'State and City must be filled',
    shortPassword: 'Password must be at least 8 characters',
    awesomeAlert: {
      loading: 'Loading',
      registering: 'Working',
    },
    errorMessages: {
      error: 'Error',
      allFieldsAreFilled: 'All fields must be filled.',
    },
    riskGroupTitle: 'Risk Groups:',
    riskGroupMessage:
      '\t People over 60 years old or people of any age who have comorbidities, such as heart disease, diabetes, pneumopathy, neurological or kidney disease, immunodepression, obesity, asthma and postpartum women.',
    riskGroupButton: 'Back',
  },
  forgetPwd: {
    title: 'Forgot password',
    informEmail: 'Enter your email for verification:',
    sendButton: 'Send',
    invalidEmail: 'Invalid E-mail',
    tryAgain: 'Try again',
    differentsPass: "Passwords don't match!",
    passwordChanged: 'Reset Password',
  },
  noInternet: {
    noInternetConnection: 'No internet access.',
    ohNo:
      "Oh sorry, it seems that you don't have access to internet right now, try again soon, ok.",
    alertAllRightMessage: "Ok, i'll try later.",
  },
  ajuda: {
    title: 'Help',
    tutorialBtn: 'Tutorial',
    useTermsBtn: 'Terms and policies',
    aboutBtn: 'About',
  },
  tutorial: {
    title: 'Tutorial',
    tutorial: 'How to use the app',
    howToUse:
      '\nTo use the main functionality of the app, click the Good or Bad button on the home screen:',
    howToUse2:
      "If you choose Bad, you'll be able to choose symptoms and when it started. That's it, this is the core of it, if you want to learn more keep reading, we have other tips and functionalities.",
    news: 'News',
    newsCont:
      "Is where you'll read about all that's happening is this big world, it's a Twitter page so, if you have an account, you can interact with professionals.\n Since you're here, try checking it out. ",
    newsPs:
      "Ps: You don't need a Twitter account to see it and you won't get any notifications or email, we got you covered.",
    advices: 'Health Advices',
    advicesCont:
      'Here you find some important information to check out like Dengue fever, Chicungunya and Zika and, with Google Maps help you have quick access to a map with hospitals and pharmacies near you.',
    diary: 'Health Diary',
    diaryCont:
      "This is one the most important features, it's where you find information about all reports you've done, so you can check it out if you need to tell a doctor when symptons began, for example.",
    healthMap: 'Mapa da Saúde',
    healthMapCont:
      'No Mapa da Saúde se tem acesso à todos os envios feitos na sua região, isso, é claro, sem expor nenhum dado sensível dos usuários. Essa função ajuda o usuário a ter uma visão de como anda a saúde das pessoas a sua volta para que ela consiga até se prevenir. \
        Por exemplo, se você ver que em uma certa área tem muitos relatos de sintomas de gripe você pode tomar um suco de laranja, ou se tiver sintomas de Dengue você pode evitar passar no lugar.',
  },
  badReport: {
    title: 'What are you feeling?',
    sickAge: 'Since when have you been feeling bad?',
    symptoms: 'Select the symptoms you are feeling now:',
    answerQuestions: 'Anwser the following questions:',
    checkboxes: {
      first: 'Have you had contact with someone who had the same symptoms?',
      second: 'Did you look for a hospital service?',
      third: 'Have you left your place of residence for the past 14 days?',
      fourth: 'What country did you travel to?',
      fifth: 'Click on the flag to select!',
    },
    yes: 'Yes',
    checkboxConfirm: 'Confirm',
    alertMessages: {
      button: 'Show Map',
      sending: 'Sending...',
      thanks: 'Thanks!',
      reportSent: 'Your survey was sent!',
      reportNotSent:
        'You have already sent a survey today. Thanks for your contribution.',
      seeADoctor: 'We recommend that you seek medical help!',
      confirmText: 'Confirm',
      covidSuspect:
        'Download the Guardiões da Saúde and contribute to coping with Covid-19, access:\nPlay Store: https://play.google.com/store/apps/details?id=com.guardioesapp&hl=en\nApp Store: https://apps.apple.com/us/app/guardi%C3%B5es-da-sa%C3%BAde/id1450965975?l=en&ls=1\n\nDownload the app Coronavírus-SUS, access:\nPlay Store: https://play.google.com/store/apps/details?id=br.gov.datasus.guardioes&hl=en\nApp Store: https://apps.apple.com/br/app/coronav%C3%ADrus-sus/id1408008382\n\nDefinition of Close Contact: https://coronavirus.saude.gov.br/sobre-a-doenca#transmissao',
    },
  },
  advices: {
    moreInformations: 'More information',
    redirectPermission:
      'Do you want to be redirected to the source of the content?',
    title: 'Tips',
    subtitle: 'Keep your health up to date',
    more: 'See More',
    buttons: {
      messages: {
        title: 'Redirecting...',
        subtitle: 'Do you want to be redirected to Google Maps?',
      },
    },
  },
  diary: {
    title: 'Diary',
    year: ' year old',
    years: ' years old',
    participate: 'Participations',
    good: 'Good',
    bad: 'Bad',
    report: ' day',
    reports: ' days',
    statisticsTitle: 'Statistics',
    goodPercent: '% days - Good',
    badPercent: '% days - Bad',
    notInformed: '% days - Not Informed',
  },
  home: {
    title: 'Home',
    hello: 'Hi, ',
    nowAGuardian: 'Guardião da Saúde',
    addProfile: 'Add a Profile',
    alerts: 'Alerts',
    statusLast7Days: 'Status in the last 7 days:',
    statusLast7DaysGood: 'You have been feeling well.',
    statusLast7DaysBad: 'You were not feeling well.',
    userHowYouFelling: 'How are you feeling today?',
    offlineTitle: 'Offline Mode',
    offlineMessage: 'You are not connected to the internet.',
    offlineMessage2: 'The data may not be in sync and any changes you made will not be saved.',
  },
  profiles: {
    households: 'Relatives',
    title: 'Profiles',
    owner: 'Owner',
  },
  locationRequest: {
    permissionTitle: 'Allow the use of your location',
    permissionMessage:
      'Guardiões da Saúde needs access to your location ',
    permissionMessage2: 
      'so that you can submit your health status, view reports and access the Health Map.',
    cancelText: 'Cancel',
    okText: 'OK',
  },
  maps: {
    title: 'Health Map',
    guide: `Each point in the map represents a person or group of people.\n\nThe color represents the percentage of 'bads' and the size, the number of people.\n\nYou can tap the points to know more.`,
    confirmGuide: 'Okay!',
  },
  news: {
    title: 'News',
    openBrowser: 'Do you want to open the browser?',
    twitter: 'You will be redirected to twitter.com',
  },
  report: {
    goodChoice: 'Good',
    badChoice: 'Bad',
  },
  faq: {
    title: 'FAQ',
  },
  about: {
    title: 'About',

    tituloBtnUnb: 'Universidade de Brasilia',
    mensagemBtnUnb: `Do you want to be redirected to UnB's website?`,
    linkBtnUnb: 'https://www.unb.br',

    tituloBtnProEpi:
      'ProEpi - Associação Brasileira de Profissionais de Epidemiologia de Campo',
    mensagemBtnProEpi: `Do you want to be redirected to ProEpi's website?`,
    linkBtnProEPi: 'https://proepi.org.br/',

    textoSobreTitulo: '\nAbout Guardiões da Saúde\n',
    textoSobre:
      'The app "Guardiões da Saúde" was developed for phones and tablets using Android, in colaboration with the Health Minitry of Brasil and suport from Skoll Foundation for the Olympics. A new version is being develped by the University of Brasília and ProEpi. The National Institute of Health is cooperating so that the tool can also be used in Colombia as a strategy to strengthen this monitoring on events of interest in public health and the detection of outbreaks.',
    textoVigilancia:
      'A Vigilância Ativa Institucional tem o intuito de conhecer, monitorar e identificar a situação de saúde dos usuários do aplicativo, que pertencem a alguma instituição, com enfoque nos sintomas relatados da COVID-19. Assim, ao apresentar os sintomas, o mesmo receberá auxílio de especialistas da área de saúde via telefone.',
  },
  useTerms: {
    title: 'Terms and Policies',
    consentTitle: 'Our Terms and Privacy Policies have changed',
    consentMessage:
      'To continue using Guardiões da Saúde, you must accept the new terms. We take your privacy seriously.',
    seeTerms: 'Read Terms',
    agree: 'I agree',
    disagree: 'I refuse',
    terms: {
      textoTermosTitulo:
        'Por favor, leia estes termos legais de uso antes de usar o aplicativo "Guardiões da Saúde". Para realizar qualquer colaboração, acesse ou baixe qualquer informação deste aplicativo. Ao acessar ou usar o aplicativo "Guardiões da Saúde", você aceita e concorda em obedecer aos termos e condições estabelecidos nos "Termos de Uso". Esses termos consistem em um contrato de colaboração entre você e o aplicativo "Guardiões da Saúde", que abrange todo o seu acesso e uso, que inclui o uso de todas as informações, dados, ferramentas, produtos, serviços e outros conteúdos disponíveis no aplicativo. Ao usar este aplicativo, você confirma que entende e concorda com as seguintes condições:',
      textoTermos_1:
        '\n1. RESPEITO AS LEIS \n\n O usuário registrado deve acessar o aplicativo "Guardiões da Saúde" somente para fins legais e relacionados à saúde. O usuário concorda em usar o aplicativo apenas para os fins apropriados e de acordo com estes termos e limitações legais, bem como com qualquer política aplicável no Brasil. Seu acesso é proibido em territórios onde o conteúdo é considerado ilegal. Aqueles que optarem por acessar este site de outros lugares, o farão por sua própria iniciativa e serão responsáveis pelo cumprimento das leis locais aplicáveis. Os materiais não devem ser usados ou exportados em violação das leis brasileira. Qualquer pendência em relação aos materiais será resolvida pelas leis brasileira. A alteração não autorizada do conteúdo deste site é expressamente proibida.',
      textoTermos_2:
        '\n2. RESTRIÇÕES DE USO: \n\n O uso do aplicativo só é permitido para maiores de 13 (treze) anos.',
      textoTermos_3:
        '\n3. RESPONSABILIDADE PELO CONTEÚDO: \n\n Instituições e desenvolvedores do aplicativo "Guardiões da Saúde" não são responsáveis ​​pelo conteúdo de qualquer informação legal ou ilegal, possivelmente trocados pelos usuários através de redes sociais ou para a aplicação "Guardiões da Saúde". Os comentários compartilhados pelo usuário através das redes sociais não representam a opinião das instituições envolvidas no projeto e a responsabilidade cabe ao autor da mensagem. O usuário concorda que ele é o único responsável por sua própria conduta e pela veracidade das informações fornecidas durante o uso do serviço e que ele é responsável pelas consequências decorrentes do fornecimento intencional de dados incorretos. O usuário concorda que o uso do aplicativo "Guardiões da Saúde" não irá publicar, enviar, distribuir ou divulgar conteúdo ou informação difamatório, obsceno ou ilegal, incluindo informações confidenciais pertencentes a outras pessoas ou empresas e marcas registradas ou protegidas por direitos autorais, sem a autorização expressa do proprietário desses direitos. Ninguém pode agir em seu nome no uso do aplicativo "Guardiões da Saúde". Você é responsável pelo conteúdo que indivíduos não autorizados produzem ao usar este aplicativo usando seu perfil registrado com sua permissão. Essa regra não se aplica a casos de violação ou outros problemas de segurança do aplicativo.',
      textoTermos_4:
        '\n4. ACESSIBILIDADE AO CONTEÚDO: \n\n A equipe de aplicação "Guardiões da Saúde" não garante que este aplicativo seja parcial ou totalmente funcional para uso fora do território nacional. Se optar por aceder à aplicação de outros países, fá-lo-á por sua própria iniciativa e por sua conta e risco. Você é responsável pela conformidade com as leis locais e, na medida em que as leis locais são aplicáveis, você concorda especificamente em cumprir todas as leis aplicáveis relativas à transmissão de dados técnicos exportados desse local.',
      textoTermos_5:
        '\n5. PROPRIEDADE INTELECTUAL: \n\n O direito de autoria do conteúdo produzido e apresentado nesta aplicação pertence aos respectivos autores e colaboradores deste aplicativo. Esta premissa não se aplica a informações consideradas de domínio público ou de utilidade pública. Todas as outras marcas comerciais, marcas de serviço, nomes e logotipos que aparecem nesse aplicativo são de propriedade de seus respectivos proprietários.\n\n A aplicação "Guardiões da Saúde" é um software de código aberto usado por terceiros está sujeito aos termos da licença internacional http://opensource.org/licenses/gpl-3.0 GNU General Public License, versão 3 (GPL-3.0 ). Direitos de uso do conteúdo e relatórios gerados pelo aplicativo são atribuídos pelos desenvolvedores, especialmente os dos termos da licença Creative Commons http://creativecommons.org/licenses/by-nc/4.0/ - Atribuição - Não Comercial 4.0 Internacional http://creativecommons.org.br/as-licencas/attachment/by-nc/. \n\n Somente as informações fornecidas pelos serviços de saúde devem ser consideradas oficiais para divulgação pública no que tem a ver com os dados relacionados a esse tópico. Nenhuma das informações do aplicativo "Guardiões da Saúde", apesar do esforço da equipe para garantir a qualidade, a atualidade e a autenticidade das informações, deve ser considerada oficial para divulgação pública. Os dados coletados através do aplicativo "Guardiões da Saúde" são provenientes de usuários que voluntariamente forneceram as informações e que podem ser influenciados pela sua capacidade de acessar dispositivos móveis ou computadores com especificações tecnológicas mínimas. \n\n Dessa forma, as informações geradas a partir dessa estratégia podem ser insuficientes para representar estatisticamente o perfil epidemiológico real do período e do local do relato. A informação lúdica ou utilidade pública pode apresentar erros ou eventuais falhas de atualização, sendo recomendada sua validação pelos usuários em casos de emergência ou qualquer outra situação de ameaça à sua saúde ou integridade.',
      textoTermos_6:
        '\n6. LEIS, REGULAMENTOS, DIREITOS E DEVERES \n\n É política da equipe de aplicação "Guardiões da Saúde" cumprir todas as leis e regulamentos aplicáveis ​​e atuais. Caso qualquer disposição destes Termos de Uso esteja em conflito com qualquer lei ou regulamento aplicável, a lei ou regulamento aplicável substituirá a disposição contrária. Estes Termos de Uso e ao uso do aplicativo "Guardiões da Saúde" são e serão regidos e interpretados de acordo com as leis internas do Brasil, sem levar em conta as suas regras de conflito de leis. Em caso de qualquer conflito entre as leis, regras e regulamentos do Brasil e do exterior, as leis, regras e regulamentos do Brasil prevalecerão. A aplicação "Guardiões da Saúde" pode, mas não é necessária para monitorar, revisar e restringir o acesso a qualquer uma das áreas onde os usuários transmitem informações e pode retirar o acesso a qualquer desta informação ou comunicação. Se você tiver alguma dúvida sobre o aplicativo "Guardiões da Saúde", não hesite em nos contatar pelo e-mail: contato@proepi.org.br',
      textoTermos_7:
        '\n7. USO DE CONTRIBUIÇÕES: \n\n Ao enviar uma contribuição por escrito ou publicar informações no aplicativo "Guardiões da Saúde", você concede uma licença perpétua, isenta de royalties, licença incondicional para este aplicativo e qualquer organização sucessora, para publicar sua contribuição no aplicativo "Guardiões da Saúde". ", Bem como divulgá-lo, de forma agregada (nunca individual), exceto para usuários que permitirem a vigilância ativa institucional, a outros meios de comunicação, e discuti-lo ou referenciá-lo em quaisquer publicações oriundas do aplicativo "Guardiões da Saúde". Você também concorda que o aplicativo "Guardiões da Saúde" tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição, ou incluí-la no texto, em conjunto com outras contribuições, a critério exclusivo da equipe relacionada a essa aplicação.',
      textoTermos_8:
        '\n8. SEGURANÇA E GARANTIA DE PRIVACIDADE: \n\n O sigilo e a privacidade de todas as informações produzidas por você no aplicativo "Guardiões da Saúde" serão garantidos e o acesso às informações seguirá as regras fornecidas na Lei de Acesso à Informação. Reservamo-nos o direito de usar essas informações internamente e, neste escopo, sua contribuição será vinculada ao seu e-mail e será anônima para qualquer finalidade de análise dos dados. Informamos também que, para atender ao objetivo principal da aplicação, que é identificar aglomerados de indivíduos com sintomas, as informações sobre seu estado de saúde serão geolocalizadas através da captura do sinal GPS de seu dispositivo. O aplicativo "Guardiões da Saúde", seus colaboradores e usuários, incluindo agências governamentais e não governamentais, dependem dos usuários para a precisão das contribuições. A equipe não é responsável por erros ou imprecisões em qualquer envio. A deturpação deliberada de informações por um usuário pode constituir uma violação da lei e, se grave, será informada às autoridades governamentais apropriadas.',
      textoTermos_9:
        '\n9. ATUALIZAÇÃO DOS GUARDIÕES DE APLICAÇÃO EM SAÚDE: \n\n Pode haver modificações neste aplicativo e em seus Termos de Uso. A menos que você indique o contrário, seu uso do Webapp e do aplicativo indica a aceitação integral dos Termos de Uso nessa versão atual, toda vez que você usar o aplicativo. "Guardiões da Saúde". Fique atento às atualizações e, em caso de dúvida, os Termos de Uso estarão sempre disponíveis para acesso e acordo ou não.',
      textoTermos_10:
        '\n10. RESPONSABILIDADE POR AÇÕES COM BASE NO CONTEÚDO: \n\n O aplicativo "Guardiões da Saúde" não assume responsabilidade por nenhum dano e/ou dano a pessoas ou propriedades, como resultado de qualquer uso de ideias, conteúdo, instruções, métodos, produtos ou procedimentos contidos naquele aplicativo. Sob nenhuma circunstância os profissionais envolvidos com o desenvolvimento ou gerenciamento deste aplicativo serão responsabilizados por qualquer decisão ou ação tomada por você com base no referido conteúdo. Em face de ameaças ou qualquer outro risco para sua saúde ou integridade, sempre busque orientações validadas e atualizadas dos serviços locais de saúde pública.',
      textoTermos_11:
        '\n11. RESPONSABILIDADE POR PROBLEMAS TECNOLÓGICOS: \n\n Eventualmente, todo o conteúdo ou qualquer parte do aplicativo "Guardiões da Saúde" pode não estar disponível e pode não funcionar corretamente a qualquer momento. Faremos todos os esforços razoáveis ​​para evitar problemas tecnológicos, mas pode ocorrer a qualquer momento nesta aplicação problemas tecnológicos de diversas naturezas, tais como vírus, rotinas de programação nocivos ou problemas relacionados com o dispositivo. O Webapp e o aplicativo são fornecidos "como estão" e "conforme disponíveis". Sem limitar o nosso aviso geral, não garante a disponibilidade, integridade, oportunidade, funcionalidade, confiabilidade, seqüenciamento ou velocidade de entrega nesta aplicação ou qualquer parte do conteúdo. O aplicativo "Guardiões da Saúde" não é responsável por nenhum dano ou prejuízo causado pelo desempenho ou falha no desempenho de toda ou qualquer parte do aplicativo. O aplicativo "Guardiões da Saúde" não é responsável por qualquer defeito, atraso ou erro resultante do uso deste aplicativo. O uso de todas as funcionalidades da aplicação "Guardiões da Saúde" requer disponibilidade de acesso à Internet pelo usuário, através de rede wi-fi ou cabo de dados. A ausência desse pré-requisito pode limitar o uso do aplicativo com todo o seu potencial de uso. A equipe de aplicação dos "Guardiões da Saúde", considerando este aviso, não assume nenhuma responsabilidade como resultado dessa limitação. Este aviso aplica-se a todos e quaisquer danos, incluindo aqueles causados ​​por qualquer falha de desempenho, erro, omissão, interrupção, apagamento, defeito, atraso na operação ou transmissão, vírus de computador, falha na linha de comunicação, roubo, destruição ou acesso não autorizado a alteração ou utilização de qualquer propriedade, seja por violação de contrato, comportamento ilícito, negligência ou qualquer outra causa de ação.',
      textoTermos_12:
        '\n12. RESPONSABILIDADE POR INFORMAÇÕES DE TERCEIROS: \n\n A provisão através do Webapp e a aplicação de links e referências a outros sites, publicações ou recursos de informação não constituem endosso a esses sites ou seus recursos pelo aplicativo "Guardiões da Saúde", seus agentes ou representantes. A equipe de aplicação "Guardiões da Saúde" não faz representações ou afirmações sobre a qualidade, conteúdo e precisão das informações, serviços ou produtos que possam ser fornecidos por esses recursos e, especificamente, está isenta de quaisquer garantias, incluindo, mas não limitado a garantias implícitas ou expressas de comercialização ou adequação a qualquer uso, aplicação ou propósito específico.',
      textoTermos_13:
        '\n13. CONSIDERAÇÕES FINAIS \n\n O acesso ao serviço representa a aceitação expressa e irrestrita dos Termos de Uso descritos acima. Ao concordar com estes termos, você concede uma licença perpétua, isenta de royalties, licença incondicional para o aplicativo "Guardiões da Saúde" e todas as organizações sucessoras, para publicar sua contribuição de forma agregada, no próprio aplicativo, bem como divulgá-los aos serviços de vigilância de saúde pública relacionados. Você também concorda que o aplicativo "Guardiões da Saúde" tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição a critério exclusivo da equipe do aplicativo.\n',
    },
    compilation: 2,
  },
  vigilanceTerms: {
    title: 'POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS',
    text:
      '1. Armazenamento e Transferência de Dados:\n\n' +
      'O uso do APP e o registro ou apresentação de dados pessoais para o Guardião da saúde implica o consentimento do candidato para o tratamento automatizado dos dados pessoais fornecidos, bem como o envio de comunicações por via eletrônica com informações relacionadas com o Guardião da saúde Durante o processo de registro, o candidato consente que os dados são transferidos somente a terceiros envolvidos no projeto.\n\n' +
      "Para estes fins significa terceiro 'todos os profissionais para a vigilância ativa' em relação aos cuidados com a saúde.\n\n" +
      'O usuário que registra as informações, indicando seus sintomas e, por conseguinte, concorda expressamente, que seus dados (nome, e-mail e telefone) que fornece será utilizado no aplicativo, para os motores de busca com a finalidade da pesquisa da vigilância ativa que poderão ser fornecidas aos profissionais dos Guardião da Saúde no âmbito da prestação de informação referentes ao controle de doenças.\n\n' +
      'O usuário consente expressamente com a transferência de seus dados a empresas associadas ou pertencentes ao projeto. O aplicativo Guardião da Saúde utilizará os dados fornecidos para o envio de questionários e informação relacionadas aos interesses e perfil do usuário.\n\n' +
      'O usuário está ciente e concorda que todos os dados que nos fornece ou que forem gerados durante o seu relacionamento com o APP poderão ser compartilhados com parceiros da saúde, sempre para a finalidade de apoiar o controle de epidemias e doenças, realização de pesquisas direcionadas.\n\n' +
      'Os efeitos da presente autorização serão estendidos para as partes envolvidas no projeto Guardião da Saúde.\n\n' +
      '2. Segurança\n\n' +
      'A segurança de seus dados é muito importante para o APP Guardião da Saúde por isso o aplicativo adotou medidas técnicas e organizacionais de acordo com as regras estabelecidas para a segurança dos dados pessoais e evitar a sua alteração, perda, tratamento ou acesso não autorizado, tendo em conta o estado da tecnologia, a natureza dos dados armazenados e os riscos a que estão expostas.\n\n' +
      '3. Direito de acesso, alteração, oposição e cancelamento dos dados\n\n' +
      'O usuário tem o direito de ter acesso aos seus dados, a qualquer momento, para corrigi-los se os detalhes estiverem incorretos, alterar suas configurações de privacidade, se opor ao tratamento dos seus dados e cancelar a inscrição de serviços do APP Guardião da Saúde.\n\n' +
      'Esses direitos podem ser feitos através da própria configuração do aplicativo.\n\n' +
      '4. Modificação da política de privacidade e proteção de dados\n\n' +
      'O App Guardião da Saúde reserva se ao direito de modificar a presente política para adaptá-la para futuros desenvolvimentos legislativos ou jurisprudenciais. Qualquer mudança que não derivam de adaptação às alterações legislativas ou jurisprudenciais será anunciada no aplicativo ou, se significativas, comunicada por e-mail para os usuários.',
  },
  drawer: {
    reportRumor: 'Report Rumor',
    toEdit: 'Edit profiles',
    logOut: 'Logout',
    app: 'App',
    toSurveillance: 'Active Surveillance',
    share: 'Share',
    shareLink: 'Guardiões da Saúde\nhttps://linktr.ee/guardioesdasaude\n',
    toHelp: 'Help',
    toFAQ: 'FAQ',
    participateSuccess: "You're already participating!",
    participateQuestion: 'Do you want to participate?',
    confirmRead:
      'I confirm that I have read the information and am aware of the changes that will be made after confirmation',
    cancelParticipation: 'Cancel Participation',
    participate: 'Participate',
  },
  map: {
    people: 'People: ',
    symptomatic: 'Symptomatic: ',
    noLocal: "These people didn't share your location",
    alert: 'Alert Contacts',
    share:
      "Do you want to share an announcement with people you've had contact with?",
    noAlert: 'No, I will warn you later',
  },
  rumor: {
    title: 'Rumor',
    rumorSent: 'Rumor registered! ',
  },
  getToken: {
    title: 'Verification Code',
    invalidCode: 'Invalid Code',
    confirm: 'Confirm',
    loading: 'Loading',
    verificationCodeSent: 'A verification code was sent to your email.',
    spamCheckWarning:
      "In case you don't find the email, make sure to check the spam folder.",
    inputVerificationCode: 'Code',
  },
  changePwd: {
    title: 'Reset Password',
    newPwd: 'New password',
    confirmPwd: 'Confirm password',
    changeButton: 'Change',
    errorMessages: {
      shortPwd: 'Password must be at least 8 characters long',
    },
  },
};
