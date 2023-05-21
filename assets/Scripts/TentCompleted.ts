import { _decorator, Component, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TentCompleted')
export class TentCompleted extends Component {
    start() {
        this.node.scale = v3(1, 0.1, 1);
    }

    update(deltaTime: number) {
        this.node.scale = this.node.scale.lerp(v3(1, 1, 1), 0.1);
    }
}


