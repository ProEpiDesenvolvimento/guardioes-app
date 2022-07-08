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
        codeLengthError: 'The code must contain exactly ',
        codeLengthError2: ' digits',
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
    forgetPwd: {
        title: 'Forgot password',
        informEmail: 'Enter your email for verification:',
        sendButton: 'Send',
        invalidEmail: 'Invalid E-mail',
        tryAgain: 'Try again',
        differentsPass: "Passwords don't match!",
        passwordChanged: 'Reset Password',
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
    register: {
        title: 'Sign up',
        name: 'Name:',
        gender: 'Gender:',
        race: 'Race:',
        birth: 'Birthdate:',
        country: 'Birth country:',
        residence: 'Home country:',
        originCountry: ' is your birth country?',
        email: 'Email:',
        password: 'Password:',
        passwordCondition: 'Password must be at leats 8 characters long.',
        signupButton: 'Sign up',
        editProfile: 'Edit Profile',
        emptyName: 'Name cannot be left blank',
        emptyDate: 'Date of birth cannot be left blank',
        emptyLocation: 'State and City must be filled in',
        emptyResidence: 'Home country cannot be left blank',
        emptyResidence2:
            'We need your home country to show you information about it',
        nationalityRequired: 'Birth country cannot be left blank',
        kinshipRequired: 'Relationship cannot be left blank',
        phoneRequired: 'Phone number cannot be left blank',
        categoryRequired: 'Category cannot be left blank',
        geralError: 'An error occurred, please try again later.',
        confirmDeleteUser: 'Delete profile',
        confirmDeleteUser2: 'Do you want to delete this profile?',
        selectImage: 'Select profile image',
        pickPhoto: 'Take a picture',
        library: 'Select from Gallery',
        removePhoto: 'Remove photo',
        updatedPhoto: 'Profile photo updated',
        removedPhoto: 'Profile photo removed',
        fieldNotBlank: 'Fields cannot be empty:',
        fieldNotBlank2:
            'Email\nPassword\n\nWe need this information to complete your registration',
        shortPassword: 'Password must be at least 8 characters',
        awesomeAlert: {
            loading: 'Loading',
            registering: 'Working',
        },
        errorMessages: {
            error: 'Error',
            allFieldsAreFilled: 'All fields must be filled in correctly',
        },
        healthProfessional: 'Are you a health professional?',
        riskGroupLabel: 'Is part of the risk group?',
        institution: 'Is a member of any institution?',
        vaccination: 'Do you have vaccination data?',
        idCode: 'Identification code:',
        riskGroupTitle: 'Risk Groups:',
        riskGroupMessage:
            '\t People over 60 years old or people of any age who have comorbidities, such as heart disease, diabetes, pneumopathy, neurological or kidney disease, immunodepression, obesity, asthma and postpartum women.',
        genderTitle: 'Gender',
        genderMessage:
            'Cisgender (or cis) are people whose gender identity matches the one assigned at birth.\n\n' +
            'Transgender (or trans) are people whose gender identity is the opposite of biological sex.\n\n' +
            'Non-binary are people whose gender identity is not established.',
        modalButton: 'Back',
    },
    ajuda: {
        title: 'Help',
        faqBtn: 'FAQ',
        tutorialBtn: 'Tutorial',
        useTermsBtn: 'Terms and policies',
        aboutBtn: 'About',
    },
    tutorial: {
        title: 'Tutorial',
        tutorial: 'How to use the app',
        howToUse:
            '\nThe basic functionality of Guardians of Health (GdS) is health reporting. It can be found on the Home page, but there are other features. If you want to learn more, read on.',
        home: 'Home page',
        homeCont:
            "On this tab you can select how you are feeling (good or bad). If it's bad you can mark the symptoms and signal how long it's been in if so.\n\nYou can also customize your GdS by putting your photo on the icon next to your name (remembering that the photo is not permanently saved in the app, so if you log out of your account you will need to insert your photo again).",
        news: 'News',
        newsCont:
            'The news screen is the last option you find at the start of the app. In this part are daily news about the pandemic and health in general. Take advantage that you are already here and take a look at what we have prepared there! To access the tab it is not necessary to have a Twitter account or to establish a link (you will not receive any type of notification or email).',
        newsPs:
            "PS: you don't need to have a Twitter account and you won't receive any kind of notification or email.",
        advices: 'Health Advices',
        advicesCont:
            'The tips tab is an important tool for you to learn more about your health, it is updated twice a month and has information about vaccines, useful links, how to prevent a pandemic and much more.',
        diary: 'Health Diary',
        diaryCont:
            "This is one of the most important features of the app, there you can view through the health calendar and the pie chart all the reports you have done daily.\n\nYou can use your health calendar if you need this data to clarify something in a doctor's appointment.",
        healthMap: 'Health Map',
        healthMapCont:
            'This tab will show how people in your region are feeling. Each point on the map represents a person or group of people.',
        healthMapCont2:
            'By clicking on any point on the map you can see the health status of people who reported in that region. No sensitive user data is exposed.',
        healthMapCont3:
            'This function helps you get an insight into the health of people around you and where you plan to go.\n\nIf you see that in a certain area there are many reports of symptoms of COVID-19 you can avoid passing by instead, postpone your trip to the location or redouble the prevention measures when passing in these regions',
    },
    badReport: {
        title: 'What are you feeling?',
        sickAge: 'Since when have you been feeling bad?',
        symptoms: 'Select the symptoms you are feeling now:',
        answerQuestions: 'Anwser the following questions:',
        checkboxes: {
            first:
                'Have you had contact with someone who had the same symptoms?',
            second: 'Did you look for a hospital service?',
            third: 'Were you at the ',
            thirdContinuation: ' 2 days before or after the onset of symptoms?',
            fourth: 'What country did you travel to?',
            fifth: 'Click on the flag to select!',
        },
        yes: 'Yes',
        checkboxConfirm: 'Confirm',
        messages: {
            button: 'Show Map',
            sending: 'Sending...',
            thanks: 'Thanks!',
            reportSent: 'Your survey was sent!',
            oops: 'Oops!',
            reportSent2:
                'You have already sent a survey through this option today.',
            reportNotSent:
                'There was an error submitting your survey. Try again later.',
            seeADoctor: 'We recommend that you seek medical help!',
            confirmText: 'Confirm',
            covidSuspect:
                'Download the Guardiões da Saúde and contribute to coping with Covid-19, access:\nPlay Store: https://play.google.com/store/apps/details?id=com.guardioesapp&hl=en\nApp Store: https://apps.apple.com/us/app/guardi%C3%B5es-da-sa%C3%BAde/id1450965975?l=en&ls=1\n\nDownload the app Coronavírus-SUS, access:\nPlay Store: https://play.google.com/store/apps/details?id=br.gov.datasus.guardioes&hl=en\nApp Store: https://apps.apple.com/br/app/coronav%C3%ADrus-sus/id1408008382\n\nDefinition of Close Contact: https://coronavirus.saude.gov.br/sobre-a-doenca#transmissao',
        },
        reportWithoutSymptom: {
            title: "It isn't possible to send",
            message: 'Select at least 1 symptom',
        },
    },
    advices: {
        moreInformations: 'More information',
        redirectPermission:
            'Do you want to be redirected to the source of the content?',
        title: 'Tips',
        subtitle: 'Keep your health up to date',
        empty: 'No tips for your country',
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
        participations: 'Participations',
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
        nowAGuardian: 'Health Guardian',
        addProfile: 'Add a Profile',
        alerts: 'Alerts',
        statusLast7Days: 'Status in the last 7 days:',
        statusLast7DaysGood: 'You have been feeling well',
        statusLast7DaysBad: 'You were not feeling well',
        vaccination: 'Vaccination:',
        vaccinationData: 'Update your vaccination information',
        bioSecurity: 'Biosecurity:',
        bioSecurityQuestions: 'Answer questions about your institution',
        userHowYouFelling: 'How are you feeling today?',
        offlineTitle: 'Offline Mode',
        offlineMessage: 'You are not connected to the internet.',
        offlineMessage2:
            'The data may not be in sync and any changes you made will not be saved.',
    },
    profiles: {
        households: 'Relatives',
        title: 'Profiles',
        owner: 'Owner',
    },
    locationRequest: {
        permissionTitle: 'Allow the use of your location',
        permissionMessage: 'Guardiões da Saúde needs access to your location ',
        permissionMessage2:
            'so that you can submit your health status, view reports and access the Health Map.',
        errorTitle: 'Error getting your location',
        errorMessage:
            'Please allow the use of location in your device settings.',
        cancelText: 'Cancel',
        okText: 'OK',
    },
    maps: {
        title: 'Health Map',
        guide:
            "Each point in the map represents a person or group of people.\n\nThe color represents the percentage of 'bads' and the size, the number of people.\n\nYou can tap the points to know more.",
        confirmGuide: 'Okay!',
    },
    news: {
        title: 'News',
        subtitle: 'Tweets feed of Guardiões',
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
        mensagemBtnUnb: "Do you want to be redirected to UnB's website?",
        linkBtnUnb: 'https://www.unb.br',
        tituloBtnProEpi:
            'ProEpi - Associação Brasileira de Profissionais de Epidemiologia de Campo',
        mensagemBtnProEpi: "Do you want to be redirected to ProEpi's website?",
        linkBtnProEPi: 'https://proepi.org.br/',
        textoSobreTitulo: '\nAbout Guardiões da Saúde\n',
        textoSobre:
            'The app "Guardiões da Saúde" was developed for phones and tablets using Android, in colaboration with the Health Minitry of Brasil and suport from Skoll Foundation for the Olympics. A new version is being develped by the University of Brasília and ProEpi. The National Institute of Health is cooperating so that the tool can also be used in Colombia as a strategy to strengthen this monitoring on events of interest in public health and the detection of outbreaks.',
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
                '\nBem-vindo ao Guardiões da Saúde!\nConvidamos você para acessar nosso aplicativo e usar de nossos serviços, porém antes de utilizar nosso aplicativo é necessário que você leia, entenda e concorde com nossos Termos de Uso e com nossa Política de Uso de Dados Pessoais.\n\nEste termo descreve detalhadamente os seus direitos e nossos direitos em relação a utilização dos serviços que disponibilizamos através de nosso aplicativo.\n\nPortanto, leia estes termos cuidadosamente, antes de fazer o uso do aplicativo, caso você não concorde com estes nossos Termos de Uso ou ainda, não concorde com a nossa Política de Uso de Dados Pessoais, você não poderá acessar ou utilizar os serviços do aplicativo Guardiões da Saúde.',
            textoTermos_1:
                '\n1. DA ACEITAÇÃO DOS TERMOS DE USO\n\nEste termo constitui um contrato entre as partes, aplicam-se a qualquer pessoa física ou pessoa jurídica interessada em fazer o uso do aplicativo, caso você não concorde com nossa política de “Termos de uso” ou ainda nossa “Política de Uso de Dados Pessoais”, não utilize o aplicativo.\n\nAo se cadastrar em nosso aplicativo sempre será requerido ao usuário a autorização e o consentimento para coleta do uso de dados pessoais, caso você usuário não autorize a coleta e o tratamento de seus dados pessoais não será possível usar nosso aplicativo, pois o consentimento expresso é condição indispensável para uso do aplicativo.\n\nAssim, ao utilizar os nossos serviços, você reconhece, aceita e concorda com todas as provisões da nossa Política de uso de dados pessoais, incluindo, sem limitação, o uso e tratamento de suas informações de conta e seu conteúdo de acordo com nossa política.',
            textoTermos_2:
                '\n2. RESTRIÇÕES DE USO\n\nEste aplicativo não deve ser usado por pessoas menores de 12 anos sem o consentimento de seus pais ou responsáveis, sendo que o seu uso por crianças e adolescentes de acordo com previsão do Estatuto da Criança e do Adolescente - ECA, deverá ocorrer sob orientação dos pais ou responsável.\nO aplicativo também não deve ser utilizado por aqueles usuários que não concordem com os termos de uso do aplicativo ou sua política de uso de dados pessoais.',
            textoTermos_3:
                '\n3. RESPONSABILIDADE PELO CONTEÚDO\n\nO “Guardiões da Saúde” não é responsável pelo conteúdo de quaisquer informações eventualmente trocadas pelos usuários entre si, ou para o “Guardiões da Saúde”, sejam elas lícitas ou ilícitas;\n\nVocê usuário concorda que é o único responsável pela sua própria conduta e pela veracidade das informações fornecidas ao utilizar o aplicativo e que é responsável pelas consequências que resultem do fornecimento intencional de dados incorretos ou inverídicos.\n\nO usuário concorda que ao usar o aplicativo não publicará, enviará, distribuirá ou divulgará conteúdo ou informações de caráter difamatório, obsceno ou ilícito, inclusive informações de propriedades exclusivas pertencentes a outras pessoas ou empresas, bem como marcas registradas ou informações protegidas por direitos autorais, sem a expressa autorização do detentor desses direitos.\n\nNinguém pode agir em seu nome para o uso do “Guardiões da Saúde”. O usuário é responsável pelo conteúdo que outros indivíduos, autorizados por ele, produzirem ao usar o aplicativo cadastrado em seu perfil. Essa regra não se aplica aos casos de violação (utilização não autorizada) ou outros problemas de segurança do aplicativo.\n\nO “Guardiões da Saúde” ou seus mantenedores não assumem responsabilidade por quaisquer prejuízos e/ou danos a pessoas ou bens, em consequência de qualquer utilização das ideias, conteúdos, instruções, métodos, produtos ou procedimentos contidos neste aplicativo.\n\nEm hipótese alguma os profissionais envolvidos com o desenvolvimento ou gestão desse aplicativo serão responsabilizados por qualquer decisão ou ação tomada pelo usuário com base no conteúdo do “Guardiões da Saúde”.',
            textoTermos_4:
                '\n4. PROPRIEDADE INTELECTUAL:\n\nA propriedade intelectual produzida e apresentada por meio do aplicativo Guardiões da Saúde é de propriedade exclusiva da ASSOCIAÇÃO     BRASILEIRA      DE PROFISSIONAIS DE EPIDEMIOLOGIA DE CAMPO – ProEpi e aos que atuarem como colaboradores no desenvolvimento e atualização deste aplicativo. \n\nA aplicação “Guardiões da Saúde” é um software de código aberto usado por terceiros e está sujeito aos termos da licença internacional http://opensource.org/licenses/gpl-3.0 GNU General Public License, versão 3 (GPL-3.0). Os direitos e uso do conteúdo e dos relatórios gerados pelo aplicativo são cedidos pelos desenvolvedores, em especial aqueles que decorrem dos termos da licença Creative Commons – Atriubuição-NãoComercial 4.0 internacional.\n\nO USUÁRIO não adquire, pelo presente instrumento ou pela utilização do APLICATIVO, nenhum direito de propriedade intelectual ou outros direitos exclusivos, incluindo patentes, desenhos, marcas, direitos autorais ou quaisquer direitos sobre informações confidenciais ou segredos de negócio, bem como todo conteúdo disponibilizado no aplicativo mobile, incluindo, mas não se limitando a textos, gráficos, imagens, logotipos, ícones, fotografias, conteúdo editorial, notificações, softwares e qualquer outro material, sobre ou relacionados ao APLICATIVO ou nenhuma parte dele.\n\nO USUÁRIO também não adquire nenhum direito sobre ou relacionado ao aplicativo ou qualquer componente dele, além dos direitos expressamente licenciados ao USUÁRIO sob o presente contrato ou em qualquer outro contrato mutuamente acordado por escrito entre o USUÁRIO e a PROEPI. \n\nQuaisquer direitos não expressamente concedidos sob o presente instrumento são reservados. Também será de propriedade exclusiva da ProEpi ou está devidamente licenciado, todo o conteúdo disponibilizado no aplicativo mobile, incluindo, mas não se limitando a, textos, gráficos, imagens, logos, ícones, fotografias, conteúdo editorial, notificações, softwares e qualquer outro material.',
            textoTermos_5:
                '\n5. DO PREÇO\n\nO Cadastro de USUÁRIOS no APLICATIVO é gratuito, bem como o seu uso.',
            textoTermos_6:
                '\n6. DAS PROIBIÇÕES AO USUÁRIO\n\nEm hipótese alguma é permitido ao USUÁRIO ou a terceiros por ele autorizados, de forma geral:\n\na) Copiar, ceder, sublicenciar, vender, dar em locação ou em garantia, reproduzir, doar, alienar de qualquer forma, transferir total ou parcialmente, sob quaisquer modalidades, gratuita ou onerosamente, provisória ou permanentemente, o APLICATIVO objeto deste CONTRATO, assim como seus módulos, partes, manuais ou quaisquer informações a ele relativas;\n\nb) Retirar ou alterar, total ou parcialmente, os avisos de reserva de direito existente no APLICATIVO e na documentação;\n\nc) Praticar engenharia reversa, descompilação ou desmontagem do APLICATIVO.',
            textoTermos_7:
                '\n7. DA INSENÇÃO DE RESPONSABILIDADE DA PROEPI\n\nA ProEpi não se responsabiliza:\na. Por falha de operação, operação por pessoas não autorizadas ou qualquer outra causa em que não exista culpa da PROEPI;\nb. Por problemas definidos como “caso fortuito” ou “força maior”, contemplados pelo Art. 393 do Código Civil Brasileiro;\nc. Por eventuais problemas oriundos de ações de terceiros que possam interferir na qualidade do serviço;',
            textoTermos_8:
                '\n8. DAS SANÇÕES\n\nSem prejuízos das demais medidas legais cabíveis, a PROEPI, poderá a qualquer momento, independente de autorização ou notificação prévia, advertir, suspender, eliminar contas de usuários que:\n1. violar quaisquer dispositivos deste “Termos de Uso” ou nossa “Política de Uso de Dados Pessoais”;\n\n2. descumprir seus deveres de usuário, incluir informações falsas no seu cadastro, informar dados falsos ou ainda promover ações para provocar o mau funcionamento do aplicativo;\n\n3. que tiver comportamento incompatível com a boa-fé contratual, bem como comportamento que ofenda a terceiros, comentários de cunho ofensivo cujo o conteúdo seja ligado a raça, cor, orientação sexual, religiosa ou ainda de qualquer outra característica com finalidade preconceituosa;\n\n4. usar o aplicativo para fins ilícitos ou mesmo finalidade divergente da pretendida por seus idealizadores;',
            textoTermos_9:
                '\n9. RESPONSABILIDADE POR PROBLEMAS TECNOLÓGICOS:\n\nPoderá ocorrer eventualmente, a indisponibilidade de todo conteúdo ou parte dele no “Guardiões da Saúde”, podendo ainda não funcionar corretamente em algum momento. Fazemos esforços razoáveis para evitar problemas tecnológicos, mas falhas podem ocorrer nesse aplicativo, por problemas tecnológicos das mais diversas naturezas, tais como vírus, rotinas de programação prejudiciais ou problemas relacionados ao aparelho do usuário;\nO “Guardiões da Saúde” não se responsabiliza por qualquer dano ou prejuízo causado pelo desempenho ou falha no desempenho de toda ou qualquer parte do aplicativo. O “Guardiões da Saúde” não se responsabiliza por quaisquer defeitos, atrasos ou erros resultantes da utilização deste aplicativo pelo usuário;\nO uso de todas as funcionalidades da aplicação “Guardiões da Saúde” requer disponibilidade de acesso à Internet pelo usuário, através de rede wi-fi ou cabo de dados. A ausência desse pré-requisito pode limitar o uso do aplicativo com todo o seu potencial de uso. A equipe de aplicação dos “Guardiões da Saúde”, considerando este aviso, não assume nenhuma responsabilidade como resultado dessa limitação. A isenção de responsabilidade aplica-se a todos e quaisquer danos ou prejuízos, incluindo aqueles causados por qualquer falha de desempenho, erro, omissão, interrupção, apagamento, defeito, atraso na operação ou transmissão, vírus de computador, falha de linha de comunicação, roubo, destruição ou acesso não autorizado, a alteração ou uso do aplicativo, seja por violação de contrato, comportamento ilícito, negligência ou qualquer outra causa de ação;',
            textoTermos_10:
                '\n10. DA ATUALIZAÇÃO DO “GUARDIÕES DA SAÚDE”\n\nAs modificações desse aplicativo, de seu Termos de Uso e/ou Política de Uso de Dados Pessoais poderão ocorrer e independem de aviso prévio. O usuário deve ficar atento as atualizações e, em caso de dúvida, os “Termos de Uso” estarão sempre disponíveis para acesso e concordância ou não\nA menos que indique o contrário, uso do aplicativo indica a aceitação integral destes termos na versão vigente (atualizada) cada vez que o usuário usar o “Guardiões da Saúde”.',
            textoTermos_11:
                '\n11. CONSIDERAÇÕES FINAIS:\n\nO acesso ao aplicativo representa a aceitação expressa e irrestrita dos Termos de Uso acima descritos. \nAo concordar com esses termos o usuário concede uma licença perpétua, isenta de royalties, licença incondicional para o “Guardiões da Saúde”, mantido pela Associação Brasileira de Profissionais de Epidemiologia de Campo - ProEpi e todas as organizações sucessoras, para publicar a sua contribuição de forma agregada, nunca individualizada, no próprio aplicativo, bem como divulgá-la aos serviços de vigilância em saúde pública.  \nVocê também concorda que o aplicativo “Guardiões da Saúde” tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição, ou incluí-la no texto, em conjunto com outras contribuições, a critério exclusivo da equipe relacionada a essa aplicação.\nO aplicativo “Guardiões da Saúde” não faz a indicação de qualquer diagnóstico, tratamentos ou medicamentos para a COVID 19 ou qualquer outra doença, caso o usuário constate mediante autoavaliação qualquer sintoma provável de Covid 19 ou qualquer outra doença, deverá imediatamente procurar um médico de sua confiança ou procurar atendimento em uma Unidade de Saúde mais próxima de sua localidade.\nSeu acesso é proibido em territórios onde o conteúdo seja considerado ilegal. Aqueles que optarem por acessar aplicativo a partir de outras localidades o farão por iniciativa própria e serão responsáveis pelo cumprimento das leis locais aplicáveis.\nOs dados não deverão ser usados ou exportados em descumprimento das leis brasileiras. Qualquer pendência em relação aos dados será dirimida pelas leis brasileiras;\nSe você tiver alguma dúvida sobre o aplicativo “Guardiões da Saúde”, não hesite em nos contatar pelo e-mail: support@proepi.zendesk.com',
            textoTermos_12:
                '\n12. DO FORO\n\nPara solucionar eventuais litígios fica eleito o Foro da Cidade de Brasília – DF, Brasil.',
            textoTituloPoliticas: 'POLÍTICAS DE USO DE DADOS PESSOAIS',
            textoPoliticas_1:
                '\nBem-vindo(a)! Obrigado por utilizar o Guardiões da Saúde!\nEste instrumento tem a finalidade de demonstrar a transparência no tratamento de dados pessoais, orientando-se pela prática da boa-fé e obediência aos princípios escupidos no art. 6º da Lei 13.709/18, Lei Geral de Proteção de Dados Pessoais.\nO aplicativo Guardiões da Saúde é mantido pela ASSOCIAÇÃO BRASILEIRA DE PROFISSIONAIS DE EPIDEMIOLOGIA DE CAMPO - PROEPI, pessoa jurídica de direito privado, com natureza e fins não lucrativos e não partidários, inscrita no CNPJ/MF sob o nº 20.399.059/0001-01, com sede no SRTVS Quadra 701, Bloco O, Edifício Multiempresarial, Asa Sul, Brasília/DF, CEP: 70.340-000, que atua na qualidade de Controlador\nEste termo foi elaborado em conformidade com Lei a Geral de Proteção de Dados Pessoais, Lei 13.709/18.\nEste instrumento tem a finalidade de demonstrar a transparência no tratamento de dados, orientando-se pela prática da boa-fé e obediência aos princípios escupidos no art. 6º da Lei Geral de Proteção de Dados Pessoais.\nEsta política de privacidade e uso de dados pessoais se aplica a todos usuários e/ou visitantes do aplicativo, aos que fizerem o download do aplicativo ou ainda a quem de qualquer outra maneira tenha acesso ao aplicativo.',
            textoPoliticas_2:
                '\nA quem se destina o aplicativo\nO uso deste aplicativo é voltado para pessoas maiores de 12 anos, assim os dados pessoais referentes as crianças, pessoas com 12 anos incompletos, somente devem podem ser coletados através do consentimento dos seus responsáveis.\nAssim, os adolescentes, pessoas da faixa etária compreendida dos 12 anos até 18 anos incompletos só devem fazer o uso do aplicativo com consentimento de seus pais ou responsáveis.\nO Controlador, no tratamento de dados pessoais das pessoas adolescentes referidas acima se compromete a fazê-lo em cumprimento ao disposto no art. 14 da Lei Geral de Proteção de Dados, no melhor interesse para essas pessoas.',
            textoPoliticas_3:
                '\nCOMO COLETAMOS OS DADOS\n\nOs dados são inseridos pelo titular, através do preenchimento de formulários que servem para cadastra-lo como usuário no aplicativo.\n\nTodos os dados somente serão coletados após o consentimento pelo seu titular.\n\nQUAIS DADOS COLETAMOS E SUA FINALIDADE\n\nSão coletados os seguintes dados pessoais, fornecidos pelo titular:\nNome\nGênero\nRaça\nData de nascimento\nPaís de origem\nEstado\nEndereço\nProfissão\nTelefone\nE-mail\n\nEstes dados são coletados com a finalidade de viabilizar a prestação de serviços e aprimorar a experiência de usuário, além disto, servem para identificar o usuário no aplicativo. Podem ainda ser coletados pelo aplicativo, dados sensíveis relativos à saúde, genética, origem étnica ou racial, que serão fornecidos pelo usuário e somente serão colhidos com o consentimento do mesmo. Estes dados tem como finalidade checar, monitorar a incidência de prováveis sintomas relacionados a COVID-19, cruzando informações relacionadas a fatores locais, regionais, genéticos, que servirão para fins didáticos de estudos e pesquisas sobre a doença da Covid -19.',
            textoPoliticas_4:
                '\nDO CONSENTIMENTO E RESPONSABILIZAÇÃO\n\nApós o usuário realizar o download da aplicação e criar um perfil de usuário através do preenchimento de formulário que consta na plataforma, o titular terá oportunidade de expressar seu consentimento de forma inequívoca com esta política de uso de dados pessoais e concordância com todo seus termos expressos, somente com consentimento do usuário é que é possível se cadastrar e fazer uso do aplicativo.\nTodos os dados pessoais mencionados neste termo somente serão colhidos com o consentimento do usuário titular dos dados. É a partir do seu consentimento que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a ProEpi a tratar seus dados pessoais.\nAssim, em consonância com a Lei Geral de Proteção de Dados Pessoais, seus dados somente serão coletados, tratados e armazenados mediante prévio e expresso consentimento.\nA aceitação de nosso termo de política de privacidade e uso de dados pessoais deverá ser feita quando você acessar o aplicativo, através de confirmação inequívoca de concordância, garantindo seu uso de boa-fé e para fins lícitos, mantendo-se a veracidade das informações inseridas pelo usuário na plataforma, sob pena de exclusão do usuário do aplicativo e ainda a sua responsabilização tanto na esfera cível e criminal.',
            textoPoliticas_5:
                '\nDO COMPARTILHAMENTO DE DADOS COM TERCEIROS\n\nA Controladora poderá, com o consentimento do titular, compartilhar os dados pessoais fornecidos pelo usuário com seus parceiros, que também atuarão como Controladores.\n\nAlém da ProEpi, atuam ainda como na condição de Controladores:\n\n\t1. Universidade Federal de Educação, Ciência e Tecnologia do Norte de Minas;\n\nOs demais Controladores apenas terão acesso aos dados pessoais referentes aos usuários que pertencerem a sua instituição.\n\nOs parceiros da Controladora utilizarão os dados pessoais com observância as regras dispostas na Lei Geral de Proteção de Dados Pessoais.\nA Controladora fica ainda autorizada a compartilhar os dados pessoais do Titular com outros agentes de tratamento de dados, caso seja necessário para as finalidades listadas neste termo, observados os princípios e as garantias estabelecidas pela Lei nº 13.709/18.',
            textoPoliticas_6:
                '\nDA SEGURANÇA NO TRATAMENTO DE DADOS\n\nPara mantermos suas informações pessoais seguras, usamos ferramentas físicas, eletrônicas e gerenciais orientadas para a proteção da sua privacidade.\nAplicamos essas ferramentas levando em consideração a natureza dos dados pessoais coletados, o contexto e a finalidade do tratamento e os riscos que eventuais violações gerariam para os direitos e liberdades do titular dos dados coletados e tratados.\nEntre as medidas que adotamos, destacamos as seguintes:\n\t• Apenas pessoas autorizadas têm acesso a seus dados pessoais;\n\t• O acesso a seus dados pessoais é feito somente após o compromisso de confidencialidade;\n\t• Seus dados pessoais são armazenados em ambiente seguro e idôneo;\n\nDA ISENÇÃO DE RESPONSABILIDADE\n\nEmbora adotemos elevados padrões de segurança a fim de evitar incidentes, não há nenhuma plataforma virtual inteiramente livre de riscos.\n\nNesse sentido, a ProEpi não se responsabiliza por:\nI – Quaisquer consequências decorrentes da negligência, imprudência ou imperícia dos usuários em relação a seus dados individuais. \nII – Ações maliciosas de terceiros, como ataques de hackers;\nIII – Inveracidade das informações inseridas pelo usuário nos registros necessários para a utilização dos serviços do aplicativo;\nQuaisquer consequências decorrentes de informações falsas ou inseridas de má-fé são de inteira responsabilidade do usuário, podendo incorrer em sanção na esfera cível como também criminal.',
            textoPoliticas_7:
                '\nDO TÉRMINO DO TRATAMENTO DE DADOS\n\nNão mantemos as suas informações pessoais por mais tempo do que o necessário para os objetivos para os quais são processadas. Assim, o término do tratamento de dados se dará com a finalidade atingida ou quando os dados deixarem de ser necessários para o alcance da finalidade que se destinam.\n\nPode ainda o titular se valendo do seu direito revogar o consentimento a qualquer tempo, bem como pode ocorrer também o término do tratamento de dados de acordo com as hipóteses previstas no art. 15 da LGPD.\n\nOs dados pessoais poderão excepcionalmente ser conservados, seguindo-se as regras do art. 16 da LGPD.\n\nDA REVOGAÇÃO DO CONSENTIMENTO\nO usuário poderá a qualquer tempo revogar o seu consentimento e solicitar a eliminação de seus dados pessoais do banco de dados do aplicativo, sendo que para isso deverá entrar em contato através do e-mail support@proepi.zendesk.com  e requerer a exclusão de seus dados, bem como poderá ainda da mesma maneira, solicitar a correção de seus dados, alteração, requerer informações sobre segurança e uso de dados pessoais.\n\nÉ importante destacar que a revogação do consentimento para uso de dados pessoais implica na impossibilidade de acesso e uso do aplicativo, já que o consentimento é obrigatório e indispensável para seu uso.\n\nDAS ALTERAÇÕES DA POLÍTICA DE USO DE DADOS PESSOAIS\n\nA atual versão da Política de Privacidade foi formulada e atualizada pela última vez em: 11/08/2021.\nReservamos o direito de modificar essa política de privacidade a qualquer momento, independente de aviso prévio ou autorização.\nAs modificações deste termo de privacidade poderão servir para refletir alterações na legislação, em nossos serviços prestados através do aplicativo ou ainda quando for o caso, para avanços tecnológicos.\nAssim, recomenda-se ao usuário que revise os termos com frequência. As alterações da política de privacidade surtirão efeito imediatamente após a sua publicação na plataforma. Nossos termos de uso, política de privacidade e uso de dados pessoais estarão sempre disponíveis, atualizados no aplicativo e de fácil acesso ao usuário.',
            textoPoliticas_8:
                '\nCOMO ENTRAR EM CONTATO COM A PROEPI\n\nVocê pode entrar em contato com a ProEpi, através do e-mail support@proepi.zendesk.com,este e-mail é um canal de comunicação do nosso encarregado de Proteção de Dados Pessoais, que se destina exclusivamente para tratar sobre quaisquer dúvidas relacionadas a política de privacidade, podendo ainda, fazer reclamação sobre qualquer violação das leis de proteção de dados, solicitar correção de dados incompletos, inexatos ou desatualizados e também requerer a revogação de consentimento e eliminação de dados do aplicativo (perfil de usuário).\nDa Legislação e do Foro\nPara a solução de qualquer controvérsia decorrente deste instrumento será aplicada integralmente a Lei Brasileira. \nFica eleito o foro da Cidade de Brasília – DF, para dirimir eventuais litígios.\n\n\nLeonardo B. Macedo\nEncarregado de Dados (DPO)\nProEpi\n',
        },
        compilation: 3,
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
    biosecurity: {
        title: 'Biosecurity',
        titleError: 'Some questions have not been answered',
        messageError: 'Please, answer all questions.',
    },
    vaccination: {
        title: 'Vaccination',
        doses: 'Doses',
        noDoses: 'No doses found',
        titleError: 'Invalid fields',
        messageError: 'Please fill in all fields correctly.',
        titleError2: 'Error adding dose',
        messageError2:
            'You have reached the dose limit for this type of vaccine.',
        messageError3:
            'Check that the date is correct or correct the old dose.',
        confirmDeleteDose: 'Delete dose?',
        confirmDeleteDose2: 'Do you want to delete this dose?',
        titleModal: 'Vaccine information',
        nameVaccine: 'Name: ',
        laboratoryVaccine: 'Laboratory: ',
        countryVaccine: 'Location that started production: ',
        dosesVaccine: 'Number of doses: ',
        minIntervalVaccine: 'Interval between doses: ',
        intervalVaccinePeriod: ' days',
        titleAddDose: 'Add new dose',
        titleEditDose: 'Edit dose ',
        dateField: 'Date',
        delete: 'Delete',
        save: 'Save',
        add: 'Add',
    },
    drawer: {
        reportRumor: 'Report Rumor',
        toEdit: 'Edit profiles',
        logOut: 'Logout',
        app: 'App',
        toSurveillance: 'Active Surveillance',
        toVaccination: 'Vaccination',
        share: 'Share',
        shareLink: 'Guardiões da Saúde\nhttps://linktr.ee/guardioesdasaude\n',
        toHelp: 'Help',
    },
    map: {
        people: 'Reports: ',
        symptomatic: 'Symptomatic: ',
        noLocal: "These people didn't share their location",
        alert: 'Alert Contacts',
        share:
            "Do you want to share an announcement with people you've had contact with?",
        noAlert: 'No, I will warn them later',
    },
    rumor: {
        title: 'Rumor',
        rumorSent: 'The rumor was registered.',
    },
    surveillance: {
        title: 'Active Surveillance',
        whatIs: 'What is it?',
        phone: 'Enter your phone:',
        textAbout:
            'A Vigilância Ativa Institucional tem o intuito de conhecer, monitorar e identificar a situação de saúde dos usuários do aplicativo, que pertencem a alguma instituição, com enfoque nos sintomas relatados da COVID-19. Assim, ao apresentar os sintomas, o mesmo receberá auxílio de especialistas da área de saúde via telefone.',
        participateSuccess: "You're already participating!",
        participateQuestion: 'Do you want to participate?',
        confirmRead:
            'I confirm that I have read the information and am aware of the changes that will be made after confirmation',
        cancelParticipation: 'Cancel Participation',
        participate: 'Participate',
        titleMessage: 'Be part of Active Surveillance',
        message:
            'you are not an active vigilant yet. Do you want to participate?',
        cancelButton: 'No',
        redirectButton: "Yes, I'll be part",
    },
    autocomplete: {
        searchBar: 'Search here',
        noResult: 'No results',
    },
}
