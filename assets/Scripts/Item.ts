import { _decorator, Component, director, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum ItemType {
    Unkown,

    SmallStone,
    BigStone,
    Grass,
    Tree,
    Log,

    WindShield,
    TentCover,
    TentCompleted,
    RodFull,
    RodHead,
    RodTail,
    Fastening,

    LighterFire,

    Pin,
}

@ccclass('Item')
export class Item extends Component {

    @property({type: Enum(ItemType)})
    type: ItemType = ItemType.Unkown;

    start() {

    }

    update(deltaTime: number) {
        
    }

    static find_nodes(type: ItemType, parent: Node = director.getScene()) : Set<Node> {
        let ret = new Set<Node>();
        for(let item of parent.getComponentsInChildren(Item)) {
            if(item.type == type) {
                ret.add(item.node);
            }
        }
        return ret;
    }
}


