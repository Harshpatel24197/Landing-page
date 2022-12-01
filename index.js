var express = require("express")
var app = express()
// cors using to connect db
var cors = require("cors");
const { MongoClient } = require("mongodb");
let projectCollection;
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// connection with mongodb
const Mongoclient = require("mongodb").MongoClient
// adding it with mongodb
const uri = 'mongodb+srv://harshpatel24197:Password@cluster0.vz0jmvy.mongodb.net/?retryWrites=true&w=majority'
// add collections
const insertprojects = (project, callback) =>{
    projectCollection.insert(project,callback);
}
const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}
const client = new Mongoclient(uri,{useNewUrlParser: true})
const createCollection = (collectionName) => {
    client.connect((err,db)=>{
        projectCollection = client.db().collection(collectionName);
        if(!err)
        {
            console.log("Mongodb Connected")
        }
        else
        {
            console.log("DB error", err);
            process.exit(1);
        }
    })
}
const cardList = [
    {
        title: "Nature",
        image: "images/Image.jpg",
        link: "About Nature",
        description: "Demo desciption about "
    },
    {
        title: "James webb",
        image: "images/spca.webp",
        link: "About James webb",
        description: "Demo desciption about"
    }
]
app.get('/api/projects',(req,res) => {
    getProjects((err, result)=>{
        if(err)
        {
            res.json({statusCode : 400, message: err})
        }
        else
        {
            res.json({statusCode : 200, message: "Success" , data: result})
        }
    })
})
app.post('/api/projects',(req,res)=>{
    console.log("Your Data", req.body)
    var newproject = req.body;
    insertprojects(newproject,(err,result)=>{
        if(err){
            res.json({statusCode : 400, message: err})
        }
        else
        {
            res.json({statusCode : 200, message: "Success" , data: result})
        }
    })
})
var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
    createCollection("nature")
})