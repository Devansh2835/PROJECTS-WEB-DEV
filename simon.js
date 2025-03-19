let gameseq=[]
let userseq=[]
let started=false
let level=0
let h2=document.querySelector("h2")
let h3=document.querySelector("h3")
let btns=["red","cyan","green","pink"]
let highestlevel=0
document.addEventListener("keypress",function(){ //poore document ke liye koi bhi keyboard key press kr dene se game will start
    if(started==false){
        console.log("game is started")
        started=true //iski value true krdi taki fir se automatically false detect krke baar baar game start na ho aur sirf 1 baar hi ho
        levelup()
    }
})
function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
}
function userflash(btn){
    btn.classList.add("user")
    setTimeout(function(){
        btn.classList.remove("user")
    },250)  
}
function levelup(){
    userseq=[]
    level++;
    h2.innerText=`Level ${level}`
    let randidx=Math.floor(Math.random()*3)
    let randcol=btns[randidx]
    let randbtn=document.querySelector(`.${randcol}`)
    gameseq.push(randcol)
    gameflash(randbtn)
}
function checkans(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup(), 1000);
        }
    }
    else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to start again` //ab hum ismein tags bhi dere hai isliye innerhtml krna padega
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white"
        }, 250);
        if(level>=highestlevel){
            highestlevel=level
            h3.innerText=`Current high score is:${highestlevel}`
            console.log(highestlevel)
        }
        reset()
    }
}
function btnpress(){
    let btn=this
    userflash(btn)
    let usercolor=btn.getAttribute("id")
    userseq.push(usercolor)
    checkans(userseq.length-1)
}
let allbtns=document.querySelectorAll(".btn")
for(btn of allbtns){
    btn.addEventListener("click",btnpress)
}
function reset(){
    started=false
    gameseq=[]
    userseq=[]
    level=0
}