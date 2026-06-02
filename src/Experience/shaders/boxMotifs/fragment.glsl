varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;
uniform float uSpeed;


void main()
{

    float strengthModulo = mod(vPosition.z * 2.0 + uTime * uSpeed , 3.0);
     float strengthStep = step(0.9, strengthModulo);
     strengthStep = 1.0 - strengthStep;
    gl_FragColor = vec4(vec3(strengthStep), 1.0);



    // gl_FragColor = vec4(1.0);
}