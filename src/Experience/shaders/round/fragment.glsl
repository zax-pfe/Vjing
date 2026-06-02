varying vec2 vUv;
uniform float uTime;

void main()
{

      // float strengthModulo = mod(vUv.x * 10.0, 1.0);


  float stepValue = mod(1.0 * uTime * 0.5, 1.0);

  // float strength = distance(vUv, vec2(0.5));
  // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.3);
  float strength = step(0.1, abs(distance(vUv, vec2(0.5)) - stepValue));
  gl_FragColor = vec4(vec3(strength), 1.0);
}