import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RodFull')
export class RodFull extends Component {

    public hovering = false;

    public onHoverStart() {
        this.hovering = true;
    }

    public onHoverEnd() { 
        this.hovering = false;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


