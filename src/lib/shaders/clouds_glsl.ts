import { Vector2 } from 'three';

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_uv;

mat3 rotate3D(float angle, vec3 axis) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat3(
        oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s,
        oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,         oc * axis.y * axis.z - axis.x * s,
        oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c
    );
}

void main() {
    vec2 r = v_uv;
    float t = u_time;

    vec4 o = vec4(0.0);

    for (float i = 0.0, d, z = 3.0; i < 100.0; i++) {
        vec3 p = z * (vec3(r, 0.5) * 2.0 - r.xyy) / r.y;
        vec3 v = p;

        for (d = 1.0; d < 30.0; d /= 0.7) {
            p += 0.3 * sin(p * rotate3D(d, r.xyy) * d + t) / d;
        }

        z += d = 0.01 + 0.4 * max(d = p.y + p.z * 0.5 + 2.0, -d * 0.1);
        o += 1.2 / d / z;
    }

    o = tanh(o / vec4(9.0, 6.0, 3.0, 1.0) / 200.0);
    gl_FragColor = o;
}
`;

const vertexShader = `
	varying vec2 v_uv;
	
	void main() {
		v_uv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}`;

const uniforms = {
  u_time: { value: 0 },
  u_mouse: { value: new Vector2(0.5, 0.5) },
  u_resolution: { value: new Vector2(1, 1) }
};
export const cloudConfig = {
  uniforms,
  vertexShader,
  fragmentShader
};
