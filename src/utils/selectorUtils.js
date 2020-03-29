import translate from '../../locales/i18n';

export const gender = [
    { key: 'Masculino', label: translate("genderChoices.male")},
    { key: 'Femenino', label: translate("genderChoices.female")},
];

export const race = [
    { key: 'Blanco', label: translate("raceChoices.white")},
    { key: 'Indígena', label: translate("raceChoices.indian")},
    { key: 'Mestizo', label: translate("raceChoices.mix")},
    { key: 'Negro, mulato o afrodescendiente', label: translate("raceChoices.black")},
    { key: 'Palenquero', label: translate("raceChoices.palenquero")},
    { key: 'Raizal', label: translate("raceChoices.raizal")},
    { key: 'Rom-Gitano', label: translate("raceChoices.romGitano")}
];

export const country = [
    { key: 'Brazil', label: "Brasil"},
    { key: 'Colombia', label: "Colombia"},
    { key: 'Guatemala', label: "Guatemala"},
    { key: 'Argentina', label: "Argentina"},
    { key: 'Portugual', label: "Portugual"},
    { key: 'SaoTome', label: "São Tomé"},
    { key: 'Principe', label: "Principe"},
    { key: 'Chile', label: "Chile"},
    { key: 'Bolivia', label: "Bolivia"},
    { key: 'Equador', label: "Equador"},
    { key: 'Paraguai', label: "Paraguai"},
    { key: 'Peru', label: "Peru"},
    { key: 'Uruguai', label: "Uruguai"},
    { key: 'Venezuela', label: "Venezuela"},
    { key: 'Angola', label: "Angola"},
    { key: 'CaboVerde', label: "Cabo Verde"},
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
//            console.log('{ key: "' + brasil.loc_nome + '", label: "' + brasil.loc_nome + '" },')   
//        }
//    })
//    : null}