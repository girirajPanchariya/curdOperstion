import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    BookName:{
        type:String,
        require:true
    },
    BookTitle:{
        type:String,
        require:true
    },
    Author:{
        type:String,
        require:true
    },
    sellingPrice:{
        type:String,
        require:true
    },
    publseData:{
        type:String,
        
    },
},{timestamps:true})

export const Book = mongoose.model("books",bookSchema)