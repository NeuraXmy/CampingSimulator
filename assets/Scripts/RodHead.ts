import { _decorator, CCFloat, Component, director, instantiate, isValid, Node, Prefab, Scene, Vec3 } from 'cc';
import { Item, ItemType } from './Item';
const { ccclass, property } = _decorator;

@ccclass('RodHead')
export class RodHead extends Component {

    @property({type: CCFloat})
    connect_distance: number = 2;

    check(head, tail) {
        let tailpos = tail.worldPosition.clone();
        let headpos = head.worldPosition.clone();
        let dist = Vec3.distance(tailpos, headpos);
        return dist < this.connect_distance;
    }

    start() {
        this.node.getChildByName("RodFull").active = false;
    }

    update(deltaTime: number) {
        let head = this.node.getChildByName("RodHead");
        let full = this.node.getChildByName("RodFull");

        if(!head.active) return;

        let tails = [...Item.find_nodes(ItemType.RodTail)]
        tails.sort((a, b) => {
            let apos = a.worldPosition.clone();
            let bpos = b.worldPosition.clone();
            let adist = Vec3.distance(apos, head.worldPosition);
            let bdist = Vec3.distance(bpos, head.worldPosition);
            return adist - bdist;
        });
        
        for(let tail of tails) {
            if(this.check(head, tail)) {
                console.log(this.node.name + " connected to " + tail.name);
                head.active = false;
                tail.active = false;
                full.active = true;
                full.worldPosition = head.worldPosition.clone();
                full.worldRotation = head.worldRotation.clone();
                break;
            }
        }
    }
}


