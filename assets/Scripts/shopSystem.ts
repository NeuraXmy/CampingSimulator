import { _decorator, Component, Node } from 'cc';
import { utils } from "cc";
import { Button } from "cc";
import { Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass('shopSystem')
export class shopSystem extends Component {
    @property(Node)
    targetNode: Node = null;
    
    @property(Number)
    chindIndex: number = 1;

    @property(Node)
    child: Node = null!;

    @property(Boolean)
    isBuyAble: boolean = true;

    value : string = null;
    start() {
        this.targetNode = this.node;
        let siblingNode: Node = null!;
        for (var i = 0; i <  this.targetNode.children.length; i++) {
            var childNode = this.targetNode.children[i];
            if (childNode.name === "Price") {
                siblingNode = childNode;
                break;
            }
        }
        if(siblingNode!=null)
        {
            this.value = siblingNode.getComponent(Label).string;
            this.value = this.value.replace(/[^0-9]/g, "");
            let children = this.targetNode.children;
            this.child = children[this.chindIndex];
        }
    }

    update(deltaTime: number) {
        let children = this.targetNode.children;
        let child = children[this.chindIndex];
       
    }
    buyThing(){
        let siblingNode: Node = null!;
        for (var i = 0; i <  this.targetNode.parent.children.length; i++) {
            var childNode = this.targetNode.parent.children[i];
            if (childNode.name === "Money") {
                siblingNode = childNode;
            break;

            }
        }
        let str1 = siblingNode.getComponent(Label).string;
        const num1: number = parseInt(str1);
        let str2 = this.value;
        const num2: number = parseInt(str2);
        let difference: number = 0;

        if (num1 > num2&&this.isBuyAble) {
            difference = num1 - num2;
            let rev: string = difference.toString();
            siblingNode.getComponent(Label).string = rev;
            this.isBuyAble = false;
            this.child.active = true;

        }
        
    }
    
    setChildEnableOrNot(){
        if(this.isBuyAble)
            if (!this.child.active) {
                this.child.active = true; // enable the child node
            } else {
                this.child.active = false; // disable the child node
            }
       
    }

    
}

// class Item {
//     public name: string;
//     public price: number;
  
//     constructor(name: string, price: number) {
//       this.name = name;
//       this.price = price;
//     }
//   }
  
// class Shop {
//     public items: Item[];

//     constructor() {
//     //创建商品
//         this.items = [
//             new Item("Item 1", 10),
//             new Item("Item 2", 20),
//             new Item("Item 3", 30),
//         ];
        
//         const buttonNode = cc.find('Canvas/Button'); // 替换为自己的Button节点的路径 -->  如何有效搜索路径
//         const buttonComponent = buttonNode.getComponent(cc.Button); //获取组件
//         buttonComponent.on('click', this.onButtonClick, this);

//     }

//     public buyItem(index: number, player: Player): void {
//         const item = this.items[index];

//         if (item && player.money >= item.price) { //判断玩家能否买得起商品
//             player.money -= item.price;
//             player.addItemToInventory(item);
//             this.items.splice(index, 1);
//             console.log(`You bought ${item.name}.`);

//             const moneyLabelNode = cc.find('XRShop/Money'); //玩家持有金钱的Label节点路径
//             const moneyLabelComponent = moneyLabelNode.getComponent(cc.Label);
//             moneyLabelComponent.string = `${player.money}`;

//         } else {
//             console.log("Insufficient funds or invalid item.");
//         }
//     }

//     private onButtonClick():void{
//         this.buyItem(0, player);
//     }
// }
  
// class Player {
//     public money: number;
//     public inventory: Item[];

//     constructor() {
//         this.money = 100;
//         this.inventory = [];
//     }

//     //将购买的商品放入玩家的“背包”
//     public addItemToInventory(item: Item): void {
//         this.inventory.push(item);
//     }

//     public cancelPurchase(index: number, shop: Shop): void {
//         const item = this.inventory[index];

//         if (item) {
//             this.money += item.price;
//             this.inventory.splice(index, 1);
//             shop.items.push(item);
//             console.log(`You canceled the purchase of ${item.name}.`);
//         } else {
//             onsole.log("Invalid item in the inventory.");
//         }
//     }
//   }
  
