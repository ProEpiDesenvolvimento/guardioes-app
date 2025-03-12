// Informação de Estados
export const stateOptionsCV = [
    { key: 'BOA VISTA', label: 'BOA VISTA' },
    { key: 'BRAVA', label: 'BRAVA' },
    { key: 'FOGO', label: 'FOGO' },
    { key: 'MAIO', label: 'MAIO' },
    { key: 'SAL', label: 'SAL' },
    { key: 'SANTIAGO', label: 'SANTIAGO' },
    { key: 'SANTO ANTÃO', label: 'SANTO ANTÃO' },
    { key: 'SÃO NICOLAU', label: 'SÃO NICOLAU' },
    { key: 'SÃO VICENTE', label: 'SÃO VICENTE' },
]

// Informação de Municipios
export function getCityCV(city) {
    let CITIES = []
    switch (city) {
        case 'BOA VISTA':
            CITIES = [{ key: 'BOAVISTA', label: 'BOAVISTA' }]
            break

        case 'BRAVA':
            CITIES = [{ key: 'BRAVA', label: 'BRAVA' }]
            break

        case 'FOGO':
            CITIES = [
                { key: 'MOSTEIROS', label: 'MOSTEIROS' },
                { key: 'SÃO FILIPE', label: 'SÃO FILIPE' },
                {
                    key: 'SANTA CATARINA DO FOGO',
                    label: 'SANTA CATARINA DO FOGO',
                },
            ]
            break

        case 'MAIO':
            CITIES = [{ key: 'MAIO', label: 'MAIO' }]
            break

        case 'SAL':
            CITIES = [{ key: 'SAL', label: 'SAL' }]
            break

        case 'SANTIAGO':
            CITIES = [
                { key: 'PRAIA', label: 'PRAIA' },
                {
                    key: 'RIBEIRA GRANDE DE SANTIAGO',
                    label: 'RIBEIRA GRANDE DE SANTIAGO',
                },
                { key: 'SÃO DOMINGOS', label: 'SÃO DOMINGOS' },
                {
                    key: 'SÃO LOURENÇO DOS ÓRGÃOS',
                    label: 'SÃO LOURENÇO DOS ÓRGÃOS',
                },
                { key: 'SÃO MIGUEL', label: 'SÃO MIGUEL' },
                {
                    key: 'SÃO SALVADOR DO MUNDO',
                    label: 'SÃO SALVADOR DO MUNDO',
                },
                { key: 'SANTA CATARINA', label: 'SANTA CATARINA' },
                { key: 'SANTA CRUZ', label: 'SANTA CRUZ' },
                { key: 'TARRAFAL', label: 'TARRAFAL' },
            ]
            break

        case 'SANTO ANTÃO':
            CITIES = [
                { key: 'PAUL', label: 'PAUL' },
                { key: 'PORTO NOVO', label: 'PORTO NOVO' },
                { key: 'RIBEIRA GRANDE', label: 'RIBEIRA GRANDE' },
            ]
            break

        case 'SÃO NICOLAU':
            CITIES = [
                { key: 'RIBEIRA BRAVA', label: 'RIBEIRA BRAVA' },
                {
                    key: 'TARRAFAL DE SÃO NICOLAU',
                    label: 'TARRAFAL DE SÃO NICOLAU',
                },
            ]
            break

        case 'SÃO VICENTE':
            CITIES = [{ key: 'SÃO VICENTE', label: 'SÃO VICENTE' }]
            break

        default:
            CITIES = []
            break
    }
    return CITIES
}
