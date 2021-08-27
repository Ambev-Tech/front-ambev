const IsNumber = (number) => {
    const numbers   = [0,1,2,3,4,5,6,7,8,9]
    let isEqual = false
    numbers.map((num)=>{
        if(num.toString() === number)isEqual = true
    })
    return isEqual
}

const DeleteContentBackward = (string) =>{
    let newPhoneNumber = ""
    for(let i = 0 ; i < (string.length - 1); i++)newPhoneNumber += string[i]
    return newPhoneNumber
}

const RemoveZeroLeft = (string) => {
    let pos = 0
    while(string[pos] === '0')pos++
    let newString = ""
    for( let i = pos ; i < string.length ; i++ )newString += string[i]
    return newString
}

module.exports = { IsNumber, DeleteContentBackward, RemoveZeroLeft }