import { _decorator, Component, Node, Quat, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pin')
export class Pin extends Component {

    public pinned: boolean = false;
    pinned_pos = null
    pinned_rot = null

    start() {

    }

    update(deltaTime: number) {
        if(this.pinned) {
            this.node.getComponent(RigidBody).type = RigidBody.Type.Static;
            this.node.setWorldPosition(this.pinned_pos);
            this.node.setWorldRotation(this.pinned_rot);
        }
    }

    public pin() {
        this.pinned = true;
        this.pinned_pos = this.node.worldPosition;
        this.pinned_rot = Quat.IDENTITY.clone();
    }
}


