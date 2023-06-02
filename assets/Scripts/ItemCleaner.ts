import { _decorator, assert, CCFloat, CCInteger, Collider, Component, Enum, Node, Vec3 } from 'cc';
import { Item, ItemType } from './Item';
const { ccclass, property } = _decorator;

enum Strategy {
    CleanCircleInner,
    CleanCircleOuter,
}

@ccclass('CleanTask')
class CleanTask {

    @property({type: Enum(Strategy)})
    strategy: Strategy = Strategy.CleanCircleInner;

    @property({type: ItemType})
    type: ItemType = ItemType.Unkown;

    @property({type: CCFloat})
    clean_radius: number = 1.0;

    public clean(center: Vec3) {
        let count = 0
        let nodes = [...Item.find_nodes(this.type)];
        for(let node of nodes) {
            let dist = node.worldPosition.clone().subtract(center).length();
            if(this.strategy == Strategy.CleanCircleInner && dist < this.clean_radius) {
                node.active = false;
                count += 1;
            }
            if(this.strategy == Strategy.CleanCircleOuter && dist > this.clean_radius) {
                node.active = false;
                count += 1;
            }
        }
        console.log("Cleaned " + count + " of type " + this.type);
    }
}

@ccclass('ItemCleaner')
export class ItemCleaner extends Component {

    @property({type: [CleanTask]})
    tasks: CleanTask[] = [];

    @property({type: CCInteger})
    delay_frame: number = 1;

    private current_frame = 0

    start() {
        
    }

    update(deltaTime: number) {
        this.current_frame += 1;
        if(this.current_frame == this.delay_frame) 
            for(let task of this.tasks) 
                task.clean(this.node.worldPosition.clone());
    }
}


