export default {
    lang: {
        code: 'es',
    },
    genderChoices: {
        cisWoman: 'Mujer Cisgénero',
        cisMan: 'Hombre Cisgénero',
        transWoman: 'Mujer Transgénero',
        transMan: 'Hombre Transgénero',
        nonBinary: 'No Binario',
    },
    raceChoices: {
        white: 'Blanco',
        indian: 'Indio',
        mix: 'Multirracial',
        black: 'Negro',
        asian: 'Asian',
    },
    selector: {
        label: 'Seleccione',
        cancelButton: 'Cancelar',
        groupError: 'Debes seleccionar el grupo',
        codeError: 'Debes ingresar el código de identificación',
        codeFormatError: 'El código debe contener solo dígitos',
        codeLengthError: 'El código debe contener exactamente ',
        codeLengthError2: ' dígitos',
    },
    birthDetails: {
        format: 'DD-MM-AAAA',
        confirmButton: 'Confirmar',
        cancelButton: 'Cancelar',
    },
    initialscreen: {
        welcome: '¡Bienvenido!',
        signup: 'Regístrese',
        login: 'Entrar',
    },
    login: {
        title: 'Entrar',
        email: 'Email',
        password: 'Contraseña',
        loginbutton: 'Entrar',
        forgetbutton: '¿Ha olvidado la contraseña?',
        awesomeAlert: {
            accessing: 'Registrando',
        },
        errorMessages: {
            emailPwdWrong: 'Email o contraseña no válida',
            emailPwdCantBeBlank: 'Email/contraseña no pueden estar en blanco',
        },
    },
    forgetPwd: {
        title: 'Recuperar mi contraseña',
        informEmail: 'Ingrese su email para verificación:',
        sendButton: 'Enviar',
        invalidEmail: 'Email inválido',
        tryAgain: 'Inténtalo de Nuevo',
        differentsPass: '¡Las Contraseñas no Coinciden!',
        passwordChanged: 'Restablecer la contraseña',
    },
    getToken: {
        title: 'Código de Verificación',
        invalidCode: 'Código invalid',
        confirm: 'Confirmar',
        loading: 'Cargando',
        verificationCodeSent:
            'Se ha enviado un código de verificación al correo electrónico indicado.',
        spamCheckWarning:
            'Si no aparece en su cuadro de mensaje principal, verifique su Spam.',
        inputVerificationCode: 'Código',
    },
    changePwd: {
        title: 'Redefinir contraseña',
        newPwd: 'Nueva contraseña',
        confirmPwd: 'Repite la contraseña',
        changeButton: 'Redefinir',
        errorMessages: {
            shortPwd: 'La contraseña debe tener al menos 8 caracteres',
        },
    },
    register: {
        title: 'Regístrese',
        name: 'Nombre:',
        gender: 'Género:',
        race: 'Raza:',
        birth: 'Nacimiento:',
        country: 'País de origen:',
        residence: 'País de residencia:',
        originCountry: 'es su país de origen?',
        email: 'Email:',
        password: 'Contraseña:',
        passwordCondition:
            'La Contraseña debe contener un mínimo de 8 caracteres',
        signupButton: 'Registro',
        editProfile: 'Editar Perfil',
        emptyName: 'El Nombre no se puede dejar en blanco',
        emptyDate: 'El Nacimiento no se puede dejar en blanco',
        emptyLocation: 'Se deben completar el Estado y la Ciudad',
        emptyResidence: 'Lo País de Residencia no se puede dejar en blanco',
        emptyResidence2:
            'Necesitamos su país de residencia para mostrarle información al respecto',
        nationalityRequired: 'Lo País de Origen no se puede dejar en blanco',
        kinshipRequired: 'La Relación no se puede dejar en blanco',
        phoneRequired: 'El Número de Teléfono no se puede dejar en blanco',
        categoryRequired: 'Categoría no se puede dejar en blanco',
        geralError: 'Se produjo un error, inténtelo de nuevo más tarde.',
        confirmDeleteUser: 'Borrar perfil',
        confirmDeleteUser2: '¿Quieres eliminar este perfil?',
        selectImage: 'Seleccionar imagen de perfil',
        pickPhoto: 'Saque una foto',
        library: 'Seleccionar de la galería',
        removePhoto: 'Quitar foto',
        updatedPhoto: 'Foto de perfil actualizada',
        removedPhoto: 'Foto de perfil eliminada',
        fieldNotBlank: 'Los campos no pueden estar vacíos:',
        fieldNotBlank2:
            'Correo electrónico\nContraseña\n\nNecesitamos esta información para completar su registro',
        shortPassword: 'La contraseña debe tener al menos 8 caracteres',
        awesomeAlert: {
            loading: 'Cargando',
            registering: 'Registrando',
        },
        errorMessages: {
            error: 'Error',
            allFieldsAreFilled:
                'Todos los campos deben ser llenados correctamente',
        },
        healthProfessional: '¿Eres un profesional de la salud?',
        riskGroupLabel: '¿Formas parte del grupo de riesgo?',
        vaccination: '¿Tiene datos de vacunación?',
        institution: '¿Eres miembro de alguna institución?',
        idCode: 'Código da identificación:',
        riskGroupTitle: 'Grupos de Riesgo:',
        riskGroupMessage:
            '\t Personas mayores de 60 años o personas de cualquier edad que tienen comorbilidades, como enfermedades cardíacas, diabetes, neumopatía, enfermedades neurológicas o renales, inmunodepresión, obesidad, asma y mujeres posparto.',
        genderTitle: 'Género:',
        genderMessage:
            'Cisgénero (o cis) son personas cuya identidad de género coincide con la asignada al nacer.\n\n' +
            'Transgénero (o trans) son personas cuya identidad de género es opuesta al sexo biológico.\n\n' +
            'No binario son personas cuya identidad de género no está establecida.',
        modalButton: 'Vuelve',
    },
    ajuda: {
        title: 'Ayuda',
        faqBtn: 'FAQ',
        tutorialBtn: 'Tutorial',
        useTermsBtn: 'Condiciones y Políticas',
        aboutBtn: 'Acerca de',
    },
    tutorial: {
        title: 'Tutorial',
        tutorial: 'Tutorial',
        howToUse:
            '\nLa funcionalidad básica de Guardianes de la salud (GdS) son los informes de salud. Se puede encontrar en la página de inicio, pero hay otras funciones. Si desea obtener más información, siga leyendo.',
        home: 'Pagina de inicio',
        homeCont:
            'En esta pestaña puede seleccionar cómo se siente (bien o mal). Si es malo, puede marcar los síntomas y señalar cuánto tiempo ha estado, si es así.  N  nTambién puede personalizar su GdS colocando su foto en el ícono al lado de su nombre (recordando que la foto no se guarda permanentemente en la aplicación , por lo que si cierra sesión en su cuenta, deberá volver a insertar su foto).',
        news: 'Pantalla de Noticias',
        newsCont:
            'La pantalla de noticias es la última opción que encuentra al inicio de la aplicación. En esta parte se encuentran noticias diarias sobre la pandemia y la salud en general. ¡Aprovecha que ya estás aquí y echa un vistazo a lo que hemos preparado allí! Para acceder a la pestaña no es necesario tener una cuenta de Twitter ni establecer un enlace (no recibirás ningún tipo de notificación o correo electrónico).',
        newsPs:
            'PS: no necesitas tener una cuenta de Twitter y no recibirás ningún tipo de notificación o correo electrónico.',
        advices: 'Consejos de Salud',
        advicesCont:
            'La pestaña de consejos es una herramienta importante para que aprenda más sobre su salud, se actualiza dos veces al mes y tiene información sobre vacunas, enlaces útiles, cómo prevenir una pandemia y mucho más.',
        diary: 'Diario de la Salud',
        diaryCont:
            'Esta es una de las características más importantes de la aplicación, allí puede ver a través del calendario de salud y el gráfico circular todos los informes que ha realizado diariamente.  N  nPuede usar su calendario de salud si necesita estos datos para aclarar algo en una cita con el médico.',
        healthMap: 'Mapa de la Salud',
        healthMapCont:
            'Esta pestaña mostrará cómo se sienten las personas en su región. Cada punto del mapa representa a una persona o grupo de personas.',
        healthMapCont2:
            'Al hacer clic en cualquier punto del mapa, puede ver el estado de salud de las personas que informaron en esa región. No se exponen datos sensibles del usuario.',
        healthMapCont3:
            'Esta función lo ayuda a obtener una idea de la salud de las personas que lo rodean y adónde planea ir.  N  nSi ve que en un área determinada hay muchos informes de síntomas de COVID-19, puede evitar pasar, posponga su viaje al lugar o redoblar las medidas de prevención al pasar por estas regiones',
    },
    badReport: {
        title: '¿Que estas sintiendo?',
        sickAge: '¿Desde cuando se siente mal?',
        symptoms:
            'Seleccione abajo los síntomas que usted está sintiendo en este momento:',
        answerQuestions: 'Responde a las siguientes preguntas:',
        checkboxes: {
            first:
                '¿Tuvo contacto con alguien que presentaba los mismos síntomas?',
            second: '¿Buscó algún servicio hospitalario?',
            third: '¿Estuvo en la ',
            thirdContinuation:
                ' 2 días antes o después del inicio de los síntomas?',
            fourth: '¿Para qué país usted ha viajado?',
            fifth: '¡Apriete en la bandera para seleccionar!',
        },
        yes: 'Si',
        checkboxConfirm: 'Confirmar',
        messages: {
            button: 'Mostrar Mapa',
            sending: 'Envío...',
            thanks: 'Gracias!',
            reportSent: 'Su relato fue enviado.',
            oops: '¡Ups!',
            reportSent2:
                'Notamos que ya informó su estado de salud a través de esta opción hoy.',
            reportNotSent:
                'Hubo un error al enviar su estado de salud. Vuelve a intentarlo más tarde.',
            seeADoctor:
                '¡Recomendamos que si los síntomas continúan, busque atención médica!',
            confirmText: 'Confirmar',
            covidSuspect:
                'Para descargar la aplicación Guardians of Health y contribuir a hacer frente a Covid-19, visite:\nPlay Store: https://play.google.com/store/apps/details?id=com.guardioesapp&hl=pt\nApp Store: https://apps.apple.com/us/app/guardi%C3%B5es-da-sa%C3%BAde/id1450965975?l=pt&ls=1\n\nPara descargar la aplicación del Ministerio de Salud, visite:\nPlay Store: https://play.google.com/store/apps/details?id=br.gov.datasus.guardioes&hl=pt_BR\nApp Store: https://apps.apple.com/br/app/coronav%C3%ADrus-sus/id1408008382\n\nDefinición de contacto cercano: https://coronavirus.saude.gov.br/sobre-a-doenca#transmissao',
        },
        reportWithoutSymptom: {
            title: 'No es posible enviar',
            message: 'Seleccione al menos 1 síntoma',
        },
    },
    advices: {
        moreInformations: 'Mas informaciones',
        redirectPermission:
            '¿Quieres ser redirigido a la fuente del contenido?',
        title: 'Consejos',
        subtitle: 'Mantenga su salud al día',
        empty: 'Ningún consejo para su país',
        more: 'Sepa Mas',
        buttons: {
            messages: {
                title: 'Redireccionamiento...',
                subtitle: '¿Desea ser redirigido a Google Maps?',
            },
        },
    },
    diary: {
        title: 'Diario',
        year: ' año',
        years: ' años',
        participations: 'Participaciones',
        good: 'Bien',
        bad: 'Mal',
        report: ' dia',
        reports: ' dias',
        statisticsTitle: 'Estadísticas',
        goodPercent: '% dias - Bien',
        badPercent: '% dias - Mal',
        notInformed: '% dias - No informado',
    },
    home: {
        title: 'Inicio',
        hello: '¡Hola, ',
        nowAGuardian: 'Guardián de la Salud',
        addProfile: 'Añadir Perfil',
        alerts: 'Alertas',
        statusLast7Days: 'Estado en los últimos 7 días:',
        statusLast7DaysGood: 'Te has sentido bien',
        statusLast7DaysBad: 'Usted no estaba bien',
        vaccination: 'Vacunación:',
        vaccinationData: 'Actualice sus datos de vacunación',
        bioSecurity: 'Biosecurity:',
        bioSecurityQuestions: 'Responde preguntas sobre tu institución',
        userHowYouFelling: '¿Cómo te sientes hoy?',
        offlineTitle: 'Modo Offline',
        offlineMessage: 'No tienes conexión a internet.',
        offlineMessage2:
            'Es posible que los datos no estén sincronizados y los cambios realizados no se guardarán.',
    },
    profiles: {
        households: 'Familia',
        title: 'Perfiles',
        owner: 'Propietario',
    },
    locationRequest: {
        permissionTitle: 'Permita el uso de su ubicación',
        permissionMessage:
            'Guardianes de la Salud necesitan acceso a su ubicación ',
        permissionMessage2:
            'para que pueda enviar su estado de salud, ver informes y acceder al Mapa de Salud.',
        errorTitle: 'Error al obtener tu ubicación',
        errorMessage:
            'Permita el uso de la ubicación en la configuración de su dispositivo.',
        cancelText: 'Cancelar',
        okText: 'OK',
    },
    maps: {
        title: 'Mapa',
        guide:
            'Cada punto en el mapa representa una persona o grupo de personas.\n\nEl color de un grupo representa el porcentaje de síntomas y el tamaño, el número de personas.\n\nPuede tocar los puntos para obtener más información.',
        confirmGuide: 'OK!',
    },
    news: {
        title: 'Noticias',
        subtitle: 'Feed de tweets de Guardianes',
        openBrowser: '¿Quieres abrir el navegador?',
        twitter: 'Serás redirigido a twitter.com.',
    },
    report: {
        goodChoice: 'Bien',
        badChoice: 'Mal',
    },
    faq: {
        title: 'FAQ',
    },
    about: {
        title: 'Acerca de',
        tituloBtnUnb: 'Universidade de Brasilia',
        mensagemBtnUnb: '¿Desea ser redirigido al sitio web de UnB?',
        linkBtnUnb: 'https://www.unb.br',
        tituloBtnProEpi:
            'ProEpi - Associação Brasileira de Profissionais de Epidemiologia de Campo',
        mensagemBtnProEpi: '¿Desea ser redirigido a la página web del ProEpi?',
        linkBtnProEPi: 'https://proepi.org.br/',
        textoSobreTitulo: '\nSobre la Aplicación Guardianes de la Salud\n',
        textoSobre:
            'La historia de la aplicación Guardianes de la Salud comenzó en 2014, cuando el Ministerio de Salud tomó la iniciativa de promover la vigilancia participativa de los eventos de salud durante la Copa Mundial de la FIFA 2014.\n\nDesde entonces, en diferentes versiones y con el apoyo de diferentes socios, la aplicación ya se ha utilizado durante otros eventos, como los Juegos Olímpicos de Río 2016.\n\nLa aplicación Guardians of Health tiene el gran objetivo de fortalecer la capacidad de detectar brotes y emergencias de salud pública.\n\nEsta versión de la aplicación es una asociación de ProEpi (Asociación Brasileña de Profesionales de Epidemiología de Campo) con la Universidad de Brasilia.',
    },
    useTerms: {
        title: 'Condiciones y Políticas',
        consentTitle: 'Nuestras Condiciones y Políticas han cambiado',
        consentMessage:
            'Para seguir usando Guardianes de la Salud, debe aceptar los nuevos términos. Nos tomamos muy en serio su privacidad.',
        seeTerms: 'Leer Condiciones',
        agree: 'Yo Acepto',
        disagree: 'Yo no Acepto',
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
        title: 'Bioseguridad',
        titleError: 'Algunas preguntas no han sido respondidas',
        messageError: 'Por favor, responda todas las preguntas.',
    },
    vaccination: {
        title: 'Vacunación',
        doses: 'Doses',
        noDoses: 'No se encontró dosis',
        titleError: 'Campos inválidos',
        messageError: 'Por favor complete todos los campos correctamente.',
        titleError2: 'Error al agregar dosis',
        messageError2:
            'Ha alcanzado el límite de dosis para este tipo de vacuna.',
        messageError3:
            'Verifique que la fecha sea correcta o corrija la dosis anterior.',
        confirmDeleteDose: 'Eliminar dosis',
        confirmDeleteDose2: '¿Quieres eliminar esta dosis?',
        titleModal: 'Información sobre vacunas',
        nameVaccine: 'Nombre: ',
        laboratoryVaccine: 'Laboratorio: ',
        countryVaccine: 'País que inició la producción: ',
        dosesVaccine: 'Cantidad de dosis: ',
        minIntervalVaccine: 'Intervalo entre dosis: ',
        intervalVaccinePeriod: ' días',
        titleAddDose: 'Agregar nueva dosis',
        titleEditDose: 'Editar dosis ',
        dateField: 'Fecha',
        delete: 'Eliminar',
        save: 'Agregar',
        add: 'Adicionar',
    },
    drawer: {
        reportRumor: 'Informar Rumor',
        toEdit: 'Editar perfiles',
        logOut: 'Dejar',
        app: 'Aplicación',
        toSurveillance: 'Vigilancia Activa',
        toVaccination: 'Vacunación',
        share: 'Compartir',
        shareLink:
            'Guardianes de la Salud\nhttps://linktr.ee/guardioesdasaude\n',
        toHelp: 'Ayuda',
    },
    map: {
        people: 'Reports: ',
        symptomatic: 'Sintomáticos: ',
        noLocal: 'Estas personas no compartieron su ubicación',
        alert: 'Alertar Contactos',
        share:
            '¿Quieres compartir un anuncio con personas con las que has tenido contacto?',
        noAlert: 'No, te lo advertiré luego',
    },
    rumor: {
        title: 'Rumor',
        rumorSent: 'El rumor fue registrado.',
    },
    surveillance: {
        title: 'Vigilancia Activa',
        whatIs: '¿Qué es?',
        phone: 'Ingresa tu teléfono:',
        textAbout:
            'A Vigilância Ativa Institucional tem o intuito de conhecer, monitorar e identificar a situação de saúde dos usuários do aplicativo, que pertencem a alguma instituição, com enfoque nos sintomas relatados da COVID-19. Assim, ao apresentar os sintomas, o mesmo receberá auxílio de especialistas da área de saúde via telefone.',
        participateSuccess: '¡Ya estás participando!',
        participateQuestion: 'Quieres participar?',
        confirmRead:
            'Confirmo que he leído la información y estoy al tanto de los cambios que se realizarán después de la confirmación',
        cancelParticipation: 'Cancelar Participación',
        participate: 'Participar',
        titleMessage: 'Sea parte de la Vigilancia Activa',
        message: 'todavía no eres un vigilante activo. ¿Quieres participar?',
        cancelButton: 'No',
        redirectButton: 'Si, seré parte',
    },
    autocomplete: {
        searchBar: 'Pesquise aquí',
        noResult: 'No hay resultados',
    },
}
