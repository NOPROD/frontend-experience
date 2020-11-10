precision highp float;
precision highp int;
uniform float time;
attribute vec2 uv2;
varying vec2 Star_Swamp_vUv;
varying vec3 Star_Swamp_vPosition;
varying vec3 Star_Swamp_vNormal;
varying vec3 Parallax_Starfield_vPosition;
varying vec3 Parallax_Starfield_vNormal;
varying vec2 Parallax_Starfield_vUv;
varying vec2 Parallax_Starfield_vUv2;
varying vec3 Cube_Edges_vPosition;
varying vec3 Cube_Edges_vNormal;
varying vec2 Cube_Edges_vUv;
varying vec2 Cube_Edges_vUv2;
vec4 Star_Swamp_main() 
{
        vec4 Star_Swamp_gl_Position = vec4(0.0);
    Star_Swamp_vUv = uv;
    Star_Swamp_vPosition = position;
    Star_Swamp_vNormal = normal;
    Star_Swamp_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    return Star_Swamp_gl_Position *= 1.0;
}
vec4 Parallax_Starfield_main() 
{
        vec4 Parallax_Starfield_gl_Position = vec4(0.0);
    Parallax_Starfield_vNormal = normal;
    Parallax_Starfield_vUv = uv;
    Parallax_Starfield_vUv2 = uv2;
    Parallax_Starfield_vPosition = position;
    Parallax_Starfield_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    return Parallax_Starfield_gl_Position *= 1.0;
}
vec4 Cube_Edges_main() 
{
        vec4 Cube_Edges_gl_Position = vec4(0.0);
    Cube_Edges_vNormal = normal;
    Cube_Edges_vUv = uv;
    Cube_Edges_vUv2 = uv2;
    Cube_Edges_vPosition = position;
    Cube_Edges_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    return Cube_Edges_gl_Position *= 1.0;
}
void main() 
{
    gl_Position = Star_Swamp_main() + Parallax_Starfield_main() + Cube_Edges_main();
}
