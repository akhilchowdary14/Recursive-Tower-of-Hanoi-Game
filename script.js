let diskCount = 3
let moveCount = 0
let isSolving = false
let moveLog = []

const towers = {A:[],B:[],C:[]}

function updateDisplays(){
document.getElementById("moves").textContent = moveCount
document.getElementById("diskCountDisplay").textContent = diskCount
document.getElementById("minMoves").textContent = Math.pow(2,diskCount)-1
}

function randomColor(){
let letters="0123456789ABCDEF"
let color="#"
for(let i=0;i<6;i++){
color+=letters[Math.floor(Math.random()*16)]
}
return color
}

function createGame(){

["A","B","C"].forEach(t=>{
document.getElementById(t).innerHTML=""
towers[t]=[]
})

moveCount=0
moveLog=[]
updateDisplays()

for(let i=diskCount;i>=1;i--){

const disk=document.createElement("div")

disk.className="disk"
disk.style.width=(i*30+40)+"px"
disk.style.background=randomColor()
disk.textContent=i
disk.draggable=true
disk.dataset.size=i

disk.addEventListener("dragstart",dragStart)

document.getElementById("A").appendChild(disk)

towers.A.push(i)
}

}

function dragStart(e){

if(isSolving){
e.preventDefault()
return
}

const size=parseInt(e.target.dataset.size)
const parent=e.target.parentElement.id

if(towers[parent][towers[parent].length-1]!==size){
e.preventDefault()
return
}

e.dataTransfer.setData("size",size)
e.dataTransfer.setData("from",parent)

}

document.querySelectorAll(".tower").forEach(tower=>{
tower.addEventListener("dragover",e=>e.preventDefault())
tower.addEventListener("drop",dropDisk)
})

function dropDisk(e){

if(isSolving) return

const from=e.dataTransfer.getData("from")
const to=e.currentTarget.id

moveDisk(from,to)

}

function moveDisk(from,to){

if(from===to) return

const disk=towers[from].pop()
if(!disk) return

const top=towers[to][towers[to].length-1]

if(top && top<disk){
towers[from].push(disk)
return
}

towers[to].push(disk)

const diskElement=document.querySelector(`#${from} .disk[data-size='${disk}']`)
document.getElementById(to).appendChild(diskElement)

moveCount++
moveLog.push(`Move disk ${disk} from ${from} → ${to}`)

updateDisplays()
checkWin()

}

function checkWin(){

if(towers.C.length===diskCount){

setTimeout(()=>{
alert("🎉 Completed in "+moveCount+" moves!")
},200)

}

}

function changeDisks(change){

if(isSolving) return

diskCount+=change

if(diskCount<2) diskCount=2
if(diskCount>7) diskCount=7

createGame()

}

function resetGame(){
isSolving=false
createGame()
}

function showLog(){

console.clear()
console.log("Move Log")

moveLog.forEach(m=>{
console.log(m)
})

}

function autoSolve(){

if(isSolving) return

isSolving=true

const moves=[]

generateMoves(diskCount,"A","C","B",moves)

let i=0

const interval=setInterval(()=>{

if(i>=moves.length){
clearInterval(interval)
isSolving=false
return
}

moveDisk(moves[i][0],moves[i][1])
i++

},500)

}

createGame()