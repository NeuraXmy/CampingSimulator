import { _decorator, CCFloat, Component, Node } from 'cc';
import { Item, ItemType } from './Item';
import { Pin } from './Pin';
const { ccclass, property } = _decorator;

@ccclass('Hammer')
export class Hammer extends Component {

    @property({type: CCFloat})
    pin_distance: number = 1.0;

    start() {
        
    }

    update(deltaTime: number) {
        let pins = Item.find_nodes(ItemType.Pin);
        for(let pin of pins) {
            let pin_comp = pin.getComponent(Pin);
            if(!pin_comp.pinned) {
                let dx = pin.worldPosition.x - this.node.worldPosition.x;
                let dz = pin.worldPosition.z - this.node.worldPosition.z;
                let distance = Math.sqrt(dx * dx + dz * dz);
                if(distance < this.pin_distance) {
                    console.log("Pinned");
                    pin_comp.pin();
                }
            }
        }
    }
}


