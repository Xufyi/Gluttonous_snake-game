function Food(x,y,img){
	this.x = x
	this.y = y
	this.img = img
}
//重置
Food.prototype.reset  = function(x,y){
 	this.x = x
 	this.y = y
} 