import mongoose from "mongoose";

export const connetdb = async()=>{
            try {
                    mongoose.connect(process.env.MONGO__URL).then(()=>{

                        console.log("data bse is conneted");
                    })
                    
                    
            } catch (error) {
             console.log(error);
                
            }
}