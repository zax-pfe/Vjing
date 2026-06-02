varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;

void main()
{

    float strengthModulo = mod(vUv.y * 2.0 - uTime * uSpeed , 3.0);

    float strengthStep = step(0.9, strengthModulo);
      strengthStep = 1.0 - strengthStep;

    vec3 colorA = vec3(0.1); // gris foncé
    vec3 colorB = vec3(1.0); // blanc

    vec3 finalColor = mix(colorA, colorB, strengthStep);
    gl_FragColor = vec4(vec3(finalColor), 1.0);
}