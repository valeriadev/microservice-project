const express= require("express");
const app = express();
require("./routers/results.router").defineRoutes(app);

app.get('/health-check', (req,res)=>{
    res.sendStatus(200);
})

app.listen(8080, error =>{
    if(error){
       console.error("Faild to run server: "+error);
       throw error; 
    }else{
        console.log("Server is running on port 8080");
    }
})