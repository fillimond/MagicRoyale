// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

	target: Enemy;
	emitter: Tower;
	flytotarget: bool = false;
	speed: number = 2;
	movingtime: number = 0;

	init(target: Enemy, emitter: Tower)
	{
		this.target = target;
		this.emitter = emitter;
		this.flytotarget = true;
	}
	
	update (dt) 
	{
		if (!this.flytotarget) return;
		if (this.target.node == null) this.node.destroy();
		else
		{
			this.movingtime += dt * this.speed;	
			this.node.position = cc.Vec2.lerp(this.node.position, this.node.position, this.target.node.position, this.movingtime);
			
			if ((Math.abs(this.target.node.x - this.node.x) <= this.target.speed) && (Math.abs(this.target.node.y - this.node.y) <= this.target.speed))
			{
				this.target.takeDamage(this.emitter.damage);
				this.node.destroy();
			}
		}
	}
}
