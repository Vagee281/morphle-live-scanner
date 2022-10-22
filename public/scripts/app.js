let keyStrokes = []
let clonedSquares  = 1;
let width = 50
let height = 50

function checkKey(e) {
    console.log(`I am here!`)
    var event = window.event ? window.event : e;
    const keyCode = event.keyCode
    console.log(keyCode)

    switch(keyCode){
        case 37:{
            keyStrokes.push('left')
            break;
        }
        case 38:{
            keyStrokes.push('up')
            break;
        }
        case 39:{
            keyStrokes.push('right')
            break;
        }
        case 40:{
            keyStrokes.push('down')
            break;
        }
    }
}

setInterval(() => {
    console.log(keyStrokes)
    if(keyStrokes.length > 0){
        fetch('http://localhost:3000/get-data',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({request_order:keyStrokes}),
        })
        .then(res =>res.json())
        .then(data => {
            keyStrokes = []

            let positionX = (parseInt(window.getComputedStyle(document.getElementById('square')).getPropertyValue('left').split('px')[0]))
            let positionY = (parseInt(window.getComputedStyle(document.getElementById('square')).getPropertyValue('top').split('px')[0]))

            const {x,y} = data
            let newX = (positionX + 8*x);
            let newY = (positionY + 8*y);

            if(x!=0){
                if(x<0){
                    newX-=width
                }
                else{
                    newX+=width
                }
            }

            if(y!=0){
                if(y<0){
                    newY-=height
                }
                else{
                    newY+=height
                }
            }

            document.getElementById('square').style.left = newX.toString() + 'px';
            document.getElementById('square').style.top  = newY.toString() + 'px';

            changeToGreen(changeToRed)
        })
    }
},3000)

function changeToRed() {
    setTimeout(
        ()=>{
            if(keyStrokes.length==0){
                document.getElementById('square').style.backgroundColor = 'red'
                //Make a copy of block here and wait for the next key stroke
                const cloneSquare = document.getElementById('square').cloneNode(true)
                cloneSquare.className = 'square-clone-' + clonedSquares
                clonedSquares+=1
                document.body.append(cloneSquare)
            }
        },
    2000)
}

function changeToGreen(callback){
    document.getElementById('square').style.backgroundColor = 'green'
    callback()
}

document.onkeydown = checkKey;
