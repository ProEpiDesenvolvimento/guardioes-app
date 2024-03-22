export const maskPhone = (phone) => {
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

export const maskIdentificationCode = (code) => {
    let masked = code
    masked = masked.replace(/[^a-zA-Z0-9]/g, '')
    return masked
}
