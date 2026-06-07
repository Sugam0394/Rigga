import "./config/env.js";
import app from './app.js'
import connectDB from './config/db.js'

connectDB()


.then(() => {
   app.listen(process.env.PORT || 3000 ,() => {
    console.log(`Server is running at PORT : ${process.env.PORT}`);
   })
})

.catch((err)=> {
  console.log('MONGODB Connection failed !!', err)
})