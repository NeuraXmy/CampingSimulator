import { _decorator, Component, Node, Prefab, Sprite, CCFloat, CCInteger, SpriteFrame, RenderTexture, Texture2D, game, renderer, Rect, v2, Vec2, instantiate, debug, v3, CCBoolean, rect, math, Terrain } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NatureItemGenerator')
export class NatureItemGenerator extends Component {

    @property(Prefab)
    prefab: Prefab = null;

    @property(Node)
    container_node: Node = null;

    @property(Vec2)
    grid_size: Vec2 = v2(1.0, 1.0)

    @property(CCInteger)
    num_in_grid: number = 1

    @property(Rect)
    region: Rect = new Rect(0, 0, 100, 100)

    @property(Boolean)
    random_rotation: boolean = true

    @property(Vec2)
    random_scale: Vec2 = v2(1.0, 1.0)

    @property(Terrain)
    mask: Terrain = null

    @property(Boolean)
    normalize_mask: boolean = true

    @property(Boolean)
    density_mask: boolean = true

    @property(Boolean)
    scale_mask: boolean = true


    mask_max_height: number = -1e9
    mask_min_height: number = 1e9
    
    start() {
        this.generate();
    }

    get_mask_height(grid_x: number, grid_z: number) {
        var x = (this.region.x + grid_x * this.grid_size.x + this.grid_size.x / 2)
        var z = (this.region.y + grid_z * this.grid_size.y + this.grid_size.y / 2) / this.mask.node.scale.z
    }

    generate() {
        var x_grid_n = Math.floor(this.region.width  / this.grid_size.x)
        var z_grid_n = Math.floor(this.region.height / this.grid_size.y)
        var positions = []

        if (this.mask != null) {
            for (var i = 0; i < x_grid_n; i++) 
                for (var j = 0; j < z_grid_n; j++) {
                    
                    

                    var height = this.mask.getHeight(x , z)
                }    
        }
        

        for (var i = 0; i < x_grid_n; i++) {
            for (var j = 0; j < z_grid_n; j++) {
                var x = this.region.x + i * this.grid_size.x
                var z = this.region.y + j * this.grid_size.y
                
                if (this.mask != null && this.density_mask) {

                }

                for(var k = 0; k < this.num_in_grid; k++) {
                    var x_offset = math.randomRange(0, this.grid_size.x)
                    var z_offset = math.randomRange(0, this.grid_size.y)
                    positions.push(v3(x + x_offset, 0, z + z_offset))
                }
            }
        }
        
        for (var pos of positions) {
            const node = instantiate(this.prefab)
            node.position = pos
            if (this.random_rotation) 
                node.eulerAngles = v3(0, math.randomRange(0, 360), 0)
            if (this.random_scale.x != 1.0 || this.random_scale.y != 1.0) {
                var scale = math.randomRange(this.random_scale.x, this.random_scale.y)
                node.scale = v3(scale, scale, scale)
            }
            this.container_node.addChild(node)
        }
        console.log(`Generated ${positions.length} of ${this.prefab}`)
        
    }
}