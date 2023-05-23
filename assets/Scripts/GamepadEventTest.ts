import { _decorator, Component, input, Input, director, EventGamepad, Vec2, Label } from 'cc';

const { ccclass, property } = _decorator;
@ccclass('GamepadEventTest')export class GamepadEventTest extends Component{    

    start() {        
        input.on(Input.EventType.GAMEPAD_INPUT, this._gamepadEvent, this);    
    }
    changeSceneToTest_Scene() {
        director.loadScene("Test_Scene");
    }
    changeSceneToGameScene() {
        director.loadScene("GameScene");
    }
    private _gamepadEvent(event: EventGamepad) {        
        const gamepad = event.gamepad;        
        let num = gamepad.buttonWest.getValue;
        if(num === 1){
            this.changeSceneToGameScene;
        }
        else{
            this.changeSceneToTest_Scene;
        }
        const leftStickValue = gamepad.leftStick.getValue() as Vec2;        
         
        const rightStickValue = gamepad.rightStick.getValue() as Vec2;        
      
    }
}