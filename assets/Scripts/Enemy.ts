// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
		speed: number = 0;
		
	@property
		energy: number = 0;
		
	@property(cc.Label)
		energyLabel: cc.Label = null;

	pointtomove: number = 0;
	movingtime: number = 0;	
	path: cc.Vec2[];
	slowingdelta: number;
	disttofinish: number = 0;
	

    start () 
	{
		this.energyLabel.string = this.energy;
    }
	
	move(path: cc.Vec2[])
	{
		this.node.setPosition(path[0]);
		this.path = path;
		this.pointtomove = 1;
		this.slowingdelta = this.path[this.pointtomove].sub(this.path[this.pointtomove - 1]).mag()/100;

		for (let i = 0; i < this.path.length - 1; i++)
			this.disttofinish += this.path[i+1].sub(this.path[i]).mag()/100;		
	}
	
	getDistToFinish() : number
	{
		return this.disttofinish;
	}
	
	takeDamage(damage: number) 
	{
		this.energy -= damage;
		if (this.energy <= 0) this.die();
		else this.energyLabel.string = this.energy;
	}
	
	die()
	{
		require("EnemyManager").removeEnemy(this);
		require("Game").addcash();
		this.node.destroy();
	}
	
	update (dt) 
	{
		if (this.pointtomove > 0)
		{
			this.movingtime += dt * this.speed / this.slowingdelta;				

            if (this.movingtime < 1)
			{
				this.node.position = cc.Vec2.lerp(this.node.position, this.path[this.pointtomove - 1], this.path[this.pointtomove], this.movingtime);
				this.disttofinish -= dt * this.speed;
			}				
			else 
			{		
				this.disttofinish = 0;
				for (let i = this.pointtomove; i < this.path.length - 1; i++)
					this.disttofinish += this.path[i+1].sub(this.path[i]).mag()/100;
		
				this.node.position = this.path[this.pointtomove];
				this.pointtomove++;
				this.movingtime = 0;
				if (this.pointtomove == 4) require("Game").gameover();
				else this.slowingdelta = this.path[this.pointtomove].sub(this.path[this.pointtomove - 1]).mag()/100;
			}			
		}
	}
}
