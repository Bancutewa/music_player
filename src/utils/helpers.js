import icons from './icon'

const { AiFillStar, AiOutlineStar } = icons
// export const formatMoney = (number) => Number(number.toFixed(1)).toLocaleString();

export const formatMoney = (number) => new Intl.NumberFormat('vi-VN').format(number) + ' VNĐ';;



export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, { name: arr[0], message: "Required field" }])
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!arr[1].match(regex)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], message: "Invalid Email. Please check again!" }])
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], message: "Password must be at least 6 characters long." }])
                }
                break;
            case 'mobile':
                const regexMobile = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                if (!arr[1].match(regexMobile)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], message: "Invalid Mobile Number. Please check again!" }])
                }
                break;
            default:
                break;
        }
    }
    return invalids
}