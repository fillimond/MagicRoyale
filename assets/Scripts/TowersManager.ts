// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowersManager extends cc.Component {

	@property(cc.Prefab)
		towerField: cc.Prefab = null;
		
	@property(cc.Prefab)
		weakTower: cc.Prefab = null;
		
	@property(cc.Prefab)
		strongTower: cc.Prefab = null;
		
	cols: number = 5;
	rows: number = 3;
	margin: number = 5;	
	towerFields: cc.Node[] = [];

	onLoad()
	{
		module.exports = this;
	}
	
	cleartowers()
	{
		this.node.destroyAllChildren();
		this.towerFields = [];
	}

    drawTowerFields() 
	{
		let fieldwidth = (this.node.width / (this.cols + 1)  > this.node.height / (this.rows + 2)) ? this.node.height / (this.rows + 2) : this.node.width / (this.cols + 1);
		let posx = fieldwidth * (1 - this.cols) / 2 - this.margin * 2;
		let posy = fieldwidth * this.rows / 2 + this.margin * 1.5;
		
		for (let i = 0; i < this.rows; i++)
			for (let j = 0; j < this.cols; j++)
			{
				let newField = cc.instantiate(this.towerField);
			
				this.node.addChild(newField);
				newField.scale = fieldwidth / newField.width;
				newField.setPosition(cc.v2(posx + j * (fieldwidth + this.margin),posy - i * (fieldwidth + this.margin)));
				this.towerFields.push(newField);
			}    
	}
	
	createTower()
	{
		if (this.towerFields.length <= 0) return;
			
		if (Math.random() > 0.5) let newTower = cc.instantiate(this.weakTower);
		else let newTower = cc.instantiate(this.strongTower);
			
		let randIndex = Math.floor(Math.random() * (this.towerFields.length - 1));
		
		this.towerFields[randIndex].addChild(newTower);
		this.towerFields.splice(randIndex, 1);		
	}
}
