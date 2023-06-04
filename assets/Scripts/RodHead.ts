import { _decorator, CCFloat, Component, director, instantiate, isValid, Node, Prefab, Scene, Vec3 } from 'cc';
import { Item, ItemType } from './Item';
import { GrabInteractable } from '../../extensions/xr-plugin/assets/xr/component';
const { ccclass, property } = _decorator;

@ccclass('RodHead')
export class RodHead extends Component {

    @property({type: CCFloat})
    connect_distance: number = 2;

    @property({type: Prefab})
    full_prefab: Prefab = null;

    check(head, tail) {
        let tailpos = tail.worldPosition.clone();
        let headpos = head.worldPosition.clone();
        let dist = Vec3.distance(tailpos, headpos);
        return dist < this.connect_distance;
    }

    start() {
  
    }

    update(deltaTime: number) {
        let head = this.node;

        let tails = [...Item.find_nodes(ItemType.RodTail)]
        tails.sort((a, b) => {
            let apos = a.worldPosition.clone();
            let bpos = b.worldPosition.clone();
            let adist = Vec3.distance(apos, head.worldPosition);
            let bdist = Vec3.distance(bpos, head.worldPosition);
            return adist - bdist;
        });
        
        for(let tail of tails) {
            if(isValid(tail, true) && this.check(head, tail)) {
                console.log(this.node.name + " connected to " + tail.name);
                let full = instantiate(this.full_prefab);
                full.parent = head.parent;
                full.worldPosition = head.worldPosition.clone();
                full.worldRotation = head.worldRotation.clone();
                head.destroy();
                tail.destroy();
                break;
            }
        }
    }
}


