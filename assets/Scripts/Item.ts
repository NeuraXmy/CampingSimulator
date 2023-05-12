import { _decorator, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum ItemType {
    Unkown,

    SmallStone,
    BigStone,
    Grass,
    Tree,
    Log,

    WindShield,
}

@ccclass('Item')
export class Item extends Component {

    @property({type: Enum(ItemType)})
    type: ItemType = ItemType.Unkown;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


