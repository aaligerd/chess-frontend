const imageX = 20, imageY = 15, imageWidth = 250, imageHeight = 125;
var boardInfo = [
    ['w-r', 'w-h', 'w-bi', 'w-kn', 'w-k', 'w-bi', 'w-h', 'w-r'],
    ['w-p', 'w-p', 'w-p', 'w-p', 'w-p', 'w-p', 'w-p', 'w-p'],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '',],
    ['b-p', 'b-p', 'b-p', 'b-p', 'b-p', 'b-p', 'b-p', 'b-p'],
    ['b-r', 'b-h', 'b-bi', 'b-k', 'b-kn', 'b-bi', 'b-h', 'b-r']]
const word_book = setWordBook();
var td1=null,td2=null,td3=null;

window.addEventListener('load',()=>{
    boardSetup();
})
function boardSetup() {
    var board = document.getElementById('board');
    board.innerHTML="";
    board.addEventListener('click',e=>boardOnclik(e))
    var row = 0, col = 0;
    const canvasColor = [["#EFEFEF", "#47BF48"], ["#47BF48", "#EFEFEF"]];
    var canvasString = '';
    while (row < 8) {
        while (col < 8) {
            canvasString += `<canvas id="${row + "-" + col}" style="background-color:${canvasColor[row % 2][col % 2]};"></canvas>`;
            col++;
        }
        col = 0;
        row++;
    }
    
    board.innerHTML = canvasString;
    for (row=0; row < 8; row++) {
        for (col=0; col < 8; col++) {
            let cell=boardInfo[row][col];
            if(cell==''){
                continue;
            }
            let imageId=retriveCellData(cell);

            drawImageOnCanvas(imageId,row,col);
        }
    }
}
function drawImageOnCanvas(imgRef, row, col) {
    let canvasId = row + "-" + col;
    let curr_canvas = document.getElementById(canvasId);
    let image = document.getElementById(imgRef);
    let curr_canvas_context = curr_canvas.getContext('2d');
    curr_canvas_context.drawImage(image, imageX, imageY, imageWidth, imageHeight);
}
function setWordBook() {
    let word_book = new Map();
    word_book.set('w', 'white');
    word_book.set('b','black');
    word_book.set('r','rook');
    word_book.set('h','horse');
    word_book.set('bi','bishop');
    word_book.set('k','knight');
    word_book.set('kn','king');
    word_book.set('p','pawn');
    return word_book;
}
function retriveCellData(s){
    if(s=='')return 'blank';
    let color_code=s.split('-')[0];
    let piece_code=s.split('-')[1];
    let color=word_book.get(color_code);
    let piece=word_book.get(piece_code);
    let imageId=color+"_"+piece;
    return imageId;
}

function boardOnclik(e){
    let id=e.srcElement.id;
    if(td1!=null) td1.style.boxShadow="none";
    if(td2!=null) td2.style.boxShadow="none";
    if(td3!=null) td3.style.boxShadow="none";
    let clickedRow=Number.parseInt(id.split('-')[0]);
    let clickedCol=Number.parseInt(id.split('-')[1]);
    let cData=retriveCellData(boardInfo[clickedRow][clickedCol]);
    let color=cData.split('_')[0];
    let piece=cData.split('_')[1];
    if(color=='white'){
        switch (piece) {
            case 'pawn':
                let turnDestination=[[clickedRow+1,clickedCol],[clickedRow+2,clickedCol]];
                td1=document.getElementById(turnDestination[0][0]+'-'+turnDestination[0][1]);
                td2=document.getElementById(turnDestination[1][0]+'-'+turnDestination[1][1]);
                td1.style.boxShadow="inset 0px 0px 0px 5px rgba(0,0,0,0.72)";
                td2.style.boxShadow="inset 0px 0px 0px 5px rgba(0,0,0,0.72)";
                break;
        
            default:
                break;
        }
    }
    else{
        switch (piece) {
            case 'pawn':
                let turnDestination=[[clickedRow-1,clickedCol],[clickedRow-2,clickedCol]];
                td1=document.getElementById(turnDestination[0][0]+'-'+turnDestination[0][1]);
                td2=document.getElementById(turnDestination[1][0]+'-'+turnDestination[1][1]);
                td1.style.boxShadow="inset 0px 0px 0px 5px rgba(0,0,0,0.72)";
                td2.style.boxShadow="inset 0px 0px 0px 5px rgba(0,0,0,0.72)";
                break;
        
            default:
                break;
        }
    }
}