/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
let server : Server; 

const PORT= 3000; 

async function main(){
    try{

        await mongoose.connect(
          //   "mongodb+srv://moriamakterswarna:cCOp4ieBaKR11EkI@cluster0.zh14pzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

          "mongodb+srv://firebirdswarna:XRbgpNdpw6cbxdSO@cluster0.iyu5d.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0"
        );


        console.log("Connected to DB")


        server = app.listen(PORT, () =>{
            console.log(`Server is running on Port ${PORT}`)
        })

    }catch(error){
        console.log(error);
    }
}

main();