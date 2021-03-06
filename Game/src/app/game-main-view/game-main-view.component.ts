import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InputHandler } from '../Clases/input-handler';
import { GameController } from '../Clases/game-controller';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ConnectioncontrollerService } from '../Services/connectioncontroller.service';
import { Gameobject } from '../Clases/game-object';
import { AnimatedObject } from '../Clases/animated-object';
import { environment } from '../../environments/environment';


@Component({
	selector: 'app-game-main-view',
	templateUrl: './game-main-view.component.html',
	styleUrls: ['./game-main-view.component.css']
})





export class GameMainViewComponent implements OnInit{
	public head: string;
	public message: string;

	private userName: string;
	private tankImagePath: string;
	private inputHandler: InputHandler;
	 
	gameCtrl: GameController;
	private actions = environment.playerActions;
	private userJoinToGame:boolean=false;
	private firstTime:boolean = true;
	disable:boolean= false;

	private audio:any;


	@ViewChild('canvas') canvas: ElementRef;
	@HostListener('window:keydown', ['$event']) 

	keyEvent(event: KeyboardEvent) {

		let action:any = this.inputHandler.getAction(event.keyCode);
		if (this.userJoinToGame){
			if (action.validAction){

				if (action.action=== this.actions.move){
					this.sendMessage(this.actions.move,{"direction": action.direction });
				}

				else if (action.action=== this.actions.applyPower){
					this.sendMessage(this.actions.applyPower,{});
					this.playAudio("bonus_appear.wav");
				}

				else{
					this.sendMessage(this.actions.shoot,{});
					this.playAudio("player_shot.wav");
				}
			}
		}
		//console.log(event.code);
		//alert(JSON.stringify(this.inputHandler.getAction(event.keyCode)));
	}
	
	constructor(private dataExchangerController: ConnectioncontrollerService) {

		this.userName = localStorage.getItem("userName");
		this.inputHandler = new InputHandler();
		this.playBackgroundMusic();
	}

	ngOnInit() {
		
	}

	playBackgroundMusic(){
		let myAudio = new Audio("../../assets/Sounds/Fantascape.mp3"); 
		myAudio.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
		}, false);
		myAudio.play();
	}

	playAudio(name:string){
		this.audio = new Audio();
		this.audio.src= "../../assets/Sounds/"+name;
		this.audio.load();
		this.audio.play();
	}


	catchServerEvent(){

		this.dataExchangerController.messageObserver.subscribe(data => {
			

			console.log("message from service");
			console.log(data);

			if (data.canPaint===true){

				//verificar fin de juego o muerte


				if (this.firstTime){

					this.tankImagePath= "../../assets/Images/"+ data.tankImage;
					this.firstTime=false;
					this.gameCtrl.initialize(); 
				}

				if (data.gameFinished===true){
					window.location.href='main';
				}

				if(data.playerDead===true){
					window.location.href='main';
				}
			}
			this.gameCtrl.updateBoard(data.board);
		
		});
	}

	joinToGame(){
		if (!this.userJoinToGame){
			this.sendMessage("joinGame",{"Data": "User want to play"});
			this.userJoinToGame=true;
			
		}
	}

	sendMessage(head: string, data: Object) {
		this.dataExchangerController.sendMsg(head,data);
	}

	newGame(){  
		this.disable= true;
		this.gameCtrl = new GameController(this.canvas.nativeElement,null, this.inputHandler,1,1);
		this.catchServerEvent();
		this.joinToGame();
		
		
	}
}


