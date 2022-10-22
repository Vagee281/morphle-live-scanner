const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const dir = `${__dirname}/public/`;

app.use(express.json());
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.sendFile(`${dir}index.html`)
})

app.post('/get-data',(req,res)=>{
    const data = req.body;
    let x=0;
    let y=0;
    let operations = data.request_order

    for(let operation of operations) {
        switch(operation){
            case 'right':{
                x+=1;
                break;
            }
            case 'left':{
                x-=1;
                break;
            }
            case 'up':{
                y-=1;
                break;
            }
            case 'down':{
                y+=1;
                break;
            }
        }
    }


    res.send({x,y});
})



app.listen(port,()=>{
    console.log(`App Listening at port ${port}`)
})
