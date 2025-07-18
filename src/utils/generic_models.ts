export  function  errorModel(message:string){
    return {
        "status": 0,
        "message": message
    }
}


export function successModel(messge:string){
    return {
        "status":1,
        "message": messge
    }
}