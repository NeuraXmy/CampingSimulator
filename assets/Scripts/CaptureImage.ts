import { _decorator, Prefab,SpriteComponent,UIRenderer,Material,SpriteFrame, Component, Node, Camera, RenderTexture, view, UITransform, log, game, screen, NodeEventType, Texture2D, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CaptureImage')
export class CaptureImage extends Component {
    @property(Camera)
    copyCamera: Camera = null;

    @property({type: Prefab})
    cubePrfb: Prefab | null = null;

    @property(Material)
    material: Material = null; // 需要修改的材质

    @property(Node)
    targetNode: Node = null!;

    @property(Texture2D)
    temptexture1: Texture2D = null;

    @property(Texture2D)
    temptexture2: Texture2D = null;

    rt: RenderTexture

    // 在需要修改预制体纹理的地方调用此方法
    private _image: HTMLImageElement
    _canvas: HTMLCanvasElement = null!;
    _buffer: ArrayBufferView = null!;

    start() {
        this.rt = new RenderTexture();
        this.rt.reset({
            width: view.getVisibleSize().width,
            height: view.getVisibleSize().height,
        })
        // this.copyCamera.targetTexture = this.rt;
    }

    private copyRenderTex() {
        const width = this.targetNode.getComponent(UITransform).width;
        const height = this.targetNode.getComponent(UITransform).height;
        const anchorPoint = this.targetNode.getComponent(UITransform).anchorPoint;
        const worldPos = this.targetNode.getWorldPosition();
        this._buffer = this.rt.readPixels(Math.round(worldPos.x - width * anchorPoint.x), Math.round(worldPos.y - height * anchorPoint.y), width, height);
        let block:Node = instantiate(this.cubePrfb);
        block.setPosition(Math.random() * 2 - 1,-0.195,-10);
        if (this.material && this.temptexture1) {
            const textureAsset = this.temptexture1.getGFXTexture();
            const textureHandle = textureAsset.getGLTextureHandle();
            // 获取预制体中的节点
            const prefabNode = block; // 如果组件直接挂载在预制体节点上
            this.material.setProperty('texture', textureHandle);
            // const prefabNode = this.node.parent; // 如果组件挂载在预制体节点的子节点上
            console.info('Copy1');
            // 遍历预制体节点及其子节点
        
        }
        this.node.addChild(block);
       
    }

    private clearCapture() {
        if (this._image) {
            game.container!.removeChild(this._image)
        }
        this._image = null;
    }
}