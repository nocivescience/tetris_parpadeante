const gamesEl=document.getElementById('games');
const ctx=gamesEl.getContext('2d');
const squareScale=30;
gamesEl.width=window.innerWidth;
gamesEl.height=window.innerHeight;
gamesEl.width=300;
gamesEl.height=600;
const cols=gamesEl.width/squareScale; //300/30
const rows=gamesEl.height/squareScale; //600/30
const colors=[
    'red',
    'yellow',
    'rgb(0, 136, 255)', //celeste
    'rgb(0, 255, 132)', //verde
    'rgb(171, 53, 255)', //purpura,
    'rgb(255, 107, 54)', //orange
    'rgb(158, 255, 54)' //lemon
]
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ],
    [
        [0,0,3],
        [3,3,3],
        [0,0,0]
    ],
    [
        [4,4],
        [4,4]
    ],
    [
        [0,5,5],
        [5,5,0],
        [0,0,0]
    ],
    [
        [0,6,0],
        [6,6,6],
        [0,0,0]
    ],
    [
        [7,7,0],
        [0,7,7],
        [0,0,0]
    ],
]
class MyTetris{
    constructor(shape,ctx){
        this.shape=shape;
        this.ctx=ctx;
        this.x=cols/2;
        this.y=0;
        this.fallingPiece=null;
        this.grid=this.makeStarting();
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row.map((cell,j)=>{
                if(cell>0){
                    this.ctx.beginPath();
                    this.ctx.fillStyle='red';
                    this.ctx.fillRect((this.x+j)*squareScale,(this.y+i)*squareScale,squareScale,squareScale);
                    this.ctx.strokeStyle='grey';
                    this.ctx.lineWidth=2;
                    this.ctx.strokeRect((this.x+j)*squareScale,(this.y+i)*squareScale,squareScale,squareScale)
                    this.ctx.fill()
                    this.ctx.stroke();
                    this.ctx.closePath();
                    this.ctx.beginPath();
                    this.ctx.fillStyle='rgba(255,255,255,.5)'
                    this.ctx.font='20px arial';
                    this.ctx.fillText(cell,(this.x+j)*squareScale+10,(this.y+i)*squareScale+22)
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            })
        })
    }
    makeStarting(){
        let grid=[];
        for(let i=0;i<rows;i++){
            grid[i]=[];
            for(let j=0;j<cols;j++){
                grid[i][j]=0
            }
        }
        return grid
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j];
                this.ctx.fillStyle='black';
                this.ctx.strokeStyle='grey';
                this.ctx.strokeRect(j*squareScale,i*squareScale,squareScale,squareScale)
                this.ctx.fillRect(j*squareScale,i*squareScale,squareScale,squareScale)
                this.ctx.beginPath();
                this.ctx.fillStyle='rgba(255,255,255,.5)'
                this.ctx.font='20px arial';
                this.ctx.fillText(cell,(j)*squareScale+10,(i)*squareScale+22)
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
    collision(x,y){
        for(let i=0;i<this.shape.length;i++){
            for(let j=0;j<this.shape.length;j++){
                if(x+j>0&&x+j<cols&&y+i<rows){
                    if(this.grid[y+i][x+j]>0){
                        return true;
                    }
                }else{
                    return true;
                }
            }
        }
        return false;
    };
    moveDown(){
        if(this.collision(this.x,this.y+1)){
            this.shape.map((row,i)=>{
                row.map((cell,j)=>{
                    let p=this.x+j;
                    let q=this.y+i;
                    if(p>=0&&p<cols&&q<rows&&cell>0){
                        this.grid[q][p]=this.shape[i][j];
                    }
                })
            });
        }
        this.y++;
        this.renderGameState();
        console.log(this.grid)
    }
}
function ready(){
    const games=new MyTetris(shapes[0],ctx);
    setInterval(()=>{
        ctx.clearRect(0,0,gamesEl.width,gamesEl.height);
        games.moveDown()
        games.renderPiece();
    },1000)
}
ready();