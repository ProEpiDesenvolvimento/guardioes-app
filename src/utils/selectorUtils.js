import translate from '../../locales/i18n';
import {API_URL} from 'react-native-dotenv';
import ShcoolsSheet from '../utils/shoolsSheet.json';

export const localSymptom = [
    { key: 'Instituição de Ensino', label: 'Instituição de Ensino' },
    { key: 'Supermercado ou Shopping', label: 'Supermercado ou Shopping' },
    { key: 'Local de Trabalho ou Repartição Pública', label: 'Local de Trabalho ou Repartição Pública' },
];

export const gender = [
    { key: 'Mulher Cis', label: translate('genderChoices.cisWoman') },
    { key: 'Homem Cis', label: translate("genderChoices.cisMan") },
    { key: 'Mulher Trans', label: translate("genderChoices.transWoman") },
    { key: 'Homem Trans', label: translate("genderChoices.transMan") },
    { key: 'Não-binárie', label: translate("genderChoices.nonBinary") },
    { key: 'Intersexo', label: translate("genderChoices.intersex") }
];

export const race = [
    { key: 'Branco', label: translate("raceChoices.white") },
    { key: 'Indígena', label: translate("raceChoices.indian") },
    { key: 'Pardo', label: translate("raceChoices.mix") },
    { key: 'Preto', label: translate("raceChoices.black") },
    { key: 'Amarelo', label: translate("raceChoices.asian") }
];

export const country = [
    { key: "Angola", label: "Angola" },
    { key: "Antígua e Barbuda", label: "Antígua e Barbuda" },
    { key: "Argentina", label: "Argentina" },
    { key: "Aruba", label: "Aruba" },
    { key: "Bahamas", label: "Bahamas" },
    { key: "Barbados", label: "Barbados" },
    { key: "Belize", label: "Belize" },
    { key: "Bolívia", label: "Bolívia" },
    { key: "Brazil", label: "Brasil" },
    { key: "Cabo Verde", label: "Cabo Verde" },
    { key: "Chile", label: "Chile" },
    { key: "Colômbia", label: "Colômbia" },
    { key: "Costa Rica", label: "Costa Rica" },
    { key: "Cuba", label: "Cuba" },
    { key: "Domínica", label: "Domínica" },
    { key: "El Salvador", label: "El Salvador" },
    { key: "Equador", label: "Equador" },
    { key: "Granada", label: "Granada" },
    { key: "Guadalupe", label: "Guadalupe" },
    { key: "Guatemala", label: "Guatemala" },
    { key: "Guiana Francesa", label: "Guiana Francesa" },
    { key: "Guiné-Bissau", label: "Guiné-Bissau" },
    { key: "Guiné-Equatorial", label: "Guiné-Equatorial" },
    { key: "Haiti", label: "Haiti" },
    { key: "Ilhas Caimão", label: "Ilhas Caimão" },
    { key: "Ilhas Turcas e Caicos", label: "Ilhas Turcas e Caicos" },
    { key: "Ilhas Virgens", label: "Ilhas Virgens" },
    { key: "Jamaica", label: "Jamaica" },
    { key: "Martinica", label: "Martinica" },
    { key: "Moçambique", label: "Moçambique" },
    { key: "Paraguai", label: "Paraguai" },
    { key: "Peru", label: "Peru" },
    { key: "Porto Rico", label: "Porto Rico" },
    { key: "República Dominicana", label: "República Dominicana" },
    { key: "Santa Lúcia", label: "Santa Lúcia" },
    { key: "São Cristóvão e Neves", label: "São Cristóvão e Neves" },
    { key: "São Tomé e Príncipe", label: "São Tomé e Príncipe" },
    { key: "São Vicente e Granadinas", label: "São Vicente e Granadinas" },
    { key: "Suriname", label: "Suriname" },
    { key: "Trindad e Tobago", label: "Trindad e Tobago" },
    { key: "Uruguai", label: "Uruguai" },
    { key: "Venezuela", label: "Venezuela" }
];

export const household = [
    { key: 'Pai', label: "Pai" },
    { key: 'Mãe', label: "Mãe" },
    { key: 'Filhos', label: "Filhos" },
    { key: 'Irmãos', label: "Irmãos" },
    { key: 'Avós', label: "Avós" },
    { key: 'Outros', label: "Outros" }
];

export function getGroups(cat, lev, cyt){
    const groups = []
    fetch(`http://localhost:3001/school_units_list/`, {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "filter":
            {
                category: cat,
                level: lev,
                city: cyt,
            }
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.warn(responseJson)
            responseJson.school_units.map(group => {
                groups.push({ key: group.id, label: group.description })
            })
        })
    return groups
}

export function getGroupName(ID) {
    let groupName = []
    fetch(`${API_URL}/school_units/`, {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson)
            responseJson.school_units.map(group => {
                if (group.id === ID) {
                    groupName.push(group.description)
                }
            })
        })
    return groupName;
}

export const schoolCategory = [
    { key: 'UNB', label: "Universidade de Brasília" },
    { key: 'SES-DF', label: "Secretaria de Educação do Distrito Fereral" },
];

export const educationLevel = [
    { key: 'Ensino Médio', label: "Ensino Médio" },
    { key: 'Ensino Fundamental', label: "Ensino Fundamental" },
    { key: 'Ensino Infantil', label: "Ensino Infantil" }
];

export const schoolLocation = [
    { key: 'Águas Claras', label: "Águas Claras" },
    { key: 'Brasília', label: "Brasília" },
    { key: 'Brazlândia', label: "Brazlândia" },
    { key: 'Candangolândia', label: "Candangolândia" },
    { key: 'Ceilândia', label: "Ceilândia" },
    { key: 'Fercal', label: "Fercal" },
    { key: 'Gama', label: "Gama" },
    { key: 'Guará', label: "Guará" },
    { key: 'Itapoã', label: "Itapoã" },
    { key: 'Lago Sul', label: "Lago Sul" },
    { key: 'Núcleo Bandeirante', label: "Núcleo Bandeirante" },
    { key: 'Paranoá', label: "Paranoá" },
    { key: 'Park Way', label: "Park Way" },
    { key: 'Planaltina', label: "Planaltina" },
    { key: 'Recanto das Emas', label: "Recanto das Emas" },
    { key: 'Riacho Fundo I', label: "Riacho Fundo I" },
    { key: 'Riacho Fundo II', label: "Riacho Fundo II" },
    { key: 'Samambaia', label: "Samambaia" },
    { key: 'Santa Maria', label: "Santa Maria" },
    { key: 'São Sebastião', label: "São Sebastião" },
    { key: 'SCIA', label: "SCIA" },
    { key: 'SIA', label: "SIA" },
    { key: 'Sobradinho I', label: "Sobradinho I" },
    { key: 'Sobradinho II', label: "Sobradinho II" },
    { key: 'Taguatinga', label: "Taguatinga" },
    { key: 'Vicente Pires', label: "Vicente Pires" }
];

/*
export function getGroups(){
    const groups = []
    fetch(`${API_URL}/school_units/`, {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.school_units.map(group => {
                groups.push({ key: group.id, label: group.description })
            })
        })
    return groups
}
*/

/*export function getGroups() {
    const groups = []
    ShcoolsSheet.school_units.map(group => {
        groups.push({ key: group.id, label: group.description })
    })
    return groups
}*/

/*export function getGroups(){
    const groups = []
    fetch(`${API_URL}/groups/`, {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.groups.map(group => {
                groups.push({ key: group.id, label: group.description })
            })
        })
    return groups
}*/


/*
//////USO EM TESTES
const Data = [
    {
      "id": 1,
      "description": "Turma UnB",
      "kind": "Universidade",
      "details": "Esse é o grupo da turma 1 UnB"
    },
    {
        "id": 2,
        "description": "Secretaria de Saude",
        "kind": "Secretaria",
        "details": "Esse é o grupo da turma 2 da Secretaria de Saude"
    },
    {
        "id": 3,
        "description": "Turma Samambaia",
        "kind": "Municipio",
        "details": "Esse é o grupo da turma 3 de Samambaia"
    }
]


export function getGroups() {
    const groups = []
    Data.map(group => {
        groups.push({ key: group.description, label: group.description })
    })
    return groups
}//////////*/