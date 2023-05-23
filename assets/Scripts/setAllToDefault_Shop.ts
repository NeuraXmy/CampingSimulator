import { _decorator,game,Enum,Component, Node, TypeScript } from 'cc';
import { utils } from "cc";
import { Button } from "cc";
import { Label } from "cc";
const { ccclass, property } = _decorator;


@ccclass('setAllToDefault_Shop')
export class setAllToDefault_Shop extends Component {
    @property(Node)
    targetNode: Node = null;

    start() {
        for (let i = 0; i < this.targetNode.children.length; ++i) {
            let child = this.targetNode.children[i];
           
            for (let j = 0; j < child.children.length; ++j) {
                child.children[j].layer = this.targetNode.layer;
                if(j == 1)
                child.children[j].active = false;
                if(child.children[j].children.length == 1)
                {
                    child.children[j].children[0].layer = this.targetNode.layer;
                }
            }
          
        }
    }

    update(deltaTime: number) {
       

    }
}

