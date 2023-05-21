import { _decorator, Component, PhysicsSystem, director, Camera, Input, input, KeyCode, CCFloat, Vec3, Quat, Button, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MouseDraggable')
export class MouseDraggable extends Component {
    @property({type: CCFloat})
    push_pull_speed: number = 10;

    @property({type: CCFloat})
    rotate_angle: number = 45;

    isDragging = false;
    camera = null;
    mouse_x = 0;
    mouse_y = 0;
    distance = 0;

    is_pulling = false;
    is_pushing = false;

    target_rot = new Quat();


    sync_pos() {
        let ray = this.camera.screenPointToRay(this.mouse_x, this.mouse_y);
        let pos = ray.o.add(ray.d.multiplyScalar(this.distance));
        this.node.setPosition(pos);
    }

    start() {
        this.camera = director.getScene()?.getChildByName("Main Camera")?.getComponent(Camera);
        if (!this.camera) {
            console.warn("Draggable Camera not found");
            return;
        }

        input.on(Input.EventType.MOUSE_DOWN, (event) => {
            if(event.getButton() == EventMouse.BUTTON_LEFT) {
                if(!this.isDragging) {
                    let ray = this.camera.screenPointToRay(event.getLocationX(), event.getLocationY());
                    if (PhysicsSystem.instance.raycastClosest(ray) && PhysicsSystem.instance.raycastClosestResult.collider.node === this.node) {
                        console.log("Drag started: " + this.node.name);
                        this.isDragging = true;
                        this.distance = this.node.position.subtract(ray.o).length();
                        this.mouse_x = event.getLocationX();
                        this.mouse_y = event.getLocationY();
                        this.target_rot = this.node.rotation.clone();
                    }
                }
            }
        }, this);

        input.on(Input.EventType.MOUSE_MOVE, (event) => {
            if(this.isDragging) {
                this.mouse_x = event.getLocationX();
                this.mouse_y = event.getLocationY();
            }
        }, this);

        input.on(Input.EventType.MOUSE_UP, (event) => {
            if(event.getButton() == EventMouse.BUTTON_LEFT) {
                if(this.isDragging) {
                    console.log("Drag ended: " + this.node.name);
                    this.isDragging = false;
                }
            }
        }, this);

        input.on(Input.EventType.KEY_DOWN, (event) => {
            if(event.keyCode == KeyCode.KEY_T) this.is_pulling = true;
            if(event.keyCode == KeyCode.KEY_G) this.is_pushing = true;

            if(event.keyCode == KeyCode.KEY_I) Quat.rotateX(this.target_rot, this.target_rot, this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_K) Quat.rotateX(this.target_rot, this.target_rot, -this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_J) Quat.rotateY(this.target_rot, this.target_rot, this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_L) Quat.rotateY(this.target_rot, this.target_rot, -this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_N) Quat.rotateZ(this.target_rot, this.target_rot, this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_M) Quat.rotateZ(this.target_rot, this.target_rot, -this.rotate_angle * Math.PI / 180);
            if(event.keyCode == KeyCode.KEY_O) this.target_rot = Quat.IDENTITY.clone();
        
        }, this);
        input.on(Input.EventType.KEY_UP, (event) => {
            if(event.keyCode == KeyCode.KEY_T) this.is_pulling = false;
            if(event.keyCode == KeyCode.KEY_G) this.is_pushing = false;
        }, this);
    }

    update(deltaTime: number) {
        if(this.isDragging) {
            if(this.is_pulling) this.distance += this.push_pull_speed * deltaTime;
            if(this.is_pushing) this.distance -= this.push_pull_speed * deltaTime;
            this.distance = Math.max(0, this.distance);
            this.sync_pos();
            this.node.rotation = this.node.rotation.slerp(this.target_rot, 0.1);
        }
    }
}
