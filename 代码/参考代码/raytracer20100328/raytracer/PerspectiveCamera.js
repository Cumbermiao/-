/* 
 * @requires Vector3
 */

PerspectiveCamera = function(eye, front, up, fov) { this.eye = eye; this.front = front; this.refUp = up; this.fov = fov; };

PerspectiveCamera.prototype = {
    initialize : function() {
        this.right = this.front.cross(this.refUp);// 使用 z 坐标方向的单位向量 叉乘 y 坐标的单位向量， 算出 x 坐标的单位向量
        this.up = this.right.cross(this.front);
        this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;
    },

    generateRay : function(x, y) {
        var r = this.right.multiply((x - 0.5) * this.fovScale);
        var u = this.up.multiply((y - 0.5) * this.fovScale);
        return new Ray3(this.eye, this.front.add(r).add(u).normalize());
    }
};
