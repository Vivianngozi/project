import  Validator  from "email-validator";

export async function userAuthValidator (req, res, next){
    const {email, firstName, lastName, password} = req.body;
    let errors = []
        if(!email){
            errors.push({email: "Email is required"})
        }
        const isValid = Validator.validate(email);
        if(!isValid){
            errors.push({email: "Email is not valid"});
        }
    
        if(typeof firstName != "string" || firstName.length == 0) {
            errors.push({firstName: "First Name is required or is not in the right format"})
        }
    
        if(typeof lastName != "string" || lastName.length == 0 ){
            errors.push({lastName: "Last Name is required or is not in the right format"})
        }
    
        if(typeof password != "string" || password.length == 0 || password.length < 4) {
            errors.push({password: "Password is required or not in the right format or is less than 4 words"})
        }
    
        if(errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        next()

}



