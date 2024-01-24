import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";



// register a user
export async function register(req, res) {
    const {email, firstName, lastName, password} = req.body;
    try {
        
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        user = new User({email, firstName, lastName});
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(201).json({token: jwt.sign({id: user.id, user: true}, process.env.SECRET)})
    } catch (error) {
        res.status(500).json({message: "Internval server error"});
        console.log(error)
    }
    

}


// login for an user
export async function login (req, res){
    const {email, password} = req.body;
    try {
        let user = await User.findOne({
            email
        });

        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const payload = {
            id: user.id
        };
        res.status(200).json({
            data: payload,
            token: jwt.sign( payload,process.env.SECRET)
        })
    } catch (error) {
       res.status(500).json(error) 
       }

      
    }

// get all user details
export async function AllUser(req, res){
    try {
        let {page = 1, limit = 10} = req.query
        const allUser = await User.find().select('-password')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        const count = await User.countDocuments();
        
        if(!allUser){
            res.status(404).json({
                message: "No user found"
            });
            return;
        } else{
            res.status(200).json({
                message: allUser,
                totalPage: Math.ceil(count / limit),
                currentPage: page
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}


// get one user detail
export async function OneUser( req, res){
    try {
        
        const oneUser = await User.findById({_id: req.user}).select('-password');

        if(!oneUser){
            res.status(404).json({
                message: "No user found"
            });
            return;
        } else{
            res.status(200).json({
                data: oneUser,

            });
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);       
    }
}

