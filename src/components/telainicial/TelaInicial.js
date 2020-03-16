import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, StatusBar, Alert, ImageBackground } from 'react-native';
import { imagemEntrar, imagemLogo, imagemRegistar, imagemFundoInicio, imagemLogoBR } from '../../imgs/imageConst';
import translate from '../../../locales/i18n';
import LinearGradient from 'react-native-linear-gradient';

const Redirect = (titulo, message, navigation) => {
    Alert.alert(
        `${titulo}`,
        `${message}`,
        [
            { text: "Cancelar", onPress: () => navigation.navigate('TelaInicial'), style: 'cancel' },
            { text: "Ok", onPress: () => navigation.navigate('Registrar') }
        ]
    )
}

class TelaInicial extends Component {
    constructor(props) {
        super(props);
        //this._loadInitialState();
    }

    static navigationOptions = {
        header: null,
    }

    //Funcao responsavel por verificar se o usuario está logado e ser redirecionado automaticamente para Home
    _loadInitialState = async () => {
        let UserID = await AsyncStorage.getItem('userID');
        this.props.navigation.navigate(UserID ? 'BottomMenu' : 'Cadastro');
    }


    render() {
        const { navigate } = this.props.navigation
        const statusColor = (<StatusBar backgroundColor='#348EAC' />)

        const logoBR = (
            <Image style={styles.imageLogo} source={imagemLogoBR} />
        )

        const logoES = (
            <Image style={styles.imageLogo} source={imagemLogo} />
        )

        let imageType;
        if (translate("initialscreen.title") === "Guardianes de la Salud") {
            imageType = logoES
        }
        else {
            imageType = logoBR
        }

        return (
            <LinearGradient style={styles.container} colors={['#348EAC', '#013444']} start={{ x: 1.5, y: 0.6 }} end={{ x: -0.2, y: 1.4 }}>
                {statusColor}
                <View style={styles.viewImage}>
                    {imageType}
                </View>
                <View style={styles.viewButton}>
                    <View style={styles.viewChildRegistar}>
                        <TouchableOpacity onPress={() => Redirect(textos.tituloTermosDeUso, textos.mensagem, navigation = this.props.navigation)}>
                            <Text style={styles.textButton}>REGISTRAR</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewChildEntrar}>
                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Text style={styles.textButton}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imageLogo: {
        flex: 1,
        width: '85%',
        resizeMode: 'center',
        marginTop: -60
    },
    viewButton: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        height: '10%',
        marginTop: 10,
        marginBottom: 30,
    },
    viewChildEntrar: {
        width: '49.5%',
        borderTopRightRadius: 90,
        borderBottomRightRadius: 90,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    viewChildRegistar: {
        width: '49.5%',
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    textButton: {
        fontFamily: 'roboto',
        color: '#013444',
        fontSize: 17,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});


const textos = {
    tituloTermosDeUso: 'Termos de uso',
    mensagem: `Por favor, leia estes termos legais de uso antes de usar o aplicativo "Guardiões da Saúde”. Para realizar qualquer colaboração, acesse ou baixe qualquer informação deste aplicativo. Ao acessar ou usar o aplicativo "Guardiões da Saúde", você aceita e concorda em obedecer aos termos e condições estabelecidos nos "Termos de Uso". Esses termos consistem em um contrato de colaboração entre você e o aplicativo "Guardiões da Saúde", que abrange todo o seu acesso e uso, que inclui o uso de todas as informações, dados, ferramentas, produtos, serviços e outros conteúdos disponíveis no aplicativo. Ao usar este aplicativo, você confirma que entende e concorda com as seguintes condições:


    1. RESPEITO AS LEIS 
    
    O usuário registrado deve acessar o aplicativo "Guardiões da Saúde" somente para fins legais e relacionados à saúde. O usuário concorda em usar o aplicativo apenas para os fins apropriados e de acordo com estes termos e limitações legais, bem como com qualquer política aplicável no Brasil. Seu acesso é proibido em territórios onde o conteúdo é considerado ilegal. Aqueles que optarem por acessar este site de outros lugares, o farão por sua própria iniciativa e serão responsáveis pelo cumprimento das leis locais aplicáveis. Os materiais não devem ser usados ou exportados em violação das leis brasileira. Qualquer pendência em relação aos materiais será resolvida pelas leis brasileira. A alteração não autorizada do conteúdo deste site é expressamente proibida.
    
    
    2. RESTRIÇÕES DE USO:
    
    O uso do aplicativo só é permitido para maiores de 13 (treze) anos.
    
    
    3. RESPONSABILIDADE PELO CONTEÚDO:
    
    Instituições e desenvolvedores do aplicativo "Guardiões da saúde" não são responsáveis ​​pelo conteúdo de qualquer informação legal ou ilegal, possivelmente trocados pelos usuários através de redes sociais ou para a aplicação "Guardiões da Saúde". Os comentários compartilhados pelo usuário através das redes sociais não representam a opinião das instituições envolvidas no projeto e a responsabilidade cabe ao autor da mensagem. O usuário concorda que ele é o único responsável por sua própria conduta e pela veracidade das informações fornecidas durante o uso do serviço e que ele é responsável pelas consequências decorrentes do fornecimento intencional de dados incorretos. O usuário concorda que o uso do aplicativo "Guardiões da Saúde" não irá publicar, enviar, distribuir ou divulgar conteúdo ou informação difamatório, obsceno ou ilegal, incluindo informações confidenciais pertencentes a outras pessoas ou empresas e marcas registradas ou protegidas por direitos autorais, sem a autorização expressa do proprietário desses direitos. Ninguém pode agir em seu nome no uso do aplicativo "Guardiões da Saúde". Você é responsável pelo conteúdo que indivíduos não autorizados produzem ao usar este aplicativo usando seu perfil registrado com sua permissão. Essa regra não se aplica a casos de violação ou outros problemas de segurança do aplicativo.
    
    
    4 ACESSIBILIDADE AO CONTEÚDO:

    A equipe de aplicação "Guardiões da Saúde" não garante que este aplicativo seja parcial ou totalmente funcional para uso fora do território nacional. Se optar por aceder à aplicação de outros países, fá-lo-á por sua própria iniciativa e por sua conta e risco. Você é responsável pela conformidade com as leis locais e, na medida em que as leis locais são aplicáveis, você concorda especificamente em cumprir todas as leis aplicáveis relativas à transmissão de dados técnicos exportados desse local.
    
    
    5. PROPRIEDADE INTELECTUAL:
    
    O direito de autoria do conteúdo produzido e apresentado nesta aplicação pertence aos respectivos autores e colaboradores deste aplicativo. Esta premissa não se aplica a informações consideradas de domínio público ou de utilidade pública. Todas as outras marcas comerciais, marcas de serviço, nomes e logotipos que aparecem nesse aplicativo são de propriedade de seus respectivos proprietários.
    
    A aplicação "Guardiões da Saúde" é um software de código aberto usado por terceiros está sujeito aos termos da licença internacional http://opensource.org/licenses/gpl-3.0 GNU General Public License, versão 3 (GPL-3.0 ).
    
    Direitos de uso do conteúdo e relatórios gerados pelo aplicativo são atribuídos pelos desenvolvedores, especialmente os dos termos da licença Creative Commons http://creativecommons.org/licenses/by-nc/4.0/ - Atribuição - Não Comercial 4.0 Internacional http://creativecommons.org.br/as-licencas/attachment/by-nc/.
    
    Somente as informações fornecidas pelos serviços de saúde devem ser consideradas oficiais para divulgação pública no que tem a ver com os dados relacionados a esse tópico. Nenhuma das informações do aplicativo "Guardiões da Saúde", apesar do esforço da equipe para garantir a qualidade, a atualidade e a autenticidade das informações, deve ser considerada oficial para divulgação pública. Os dados coletados através do aplicativo "Guardiões da Saúde" são provenientes de usuários que voluntariamente forneceram as informações e que podem ser influenciados pela sua capacidade de acessar dispositivos móveis ou computadores com especificações tecnológicas mínimas.
    
    Dessa forma, as informações geradas a partir dessa estratégia podem ser insuficientes para representar estatisticamente o perfil epidemiológico real do período e do local do relato. A informação lúdica ou utilidade pública pode apresentar erros ou eventuais falhas de atualização, sendo recomendada sua validação pelos usuários em casos de emergência ou qualquer outra situação de ameaça à sua saúde ou integridade.
    
    
    6. LEIS, REGULAMENTOS, DIREITOS E DEVERES
    
    É política da equipe de aplicação "Guardiões da Saúde” cumprir todas as leis e regulamentos aplicáveis ​​e atuais. Caso qualquer disposição destes Termos de Uso esteja em conflito com qualquer lei ou regulamento aplicável, a lei ou regulamento aplicável substituirá a disposição contrária. Estes Termos de Uso e ao uso do aplicativo "Guardiões da Saúde" são e serão regidos e interpretados de acordo com as leis internas do Brasil, sem levar em conta as suas regras de conflito de leis. Em caso de qualquer conflito entre as leis, regras e regulamentos do Brasil e do exterior, as leis, regras e regulamentos do Brasil prevalecerão. A aplicação "Guardiões da Saúde" pode, mas não é necessária para monitorar, revisar e restringir o acesso a qualquer uma das áreas onde os usuários transmitem informações e pode retirar o acesso a qualquer desta informação ou comunicação. Se você tiver alguma dúvida sobre o aplicativo "Guardiões da Saúde", não hesite em nos contatar pelo e-mail: contato@proepi.org.br
    
    
    7. USO DE CONTRIBUIÇÕES:
    
    Ao enviar uma contribuição por escrito ou publicar informações no aplicativo "Guardiões da saúde", você concede uma licença perpétua, isenta de royalties, licença incondicional para este aplicativo e qualquer organização sucessora, para publicar sua contribuição no aplicativo "Guardiões da saúde". ", Bem como divulgá-lo, de forma agregada (nunca individual) a outros meios de comunicação, e discuti-lo ou referenciá-lo em quaisquer publicações oriundas do aplicativo "Guardiões da Saúde". Você também concorda que o aplicativo "Guardiões da Saúde" tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição, ou incluí-la no texto, em conjunto com outras contribuições, a critério exclusivo da equipe relacionada a essa aplicação.
    
    8. SEGURANÇA E GARANTIA DE PRIVACIDADE:
    
    O sigilo e a privacidade de todas as informações produzidas por você no aplicativo "Guardiões da Saúde" serão garantidos e o acesso às informações seguirá as regras fornecidas na Lei de Acesso à Informação. Reservamo-nos o direito de usar essas informações internamente e, neste escopo, sua contribuição será vinculada ao seu e-mail e será anônima para qualquer finalidade de análise dos dados. Informamos também que, para atender ao objetivo principal da aplicação, que é identificar aglomerados de indivíduos com sintomas, as informações sobre seu estado de saúde serão geolocalizadas através da captura do sinal GPS de seu dispositivo. O aplicativo "Guardiões da Saúde", seus colaboradores e usuários, incluindo agências governamentais e não governamentais, dependem dos usuários para a precisão das contribuições. A equipe não é responsável por erros ou imprecisões em qualquer envio. A deturpação deliberada de informações por um usuário pode constituir uma violação da lei e, se grave, será informada às autoridades governamentais apropriadas.
    
    
    9. ATUALIZAÇÃO DOS GUARDIÕES DE APLICAÇÃO EM SAÚDE:
    
    Pode haver modificações neste aplicativo e em seus Termos de Uso. A menos que você indique o contrário, seu uso do Webapp e do aplicativo indica a aceitação integral dos Termos de Uso nessa versão atual, toda vez que você usar o aplicativo. "Guardiões da Saúde". Fique atento às atualizações e, em caso de dúvida, os Termos de Uso estarão sempre disponíveis para acesso e acordo ou não.
    
    10. RESPONSABILIDADE POR AÇÕES COM BASE NO CONTEÚDO:
    
    O aplicativo "Guardiões da Saúde” não assume responsabilidade por nenhum dano e/ou dano a pessoas ou propriedades, como resultado de qualquer uso de ideias, conteúdo, instruções, métodos, produtos ou procedimentos contidos naquele aplicativo. Sob nenhuma circunstância os profissionais envolvidos com o desenvolvimento ou gerenciamento deste aplicativo serão responsabilizados por qualquer decisão ou ação tomada por você com base no referido conteúdo. Em face de ameaças ou qualquer outro risco para sua saúde ou integridade, sempre busque orientações validadas e atualizadas dos serviços locais de saúde pública.
    
    
    11. RESPONSABILIDADE POR PROBLEMAS TECNOLÓGICOS:
    
    Eventualmente, todo o conteúdo ou qualquer parte do aplicativo "Guardiões da Saúde" pode não estar disponível e pode não funcionar corretamente a qualquer momento. Faremos todos os esforços razoáveis ​​para evitar problemas tecnológicos, mas pode ocorrer a qualquer momento nesta aplicação problemas tecnológicos de diversas naturezas, tais como vírus, rotinas de programação nocivos ou problemas relacionados com o dispositivo. O Webapp e o aplicativo são fornecidos "como estão" e "conforme disponíveis". Sem limitar o nosso aviso geral, não garante a disponibilidade, integridade, oportunidade, funcionalidade, confiabilidade, seqüenciamento ou velocidade de entrega nesta aplicação ou qualquer parte do conteúdo. O aplicativo "Guardiões da Saúde" não é responsável por nenhum dano ou prejuízo causado pelo desempenho ou falha no desempenho de toda ou qualquer parte do aplicativo. O aplicativo "Guardiões da Saúde" não é responsável por qualquer defeito, atraso ou erro resultante do uso deste aplicativo. O uso de todas as funcionalidades da aplicação "Guardiões da Saúde" requer disponibilidade de acesso à Internet pelo usuário, através de rede wi-fi ou cabo de dados. A ausência desse pré-requisito pode limitar o uso do aplicativo com todo o seu potencial de uso. A equipe de aplicação dos "Guardiões da Saúde", considerando este aviso, não assume nenhuma responsabilidade como resultado dessa limitação. Este aviso aplica-se a todos e quaisquer danos, incluindo aqueles causados ​​por qualquer falha de desempenho, erro, omissão, interrupção, apagamento, defeito, atraso na operação ou transmissão, vírus de computador, falha na linha de comunicação, roubo, destruição ou acesso não autorizado a alteração ou utilização de qualquer propriedade, seja por violação de contrato, comportamento ilícito, negligência ou qualquer outra causa de ação.
    
    
    12. RESPONSABILIDADE POR INFORMAÇÕES DE TERCEIROS:
    
    A provisão através do Webapp e a aplicação de links e referências a outros sites, publicações ou recursos de informação não constituem endosso a esses sites ou seus recursos pelo aplicativo "Guardiões da Saúde", seus agentes ou representantes. A equipe de aplicação "Guardiões da Saúde" não faz representações ou afirmações sobre a qualidade, conteúdo e precisão das informações, serviços ou produtos que possam ser fornecidos por esses recursos e, especificamente, está isenta de quaisquer garantias, incluindo, mas não limitado a garantias implícitas ou expressas de comercialização ou adequação a qualquer uso, aplicação ou propósito específico.
    
    
    13. CONSIDERAÇÕES FINAIS
    
    O acesso ao serviço representa a aceitação expressa e irrestrita dos Termos de Uso descritos acima. Ao concordar com estes termos, você concede uma licença perpétua, isenta de royalties, licença incondicional para o aplicativo "Guardiões da Saúde" e todas as organizações sucessoras, para publicar sua contribuição de forma agregada, no próprio aplicativo, bem como divulgá-los aos serviços de vigilância de saúde pública relacionados. Você também concorda que o aplicativo "Guardiões da Saúde" tem o direito, mas não a obrigação, de editar ou remover qualquer contribuição a critério exclusivo da equipe do aplicativo. 
    `,
    ifYes: 'Registrar',
    ifNo: 'TelaInicial'
}

export default TelaInicial;
