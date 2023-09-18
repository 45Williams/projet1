const express = require('express')
const bodyParser = require('body-parser')

const app = express()

let port = 3000;
const users =[
    {   
        id: 2,
        nom: "william",
        prenom: "nimane",
        age: 22
    },

    {   
        id: 1,
        nom: "Christian",
        prenom: "nimane",
        age: 22
    },

    {   
        id: 3,
        nom: "Atom",
        prenom: "nimane",
        age: 22
    },

    {   
        id: 4,
        nom: "Ema",
        prenom: "nimane",
        age: 22
    }
]


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
const getUsers = (req, res) => {
     
    res.status(200).json(users)
}

const getuser = (req, res) => {
    
    const userId = req.params.id
    console.log(userId) 
    const user = users.find((user) => user.id == userId) 
    
    if (user) {
    res.status(200).json(user)
    } else {
        res.status(404).json(
            {
                msg: "l'utilisateur n'existe pas!!!"
            }
        )
        console.log("l'utilisateur n'existe pas!!!")
    }
    console.log(user)
    
}

const deleteuser = (req, res) => {
        const userId = req.params.id
        const userIndex = users.findIndex((user) => user.id == userId)

        if (userIndex > 0) {
            users.splice(userIndex,1)
                res.status(200).json(users)
         
            
        }else{
            res.status(404).json(
                {
                    msg: "n'existe pas"
                }
                
            )
            
        }
        
        
}

const adduser =(req, res)=>{
    const userData = req.body
    const index = users.findIndex(user => user.id == req.body.id);
    if (index == -1) {
        users.push(userData);
        res.status(201).json(users);
    } else {
        res.status(404).json(
            {
                msg: "l'utilisateur existe deja"
            }
        )
    }
}

app.post('/api/users', adduser)
app.get('/api/users', getUsers)
app.get('/api/user/:id', getuser)
app.delete('/api/user/:id', deleteuser)


app.listen(port, ()=> {
    console.log(`le server nous ecoute sur le port: ${port}`)
})