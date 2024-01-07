export interface ErrorResponse{
    success:boolean,
    errors:{
        message:any,
        field?:any
    }[]
    data:string
}

export abstract class CustomError extends Error {
    abstract statusCode:number
    constructor(message:string){
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }
    abstract serializeErrors():ErrorResponse
}