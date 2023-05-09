import { _decorator, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum NatureItemType {
    Unkown,
    SmallStone,
    BigStone,
    Grass,
    Tree,
    Log,
}

@ccclass('NatureItem')
export class NatureItem extends Component {

    @property({type: Enum(NatureItemType)})
    type: NatureItemType = NatureItemType.Unkown;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


