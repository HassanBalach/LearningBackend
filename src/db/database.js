import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.Db_URL}`)

        
    } catch (error) {
        console.log("Fail to connect database", error)
         process.exit(1)
    }
}

export default connectDB;