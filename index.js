const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const shortUrl = require('node-url-shortener');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors')
 

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mini-db'
})

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Mysql Connected");
})
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res)=> {
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
});

app.get('/users', (req,res)=> {
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
});


app.get('/user/:id', (req,res)=> {
    let sql = 'SELECT * FROM user WHERE id=?';
    id = req.params.id;
    let query = db.query(sql, id, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
});

app.get('/h1', (req,res) => {
    let sql = 'SELECT * FROM h1';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

var scrape_id;

app.get('/user/:id/h1', (req,res, next) => {
    let url
    let sql = "SELECT short_url FROM user WHERE id = ? ";
    //user_id = req.params.id;
    user_id = scrape_id;
    let query = db.query(sql, user_id, (err, results) => {
        if(err) throw err;
        console.log(results[0].short_url)
        getUrl(results[0].short_url, user_id)
        
        
    })
});

app.get('/user/:id/h2', (req,res, next) => {
    let sql = "SELECT * FROM h1 WHERE user_id = ? ";
    user_id = req.params.id;
    let query = db.query(sql, user_id, (err, results) => {
        if(err) throw err;
        console.log(results)
    console.log(req.params.id)
        
    })
});

app.get('/user/:id/h3', (req,res, next) => {
    let sql = "SELECT * FROM h1 WHERE user_id = ? ";
    user_id = req.params.id;
    let query = db.query(sql, user_id, (err, results) => {
        if(err) throw err;
        console.log(results)
    console.log(req.params.id)
        
    })
});

app.get('/user/:uid/friendship/:fid', (req,res, next) => {
    payload = {user_id: req.params.uid, friend_id: req.params.fid}
    payload2 = {user_id: req.params.fid, friend_id: req.params.uid}
    let sql = "INSERT INTO friendship SET ? ";
    user_id = req.params.id;
    let query = db.query(sql, payload, (err, results) => {
        if(err) throw err;
        
    })
    let query2 = db.query(sql,payload2,(err,results) => {
        if(err) throw err;
        console.log(results)
    })
});

app.post('/add', (req,res, next)=> {
    let scrape_id;
    let short_url
    shortUrl.short(req.body.url, (err, url) => {
         short_url = url
         let data = {name: req.body.name, url: req.body.url, short_url: short_url}
        let sql = "INSERT INTO user SET ? ";
        let query = db.query(sql, data, (err, results) => {
        if(err) throw err;
        scrape_id = results.insertId
        console.log("AFFECTED ROW", results.insertId)
        let sql = "SELECT short_url FROM user WHERE id = ? ";
         //user_id = req.params.id;
         user_id = scrape_id;
        let query = db.query(sql, user_id, (err, results) => {
        if(err) throw err;
        console.log(results[0].short_url)
        getUrl(results[0].short_url, user_id)
        
        
    })
        
        
    });
    })
});

   let getUrl = (url, u_id) =>{
    axios.get(url)
    .then(response => {
        getData(response.data, u_id)
    })
    .catch(error => {
        console.log(error)
    })
   }
    


let getData = (html,u_id) =>{
    data = [];
    let sql = 'INSERT INTO h1 SET ?';
    console.log(u_id);
    const $ = cheerio.load(html);
    h2 = $("h2").map((e,ele) => {
        console.log(e)
        console.log($(ele).html());
        let value = {heading: $(ele).html(), user_id: u_id}
        let query = db.query(sql,value,(err, results) => {
            if(err) throw err;
            
        })
        

    })
      
}

app.get('/user/:id/get-h1', (req,res,next) => {
    let id = req.params.id
    let sql = 'SELECT heading FROM h1 WHERE user_id=?'
    let query = db.query(sql, id, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/user/:id/friendcount',(req, res, next) => {
    let sql = 'SELECT COUNT(id) AS count FROM friendship WHERE user_id=?'
    let user_id = req.params.id
    let query = db.query(sql, user_id, (err, result) => {
        if(err) throw err;
        console.log(result[0].count)
        res.send(result)
    })
})

app.get('/user/:id/friends',(req,res, next) => {
    let sql = 'SELECT user.name, friendship.friend_id FROM user,friendship WHERE user.id=friendship.friend_id  AND friendship.user_id=?'
    let user_id = req.params.id;
    let query = db.query(sql, user_id, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result)
    })
})

app.listen('8000', () => {
    console.log("server started on port 8000");
});