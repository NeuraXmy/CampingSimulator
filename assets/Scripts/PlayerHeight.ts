import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerHeight')
export class PlayerHeight extends Component {

    start() {

    }

    update(deltaTime: number) {
        let node = this.node.getChildByName("XR HMD");
        let pos = node.worldPosition.clone();
        pos.y = 5;
        node.setWorldPosition(pos);
    }
}


