import httpStatus from "http-status";

const validate = (schema)=> (req,res,next) => {
    const {value, error} = schema.validate(req.body); //if no error, returns all the req.body object.
    if(error){
        const errorMessage = error.details?.map(detail => detail.message).join(", ");
        console.log(errorMessage);
        res.status(httpStatus.BAD_REQUEST).json({error:errorMessage});
        return; //TIP: use return to break the execution context.
    } 
    Object.assign(req, value); //TIP: if valid, assign value to req.
    return next();
}

export default validate;