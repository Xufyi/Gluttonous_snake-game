function Snake(snakeObj){
	//数组属性，存储蛇的每一节身体
	this.arr = [
 		{row:4,col:4},
 		{row:4,col:5},
 		{row:4,col:6},
 		{row:4,col:7},
 		{row:4,col:8}
 	];
	//方向属性，默认向右移动，左37 上38 右39 下40。
 	this.direction = 39; 
 	//定义锁，防止同时按下左上/左下的太快导致蛇转向异常
 	this.lock = true
 	//图片
 	this.head_pic = snakeObj.head_pic
 	this.body_pic = snakeObj.body_pic
 	this.tail_pic = snakeObj.tail_pic
 	//默认图片,值为对应的图片名称
 	this.head_idx = 3;
 	this.body_idx = 5;
 	this.tail_idx = 6;
}
//移动
Snake.prototype.move = function(){
	//创建新头
	var newHead = {
		row:this.arr[this.arr.length -1].row,
		col:this.arr[this.arr.length -1].col,
	}
	if(this.direction === 37){
		newHead.col--
	}else if (this.direction === 38){
		newHead.row--
	}else if (this.direction === 39){
		newHead.col++
	}else if (this.direction === 40){
		newHead.row++
	}

	//添加新头，去掉尾部
	this.arr.push(newHead)
	this.arr.shift(this.arr[0])

	//尾巴的转向判断
	//获取尾部
	var tail = this.arr[0]
	//获取尾部上一节
	var pg = this.arr[1]

	//同一行，同一列判断
	if(pg.row === tail.row){
		this.tail_idx = pg.col > tail.col ? 6 : 8
	}else if(pg.col = tail.col){
		this.tail_idx = pg.row > tail.row ? 7 : 9
	}
	//开锁
	this.lock = true
}
//转向
Snake.prototype.change = function(direction){
	// 防止同时按下左上/左下的太快导致蛇转向异常
	if(!this.lock){
		return
	}
	//关锁
	this.lock = false
	var result = Math.abs(direction - this.direction)
	if ( result === 2 || result === 0) {
		return
	}else{
		this.direction = direction;
	}
	//蛇头的转向判断
	if(this.direction === 37){
		this.head_idx = 1
	}else if(this.direction === 38){
		this.head_idx = 2
	}else if(this.direction === 39){
		this.head_idx = 3
	}else if(this.direction === 40){
		this.head_idx = 4
	}
}
//蛇长长
Snake.prototype.growUp = function(){
	this.arr.unshift(this.arr[0])
}