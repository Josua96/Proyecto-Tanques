import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InputHandler } from '../Clases/input-handler';
import { GameController } from '../Clases/game-controller';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ConnectioncontrollerService } from '../Services/connectioncontroller.service';
import { Gameobject } from '../Clases/game-object';
import { AnimatedObject } from '../Clases/animated-object';

@Component({
	selector: 'app-game-main-view',
	templateUrl: './game-main-view.component.html',
	styleUrls: ['./game-main-view.component.css']
})





export class GameMainViewComponent implements OnInit, AfterViewInit {
	public head: string;
	public message: string;

	private userName: string;
	private tankImagePath: string;
	private inputHandler: InputHandler;
	private gameCtrl: GameController;

	@ViewChild('canvas') canvas: ElementRef;
	@HostListener('window:keydown', ['$event']) 

	keyEvent(event: KeyboardEvent) {
		console.log(event.code);
		//alert(JSON.stringify(this.inputHandler.getAction(event.keyCode)));
	}
	
	constructor(private dataExchangerController: ConnectioncontrollerService) {
		this.tankImagePath = "../../assets/Images/Tanks/red/up.png";
		this.userName = localStorage.getItem("userName");
		this.inputHandler = new InputHandler();
	}

	ngOnInit() {
		/*this.dataExchangerController.messageObserver.subscribe(msg => {
		console.log("web service emitió un mensaje");
		console.log(msg);
		});*/
		console.log("Inicializando.... ");
	}

	ngAfterViewInit() { 
		// Hacer la conexion al servidor para que nos tire los datos que se necesitan.   

		/** funcion de prueba */
		var names = ["gray", "red", "green", "blue", "rose", "white"];     
		var dirs = ["up", "left", "down", "right"]; 
		var objects = [];
		var i = 0; 
		var j = 0; 
		for(i=0;i<6; i++)
		{
			for(j=0;j<4; j++)
			{
				var ima = new Image();
				ima.src = "../../assets/Images/Tanks/"+names[i]+"/"+dirs[j]+".png";
				ima.onload
				{
					objects.push(new AnimatedObject(ima, [ima], {x:(i*30)+60,y:(j*30)+60}),);          
				}

			}
		}	
		this.gameCtrl = new GameController(this.canvas.nativeElement,objects, this.inputHandler);       
	}

	send() {
		this.sendMessage(this.head,this.message);
	}


	sendMessage(head: string, data: Object) {
		this.dataExchangerController.sendMsg(head,data);
	}

	newGame(){  
		this.gameCtrl.initialize(); 
	}
}


