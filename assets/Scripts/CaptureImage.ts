import { _decorator,ModelComponent,primitives,utils,Sprite, Prefab,SpriteComponent,UIRenderer,Material,SpriteFrame, Component, Node, Camera, RenderTexture, view, UITransform, log, game, screen, NodeEventType, Texture2D, instantiate, MeshRenderer, MotionStreak, resources, v3, Vec3, BoxCollider, RigidBody, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CaptureImage')
export class CaptureImage extends Component {
    @property(Camera)
    copyCamera: Camera = null;

    @property(Vec3)
    pictureSize: Vec3 = null;
   
    @property(Node)
    target: Node = null;

    rt: RenderTexture

    // 在需要修改预制体纹理的地方调用此方法
    private _image: HTMLImageElement
    _canvas: HTMLCanvasElement = null!;
    _buffer: ArrayBufferView = null!;

    start() {
        if(this.target==null&&this.node!=null)
        this.target = this.node;
        this.pictureSize.set(1.4,0,0.9);
        this.rt = new RenderTexture();
        this.rt.reset({
            width: view.getVisibleSize().width,
            height: view.getVisibleSize().height,
        })
        // this.copyCamera.targetTexture = this.rt;
    }

    private copyRenderTex() {
        // const width = this.targetNode.getComponent(UITransform).width;
        // const height = this.targetNode.getComponent(UITransform).height;
        // const anchorPoint = this.targetNode.getComponent(UITransform).anchorPoint;
        // const worldPos = this.targetNode.getWorldPosition();
        // this._buffer = this.rt.readPixels(Math.round(worldPos.x - width * anchorPoint.x), Math.round(worldPos.y - height * anchorPoint.y), width, height);
        this.copyCamera.targetTexture = this.rt;
        const cubeNode = new Node('Cube');
        cubeNode.addComponent(BoxCollider);
        cubeNode.addComponent(RigidBody);
        const modelComps = cubeNode.addComponent(ModelComponent);
        cubeNode.setScale(this.pictureSize);
        // 创建正方体网格
        const primitiveMesh = utils.createMesh(primitives.box());
        modelComps.mesh = primitiveMesh;
        
        let material = new Material();
        material.initialize({
            effectName: 'builtin-unlit',
            technique: 0,
            defines: {
                USE_TEXTURE: true,
            },
        });
        material.setProperty('mainTexture', this.rt);
        // 设置材质的贴图属性
        // 创建正方体网格
        let myposition = this.target.getWorldPosition();
        cubeNode.setWorldPosition(myposition);
        cubeNode.getComponent(MeshRenderer).setMaterial(material,0);
        this.node.addChild(director.getScene());
        console.log("picture")
    }


}