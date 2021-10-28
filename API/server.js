const express= require("express")
const mongodb=require("mongodb")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const mongoclient=mongodb.MongoClient;
const URL="mongodb+srv://karmanya:admin123@cluster0.ljhlj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const URL="mongodb://localhost:27017/Splitverse"
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))
//MiddleWare for Authentication the Routes
function authenticate(req,res,next){
    if(req.headers.authorization){
       let valid= jwt.verify(req.headers.authorization,"~Q$eTgh27'SrtXrq")
       if(valid){
           console.log(valid);
           req.userid=valid.id;
        next()
       }
       else
       {
           res.status(401).json({
               message:"Unauthorize"
           })
       }
    
    }
    else
    {
        res.status(401).json({
            message:"Unauthorize"
        })
    }
}
app.get("/",function(req,res){
    res.json({
        message:"Working"
    })
})
//Get all User
app.get("/user",async function(req,res){
    try{
        let connection = await mongoclient.connect(URL)
        let db=connection.db("Splitverse")


        let user=await db.collection('users').find().toArray()
        //console.log(groups);
        res.json(user);
    }
    catch(error){
        console.log(error)
    }
})
//Register a User
app.post("/user/register",async function(req,res){
    try{
        let connection = await mongoclient.connect(URL)
        let db=connection.db("Splitverse")
        let salt=await bcrypt.genSalt(10)
        let hash=await bcrypt.hash(req.body.password,salt);
        console.log(hash);
        req.body.password=hash;
        await db.collection('users').insertOne(req.body)
        res.json({
            message:"User Created"
        }) 
    }
    catch(error){
        console.log(error)
    }
})
//Login a user
app.post("/user/login",async function(req,res){
    try
    {
        console.log(req.body);
        let connection = await mongoclient.connect(URL)
        let db=connection.db("Splitverse")
        let user= await db.collection("users").findOne({email:req.body.email})
        let userId=user._id;
        if(user){
            let result=await bcrypt.compare(req.body.password,user.password)
            if(result){
                
                //Generate JWT token
                let token=jwt.sign({
                    id:user._id,
                    exp:Math.floor(Date.now()/1000)+(60*60)
                },"~Q$eTgh27'SrtXrq")
                res.status(200).json({
                    message:"Login Success",
                    userId,
                    token
                })
            }
            else
            {
                res.status(401).json({
                    message:"Wrong Login Credentials"
                })
            }
        }
        else{
            res.status(401).json({
                message:"Wrong Login Credentials"
            })
        }
    }
    catch{

    }
})
//Get all groups
app.get("/groups",authenticate,async function(req,res){
    try{
        let connection = await mongoclient.connect(URL)
        let db=connection.db("Splitverse")


        let groups=await db.collection('groups').find({userid:req.userid}).toArray()
        //console.log(groups);
        res.json(groups);
    }
    catch(error){
        console.log(error)
    }
})
//Create a Group
app.post("/create-group",authenticate,async function(req,res){
    try{
        console.log(req.body);
        let connection = await mongoclient.connect(URL)
        let db=connection.db("Splitverse")
        req.body.member=[];
        req.body.userid=req.userid;
        await db.collection('groups').insertOne(req.body)
        res.json({
            message:"Group Added"
        }) 
    }
    catch(error){
        console.log(error)
    }
})
//Get a particular group
app.get("/group/:id",authenticate,async function(req,res){
    try{
        var id=mongodb.ObjectId(req.params.id)
        let connection =await mongoclient.connect(URL)

        let db = connection.db("Splitverse")

        let group=await db.collection("groups").findOne({_id:id})

        await connection.close()

        res.json(group)
    }
    catch(err)
    {
        console.log(err)
    }
})
//Edit a particular Group
app.put("/group/:id",authenticate,async function(req,res){
    try{
        console.log(req.body);
        var id=mongodb.ObjectId(req.params.id)
        let connection =await mongoclient.connect(URL)

        let db = connection.db("Splitverse")
        await db.collection("groups").findOneAndUpdate({_id:id},{$set:{member:req.body.member,count:req.body.count}})

        await connection.close()

        res.json({
            message: "Group Edited"
        })
    }
    catch(err)
    {
        console.log(err)
    }
})
//Delete a particular Group
app.delete("/group/:id",async function(req,res){
    try{
        var id=mongodb.ObjectId(req.params.id)
        let conn =await mongoclient.connect(URL)

        let db = conn.db("Splitverse")


        await db.collection("groups").deleteOne({_id:id})

        await conn.close()

        res.json({
            message: "student deleted"
        })
    }
    catch(err)
    {
        console.log(err)
    }
})
//Delete Member of a group
app.delete("/group/member/:id",async function(req,res){
    try{
       // var id=mongodb.ObjectId(req.params.id)
        let conn =await mongoclient.connect(URL)

        let db = conn.db("Splitverse")

        let groupid=req.params.id.slice(0,24);
        let memberid=req.params.id.slice(24,30);
        console.log(groupid);
        console.log(memberid)
        let group=await db.collection("groups").findOne({_id:mongodb.ObjectId(groupid)})
        group.member.forEach((member,i)=>{
            if(memberid.toString()==member.id.toString())
            {
                console.log("match")
                group.member.splice(i,1);
                group.count--;
            }
            
        })
        console.log(group);
        await db.collection("groups").findOneAndUpdate({_id:mongodb.ObjectId(groupid)},{$set:{member:group.member,count:group.count}})
        await conn.close()

        res.json({
            message: "student deleted"
        })
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server is up at 3000")
})
