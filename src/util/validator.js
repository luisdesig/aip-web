export function Validator(data){
    var obj = data;
    var ERROR = []
    for(var item in obj){
        if(obj[item] === ''){
            ERROR.push(item)
        }
    }
    return ERROR;
}