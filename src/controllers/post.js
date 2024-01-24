import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { Post } from "../models/index.js";

export async function createPost(req, res){
    try {
        const user = await User.findById({_id: req.user});
        if(!user){
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const {title, subtitle, content} = req.body;

        if(!title || !subtitle || !content){
            res.status(400).json({
                message: "Please, provide the neccessary information"
            });
            return;
        }

        const post = new Post({
            title, subtitle, content,
            author: user._id
        })
        await post.save();

        const users = await User.findById({_id: req.user});
        users.posts.push(post);
        await users.save();
        res.status(200).json({
             data: post 
            })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);  
    }
}


// get one user post details
export async function userPosts( req, res){
    try {
        
        const oneUser = await User.findById({_id: req.user}).select('-password').populate('posts');

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

  