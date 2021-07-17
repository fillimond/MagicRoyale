// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tower extends cc.Component {

    @property
		reloadspeed: number = 0;
		
	@property
		damage: number = 0;
		
	@property(cc.Prefab)
		bullet: cc.Prefab = null;
		
	canshoot: bool = false;
	timer: number = 0;

	shootClosestEnemy()
	{
		let enemy = require("EnemyManager").findClosestEnemy();
		if (enemy == null) return;
		
		let enemyManager = require("EnemyManager");
		let newBullet = cc.instantiate(this.bullet);
		enemyManager.node.addChild(newBullet);
		newBullet.setPosition(enemyManager.node.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.node.position)));
		newBullet.getComponent('Bullet').init(enemy, this);	
		
		this.canshoot = false;
		this.timer = 0;
	}
	
	update (dt) 
	{
		this.timer += dt;

		if (this.timer >= this.reloadspeed)
			this.canshoot = true;
		
		if (this.canshoot)
			this.shootClosestEnemy()
	}
}
