const canvas=document.getElementById("table")
const container=document.querySelector(".table-container")
const c=canvas.getContext("2d")
canvas.width=container.offsetWidth*(90/100)
canvas.height=window.innerHeight*(79/100)
var mouse={
    x:undefined,
    y:undefined
}
console.log("height="+window.innerHeight)
canvas.addEventListener("mousemove",function(e){
    mouse.x=e.x-67.6
    mouse.y=e.y-77
    console.log(e.x)
})
window.addEventListener("resize",function(){
    canvas.width=container.offsetWidth*(90/100)
    canvas.height=window.innerHeight*(79/100)
})
// console.log(mouse.x)
class Circle {
    constructor(cx, cy, speedX, speedY, r) {
        this.cx = cx
        this.cy = cy
        this.speedX = speedX
        this.speedY = speedY
        this.r = r
        this.minRadius = r
        this.color = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'
        // this.rx=Math.random()*255
        // this.gx=Math.random()*255
        // this.bx=Math.random()*255
        this.draw = function () {
            c.beginPath()
            c.arc(this.cx, this.cy, this.r, 0, Math.PI * 2, true)
            /*
            if(this.cx+this.r>canvas.width || this.cx-this.r<0){
                this.collision_xColor(Math.random()*255,Math.random()*255,Math.random()*255)
            }
            if(this.cy+this.r>canvas.height || this.cy-this.r<0){
                this.collision_yColor(Math.random()*255,Math.random()*255,Math.random()*255)
            }
            */
            c.fillStyle = this.color
            c.fill()
            // c.stroke()
            // this.update()
        }
        this.collision_xColor = function () {
            c.fillStyle = 'rgb(' + this.rx + ',' + this.gx + ',' + this.bx + ')'
            c.fill()
        }
        this.collision_yColor = function (ry, gy, by) {
            this.ry = ry
            this.gy = gy
            this.by = by
            c.fillStyle = 'rgb(' + this.ry + ',' + this.gy + ',' + this.by + ')'
            c.strokeStyle = c.fillStyle
            c.fill()
        }
        this.update = function () {
            if (this.cx + this.r > canvas.width || this.cx - this.r < 0) {
                this.speedX = -this.speedX
            }
            if (this.cy + this.r > canvas.height || this.cy - this.r < 0) {
                this.speedY = -this.speedY
                // this.collision_yColor(Math.random()*255,Math.random()*255,Math.random()*255)
            }
            this.cx += this.speedX
            this.cy += this.speedY
            // console.log(mouse)
            // console.log(this.cx,this.cy)
            if (mouse.x - this.cx < 60 && mouse.x - this.cx > -60 && mouse.y - this.cy < 60 && mouse.y - this.cy > -60) {
                if (this.r < 60) {
                    this.r += 1
                }
            }
            else if (this.r > this.minRadius) {
                this.r -= 1
            }
            this.draw()
        }
    }
}
var circleArray=[]
for(let i=0;i<800;i++){
    var bothSpeed=(Math.random()-1)
    var cx=Math.random()*canvas.width,cy=Math.random()*canvas.height,r=Math.random()*3+1
    var speedX=bothSpeed,speedY=bothSpeed
    cx-r<0?cx+=r:cx+r>canvas.width?cx-=r:cx
    cy-r<0?cy+=r:cy+r>canvas.height?cy-=r:cy
    circleArray.push(new Circle(cx,cy,speedX,speedY,r))
}
// console.log(circleArray)
// var circle=new Circle(x,y,speedX,speedY,r)
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<circleArray.length;i++){
        circleArray[i].update()
    }
}
animate()