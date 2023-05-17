import { _decorator, Prefab, Component, Node, Camera, RenderTexture, view, UITransform, log, game, screen, NodeEventType, Texture2D, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CaptureImage')
export class CaptureImage extends Component {
    @property(Camera)
    copyCamera: Camera = null;

    @property({type: Prefab})
    cubePrfb: Prefab | null = null;

    @property(Node)
    targetNode: Node = null!;
    @property(Texture2D)
    temptexture1: Texture2D = null;
    @property(Texture2D)
    temptexture2: Texture2D = null;
    rt: RenderTexture

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
        
        block.setPosition(-0.5,-0.4,-10);
        console.info('Copy');
    }

    private clearCapture() {
        if (this._image) {
            game.container!.removeChild(this._image)
        }
        this._image = null;
    }
}