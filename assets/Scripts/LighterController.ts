import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LighterController')
export class LighterController extends Component {
    particle: Node = null;
    start() {
        this.particle = this.node.getChildByName("LighterFire"); 
        this.particle.active = false;
    }

    update(deltaTime: number) {
        
    }
    show(){
        // console.log("lll");
        if(this.particle.active)
            this.particle.active = false;
        else
        {
            this.particle.active = true;
        }
    }
   

}


