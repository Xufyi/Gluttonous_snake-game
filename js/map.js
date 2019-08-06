/**
 * Map 地图的实例
 * @row 行属性
 * @col 列属性
 * @width 总宽
 * @height 总高
 */
function Map(row,col,width,height){
	this.row = row
	this.col = col
	this.width = width
	this.height = height
	//容器
	this.box = document.createElement('div')
	//保存每个格子的二维数组，方便清屏和重新渲染
	this.arr = []
}
//绘制地图
Map.prototype.fill = function(){
	//加上类名，设置样式
	this.box.className = 'box'
	for(var i = 0;i<this.row;i++){
		var box_row = document.createElement('div')
		box_row.className = 'box_row'
		// 列数组
		var arr_ = []

		for(var j=0;j<this.col;j++){
			var span = document.createElement('span')
			span.className = 'box_col'
			box_row.appendChild( span )
			//列数组每项添加每个格子，变为二维数组
			arr_.push( span )
		}
		//上树
		this.box.appendChild( box_row )
		this.arr.push(arr_)
	}
	//上树，添加到Body
	document.body.appendChild( this.box )
}
//清屏
Map.prototype.clear = function(){
	for(var j = 0;j < this.arr.length;j++){
		for(var  i = 0;i<this.arr[j].length;i++){
			// this.arr[j][i].style.backgroundColor = 'white'
			//换清除图片
			this.arr[j][i].style.backgroundImage = 'none'
		}
	}
}