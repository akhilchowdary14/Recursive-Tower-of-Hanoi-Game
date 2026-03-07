function generateMoves(n, from, to, aux, moves){

if(n===1){
moves.push([from,to])
return
}

generateMoves(n-1,from,aux,to,moves)
moves.push([from,to])
generateMoves(n-1,aux,to,from,moves)

}