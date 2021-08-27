const MaskCPF = (cpf) => {
    let string = ""
    for (let i = 0; i < cpf.length; i++) {
        let char = cpf[i]
        if (i === 3 || i === 6) string += '.' + char
        else if (i === 9) string += '-' + char
        else string += char
    }
    return string
}

const MaskRG = (rg) => {
    let string = ""
    for (let i = 0; i < rg.length; i++) {
        let char = rg[i]
        if (i === 2 || i === 5) string += '.' + char
        else if (i === 8) string += '-' + char
        else string += char
    }
    return string
}

const MaskCEP = (cep) => {
    let string = ""
    for (let i = 0; i < cep.length; i++) {
        let char = cep[i]
        if (i === 5) string += '-' + char
        else string += char
    }
    return string
}

const MaskPhone = (phone) => {
    let string = ""
    for (let i = 0; i < phone.length; i++) {
        let char = phone[i]
        if (i === 0) string += '(' + char
        else if (i === 1) string += char + ')'
        else if (i === 2 || i === 3) string += ' ' + char
        else if (i === 7) string += '-' + char
        else string += char
    }
    return string;
}

const MaskFixo = (phone) => {
    let string = ""
    for (let i = 0; i < phone.length; i++) {
        let char = phone[i]
        if (i === 0) string += '(' + char
        else if (i === 1) string += char + ')'
        else if (i === 2) string += ' ' + char
        else if (i === 6) string += '-' + char
        else string += char
    }
    return string;
}

const MaskMoney = (money) => {
    let moneyValue = (parseInt(money) / 100).toFixed(2)
    let moneyString = `${moneyValue}`
    let stringCentavos = moneyString.split('.')[1]
    let stringReais = moneyString.split('.')[0]

    let newStringReaisRevert = ""

    let cont = 0

    for (let i = (stringReais.length - 1); i >= 0; i--) {
        let num = stringReais[i]
        if ((cont % 3) === 0 && cont !== 0) newStringReaisRevert += '.' + num
        else newStringReaisRevert += num
        cont++
    }

    let newStringReais = ""

    for (let i = (newStringReaisRevert.length - 1); i >= 0; i--)newStringReais += newStringReaisRevert[i]

    const newStringMoney = 'R$ ' + newStringReais + ',' + stringCentavos

    return newStringMoney
}

const MaskDate = (date) => {
    let newDate = '';
    for (let i = 0; i < date.length; i++) {
        if (i === 1 || i === 3) newDate += date[i] + '/'
        else newDate += date[i]
    }
    return newDate;
}

module.exports = { MaskCPF, MaskPhone, MaskMoney, MaskDate, MaskFixo, MaskRG, MaskCEP }