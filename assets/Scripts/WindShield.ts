import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WindShield')
export class WindShield extends Component {

    public inner_items = new Set<Node>();

    start() {
        let collider = this.node.getComponent(Collider);
        collider.on('onTriggerEnter', this.on_trigger_enter, this);
        collider.on('onTriggerExit',  this.on_trigger_exit, this);
    }

    on_trigger_enter (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[WindShield] enter: " + other.node.name)
        this.inner_items.add(other.node);
    }
    on_trigger_exit (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[WindShield] exit: " + other.node.name)
        this.inner_items.delete(other.node);
    }

    update(deltaTime: number) {
        
    }
}


