export default {
    lang: {
        code: 'pt',
    },
    genderChoices: {
        cisWoman: 'Mulher Cis',
        cisMan: 'Homem Cis',
        transWoman: 'Mulher Trans',
        transMan: 'Homem Trans',
        nonBinary: 'Não-binário',
    },
    raceChoices: {
        white: 'Branco',
        indian: 'Indígena',
        mix: 'Pardo',
        black: 'Preto',
        asian: 'Amarelo',
    },
    selector: {
        label: 'Selecionar',
        cancelButton: 'Cancelar',
        groupError: 'Você deve selecionar o grupo',
        codeError: 'Você deve colocar o codigo de identificação',
        codeFormatError: 'O código deve conter apenas dígitos',
        codeLengthError: 'O código deve conter exatamente ',
        codeLengthError2: ' dígitos',
    },
    birthDetails: {
        format: 'DD-MM-AAAA',
        confirmButton: 'Confirmar',
        cancelButton: 'Cancelar',
    },
    initialscreen: {
        welcome: 'Bem vindo',
        signup: 'Cadastre-se',
        login: 'Entrar',
    },
    login: {
        title: 'Entrar',
        email: 'Email',
        password: 'Senha',
        loginbutton: 'Entrar',
        forgetbutton: 'Esqueceu a senha?',
        awesomeAlert: {
            accessing: 'Entrando',
        },
        errorMessages: {
            emailPwdWrong: 'Email ou senha inválidos',
            emailPwdCantBeBlank: 'Email/senha não podem estar em branco',
        },
    },
    forgetPwd: {
        title: 'Esqueci a senha',
        informEmail: 'Informe seu email para verificação:',
        sendButton: 'Enviar',
        invalidEmail: 'E-mail Inválido',
        tryAgain: 'Tente Novamente',
        differentsPass: 'Senhas não conferem!',
        passwordChanged: 'Senha Redefinida',
    },
    getToken: {
        title: 'Código de Verificação',
        invalidCode: 'Código Inválido',
        confirm: 'Confirmar',
        loading: 'Carregando',
        verificationCodeSent:
            'Foi enviado um código de verificação para o email indicado.',
        spamCheckWarning:
            'Caso não apareça na sua caixa de mensagem principal, verifique seu Spam.',
        inputVerificationCode: 'Código',
    },
    changePwd: {
        title: 'Redefinir senha',
        newPwd: 'Nova senha',
        confirmPwd: 'Repita a senha',
        changeButton: 'Redefinir',
        errorMessages: {
            shortPwd: 'A senha precisa ter no mínimo 8 caracteres',
        },
    },
    register: {
        title: 'Cadastre-se',
        name: 'Nome:',
        gender: 'Gênero:',
        race: 'Raça:',
        birth: 'Nascimento:',
        country: 'País de origem:',
        residence: 'País de residência:',
        originCountry: ' é seu país de origem?',
        email: 'Email:',
        password: 'Senha:',
        passwordCondition: 'A senha deve conter no mínimo 8 caracteres',
        signupButton: 'Cadastrar',
        editProfile: 'Editar Perfil',
        emptyName: 'O Nome não pode ficar em branco',
        emptyDate: 'O Nascimento não pode ficar em branco',
        emptyLocation: 'Estado e Município devem estar preenchidos',
        emptyResidence: 'O País de residência não pode ficar em branco',
        emptyResidence2:
            'Precisamos do seu país de residência para lhe mostrar informações referentes a ele.',
        nationalityRequired: 'País de origem não pode ficar em branco',
        kinshipRequired: 'O Parentesco não pode ficar em branco',
        phoneRequired: 'O Telefone não pode ficar em branco',
        categoryRequired: 'A Categoria não pode ficar em branco',
        geralError: 'Ocorreu um erro, tente novamente depois.',
        confirmDeleteUser: 'Deletar perfil',
        confirmDeleteUser2: 'Deseja deletar esse perfil?',
        selectImage: 'Selecione imagem de perfil',
        pickPhoto: 'Tirar uma foto',
        library: 'Selecionar da Galeria',
        removePhoto: 'Remover foto',
        updatedPhoto: 'Foto de perfil atualizada',
        removedPhoto: 'Foto de perfil removida',
        fieldNotBlank: 'Campos não podem ficar em branco:',
        fieldNotBlank2:
            'Email\nSenha\n\nPrecisamos dessas informações para completar seu cadastro',
        shortPassword: 'A senha precisa ter no mínimo 8 caracteres',
        awesomeAlert: {
            loading: 'Carregando',
            registering: 'Cadastrando',
        },
        errorMessages: {
            error: 'Erro',
            allFieldsAreFilled:
                'Todos os campos devem ser preenchidos corretamente',
        },
        healthProfessional: 'Você é um profissional da saúde?',
        riskGroupLabel: 'Faz parte do grupo de risco?',
        vaccination: 'Possui dados de vacinação?',
        institution: 'É integrante de alguma instituição?',
        idCode: 'Código de Identificação:',
        riskGroupTitle: 'Grupos de Risco:',
        riskGroupMessage:
            '\t Pessoas acima de 60 anos ou pessoas de qualquer idade que tenham comorbidades, como cardiopatia, diabetes, pneumopatia, doença neurológica ou renal, imunodepressão, obesidade, asma e puérperas (fase pós-parto).',
        genderTitle: 'Gênero:',
        genderMessage:
            'Cisgênero (ou cis) são as pessoas em que a identidade de gênero corresponde a que foi atribuída no nascimento.\n\n' +
            'Transgênero (ou trans) são as pessoas em que a identidade de gênero é oposta ao sexo biológico.\n\n' +
            'Não-binário são as pessoas em que a identidade de gênero não é estabelecida.',
        modalButton: 'Voltar',
    },
    ajuda: {
        title: 'Ajuda',
        faqBtn: 'FAQ',
        tutorialBtn: 'Tutorial',
        useTermsBtn: 'Termos e Políticas',
        aboutBtn: 'Sobre',
    },
    tutorial: {
        title: 'Tutorial',
        tutorial: 'Tutorial',
        howToUse:
            '\nA funcionalidade básica do Guardiões da Saúde (GdS) é o reporte de saúde. Ela se encontra na Página Principal, mas existem outras funcionalidades. Se quiser aprender mais, continue lendo.',
        home: 'Página Inicial',
        homeCont:
            'Nessa aba você pode selecionar como você está se sentindo (bem ou mal). Caso esteja mal você poderá marcar os sintomas e sinalizar há quanto tempo está se assim.\n\nVocê também pode personalizar seu GdS colocando uma foto sua no ícone ao lado do seu nome (lembrando que a foto não fica salva permanentemente no aplicativo, então caso você saia de seu conta é necessário inserir sua foto novamente). ',
        news: 'Tela de Notícias',
        newsCont:
            'A tela de notícias é a última opção que você encontra na parte inicial do app. Nessa parte estão notícias diárias sobre a pandemia e saúde em geral. Aproveita que você já está aqui e dá uma olhada no que preparamos lá! Para acessar a aba não é necessário ter uma conta no Twitter e nem estabelecer vínculo (não receberá nenhum tipo de notificação ou email).',
        newsPs:
            'PS: você não precisa ter conta no Twitter e não receberá nenhum tipo de notificação ou email.',
        advices: 'Dicas de Saúde',
        advicesCont:
            'A aba de dicas é uma importante ferramenta para que você aprenda mais sobre a sua saúde, ela é atualizada duas vezes ao mês e conta com informações sobre vacinas, links úteis, como se prevenir na pandemia e muito mais.',
        diary: 'Diário da Saúde',
        diaryCont:
            'Essa é uma das funcionalidade mais importantes do aplicativo, lá você consegue visualizar por meio do calendário da saúde e do gráfico pizza todos os reportes que você tem feito diariamente.\n\nVocê pode usar seu calendário da saúde caso você precise desses dados para esclarecer algo em uma consulta médica.',
        healthMap: 'Mapa da Saúde',
        healthMapCont:
            'É nessa aba que vai aparecer como as pessoas na sua região estão se sentindo. Cada ponto no mapa representa uma pessoa ou grupo de pessoas.',
        healthMapCont2:
            'Ao clicar em algum ponto do mapa você consegue ver o estado de saúde das pessoas que relataram naquela região. Nenhum dado sensível do usuário é exposto.',
        healthMapCont3:
            'Essa função te ajuda a ter uma visão de como está a saúde das pessoas a sua volta e nos locais que você pretende ir.\n\nSe você ver que em uma certa área tem muitos relatos de sintomas da COVID-19 você pode evitar passar no lugar, adiar sua ida até o local ou redobrar as medidas de prevenção ao passar nessas regiões.',
    },
    badReport: {
        title: 'O que está sentindo?',
        sickAge: 'Desde quando está se sentindo mal?',
        symptoms:
            'Selecione abaixo os sintomas que voce está sentindo neste momento:',
        answerQuestions: 'Responda as perguntas a seguir:',
        checkboxes: {
            first:
                'Teve contato com alguem que apresentava os mesmos sintomas?',
            second: 'Procurou algum serviço hospitalar?',
            third: 'Esteve em ',
            thirdContinuation: ' 2 dias antes ou após o início dos sintomas?',
            fourth: 'Para que país você viajou?',
            fifth: 'Aperte na bandeira para selecionar!',
        },
        yes: 'Sim',
        checkboxConfirm: 'Confirmar',
        messages: {
            button: 'Mostrar Mapa',
            sending: 'Enviando...',
            thanks: 'Obrigado!',
            oops: 'Oops!',
            reportSent: 'Seu relato foi enviado.',
            reportSent2:
                'Notamos que você já relatou seu estado de saúde por essa opção hoje.',
            reportNotSent:
                'Houve um erro ao enviar seu relato de saúde. Tente novamente mais tarde.',
            seeADoctor:
                'Recomendamos que, caso os sintomas continuem, procure atendimento médico!',
            confirmText: 'Confirmar',
            covidSuspect:
                'Para baixar o aplicativo Guardiões da Saúde e contribuir para o enfrentamento da Covid-19, acesse:\nPlay Store: https://play.google.com/store/apps/details?id=com.guardioesapp&hl=pt\nApp Store: https://apps.apple.com/us/app/guardi%C3%B5es-da-sa%C3%BAde/id1450965975?l=pt&ls=1\n\nPara baixar o aplicativo do Ministério da Saúde, acesse:\nPlay Store: https://play.google.com/store/apps/details?id=br.gov.datasus.guardioes&hl=pt_BR\nApp Store: https://apps.apple.com/br/app/coronav%C3%ADrus-sus/id1408008382\n\nDefinição de contato próximo: https://coronavirus.saude.gov.br/sobre-a-doenca#transmissao',
        },
        reportWithoutSymptom: {
            title: 'Não foi possível enviar',
            message: 'Selecione ao menos 1 sintoma',
        },
    },
    advices: {
        moreInformations: 'Mais Informações',
        redirectPermission:
            'Deseja ser redirecionado para a fonte do conteúdo?',
        title: 'Dicas',
        subtitle: 'Mantenha a saúde em dia',
        empty: 'Nenhuma dica para o seu país',
        more: 'Saiba Mais',
        buttons: {
            messages: {
                title: 'Redirecionando...',
                subtitle: 'Deseja ser redirecionado para o Google Maps?',
            },
        },
    },
    diary: {
        title: 'Diário',
        year: ' ano',
        years: ' anos',
        participations: 'Participações',
        good: 'Bem',
        bad: 'Mal',
        report: ' dia',
        reports: ' dias',
        statisticsTitle: 'Estatísticas',
        goodPercent: '% dias - Bem',
        badPercent: '% dias - Mal',
        notInformed: '% dias - Não Informado',
    },
    home: {
        title: 'Início',
        hello: 'Olá, ',
        nowAGuardian: 'Guardião da Saúde',
        addProfile: 'Adicionar Perfil',
        alerts: 'Alertas',
        statusLast7Days: 'Status nos últimos 7 dias:',
        statusLast7DaysGood: 'Você tem se sentido bem',
        statusLast7DaysBad: 'Você não esteve bem',
        vaccination: 'Vacinação:',
        vaccinationData: 'Atualize seus dados de vacinação',
        bioSecurity: 'Biossegurança:',
        bioSecurityQuestions: 'Responda perguntas sobre sua Instituição',
        userHowYouFelling: 'Como está se sentindo hoje?',
        offlineTitle: 'Modo Offline',
        offlineMessage: 'Você está sem conexão com a internet.',
        offlineMessage2:
            'Os dados podem não estar sincronizados e as alterações feitas não serão salvas.',
    },
    profiles: {
        households: 'Familiares',
        title: 'Perfis',
        owner: 'Proprietário',
    },
    locationRequest: {
        permissionTitle: 'Permita o uso de sua localização',
        permissionMessage:
            'O Guardiões da Saúde precisa do acesso à sua localização ',
        permissionMessage2:
            'para que você possa enviar seu estado de saúde, ver os relatórios e acessar o Mapa da Saúde.',
        errorTitle: 'Erro ao obter sua localização',
        errorMessage:
            'Por favor, autorize a utilização da localização nas configurações do seu dispositivo.',
        cancelText: 'Cancelar',
        okText: 'OK',
    },
    maps: {
        title: 'Mapa',
        guide:
            'Cada ponto no mapa representa uma pessoa ou grupo de pessoas.\n\nA cor de um grupo representa a porcentagem de sintomáticos e o tamanho, o número de pessoas.\n\nVocê pode apertar nos pontos para saber mais.',
        confirmGuide: 'Entendido!',
    },
    news: {
        title: 'Notícias',
        subtitle: 'Feed de tweets do Guardiões',
        openBrowser: 'Deseja abrir o Navegador?',
        twitter: 'Você será redirecionado para twitter.com',
    },
    report: {
        goodChoice: 'BEM',
        badChoice: 'MAL',
    },
    faq: {
        title: 'FAQ',
    },
    about: {
        title: 'Sobre',
        tituloBtnUnb: 'Universidade de Brasilia',
        mensagemBtnUnb: 'Deseja ser redirecionado ao website da UnB?',
        linkBtnUnb: 'https://www.unb.br',
        tituloBtnProEpi:
            'ProEpi - Associação Brasileira de Profissionais de Epidemiologia de Campo',
        mensagemBtnProEpi: 'Deseja ser redirecionado ao website da ProEpi?',
        linkBtnProEPi: 'https://proepi.org.br/',
        textoSobreTitulo: '\nProjeto Guardiões da Saúde\n',
        textoSobre:
            'A história do aplicativo Guardiões da Saúde teve início em 2014, quando o Ministério da Saúde teve a iniciativa de promover a vigilância participativa de eventos de saúde durante a Copa do Mundo FIFA 2014.\n\nDesde então, em diferentes versões e com o apoio de diferentes parceiros, o app já foi utilizado durante outros eventos, como os Jogos Olímpicos Rio 2016.\n\nO app Guardiões da Saúde tem o grande objetivo de fortalecer a capacidade de detecção de surtos e emergências em saúde pública.\n\nEsta versão do aplicativo é uma parceria da ProEpi (Associação Brasileira de Profissionais de Epidemiologia de Campo) com a Universidade de Brasília.',
    },
    useTerms: {
        title: 'Termos e Políticas',
        consentTitle: 'Nossos Termos e Políticas de Privacidade mudaram',
        consentMessage:
            'Para continuar utilizando o Guardiões da Saúde, você deve aceitar os novos termos. Nós levamos sua privacidade a sério.',
        seeTerms: 'Ler Termos',
        agree: 'Eu aceito',
        disagree: 'Não aceito',
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
                '\n11. CONSIDERAÇÕES FINAIS:\n\nO acesso ao aplicativo representa a aceitação expressa e irrestrita dos Termos de Uso acima descritos. \nAo concordar com esses termos o usuário concede uma licença perpétua, isenta de royalties, licença incondicional para o “Guardiões da Saúde”, mantido pela Associação Brasileira de Profissionais de Epidemiologia de Campo - ProEpi e todas as organizações sucessoras, para publicar a sua contribuição de forma agregada, nunca individualizada, no próprio aplicativo, bem como divulgá-la aos serviços de vigilância em saúde pública.  \nVocê também concorda que o aplicativo “Guardiões da Saúde” tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição, ou incluí-la no texto, em conjunto com outras contribuições, a critério exclusivo da equipe relacionada a essa aplicação.\nO aplicativo “Guardiões da Saúde” não faz a indicação de qualquer diagnóstico, tratamentos ou medicamentos para a COVID 19 ou qualquer outra doença, caso o usuário constate mediante autoavaliação qualquer sintoma provável de Covid 19 ou qualquer outra doença, deverá imediatamente procurar um médico de sua confiança ou procurar atendimento em uma Unidade de Saúde mais próxima de sua localidade.\nSeu acesso é proibido em territórios onde o conteúdo seja considerado ilegal. Aqueles que optarem por acessar aplicativo a partir de outras localidades o farão por iniciativa própria e serão responsáveis pelo cumprimento das leis locais aplicáveis.\nOs dados não deverão ser usados ou exportados em descumprimento das leis brasileiras. Qualquer pendência em relação aos dados será dirimida pelas leis brasileiras;\nSe você tiver alguma dúvida sobre o aplicativo “Guardiões da Saúde”, não hesite em nos contatar pelo e-mail: suporte@proepi.org.br',
            textoTermos_12:
                '\n12. DO FORO\n\nPara solucionar eventuais litígios fica eleito o Foro da Cidade de Brasília – DF, Brasil.',
            textoTituloPoliticas: 'POLÍTICAS DE USO DE DADOS PESSOAIS',
            textoPoliticas_1:
                '\nBem-vindo(a)! Obrigado por utilizar o Guardiões da Saúde!\nEste instrumento tem a finalidade de demonstrar a transparência no tratamento de dados pessoais, orientando-se pela prática da boa-fé e obediência aos princípios escupidos no art. 6º da Lei 13.709/18, Lei Geral de Proteção de Dados Pessoais.\nO aplicativo Guardiões da Saúde é mantido pela ASSOCIAÇÃO BRASILEIRA DE PROFISSIONAIS DE EPIDEMIOLOGIA DE CAMPO - PROEPI, pessoa jurídica de direito privado, com natureza e fins não lucrativos e não partidários, inscrita no CNPJ/MF sob o nº 20.399.059/0001-01, com sede no SRTVS Quadra 701, Bloco O, Edifício Multiempresarial, Asa Sul, Brasília/DF, CEP: 70.340-000, que atua na qualidade de Controlador.\nEste termo foi elaborado em conformidade com Lei a Geral de Proteção de Dados Pessoais, Lei 13.709/18.\nEste instrumento tem a finalidade de demonstrar a transparência no tratamento de dados, orientando-se pela prática da boa-fé e obediência aos princípios escupidos no art. 6º da Lei Geral de Proteção de Dados Pessoais.\nEsta política de privacidade e uso de dados pessoais se aplica a todos usuários e/ou visitantes do aplicativo, aos que fizerem o download do aplicativo ou ainda a quem de qualquer outra maneira tenha acesso ao aplicativo.',
            textoPoliticas_2:
                '\nA quem se destina o aplicativo\nO uso deste aplicativo é voltado para pessoas maiores de 12 anos, assim os dados pessoais referentes as crianças, pessoas com 12 anos incompletos, somente devem podem ser coletados através do consentimento dos seus responsáveis.\nAssim, os adolescentes, pessoas da faixa etária compreendida dos 12 anos até 18 anos incompletos só devem fazer o uso do aplicativo com consentimento de seus pais ou responsáveis.\nO Controlador, no tratamento de dados pessoais das pessoas adolescentes referidas acima se compromete a fazê-lo em cumprimento ao disposto no art. 14 da Lei Geral de Proteção de Dados, no melhor interesse para essas pessoas.',
            textoPoliticas_3:
                '\nCOMO COLETAMOS OS DADOS\n\nOs dados são inseridos pelo titular, através do preenchimento de formulários que servem para cadastra-lo como usuário no aplicativo.\n\nTodos os dados somente serão coletados após o consentimento pelo seu titular.\n\nQUAIS DADOS COLETAMOS E SUA FINALIDADE\n\nSão coletados os seguintes dados pessoais, fornecidos pelo titular:\n\nDados Gerais:\n\tNome\n\tGênero\n\tRaça\n\tData de nascimento\n\tPaís de origem\n\tE-mail\n\nDados de Localização:\n\tEstado\n\tMunicípio\n\tGeolocalização atual\n\nDados Institucionais\n\tEstado\n\tMunicípio\n\tInstituição vinculada\n\tCategoria de vínculo\n\tSe é profissional de saúde\n\tNúmero de Identificação\n\nDados de Vacinação:\n\tSe faz parte de Grupo de Risco para vacinação contra COVID-19\n\tNúmero da dose\n\tImunobiológico aplicado\n\tData de aplicação da dose\n\nReporte de Saúde:\n\tEstado de Saúde\n\tData do reporte\n\tSintomas\n\tSe teve contato com alguém que apresentava os mesmos sintomas\n\tCategoria de local onde teve contato com pessoa que teve os mesmos sintomas\n\tSe esteve na instituição vinculada 2 dias antes ou após sentir os sintomas\n\tSe procurou algum serviço hospitalar\n\nEstes dados são coletados com a finalidade de viabilizar a prestação de serviços e aprimorar a experiência de usuário, além disto, servem para identificar o usuário no aplicativo. Podem ainda ser coletados pelo aplicativo, dados sensíveis relativos à saúde, genética, origem étnica ou racial, que serão fornecidos pelo usuário e somente serão colhidos com o consentimento do mesmo. Estes dados tem como finalidade checar, monitorar a incidência de prováveis sintomas relacionados a COVID-19, cruzando informações relacionadas a fatores locais, regionais, genéticos, que servirão para fins didáticos de estudos e pesquisas sobre a doença da Covid-19.',
            textoPoliticas_4:
                '\nDO CONSENTIMENTO E RESPONSABILIZAÇÃO\n\nApós o usuário realizar o download da aplicação e criar um perfil de usuário através do preenchimento de formulário que consta na plataforma, o titular terá oportunidade de expressar seu consentimento de forma inequívoca com esta política de uso de dados pessoais e concordância com todo seus termos expressos, somente com consentimento do usuário é que é possível se cadastrar e fazer uso do aplicativo.\nTodos os dados pessoais mencionados neste termo somente serão colhidos com o consentimento do usuário titular dos dados. É a partir do seu consentimento que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a ProEpi a tratar seus dados pessoais.\nAssim, em consonância com a Lei Geral de Proteção de Dados Pessoais, seus dados somente serão coletados, tratados e armazenados mediante prévio e expresso consentimento.\nA aceitação de nosso termo de política de privacidade e uso de dados pessoais deverá ser feita quando você acessar o aplicativo, através de confirmação inequívoca de concordância, garantindo seu uso de boa-fé e para fins lícitos, mantendo-se a veracidade das informações inseridas pelo usuário na plataforma, sob pena de exclusão do usuário do aplicativo e ainda a sua responsabilização tanto na esfera cível e criminal.',
            textoPoliticas_5:
                '\nDO COMPARTILHAMENTO DE DADOS COM TERCEIROS\n\nA Controladora poderá, com o consentimento do titular, compartilhar os dados pessoais fornecidos pelo usuário com seus parceiros, que também atuarão como Controladores.\n\nAlém da ProEpi, atuam ainda como na condição de Controladores:\n\n\t1. Universidade de Brasília (UNB);\n\t2. Universidade Federal de São Carlos (UFSCAR);\n\t3. Instituto Federal de Educação, Ciência e Tecnologia do Norte de Minas Gerais - IFNMG;\n\nOs demais Controladores apenas terão acesso aos dados pessoais referentes aos usuários que pertencerem a sua instituição.\n\nOs parceiros da Controladora utilizarão os dados pessoais com observância as regras dispostas na Lei Geral de Proteção de Dados Pessoais.\nA Controladora fica ainda autorizada a compartilhar os dados pessoais do Titular com outros agentes de tratamento de dados, caso seja necessário para as finalidades listadas neste termo, observados os princípios e as garantias estabelecidas pela Lei nº 13.709/18.',
            textoPoliticas_6:
                '\nDA SEGURANÇA NO TRATAMENTO DE DADOS\n\nPara mantermos suas informações pessoais seguras, usamos ferramentas físicas, eletrônicas e gerenciais orientadas para a proteção da sua privacidade.\nAplicamos essas ferramentas levando em consideração a natureza dos dados pessoais coletados, o contexto e a finalidade do tratamento e os riscos que eventuais violações gerariam para os direitos e liberdades do titular dos dados coletados e tratados.\nEntre as medidas que adotamos, destacamos as seguintes:\n\t• Apenas pessoas autorizadas têm acesso a seus dados pessoais;\n\t• O acesso a seus dados pessoais é feito somente após o compromisso de confidencialidade;\n\t• Seus dados pessoais são armazenados em ambiente seguro e idôneo;\n\nDA ISENÇÃO DE RESPONSABILIDADE\n\nEmbora adotemos elevados padrões de segurança a fim de evitar incidentes, não há nenhuma plataforma virtual inteiramente livre de riscos.\n\nNesse sentido, a ProEpi não se responsabiliza por:\nI – Quaisquer consequências decorrentes da negligência, imprudência ou imperícia dos usuários em relação a seus dados individuais. \nII – Ações maliciosas de terceiros, como ataques de hackers;\nIII – Inveracidade das informações inseridas pelo usuário nos registros necessários para a utilização dos serviços do aplicativo;\nQuaisquer consequências decorrentes de informações falsas ou inseridas de má-fé são de inteira responsabilidade do usuário, podendo incorrer em sanção na esfera cível como também criminal.',
            textoPoliticas_7:
                '\nDO TÉRMINO DO TRATAMENTO DE DADOS\n\nNão mantemos as suas informações pessoais por mais tempo do que o necessário para os objetivos para os quais são processadas. Assim, o término do tratamento de dados se dará com a finalidade atingida ou quando os dados deixarem de ser necessários para o alcance da finalidade que se destinam.\n\nPode ainda o titular se valendo do seu direito revogar o consentimento a qualquer tempo, bem como pode ocorrer também o término do tratamento de dados de acordo com as hipóteses previstas no art. 15 da LGPD.\n\nOs dados pessoais poderão excepcionalmente ser conservados, seguindo-se as regras do art. 16 da LGPD.\n\nDA REVOGAÇÃO DO CONSENTIMENTO\nO usuário poderá a qualquer tempo revogar o seu consentimento e solicitar a eliminação de seus dados pessoais do banco de dados do aplicativo, sendo que para isso deverá entrar em contato através do e-mail suporte@proepi.org.br  e requerer a exclusão de seus dados, bem como poderá ainda da mesma maneira, solicitar a correção de seus dados, alteração, requerer informações sobre segurança e uso de dados pessoais.\n\nÉ importante destacar que a revogação do consentimento para uso de dados pessoais implica na impossibilidade de acesso e uso do aplicativo, já que o consentimento é obrigatório e indispensável para seu uso.\n\nDAS ALTERAÇÕES DA POLÍTICA DE USO DE DADOS PESSOAIS\n\nA atual versão da Política de Privacidade foi formulada e atualizada pela última vez em: 06/06/2022.\nReservamos o direito de modificar essa política de privacidade a qualquer momento, independente de aviso prévio ou autorização.\nAs modificações deste termo de privacidade poderão servir para refletir alterações na legislação, em nossos serviços prestados através do aplicativo ou ainda quando for o caso, para avanços tecnológicos.\nAssim, recomenda-se ao usuário que revise os termos com frequência. As alterações da política de privacidade surtirão efeito imediatamente após a sua publicação na plataforma. Nossos termos de uso, política de privacidade e uso de dados pessoais estarão sempre disponíveis, atualizados no aplicativo e de fácil acesso ao usuário.',
            textoPoliticas_8:
                '\nCOMO ENTRAR EM CONTATO COM A PROEPI\n\nVocê pode entrar em contato com a ProEpi, através do e-mail dpo@proepi.org.br, este e-mail é um canal de comunicação do nosso encarregado de Proteção de Dados Pessoais, que se destina exclusivamente para tratar sobre quaisquer dúvidas relacionadas a política de privacidade, podendo ainda, fazer reclamação sobre qualquer violação das leis de proteção de dados, solicitar correção de dados incompletos, inexatos ou desatualizados e também requerer a revogação de consentimento e eliminação de dados do aplicativo (perfil de usuário).\nDa Legislação e do Foro\nPara a solução de qualquer controvérsia decorrente deste instrumento será aplicada integralmente a Lei Brasileira. \nFica eleito o foro da Cidade de Brasília – DF, para dirimir eventuais litígios.\n\n\nLeonardo B. Macedo\nEncarregado de Dados (DPO)\nProEpi\n',
        },
        compilation: 4,
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
        title: 'Biossegurança',
        titleError: 'Algumas perguntas não foram respondidas',
        messageError: 'Por favor, responda todas as perguntas.',
    },
    vaccination: {
        title: 'Vacinação',
        doses: 'Doses',
        noDoses: 'Nenhuma dose encontrada',
        titleError: 'Campos inválidos',
        messageError: 'Por favor, preencha todos os campos corretamente.',
        titleError2: 'Erro ao adicionar dose',
        messageError2:
            'Você atingiu o limite de doses para esse tipo de vacina.',
        messageError3:
            'Verifique se a data está correta ou corrija a dose antiga.',
        confirmDeleteDose: 'Deletar dose',
        confirmDeleteDose2: 'Deseja deletar essa dose?',
        titleModal: 'Informações da vacina',
        nameVaccine: 'Nome: ',
        laboratoryVaccine: 'Laboratório: ',
        countryVaccine: 'Local que iniciou a produção: ',
        dosesVaccine: 'Número de doses: ',
        minIntervalVaccine: 'Intervalo entre as doses: ',
        intervalVaccinePeriod: ' dias',
        titleAddDose: 'Adicionar dose',
        titleEditDose: 'Editar dose ',
        dateField: 'Data',
        delete: 'Apagar',
        save: 'Salvar',
        add: 'Adicionar',
    },
    drawer: {
        reportRumor: 'Reportar Rumor',
        toEdit: 'Editar perfis',
        logOut: 'Sair',
        app: 'Aplicativo',
        toSurveillance: 'Vigilância Ativa',
        toVaccination: 'Vacinação',
        share: 'Compartilhar',
        shareLink: 'Guardiões da Saúde\nhttps://linktr.ee/guardioesdasaude\n',
        toHelp: 'Ajuda',
    },
    map: {
        people: 'Reports: ',
        symptomatic: 'Sintomáticos: ',
        noLocal: 'Essas pessoas não compartilharam seu local',
        alert: 'Alertar Contatos',
        share:
            'Deseja compartilhar um comunicado para pessoas com que teve contato?',
        noAlert: 'Não, irei avisá-los mais tarde',
    },
    rumor: {
        title: 'Rumor',
        rumorSent: 'O Rumor foi registrado.',
    },
    surveillance: {
        title: 'Vigilância Ativa',
        whatIs: 'O que é?',
        phone: 'Informe seu telefone:',
        textAbout:
            'A Vigilância Ativa Institucional tem o intuito de conhecer, monitorar e identificar a situação de saúde dos usuários do aplicativo, que pertencem a alguma instituição, com enfoque nos sintomas relatados da COVID-19. Assim, ao apresentar os sintomas, o mesmo receberá auxílio de especialistas da área de saúde via telefone.',
        participateSuccess: 'Você já está participando!',
        participateQuestion: 'Deseja participar?',
        confirmRead:
            'Confirmo que li as informações e estou ciente das alterações que serão realizadas após a confirmação',
        cancelParticipation: 'Cancelar Participação',
        participate: 'Participar',
        titleMessage: 'Faça parte da Vigilância Ativa',
        message:
            'você ainda não é um(a) vigilante ativo(a). Deseja participar?',
        cancelButton: 'Não',
        redirectButton: 'Sim, vou fazer parte',
    },
    autocomplete: {
        searchBar: 'Pesquise aqui',
        noResult: 'Sem resultados',
    },
}
