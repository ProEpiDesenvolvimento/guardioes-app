import translate from '../../locales/i18n';
import { API_URL } from '../constUtils';

export const gender = [
    { key: 'Masculino', label: translate("genderChoices.male") },
    { key: 'Feminino', label: translate("genderChoices.female") },
];

export const race = [
    { key: 'Branco', label: translate("raceChoices.white") },
    { key: 'Indígena', label: translate("raceChoices.indian") },
    { key: 'Mestiço', label: translate("raceChoices.mix") },
    { key: 'Negro, mulato o afrodescendiente', label: translate("raceChoices.black") },
    { key: 'Palenquero', label: translate("raceChoices.palenquero") },
    { key: 'Raizal', label: translate("raceChoices.raizal") },
    { key: 'Rom-Gitano', label: translate("raceChoices.romGitano") }
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


export function getGroups(){
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
}


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