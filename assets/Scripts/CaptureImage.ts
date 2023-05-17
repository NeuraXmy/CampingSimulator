/*import * as cc from 'cc';
const { ccclass, property } = cc._decorator;

@ccclass('Capture_Scress')
export class Capture_Scress extends cc.Component{
    var size = cc.director.getWinSize();cc.director.get
    var fileName = "result_share.jpg";
    var fullPath = jsb.fileUtils.getWritablePath() + fileName;
    if(jsb.fileUtils.isFileExist(fullPath)){
        jsb.fileUtils.removeFile(fullPath);
    }
    //如果要图片高质量 可以使用cc.Texture2D.PIXEL_FORMAT_RGBA8888。
    var texture = new cc.RenderTexture(Math.floor(size.width), Math.floor(size.height));
    texture.setPosition(cc.p(size.width/2, size.height/2));
    texture.begin();
    cc.director.getRunningScene().visit();
    texture.end();
    //1.4 以后，截屏函数的第二个参数改成了 cc.ImageFormat.PNG
    texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPG);
}

*/
