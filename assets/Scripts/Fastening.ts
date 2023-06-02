import { _decorator, CCFloat, Component, instantiate, isValid, Node, Prefab, Vec3 } from 'cc';
import { Item, ItemType } from './Item';
const { ccclass, property } = _decorator;

@ccclass('Fastening')
export class Fastening extends Component {

    @property({type: CCFloat})
    rod_distance_threshold: number = 2;

    @property({type: CCFloat})
    rod_rotation_threshold: number = 9999;

    @property({type: CCFloat})
    cover_distance_threshold: number = 0.5;

    @property({type: CCFloat})
    cover_rotation_threshold: number = 9999;

    @property({type: Prefab})
    tent_prefab: Prefab = null;

    start() {
        let rods = this.node.getChildByName("Rods").children;
        for(let rod of rods) {
            rod.active = false;
        }
    }

    update(deltaTime: number) {
        let rods = this.node.getChildByName("Rods").children;
        for(let rod of rods) {
            if(!rod.active) {
                for(let target of Item.find_nodes(ItemType.RodFull)) if(isValid(target, true)) {
                    let targetpos = target.getWorldPosition().clone();
                    let rodpos = rod.getWorldPosition().clone();
                    let dist = Vec3.distance(targetpos, rodpos);

                    let targetrot = Vec3.ZERO.clone();
                    let rodrot = Vec3.ZERO.clone();
                    target.getWorldRotation().getEulerAngles(targetrot);
                    rod.getWorldRotation().getEulerAngles(rodrot);
                    let rot = 0;
                    rot = Math.max(rot, Math.abs(targetrot.x - rodrot.x));
                    rot = Math.max(rot, Math.abs(targetrot.y - rodrot.y));
                    rot = Math.max(rot, Math.abs(targetrot.z - rodrot.z));
                    
                    if(dist < this.rod_distance_threshold && rot < this.rod_rotation_threshold) {
                        console.log(this.node.name + " connected to " + target.name)
                        rod.active = true;
                        target.destroy();
                        break;
                    }
                }
            }
        }
        if(rods.every((rod) => rod.active)) {
            for(let cover of Item.find_nodes(ItemType.TentCover)) {
                let coverpos = cover.worldPosition.clone();
                let fasteningpos = this.node.worldPosition.clone();
                let dist = Vec3.distance(coverpos, fasteningpos);

                let coverrot = Vec3.ZERO.clone();
                let fasteningrot = Vec3.ZERO.clone();
                cover.worldRotation.getEulerAngles(coverrot);
                this.node.worldRotation.getEulerAngles(fasteningrot);
                let rot = 0;
                rot = Math.max(rot, Math.abs(coverrot.x - fasteningrot.x));
                rot = Math.max(rot, Math.abs(coverrot.y - fasteningrot.y));
                rot = Math.max(rot, Math.abs(coverrot.z - fasteningrot.z));

                if(dist < this.cover_distance_threshold && rot < this.cover_rotation_threshold) {
                    console.log(this.node.name + " connected to " + cover.name)
                    let tent = instantiate(this.tent_prefab);
                    tent.setPosition(cover.worldPosition.clone());
                    tent.setRotation(cover.worldRotation.clone());
                    tent.setScale(cover.worldScale.clone());
                    tent.setParent(cover.getParent());
                    
                    cover.active = false;
                    this.node.active = false;
                }
            }
        }
    }
}


