import { _decorator, CCFloat, Component, director, instantiate, Node, Prefab, Scene, Vec3 } from 'cc';
import { Item, ItemType } from './Item';
const { ccclass, property } = _decorator;

@ccclass('RodHead')
export class RodHead extends Component {
    
    @property({type: Prefab})
    rodfull_prefab: Prefab = null;

    @property({type: CCFloat})
    connect_distance: number = 2;

    check(tail) {
        let tailpos = tail.position.clone();
        let headpos = this.node.position.clone();
        let dist = Vec3.distance(tailpos, headpos);
        return dist < this.connect_distance;
    }

    start() {

    }

    update(deltaTime: number) {
        for(let item of Item.find_nodes(ItemType.RodTail)) {
            if(this.check(item)) {
                console.log(this.node.name + " connected to " + item.name)
                let rodfull = instantiate(this.rodfull_prefab);
                rodfull.setPosition(this.node.position);
                rodfull.setRotation(this.node.rotation);
                rodfull.setScale(this.node.scale);
                rodfull.setParent(director.getScene())

                item.destroy();
                this.node.destroy();
                break;
            }
        }
    }
}


