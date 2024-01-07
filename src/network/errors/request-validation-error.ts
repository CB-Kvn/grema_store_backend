import { ValidationError } from "express-validator";
import { CustomError, ErrorResponse } from "./custom-error";

export class ResquestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')
        Object.setPrototypeOf(this, ResquestValidationError.prototype)
    }
    serializeErrors(){
        const errors = this.errors.map((err)=>{
            return {message: err.msg, field: err.type}
        })
        return{
            success:false,
            errors,
            data:''
        }
    }
}