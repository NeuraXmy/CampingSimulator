import { _decorator, Camera, Component, EventKeyboard, EventMouse, Input, input, isValid, KeyCode, Node, Quat, v2, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SimpleControl')
export class SimpleControl extends Component {

    @property(Camera)
    camera: Camera = null;
    @property
    move_speed: number = 10;
    @property
    rotate_speed: number = 0.2;

    is_rotating: boolean = false;
    is_moving_forward: boolean = false;
    is_moving_backward: boolean = false;
    is_moving_left: boolean = false;
    is_moving_right: boolean = false;
    is_moving_up: boolean = false;
    is_moving_down: boolean = false;

    start() {
        input.on(Input.EventType.MOUSE_DOWN, this.on_mouse_down, this);
        input.on(Input.EventType.MOUSE_UP, this.on_mouse_up, this);
        input.on(Input.EventType.MOUSE_MOVE, this.on_mouse_move, this)
        input.on(Input.EventType.KEY_DOWN, this.on_key_down, this);
        input.on(Input.EventType.KEY_UP, this.on_key_up, this);
        input.on(Input.EventType.MOUSE_WHEEL, this.on_mouse_wheel, this);
    }

    on_mouse_down(event: EventMouse) {
        if(event.getButton() == EventMouse.BUTTON_RIGHT) 
            this.is_rotating = true
    }
    on_mouse_up(event: EventMouse) {
        if(event.getButton() == EventMouse.BUTTON_RIGHT) 
            this.is_rotating = false
    }
    on_mouse_move(event: EventMouse) {
        if(this.is_rotating && this.camera) {
            let delta = v2(event.getDelta());
            this.camera.node.eulerAngles = this.camera.node.eulerAngles
                .add3f(-delta.y * this.rotate_speed, delta.x * this.rotate_speed, 0);
        }
    }

    on_mouse_wheel(event: EventMouse) {
        if(this.camera) {
            let delta = event.getScrollY();
            this.camera.node.position = this.camera.node.position
                .add3f(0, delta * this.move_speed, 0);
        }
    }

    on_key_down(event: EventKeyboard) {
        if(event.keyCode == KeyCode.KEY_W) this.is_moving_forward = true;
        if(event.keyCode == KeyCode.KEY_S) this.is_moving_backward = true;
        if(event.keyCode == KeyCode.KEY_A) this.is_moving_left = true;
        if(event.keyCode == KeyCode.KEY_D) this.is_moving_right = true;
        if(event.keyCode == KeyCode.SPACE) this.is_moving_up = true;
        if(event.keyCode == KeyCode.SHIFT_LEFT) this.is_moving_down = true;
    }

    on_key_up(event: EventKeyboard) {
        if(event.keyCode == KeyCode.KEY_W) this.is_moving_forward = false;
        if(event.keyCode == KeyCode.KEY_S) this.is_moving_backward = false;
        if(event.keyCode == KeyCode.KEY_A) this.is_moving_left = false;
        if(event.keyCode == KeyCode.KEY_D) this.is_moving_right = false;
        if(event.keyCode == KeyCode.SPACE) this.is_moving_up = false;
        if(event.keyCode == KeyCode.SHIFT_LEFT) this.is_moving_down = false;
    }

    update(deltaTime: number) {
        if(this.camera) {
            let forward = this.camera.node.forward;
            let right = this.camera.node.right;
            let move = v2(0, 0);
            if(this.is_moving_forward) move.add2f(forward.x, forward.z);
            if(this.is_moving_backward) move.add2f(-forward.x, -forward.z);
            if(this.is_moving_left) move.add2f(-right.x, -right.z);
            if(this.is_moving_right) move.add2f(right.x, right.z);
            move = move.normalize();
            this.camera.node.position = this.camera.node.position
                .add3f(move.x * this.move_speed * deltaTime, 0, move.y * this.move_speed * deltaTime);

            let vertical_move = 0;
            if(this.is_moving_up) vertical_move += 1;
            if(this.is_moving_down) vertical_move -= 1;
            this.camera.node.position = this.camera.node.position
                .add3f(0, vertical_move * this.move_speed * deltaTime, 0);
        }
    }
}


