import httpStatus from 'http-status'

class ApiError extends Error{
    constructor(message,statusCode){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.success=false;
    }
    //We can create static errors like below:
    static notFound(){
        throw new Error('Record not found', httpStatus.not);
    }
    static badRequest(){
        this.message='Bad request',
        this.statusCode = httpStatus.BAD_REQUEST;
    }

}

export default ApiError;