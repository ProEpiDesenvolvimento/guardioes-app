import translate from '../../locales/i18n';

export const groups = [
    { key: 'UnB', label: 'unb groups' },
    { key: 'FGA', label: 'FGA Group' },
];


export const gender = [
    { key: 'Masculino', label: translate("genderChoices.male") },
    { key: 'Femenino', label: translate("genderChoices.female") },
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
    { key: "Brasil", label: "Brasil" },
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

//Pega os estados do brasil, 2 Nivel
//{brasilData != null ?
//    brasilData.map(brasil => {
//        if (brasil.loc_niv_id == "3" && brasil.loc_loc_id == "45") {
//            //console.warn(brasil.loc_nome)
//            console.('{ key: "' + brasil.loc_nome + '", label: "' + brasil.loc_nome + '" },')   
//        }
//    })
//    : null}