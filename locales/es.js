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
    register: {
        title: 'Regístrese',
        name: 'Nombre:',
        gender: 'Género:',
        race: 'Raza:',
        birth: 'Nacimiento:',
        country: 'País de origen:',
        originCountry: 'es su país de residencia?',
        email: 'Email:',
        password: 'Contraseña:',
        passwordCondition:
            'La contraseña debe contener un mínimo de 8 caracteres',
        signupButton: 'Registro',
        editProfile: 'Editar Perfil',
        emptyName: 'El nombre no puede estar vacío',
        emptyDate: 'Se debe completar la fecha de nacimiento',
        emptyLocation: 'Se deben completar el estado y la ciudad',
        nationalityRequired: 'Lo país de origen no se puede dejar en blanco',
        nationalityRequired2:
            'Necesitamos su nacionalidad para mostrarle información sobre su país',
        kinshipRequired: 'La relación debe completarse',
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
            allFieldsAreFilled: 'Todos los campos deben ser llenados',
        },
        healthProfessional: 'Eres un profesional de la salud',
        riskGroupLabel: '¿Formas parte del grupo de riesgo?',
        educationalInstitution:
            '¿Eres miembro de alguna institución educativa?',
        riskGroupTitle: 'Grupos de Riesgo:',
        riskGroupMessage:
            '\t Personas mayores de 60 años o personas de cualquier edad que tienen comorbilidades, como enfermedades cardíacas, diabetes, neumopatía, enfermedades neurológicas o renales, inmunodepresión, obesidad, asma y mujeres posparto.',
        riskGroupButton: 'Vuelve',
    },
    ajuda: {
        title: 'Ayuda',
        tutorialBtn: 'Tutorial',
        useTermsBtn: 'Condiciones y Políticas',
        aboutBtn: 'Acerca de',
    },
    tutorial: {
        title: 'Tutorial',
        tutorial: 'Tutorial de cómo utilizar la aplicación',
        howToUse:
            '\nPara utilizar la aplicación basta con hacer clic en el icono de reportar en la pantalla de inicio:',
        howToUse2:
            'A continuación, elija cómo informar, bien o mal. Si usted elige mal usted puede elegir los síntomas y desde cuando se siente mal. En este caso, el uso básico de la aplicación, si quería aprender más seguir leyendo para ver algunos consejos y otras características',
        news: 'Pantalla de Noticias',
        newsCont:
            'La pantalla de noticias es una de las funciones que usted encuentra en la pantalla de inicio, que está vinculada en el perfil de Guardianes y allí puedes ver mucha información porque esta página siempre está actualizada.\n Ya que estás por aquí dar una pasadita allí. ',
        newsPs:
            'Ps: usted no necesita tener cuenta en Twitter y usted no recibe ningún tipo de notificación / email.',
        advices: 'Consejos de Salud',
        advicesCont:
            'Aquí encontrará algunas informaciones importantes para echar un vistazo, como Dengue Chicungunya y Zika, teléfonos útiles y también, con ayuda de Google Maps usted tiene acceso a hospitales y farmacias cerca de usted.',
        diary: 'Diario de la Salud',
        diaryCont:
            'Esta es una de las pantallas más importantes, aquí usted puede ver todos los envíos que usted ha hecho y también tiene un calendario si usted necesita estos datos para aclarar algo en una consulta médica, por ejemplo.',
        healthMap: 'Mapa de la Salud',
        healthMapCont:
            'En el Mapa de la Salud se tiene acceso a todos los envíos hechos en su región, eso, por supuesto, sin exponer ningún dato sensible de los usuarios. Esta función ayuda al usuario a tener una visión de cómo va la salud de las personas a su alrededor para que ella consiga hasta prevenirse. \
        Por ejemplo, si usted ve que en una cierta área tiene muchos informes de síntomas de gripe usted puede tomar un jugo de naranja, o si tiene síntomas de Dengue usted puede evitar pasar en su lugar.',
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
            third: '¿Dejó su lugar de residencia en los últimos 14 días?',
            fourth: '¿Para qué país usted ha viajado?',
            fifth: '¡Apriete en la bandera para seleccionar!',
        },
        yes: 'Si',
        checkboxConfirm: 'Confirmar',
        alertMessages: {
            button: 'Mostrar Mapa',
            sending: 'Envío...',
            thanks: 'Gracias!',
            reportSent: 'Su relato fue enviado.',
            reportNotSent:
                'Notamos que ya informó su estado de salud hoy. Gracias por el aporte!',
            seeADoctor:
                '¡Recomendamos que si los síntomas continúan, busque atención médica!',
            confirmText: 'Confirmar',
            covidSuspect:
                'Para descargar la aplicación Guardians of Health y contribuir a hacer frente a Covid-19, visite:\nPlay Store: https://play.google.com/store/apps/details?id=com.guardioesapp&hl=pt\nApp Store: https://apps.apple.com/us/app/guardi%C3%B5es-da-sa%C3%BAde/id1450965975?l=pt&ls=1\n\nPara descargar la aplicación del Ministerio de Salud, visite:\nPlay Store: https://play.google.com/store/apps/details?id=br.gov.datasus.guardioes&hl=pt_BR\nApp Store: https://apps.apple.com/br/app/coronav%C3%ADrus-sus/id1408008382\n\nDefinición de contacto cercano: https://coronavirus.saude.gov.br/sobre-a-doenca#transmissao',
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
        participate: 'Participaciones',
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
        statusLast7DaysGood: 'Te has sentido bien.',
        statusLast7DaysBad: 'Usted no estaba bien.',
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
        permissionTitle: 'Permitir el uso de su ubicación',
        permissionMessage:
            'Guardianes de la Salud necesitan acceso a su ubicación ',
        permissionMessage2:
            'para que pueda enviar su estado de salud, ver informes y acceder al Mapa de Salud.',
        cancelText: 'Cancelar',
        okText: 'OK',
    },
    maps: {
        title: 'Mapa',
        guide: `Cada punto en el mapa representa una persona o grupo de personas.\n\nEl color de un grupo representa el porcentaje de síntomas y el tamaño, el número de personas.\n\nPuede tocar los puntos para obtener más información.`,
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
        textoVigilancia:
            'A Vigilância Ativa Institucional tem o intuito de conhecer, monitorar e identificar a situação de saúde dos usuários do aplicativo, que pertencem a alguma instituição, com enfoque nos sintomas relatados da COVID-19. Assim, ao apresentar os sintomas, o mesmo receberá auxílio de especialistas da área de saúde via telefone.',
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
                'Por favor, lea estos términos legales de uso antes de usar la aplicación "Guardianes de la Salud". Para realizar cualquier colaboración, acceda o descargue cualquier información de esta aplicación. Al acceder o usar la aplicación "Guardianes de la Salud", usted acepta y acepta de acuerdo con los términos y condiciones establecidos en los "Términos de Uso", que consisten en un contrato de colaboración entre usted y la aplicación "Guardianes de la Salud", que abarca todo su acceso y uso, que incluye el uso de toda la información, los datos, herramientas, productos, servicios y otros contenidos disponibles en la aplicación. Al utilizar esta aplicación, confirma que entiende y acepta las siguientes condiciones:',
            textoTermos_1:
                '\n1. RESPECTO A LAS LEYES \n\n El usuario registrado debe acceder a la aplicación "Guardianes de la Salud" sólo con fines legales y relacionados con la salud. El usuario acepta utilizar la aplicación sólo para los fines apropiados y de acuerdo con estos términos y limitaciones legales, así como con cualquier política aplicable en Brasil. Su acceso está prohibido en territorios donde el contenido se considera ilegal. Aquellos que opten por acceder a este sitio de otros lugares, lo harán por su propia iniciativa y serán responsables del cumplimiento de las leyes locales aplicables. Los materiales no deben ser usados o exportados en violación de las leyes brasileñas. Cualquier pendiente en relación a los materiales será resuelta por las leyes brasileñas. La modificación no autorizada del contenido de este sitio está expresamente prohibida.',
            textoTermos_2:
                '\n2. RESTRICCIONES DE USO: \n\n El uso de la aplicación sólo está permitido para mayores de 13 (trece) años.',
            textoTermos_3:
                '\n3. RESPONSABILIDAD POR EL CONTENIDO: \n\n Instituciones y desarrolladores de la aplicación "Guardianes de la salud" no son responsables por el contenido de cualquier información legal o ilegal, posiblemente intercambiada por los usuarios a través de redes sociales o para la aplicación "Guardianes de la Salud". Los comentarios compartidos por el usuario a través de las redes sociales no representan la opinión de las instituciones involucradas en el proyecto y la responsabilidad corresponde al autor del mensaje. El usuario acepta que es el único responsable de su propia conducta y la veracidad de la información proporcionada durante el uso del servicio y que es responsable de las consecuencias derivadas del suministro intencional de datos incorrectos. El usuario acepta que el uso de la aplicación "Guardianes de la Salud" no publicará, enviará, distribuirá ni divulgar contenido o información difamatoria, obscena o ilegal, incluyendo información confidencial perteneciente a otras personas o empresas y marcas registradas o protegidas por derechos de autor, sin la autorización expresa del propietario de dichos derechos. Nadie puede actuar en su nombre en el uso de la aplicación "Guardianes de la Salud". Usted es responsable del contenido que los individuos no autorizados producen al usar esta aplicación utilizando su perfil registrado con su permiso. Esta regla no se aplica a casos de infracción u otros problemas de seguridad de la aplicación.',
            textoTermos_4:
                '\n4. ACCESIBILIDAD DEL CONTENIDO: \n\n El equipo de aplicación "Guardianes de la Salud" no garantiza que esta aplicación sea parcial o totalmente funcional para su uso fuera del territorio nacional. Si opta por acceder a la aplicación de otros países, lo hará por su propia iniciativa y por su cuenta y riesgo. Usted es responsable de cumplir con las leyes locales y, en la medida en que las leyes locales son aplicables, usted está de acuerdo específicamente en cumplir todas las leyes aplicables relativas a la transmisión de datos técnicos exportados desde ese lugar.',
            textoTermos_5:
                '\n5. PROPIEDAD INTELECTUAL: \n\n El derecho de autoría del contenido producido y presentado en esta aplicación pertenece a los respectivos autores y colaboradores de esta aplicación. Esta premisa no se aplica a la información considerada de dominio público o de utilidad pública. Todas las demás marcas comerciales, marcas de servicio, nombres y logotipos que aparecen en esta aplicación son propiedad de sus respectivos propietarios.  N  n La aplicación "Guardianes de la salud" es un software de código abierto utilizado por terceros está sujeto a los términos licencia internacional http://opensource.org/licenses/gpl-3.0 GNU General Public License, versión 3 (GPL-3.0). Los derechos de uso del contenido e informes generados por la aplicación son asignados por los desarrolladores, especialmente los de los términos de la licencia Creative Commons http://creativecommons.org/licenses/by-nc/4.0/ - Asignación - No Comercial 4.0 Internacional http: // creativecommons.org.br/as-licencas/attachment/by-nc/. No sólo la información proporcionada por los servicios de salud debe considerarse oficial para la divulgación pública en lo que se refiere a los datos relacionados con este tema. Ninguna de las informaciones de la aplicación "Guardianes de la Salud", a pesar del esfuerzo del equipo para garantizar la calidad, la actualidad y la autenticidad de las informaciones, debe ser considerada oficial para la divulgación pública. Los datos recogidos a través de la aplicación "Guardianes de la Salud" proceden de usuarios que voluntariamente proporcionaron la información y que pueden verse influenciados por su capacidad para acceder a dispositivos móviles o ordenadores con especificaciones tecnológicas mínimas. Por lo tanto, las informaciones generadas a partir de esta estrategia pueden ser insuficientes para representar estadísticamente el perfil epidemiológico real del período y del lugar del relato. La información lúdica o utilidad pública puede presentar errores o eventuales fallas de actualización, siendo recomendada su validación por los usuarios en casos de emergencia o cualquier otra situación de amenaza a su salud o integridad.',
            textoTermos_6:
                '\n6. LEYES, REGLAMENTOS, DERECHOS Y DEBERES \n\n Es política del equipo de aplicación "Guardianes de la Salud" cumplir todas las leyes y regulaciones aplicables y actuales. En caso de que cualquier disposición de estos Términos de Uso esté en conflicto con cualquier ley o reglamento aplicable, la ley o reglamento aplicable sustituirá a la disposición contraria. Estos Términos de Uso y el uso de la aplicación "Guardianes de la Salud" son y se regir e interpretar de acuerdo con las leyes internas de Brasil, sin tener en cuenta sus reglas de conflicto de leyes. En caso de conflicto entre las leyes, las reglas y reglamentos de Brasil prevalecerán. La aplicación "Guardianes de la Salud" puede, pero no es necesaria para monitorear, revisar y restringir el acceso a cualquiera de las áreas donde los usuarios transmiten informaciones y puede retirar el acceso a cualquiera de esta información o comunicación. Si tiene alguna pregunta sobre la aplicación de "Guardianes de la Salud", no dude en contacto con nosotros por e-mail: contacto@proepi.org.br',
            textoTermos_7:
                '\n7. USO DE CONTRIBUCIONES: \n\n Al enviar una contribución por escrito o publicar información en la aplicación "Guardianes de la salud", usted concede una licencia perpetua, exenta de regalías, licencia incondicional para esta aplicación y cualquier organización sucesora, para publicar su contribución en la aplicación "Guardianes de la salud". ", Así como divulgarlo, de forma agregada (nunca individual), salvo a los usuarios que permitan la vigilancia institucional activa, a otros medios, y discutirlo o referenciarlo en las publicaciones que procedan de la aplicación "Guardianes de la Salud". Usted también está de acuerdo en que la aplicación "Guardianes de la Salud" tiene el derecho, pero no la obligación, de editar o eliminar cualquier contribución, o incluirla en el texto, junto con otras contribuciones, a criterio exclusivo del equipo relacionado a esa aplicación.',
            textoTermos_8:
                '\n8. SEGURIDAD Y GARANTÍA DE PRIVACIDAD: \n\n El secreto y la privacidad de toda la información producida por usted en la aplicación "Guardianes de la Salud" serán garantizados y el acceso a la información seguirá las reglas proporcionadas en la Ley de Acceso a la Información. Nos reservamos el derecho de usar esta información internamente y, en este ámbito, su contribución será vinculada a su e-mail y será anónima para cualquier propósito de análisis de los datos. También se informa que, para atender al objetivo principal de la aplicación, que es identificar aglomerados de individuos con síntomas, la información sobre su estado de salud será geográfica a través de la captura de la señal GPS de su dispositivo. La aplicación "Guardianes de la Salud", sus colaboradores y usuarios, incluyendo agencias gubernamentales y no gubernamentales, dependen de los usuarios para la precisión de las contribuciones. El equipo no es responsable de errores o imprecisiones en cualquier envío. La deformación deliberada de información por un usuario puede constituir una violación de la ley y, si grave, será informada a las autoridades gubernamentales apropiadas.',
            textoTermos_9:
                '\n9. ACTUALIZACIÓN DE LOS GUARDIAS DE APLICACIÓN EN SALUD: \n\n Puede que haya cambios en esta aplicación y en sus Condiciones de uso. A menos que indique lo contrario, su uso de Webapp y de la aplicación indica la aceptación completa de los Términos de Uso en esta versión actual cada vez que utilice la aplicación. "Guardianes de la Salud". Mantente atento a las actualizaciones y, en caso de duda, los Términos de Uso estarán siempre disponibles para acceso y acuerdo o no.',
            textoTermos_10:
                '\n10. RESPONSABILIDAD POR ACCIONES CON BASE EN EL CONTENIDO: \n\n La aplicación "Guardianes de la Salud" no asume responsabilidad por ningún daño o daño a personas o propiedades, como resultado de cualquier uso de ideas, contenido, instrucciones, métodos, productos o procedimientos contenidos en esa aplicación. Bajo ninguna circunstancia los profesionales involucrados el desarrollo o la gestión de esta aplicación se responsabilizará de cualquier decisión o acción tomada por usted en base a dicho contenido. Ante las amenazas o cualquier otro riesgo para su salud o integridad, siempre busque orientaciones validadas y actualizadas de los servicios locales de salud pública.',
            textoTermos_11:
                '\n11. RESPONSABILIDAD POR PROBLEMAS TECNOLÓGICOS: \n\n En su caso, todo el contenido o cualquier parte de la aplicación "Guardianes de la salud" puede no estar disponible y puede que no funcione correctamente en cualquier momento. Se harán todos los esfuerzos razonables para evitar problemas tecnológicos, pero puede ocurrir en cualquier momento en esta aplicación problemas tecnológicos de diversas naturalezas, tales como virus, rutinas de programación nocivos o problemas relacionados con el dispositivo. El Webapp y la aplicación se suministran "como están" y "según estén disponibles". Sin limitar nuestro aviso general, no garantiza la disponibilidad, integridad, oportunidad, funcionalidad, confiabilidad, secuenciación o velocidad de entrega en esta aplicación o cualquier parte del contenido. La aplicación "Guardianes de la Salud" no es responsable de ningún daño o perjuicio causado por el rendimiento o el fracaso en el rendimiento de cualquier parte de la aplicación. La aplicación "Guardianes de la salud" no es responsable de ningún defecto, retraso o error resultante del uso de esta aplicación. El uso de todas las funcionalidades de la aplicación "Guardianes de la Salud" requiere disponibilidad de acceso a Internet por el usuario, a través de red wi-fi o cable de datos. La ausencia de este requisito previo puede limitar el uso de la aplicación con todo su potencial de uso. El equipo de aplicación de los "Guardianes de la Salud", considerando este aviso, no asume ninguna responsabilidad como resultado de esa limitación. Esta advertencia se aplica a todos y cualquier daño, incluyendo aquellos causados ​​por cualquier error de rendimiento, error, omisión, interrupción, borrado, defecto, retraso en la operación o transmisión, virus informáticos, falla en la línea de comunicación, robo, destrucción o acceso no autorizado a la modificación o utilización de cualquier propiedad, ya sea por violación de contrato, comportamiento ilícito, negligencia o cualquier otra causa de acción.',
            textoTermos_12:
                '\n12. RESPONSABILIDAD POR INFORMACIÓN DE TERCEROS: \n\n La provisión a través de Webapp y la aplicación de enlaces y referencias a otros sitios, publicaciones o recursos de información no constituyen endoso a esos sitios o sus recursos por la aplicación "Guardianes de la Salud", sus agentes o representantes. El equipo de aplicación "Guardianes de la Salud" no hace declaraciones o afirmaciones sobre la calidad, el contenido y la precisión de la información, los servicios o los productos que pueden ser proporcionados por estos recursos y, específicamente, está exenta de cualquier garantía, incluyendo, pero no limitado a garantías implícitas o expresas de comercialización o adecuación a cualquier uso, aplicación o propósito específico.',
            textoTermos_13:
                '\n13. CONSIDERACIONES FINALES \n\n El acceso al servicio representa la aceptación expresa e irrestricta de los Términos de Uso descritos anteriormente. Al estar de acuerdo con estos términos, usted concede una licencia perpetua, libre de regalías, licencia incondicional para la aplicación "Guardianes de la Salud" y todas las organizaciones sucesores, para publicar su contribución de forma agregada, en la propia aplicación, así como divulgarlos a los usuarios servicios de vigilancia de salud pública relacionados. Usted también está de acuerdo en que la aplicación "Guardianes de la Salud" tiene el derecho, pero no la obligación, de editar o eliminar cualquier contribución a criterio exclusivo del equipo de la aplicación.\n',
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
        reportRumor: 'Informar Rumor',
        toEdit: 'Editar perfiles',
        logOut: 'Dejar',
        app: 'Aplicación',
        toSurveillance: 'Vigilancia activa',
        share: 'Compartir',
        shareLink:
            'Guardianes de la Salud\nhttps://linktr.ee/guardioesdasaude\n',
        toHelp: 'Ayuda',
        toFAQ: 'FAQ',
        participateSuccess: '¡Ya estás participando!',
        participateQuestion: 'Quieres participar?',
        confirmRead:
            'Confirmo que he leído la información y estoy al tanto de los cambios que se realizarán después de la confirmación',
        cancelParticipation: 'Cancelar Participación',
        participate: 'Participar',
    },
    map: {
        people: 'Personas: ',
        symptomatic: 'Sintomáticos: ',
        noLocal: 'Estas personas no compartieron tu ubicación',
        alert: 'Alertar Contactos',
        share:
            '¿Quieres compartir un anuncio con personas con las que has tenido contacto?',
        noAlert: 'No, te lo advertiré luego',
    },
    rumor: {
        title: 'Rumor',
        rumorSent: 'Rumor registered! ',
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
}
