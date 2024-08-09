export const maskPhoneBrazil = (phone) => {
    let masked = phone
    masked = masked.replace(/\D/g, '')
    // (11) 11111-1111 or (111) 11111-1111
    if (masked.length <= 11) {
        masked = masked.replace(/^(\d{2})(\d)/g, '($1) $2')
    } else {
        masked = masked.replace(/^(\d{3})(\d)/g, '($1) $2')
    }
    masked = masked.replace(/(\d)(\d{4})$/, '$1-$2')
    return masked
}

export const maskPhoneCaboVerde = (phone) => {
    let masked = phone.replace(/\D/g, '')

    if (masked.length > 11) {
        masked = masked.slice(0, 11)
    }
    if (masked.length > 3) {
        masked = `+238 ${masked.slice(3, 6)} ${masked.slice(6, 10)}`
    } else {
        masked = `+238 ${masked.slice(3)}`
    }

    masked = masked.trim()
    return masked
}

export const maskPhone = (country, phone) => {
    if (country === 'Cabo Verde') {
        return maskPhoneCaboVerde(phone)
    }
    return maskPhoneBrazil(phone)
}

export const maskIdentificationCode = (code) => {
    let masked = code
    masked = masked.replace(/[^a-zA-Z0-9]/g, '')
    return masked
}
