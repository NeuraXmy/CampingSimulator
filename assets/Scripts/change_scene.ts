import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeScene')
export class ChangeScene extends Component {
    changeSceneToTest_Scene() {
        director.loadScene("Test_Scene");
    }

    changeSceneToGameScene() {
        director.loadScene("GameScene");
    }

    update(deltaTime: number) {
       
    }
    
}


