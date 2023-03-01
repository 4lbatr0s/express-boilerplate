import httpStatus from "http-status";
import Messages from "../scripts/utils/messages.js";
import ApiError from "./ApiError.js";

class ApiNotFoundError extends ApiError {
    constructor(){
        super(Messages.ERROR.RECORD_NOT_FOUND, httpStatus.NOT_FOUND);
    }
}

export default ApiNotFoundError;