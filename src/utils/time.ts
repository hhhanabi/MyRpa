export const getTime = () => {
    let message=''
    let hours = new Date().getHours()
    if(hours<=9){
        message='早上好'
    }else if(hours<=13){
        message='中午好'
    }else if(hours<=17){
        message='下午好'
    }else{
        message='晚上好'
    }
    return message
}