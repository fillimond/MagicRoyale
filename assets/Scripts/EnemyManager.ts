// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyManager extends cc.Component {

    @property(cc.Node)
		spawnPoint: cc.Node = null;

    @property(cc.Node)
		finishPoint: cc.Node = null;
		
	@property(cc.Node)
		towersPanel: cc.Node = null;
		
	@property(cc.Prefab)
		strongEnemy: cc.Prefab = null;
		
	@property(cc.Prefab)
		weakEnemy: cc.Prefab = null;
	
	path: cc.Vec2[] = [];
	wavecounter: number = -1;
	wavesdelay: number = 5;
	enemies: Enemy[] = [];
	
	onLoad()
	{
		module.exports = this;
	}

    startwaves() 
	{
		this.wavecounter = -1;
		this.findpath();
		this.makewave();
		this.schedule(function() {this.makewave();}, this.wavesdelay);     	
	}
	
	stopwaves()
	{
		this.unscheduleAllCallbacks();
		for (let i = 0; i < this.enemies.length; i++)
			this.enemies[i].node.destroy();
		
		this.enemies = [];
	}
	
	makewave()
	{
		this.wavecounter++;
		this.schedule(function() {
			if (Math.random() > 0.5) this.createEnemy(this.weakEnemy);
			else this.createEnemy(this.strongEnemy);
		}, 0.7, this.wavecounter, 0);
	}

	findpath()
	{
		let pathwidth = (this.node.width - this.towersPanel.width) / 2;
		this.path[0] = this.spawnPoint.position;
		this.path[1] = new cc.v2((pathwidth - this.node.width) / 2,  (this.node.height - pathwidth) / 2);
		this.path[2] = new cc.v2((this.node.width - pathwidth) / 2,  (this.node.height - pathwidth) / 2);
		this.path[3] = this.finishPoint.position;
	}
	
	createEnemy(enemyprefab: cc.Prefab)
	{
		let newEnemy = cc.instantiate(enemyprefab);
		this.node.addChild(newEnemy);
		newEnemy.getComponent('Enemy').move(this.path);	
		this.enemies.push(newEnemy.getComponent('Enemy'));
	}
	
	removeEnemy(enemy: Enemy)
	{
		let index = this.enemies.indexOf(enemy, 0);
		if (index > -1) this.enemies.splice(index, 1);
	}
	
	findClosestEnemy() : Enemy
	{
		if (this.enemies.length <= 0) return null;
		
		let closestdistance = this.enemies[0].getDistToFinish();
		let closestindex = 0;
		for (let i = 1; i < this.enemies.length; i++)
			if (this.enemies[i].getDistToFinish() < closestdistance)
			{
				closestdistance = this.enemies[i].getDistToFinish();
				closestindex = i;
			}

		return this.enemies[closestindex];
	}

    update (dt) 
	{
	}
}
