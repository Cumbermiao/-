/* 
 * @requires Vector3, Ray3
 */

Sphere = function(center, radius) { this.center = center; this.radius = radius; };

Sphere.prototype = {
    copy : function() { return new Sphere(this.center.copy(), this.radius.copy()); },

    initialize : function() {
        this.sqrRadius = this.radius * this.radius;
    },

    intersect : function(ray) {
        var v = ray.origin.subtract(this.center);// o-c ∆p
        var a0 = v.sqrLength() - this.sqrRadius; // ∆p² - r²
        var DdotV = ray.direction.dot(v); // ∆p*u

        if (DdotV <= 0) {
            var discr = DdotV * DdotV - a0; // (∆p*u)² - (∆p² - r²)
            if (discr >= 0) {
                var result = new IntersectResult();
                result.geometry = this;
                result.distance = -DdotV - Math.sqrt(discr); // 求 t
                result.position = ray.getPoint(result.distance); // 光线与球的交点
                result.normal = result.position.subtract(this.center).normalize(); // 球心到交点的法相向量
                return result;
            }
        }

        return IntersectResult.noHit;
    }
};
