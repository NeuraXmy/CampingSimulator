import { _decorator, Component, Node ,ParticleSystem} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PestcideController')
export class PestcideController extends Component {
    particle: Node = null;
    fog: Node = null;
    start() {
        this.particle = this.node.getChildByName("Particle");
        this.fog = this.node.getChildByName("fog");
        this.particle.active = true;
        this.fog.active = true;
    }

    update(deltaTime: number) {
        
    }
    show(){
        this.particle.active = false;
        this.fog.active = false;
        this.particle.active = true;
        this.fog.active = true;
        // this.particle.getComponent(ParticleSystem).play;
        // this.fog.getComponent(ParticleSystem).play;
        // this.fog.getComponent(ParticleSystem).playOnAwake;
        // this.particle.getComponent(ParticleSystem).playOnAwake;
        // console.log("PestcideController");
    }
}


