import httpStatus from "http-status";
import Messages from "../scripts/utils/messages.js";
import globalErrorHandler from "./error.js";

const idChecker = (...fields) => (req, res, next) => {
    const idFields = fields.length ? fields : ['id']; //if no argument ['id'], if array, return fields. Otherwise return all parameters.
    /**
     * INFO: 
     * should include a number between 0 and 9 
     * should include a char between a and f
     * should be 24 char length.
     */
    for (const field of idFields) {
        if(!req?.params[field]?.match(/^[0-9a-fA-F]{24}$/)){
            return next(globalErrorHandler(Messages.ERROR.BAD_ID_FORMAT, httpStatus.BAD_REQUEST));
        }    
    }
    
    return next();
}


export default idChecker;