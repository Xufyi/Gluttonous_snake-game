function Game(map,food,block,snake){
	this.map = map
	this.food = food
	this.block = block
	this.snake = snake
	//用于判断蛇撞墙了，就不再渲染
	this.flag = true 
	//初始化
	this.init()
}
// 初始化
Game.prototype.init = function(){
	//渲染地图
	this.renderMap()
	//监听按下方向盘事件
	this.addEvent()

	this.timer = setInterval(()=>{
		//蛇移动
		this.snake.move()
		//判断蛇是否撞墙
		this.check()
		//检测蛇撞到自己
		this.checkSnake()
		//蛇吃食物
		this.eatFood()
		//检测蛇是否撞到障碍物
		this.checkBlock()

		//蛇撞墙了,就不再渲染
		if(this.flag){
			//清屏
			this.map.clear()
			//渲染食物
			this.renderFood()
			//渲染蛇
			this.renderSnake()
			//渲染障碍物
			this.renderBlock()
		}
	},200)
} 
//渲染地图
Game.prototype.renderMap = function(){
	this.map.fill()
}
//清屏地图
Game.prototype.clearMap = function(){
	this.map.clear()
}
//渲染食物
Game.prototype.renderFood = function(){
	let x = this.food.x
	let y = this.food.y
	let img = this.food.img
	// this.map.arr[x][y].style.backgroundColor = 'red'
	this.map.arr[x][y].style.backgroundImage = 'url(' + img + ')'
	this.map.arr[x][y].style.backgroundSize = 'cover'
}
//渲染蛇
Game.prototype.renderSnake = function(){
	//得到蛇的身体数组
	var arr = this.snake.arr
	//渲染蛇
	//蛇头
	var head = this.snake.arr[this.snake.arr.length-1]
	this.map.arr[head.row][head.col].style.backgroundImage = 'url(img/' + this.snake.head_idx + '.png)'
	//蛇身
	for(var i = 1;i < this.snake.arr.length-1;i++){
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = 'url(img/' + this.snake.body_idx + '.png)'
	}
	// 蛇尾	
 	var tail = this.snake.arr[0]
	this.map.arr[tail.row][tail.col].style.backgroundImage = 'url(img/' + this.snake.tail_idx + '.png)'
}
//按下方向键
Game.prototype.addEvent = function(){
	// 绑定事件，鼠标移动事件
	//思路:获取到keyCode，然后判断转向，绝对值不为2的时候才可以转向
	var me = this
	document.onkeydown = function(e){	
		//获取到keyCode
		var k = e.keyCode;
		//蛇转向，当按下方向键时才去判断是否转向
		if (k === 37 || k === 38 || k === 39 || k === 40) {
			// 调用蛇转向方法
			me.snake.change(k)
		}
	}
}
//判断是否撞墙
Game.prototype.check = function(){
	//拿到蛇的头，做边界判定
	var head = this.snake.arr[this.snake.arr.length - 1];

	if( head.col < 0 || head.col >= this.map.col   || head.row < 0 || head.row >= this.map.row   ){
		console.log('蛇撞墙了！')
		//蛇撞墙了，改变变量不再渲染
		this.flag = false
		this.gameOver()
	}
}
//游戏结束
Game.prototype.gameOver = function(){
	//停止渲染
	this.flag = false;
	//清除定时器
	clearInterval(this.timer)
	alert('游戏结束，请刷新后重新开始！')
}
//蛇吃食物
Game.prototype.eatFood = function(){
	//食物坐标和蛇的头部坐标
	var head = this.snake.arr[this.snake.arr.length-1]
	var food = this.food
	// console.log(head)
	// console.log(food)
	if(head.row === food.x && head.col === food.y){
		console.log("吃到食物了。")
		//蛇变长
		this.snake.growUp()
		//重置食物
		this.resetFood()
	}	
}
//重置食物
Game.prototype.resetFood = function(){
	//地图内部随机值
	var x = parseInt( Math.random()*this.map.row )
	var y = parseInt( Math.random()*this.map.col )

	var snake_arr = this.snake.arr
	//食物不能再蛇身上
	for (var i = 0; i < this.snake.arr.length; i++) {
		if (this.snake.arr[i].row === x && this.snake.arr[i].col === y) {
			// alert("食物与蛇的身体重合了");
			//重置食物
			this.resetFood();
			return;
		}
	}
	//食物不能再障碍物上
	for (var i = 0; i < this.block.arr.length; i++) {
		// 提取变量简化书写
		if (this.block.arr[i].row === x && this.block.arr[i].col === y) {
			// alert("食物与障碍物重合了");
			//重置食物
			this.resetFood();
			return;
		}
	}
	//重置食物
	this.food.reset(x, y);
}
//检测蛇是否撞到自己
Game.prototype.checkSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与蛇的每一节身体作比较
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("吃到自己了");
			// 结束游戏
			this.gameOver();
		}
	}
}
// 渲染障碍物	
Game.prototype.renderBlock = function(){

	for(var i = 0;i <this.block.arr.length;i++){
		var row = this.block.arr[i].row
		var col = this.block.arr[i].col
		this.map.arr[row][col].style.backgroundImage = 'url('+ this.block.img +')'
		this.map.arr[row][col].style.backgroundSize = 'cover'
	}
}
// 检测蛇与障碍物之间的关系
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与每一个障碍物作对比
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === head.row && one.col === head.col) {
			console.log("撞到障碍物了");
			// 结束游戏
			this.gameOver();
		}
	}
}

