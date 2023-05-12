import { _decorator, Component, Node, Prefab, Sprite, CCFloat, CCInteger, SpriteFrame, RenderTexture, Texture2D, game, renderer, Rect, v2, Vec2, instantiate, debug, v3, CCBoolean, rect, math, Terrain, clamp, Quat, Vec3, isValid } from 'cc';
import { RotationAxisConstrain } from '../../extensions/xr-plugin/assets/ar/component/interaction/constrain/rotation-axis-constraint';
const { ccclass, property } = _decorator;

@ccclass('NatureItemGenerator')
export class NatureItemGenerator extends Component {

    @property({type: Prefab})
    prefab: Prefab = null;

    @property({type: Node})
    container_node: Node = null;

    @property({type: Vec2})
    grid_size: Vec2 = v2(1.0, 1.0)

    @property({type: CCInteger})
    basic_density: number = 1

    @property({type: Rect})
    region: Rect = new Rect(0, 0, 100, 100)

    @property({type: Boolean})
    random_rotation: boolean = true

    @property({type: Vec2})
    random_scale: Vec2 = v2(1.0, 1.0)

    @property({type: Terrain})
    density_mask: Terrain = null

    @property({type: CCFloat})
    density_mask_offset: number = 0.0

    @property({type: CCFloat})
    density_mask_factor: number = 1.0

    @property({type: Terrain})
    scale_mask: Terrain = null

    @property({type: CCFloat})
    scale_mask_offset: number = 0.0

    @property({type: CCFloat})
    scale_mask_factor: number = 1.0

    @property({type: Terrain})
    terrain: Terrain = null

    @property({type: Boolean})
    fit_height: boolean = true

    @property({type: CCFloat})
    height_offset: number = 0.0

    @property({type: Boolean})
    fit_slope: boolean = false

    
    start() {
        this.generate();
    }

    get_grid_center(grid_x: number, grid_z: number) {
        let x = this.region.x + grid_x * this.grid_size.x + this.grid_size.x / 2 
        let z = this.region.y + grid_z * this.grid_size.y + this.grid_size.y / 2
        return v2(x, z)
    }

    get_height(t: Terrain, x: number, z: number) {
        x = (x - this.region.x) / this.region.width  * 32
        z = (z - this.region.y) / this.region.height * 32
        let xi = Math.floor(x)
        let zi = Math.floor(z)
        let xoffset = x - xi
        let zoffset = z - zi
        
        let h00 = t.getHeight(xi, zi)
        let h01 = t.getHeight(xi, zi + 1)
        let h10 = t.getHeight(xi + 1, zi)
        let h11 = t.getHeight(xi + 1, zi + 1)

        let h = h00 * (1 - xoffset) * (1 - zoffset) 
              + h01 * (1 - xoffset) * zoffset 
              + h10 * xoffset * (1 - zoffset) 
              + h11 * xoffset * zoffset

        return h
    }

    get_normal(t: Terrain, x: number, z: number) {
        x = (x - this.region.x) / this.region.width  * 32
        z = (z - this.region.y) / this.region.height * 32
        let xi = Math.floor(x)
        let zi = Math.floor(z)
        let xoffset = x - xi
        let zoffset = z - zi
        
        let n00 = t.getNormal(xi, zi)
        let n01 = t.getNormal(xi, zi + 1)
        let n10 = t.getNormal(xi + 1, zi)
        let n11 = t.getNormal(xi + 1, zi + 1)

        n00.multiplyScalar((1 - xoffset) * (1 - zoffset))
        n01.multiplyScalar((1 - xoffset) * zoffset)
        n10.multiplyScalar(xoffset * (1 - zoffset))
        n11.multiplyScalar(xoffset * zoffset)

        let n = n00.add(n01).add(n10).add(n11).normalize()
        return n
    }

    generate() {
        console.log(`${typeof this.density_mask}`)

        let x_grid_n = Math.floor(this.region.width  / this.grid_size.x)
        let z_grid_n = Math.floor(this.region.height / this.grid_size.y)

        // generate positions
        let positions = []
        for (let i = 0; i < x_grid_n; i++) {
            for (let j = 0; j < z_grid_n; j++) {
                let pos = this.get_grid_center(i, j)

                // apply mask to num per grid
                let num = this.basic_density
                if (this.density_mask) {
                    let alpha = this.get_height(this.density_mask, pos.x, pos.y)
                    alpha = Math.max(alpha * this.density_mask_factor + this.density_mask_offset, 0)
                    num *= alpha
                }
                let int_num = Math.floor(num)
                if (math.randomRange(0, 1) < num - int_num)
                    int_num += 1
                num = int_num

                for(let k = 0; k < num; k++) {
                    let x_offset = math.randomRange(-this.grid_size.x / 2, this.grid_size.x / 2)
                    let z_offset = math.randomRange(-this.grid_size.y / 2, this.grid_size.y / 2)
                    positions.push(v2(pos.x + x_offset, pos.y + z_offset))
                }
            }
        }
        
        // generate items
        for (let pos of positions) {
            const node = instantiate(this.prefab)

            // rotate to fix slope
            let up_vec = v3(0, 1, 0)
            if(this.terrain && this.fit_slope) 
                up_vec = this.get_normal(this.terrain, pos.x, pos.y)
            let rot = new Quat();
            let view_vec = up_vec.clone().cross(v3(0, 0, 1))
            Quat.fromViewUp(rot, view_vec, up_vec)
            node.setRotation(rot)

            // random rotate
            let angle = 0
            if (this.random_rotation) 
                angle = math.randomRange(0, math.TWO_PI)
            rot = new Quat();
            Quat.fromAxisAngle(rot, v3(0, 1, 0), angle)
            node.rotate(rot)

            // fit height
            let h = 0
            if (this.terrain && this.fit_height) 
                h = this.get_height(this.terrain, pos.x, pos.y)
            // set position and height
            node.position = v3(pos.x, h, pos.y).add(up_vec.multiplyScalar(this.height_offset))

            // random scale and apply mask to scale
            let scale = math.randomRange(this.random_scale.x, this.random_scale.y)
            if (this.scale_mask) {
                let alpha = this.get_height(this.scale_mask, pos.x, pos.y)
                alpha = Math.max(alpha * this.scale_mask_factor + this.scale_mask_offset, 0)
                scale *= alpha
            }
            node.scale = v3(scale, scale, scale)

            this.container_node.addChild(node)
        }

        console.log(`Generated ${positions.length} of ${this.prefab.name} to ${this.container_node.name}`)
    }
}