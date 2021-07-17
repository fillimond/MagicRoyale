// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
		cashLabel: cc.Label = null;
		
	@property(cc.Label)
		gameoverLabel: cc.Label = null;
		
	@property(cc.Button)
		plusButton: cc.Button = null;
		
	@property(cc.Button)
		startButton: cc.Button = null;
		
	cash: number = 100;
	enemyManager;
	towersManager;

	onLoad()
	{
		module.exports = this;
	}

    start () 
	{	
		this.enemyManager = require("EnemyManager");
		this.towersManager = require("TowersManager");
	
		this.cashLabel.node.active = false;
		this.gameoverLabel.node.active = false;
		this.plusButton.node.active = false;
    }
	
	gamestart()
	{
		this.cash = 100;
		this.cashLabel.string = "Cash: " + this.cash;
		this.towersManager.drawTowerFields(); 
		this.enemyManager.startwaves();
		this.cashLabel.node.active = true;
		this.plusButton.node.active = true;
		this.gameoverLabel.node.active = false;
		this.startButton.node.active = false;
	}
	
	addcash()
	{
		this.cash += 25;
		this.cashLabel.string = "Cash: " + this.cash;
	}
	
	addtower()
	{
		if (this.cash < 50) return;
		
		this.cash -= 50;
		this.towersManager.createTower();
		this.cashLabel.string = "Cash: " + this.cash;
	}
	
	gameover()
	{
		this.enemyManager.stopwaves();
		this.towersManager.cleartowers();
		this.gameoverLabel.node.active = true;
		this.plusButton.node.active = false;
		this.startButton.node.active = true;
	}
}
