import { _decorator, Color, Component, Enum, loader, Material, MeshRenderer, Node, Prefab } from 'cc';
import { NatureItem, NatureItemType } from './NatureItem';
const { ccclass, property } = _decorator;

@ccclass('CampFireLocator')
export class CampFireLocator extends Component {

    @property(Number)
    outer_radius: number = 1.5

    @property(Number)
    inner_radius: number = 1.0

    @property({type: Enum(NatureItemType)})
    stone_type: NatureItemType = NatureItemType.SmallStone;

    @property({type: Enum(NatureItemType)})
    log_type: NatureItemType = NatureItemType.Log;
    
    @property(Prefab)
    fire_prefab: Prefab = null;

    @property(Material)
    outer_material: Material = null;
    @property(Material)
    inner_material: Material = null;


    outerIndicator: Node = null;
    innerIndicator: Node = null;

    show() {
        this.outerIndicator.getComponent(MeshRenderer).material = this.outer_material;
        this.outerIndicator.setScale(this.outer_radius, 0, this.outer_radius)
        this.outerIndicator.setPosition(0, 0.001, 0)

        this.innerIndicator.getComponent(MeshRenderer).material = this.inner_material;
        this.innerIndicator.setScale(this.inner_radius, 0, this.inner_radius)
        this.innerIndicator.setPosition(0, 0.002, 0)

        this.outerIndicator.active = true
        this.innerIndicator.active = true
    }

    check() {

    }

    start_fire() {

    }

    start() {
        this.outerIndicator = this.node.getChildByName("OuterIndicator");
        this.innerIndicator = this.node.getChildByName("InnerIndicator");
        this.outerIndicator.active = false
        this.innerIndicator.active = false
        this.show();
    }

    update(deltaTime: number) {
        
    }
}


