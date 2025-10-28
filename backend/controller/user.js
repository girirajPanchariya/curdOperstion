import { UserModel } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Book } from "../model/book.js";

export const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "There was a problem",
            error: error.message
        });
    }
};

export const Login = async(req,res)=>{

try {
            const {email,password} = req.body;

        const existingUser = await UserModel.findOne({email})

        if(!existingUser){
             return res.status(400).json({
                            message:"email and passrowd are not match"
                    })
        }
        const ismatch = await bcrypt.compare(password,existingUser.password)

        if(!ismatch){
                  return res.status(400).json({
                            message:"password and email are not match"
                    })
            
        }
        const token   = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"2d"})

        return res.status(200).cookie("token",token,{
            maxAage:48*60*60*1000,
            httpOnly:true,
            sameSite:"Strict"
        }).json({
            message:`welcome back ${existingUser.userName}`,
            existingUser,
            token
        })              

} catch (error) {
    console.log(error);
        
}
}

export const logout = async(req,res)=>{
    return res.status(200).cookie("token","",
        {
            maxAage:0,
            httpOnly:true, 
            sameSite:'Strict'

    }).json({
        message:"logout succussfuly"
    })
}
export const getalluser = async(req,res)=>{

    try {
        const user = await UserModel.find({}).populate('Bookread')
        if(!user){
            return res.status(400).json({
                message:"the are not userfond"
            })
        }
        return res.status(200).json({
            message:"All user are there",
            user
        })
    } catch (error) {
       console.log(error);
        
    }
}
export const deleteUser  = async(req,res)=>{
    try {
        const {id} = req.params

        const deletuser = await UserModel.findByIdAndDelete(id);
        
        return res.status(200).json({
            message:`${deleteUser.userName} is deleted`,
            deleteUser
        })

    } catch (error) {
        console.log(error);
                
    }
}
export const updateUser = async(req,res)=>{

        const {id} = req.params;
        const { userName, email, password } = req.body
        const hashpassword = await bcrypt.hash(password,10)
        const updated = { userName, email, password:hashpassword };

        const newdata = await UserModel.findByIdAndUpdate(id,updated);
        await newdata.save();
        
        return res.status(200).json({
            message:'update user is ',
            newdata
        })


}

export const addReadBook = async (req, res) => {
    try {
        const userId = req.user.id;  // from verifyToken middleware
        const id = req.params.id;
        const bookId = id;

        // Check book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Find user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if book already in Bookread
        if (user.Bookread.includes(bookId)) {
            return res.status(400).json({ message: "Book already marked as read" });
        }

        // Add book to Bookread list
        user.Bookread.push(bookId);
        await user.save();

        return res.status(200).json({
            message: `"${book.title}" marked as read`,
            book,
            Bookread: user.Bookread
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const UserReabBook = async(req,res)=>{

    try {
        const userid = req.user.id;

    const user = await UserModel.findById(userid).populate("Bookread")

    if(!user){
        return res.status(400).json({
            message:"user not read any book"
        })
    }
    return res.status(200).json({
        message:"book read by user",
        book:user.Bookread,
        
    
    })
    } catch (error) {
      console.log(error);
        
    }

}