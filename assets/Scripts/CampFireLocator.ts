import { _decorator, CCBoolean, CCFloat, CCInteger, Collider, Color, Component, debug, director, Enum, ITriggerEvent, loader, Material, MeshRenderer, Node, Prefab, v3 } from 'cc';
import { Item, ItemType } from './Item';
import { WindShield } from './WindShield';
const { ccclass, property } = _decorator;

@ccclass('CampFireLocator')
export class CampFireLocator extends Component {

    @property({type: [Enum(ItemType)]})
    outer_item_types: ItemType[] = [ItemType.SmallStone];

    @property({type: [Enum(ItemType)]})
    inner_item_types: ItemType[] = [ItemType.SmallStone];

    @property({type: [Enum(ItemType)]})
    fuel_types: ItemType[] = [ItemType.Log];

    @property({type: CCInteger})
    outer_requirement: number = 10
    @property({type: CCInteger})
    inner_requirement: number = 10
    @property({type: CCInteger})
    fuel_requirement: number = 4
    @property({type: CCBoolean})
    need_windshield: boolean = true

    @property({type: CCBoolean})
    need_lightfire: boolean = true
    @property({type: CCFloat})
    lightfire_distance: number = 1.0

    outer_items = new Set<Node>();
    inner_items = new Set<Node>();
    fuel_items = new Set<Node>();

    outerIndicator: Node = null;
    innerIndicator: Node = null;
    campfire: Node = null;

    show() {
        this.outerIndicator.active = true
        this.innerIndicator.active = true
    }

    calc_angle_interval(nodes: Iterable<Node>) {
        let angles: number[] = [];
        for(let item of nodes) {
            let dx = item.worldPosition.x - this.node.worldPosition.x;
            let dz = item.worldPosition.z - this.node.worldPosition.z;
            let angle = Math.atan2(dz, dx);
            angles.push(angle);
        }
        if(angles.length <= 1) 
            return Math.PI * 2;
        angles.sort((a: number, b: number) => a - b);
        let ret: number = 0
        for(let i: number = 0; i < angles.length; i++) {
            let j: number = i == angles.length - 1 ? 0 : i + 1;
            let ai = angles[i], aj = angles[j];
            if(ai >= aj) aj += Math.PI * 2;
            ret = Math.max(ret, aj - ai);
        }
        return ret;
    }

    check() {
        for(let item of this.inner_items) 
            this.outer_items.delete(item);
        let outer_angle: number = this.calc_angle_interval(this.outer_items)

        if(outer_angle * this.outer_requirement <= Math.PI * 2
        && this.inner_items.size >= this.inner_requirement
        && this.fuel_items.size >= this.fuel_requirement) {
            if(this.need_windshield) {
                let windshields = director.getScene().getComponentsInChildren(WindShield);
                for(let ws of windshields) {
                    if(ws.node.active) {
                        let ok: boolean = true
                        for(let item of this.inner_items)
                            ok = ok && ws.inner_items.has(item);
                        for(let item of this.outer_items)
                            ok = ok && ws.inner_items.has(item);
                        for(let item of this.fuel_items)
                            ok = ok && ws.inner_items.has(item);
                        if(ok) return true;
                    }
                }
            } else {
                return true;
            }
        }
        return false
    }

    start() {
        this.outerIndicator = this.node.getChildByName("OuterIndicator");
        let outerCollider = this.outerIndicator.getComponent(Collider);
        outerCollider.on('onTriggerEnter', this.on_outer_trigger_enter, this);
        outerCollider.on('onTriggerExit', this.on_outer_trigger_exit, this);
        this.outerIndicator.active = false

        this.innerIndicator = this.node.getChildByName("InnerIndicator");
        let innerCollider = this.innerIndicator.getComponent(Collider);
        innerCollider.on('onTriggerEnter', this.on_inner_trigger_enter, this);
        innerCollider.on('onTriggerExit', this.on_inner_trigger_exit, this);
        this.innerIndicator.active = false

        this.campfire = this.node.getChildByName("CampFire");
        this.campfire.active = false;

        this.show();
    }

    update(deltaTime: number) {
        if(!this.campfire.active && this.check()) {
            let lightfires = Item.find_nodes(ItemType.LighterFire);
            let min_dist = 1e9;
            for(let lf of lightfires) if(lf.active) {
                let dist = v3(lf.worldPosition).subtract(this.node.worldPosition).length();
                min_dist = Math.min(min_dist, dist);
            }
            if(!this.need_lightfire || min_dist < this.lightfire_distance) {
                this.campfire.active = true;
                this.outerIndicator.active = false;
                this.innerIndicator.active = false;
            }
        }
    }


    is_outer_item(node: Node) {
        let item = node.getComponent(Item);
        return item && this.outer_item_types.indexOf(item.type) != -1;
    }
    is_inner_item(node: Node) {
        let item = node.getComponent(Item);
        return item && this.inner_item_types.indexOf(item.type) != -1;
    }
    is_fuel(node: Node) {
        let item = node.getComponent(Item);
        return item && this.fuel_types.indexOf(item.type) != -1;
    }

    on_outer_trigger_enter (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[CampFireLocator] outer enter: " + other.node.name)
        if(this.is_outer_item(other.node)) {
            this.outer_items.add(other.node);
            console.info("[CampFireLocator] push outer item")
        }
    }
    on_outer_trigger_exit (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[CampFireLocator] outer exit: " + other.node.name)
        if(this.is_outer_item(other.node)) {
            this.outer_items.delete(other.node);
            console.info("[CampFireLocator] pop outer item")
        }
    }
    on_inner_trigger_enter (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[CampFireLocator] inner enter: " + other.node.name)
        if(this.is_inner_item(other.node)) {
            this.inner_items.add(other.node);
            console.info("[CampFireLocator] push inner item")
        }
        if(this.is_fuel(other.node)) {
            this.fuel_items.add(other.node);
            console.info("[CampFireLocator] push fuel item")
        }
    }
    on_inner_trigger_exit (event: ITriggerEvent) {
        let other = event.otherCollider
        console.info("[CampFireLocator] inner exit: " + other.node.name)
        if(this.is_inner_item(other.node)) {
            this.inner_items.delete(other.node);
            console.info("[CampFireLocator] pop inner item")
        }
        if(this.is_fuel(other.node)) {
            this.fuel_items.delete(other.node);
            console.info("[CampFireLocator] pop fuel item")
        }
    }

}


