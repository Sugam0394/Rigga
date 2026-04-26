 import 'dotenv/config'
import connectDB from './db/index.js'
import app from './app.js'


 

const PORT = process.env.PORT || 3000
console.log("ENV CHECK MONGODB_URL:", process.env.MONGODB_URL);
console.log("MONGO VALUE TYPE:", typeof process.env.MONGODB_URL);
console.log("MONGO VALUE:", process.env.MONGODB_URL);
connectDB()

 .then(() => {
    app.listen(PORT , () => {
        console.log(` ✅ server running successfully on Port : ${PORT}`)
    })
 })
 .catch((error) => {
    console.log(` ❌ mongoDB connetion failed:` , error);
    process.exit(1) // error
 })


