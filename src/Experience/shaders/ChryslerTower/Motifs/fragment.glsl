varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uRevealMask;
uniform float uTime;

void main()
{
vec2 uv = vUv;
uv.y = 1.0 - uv.y;  // ← flip Y
vec4 mask = texture2D(uRevealMask, uv);

float intensity = mask.r;

  vec3 baseColor = vec3(0.0);
  vec3 energyColor = vec3(0.94, 0.46, 0.46);

  intensity = 1.0 - intensity;
intensity *= 0.6;

  // float wave = mod(uTime, 1.0) * 0.8 + 0.2;
  // float wave = sin(uTime *1.0) * 0.4 + 0.5;
  // wave = 1.0- wave +0.1;

      float speed = 0.2; // ajuste la vitesse ici
float wave = abs(fract(uTime * speed) * 2.0 - 1.0);
// float wave = pow(fract(uTime * speed), 1.5); 
wave = 1.0-  wave;

  float thickness = 0.06;

    // energy wave 1
  float energyFront = smoothstep(
    wave - thickness,
    wave + thickness,
    intensity
  );


  float energy = energyFront - smoothstep(
    wave,
    wave + thickness,
    intensity
  );

    float glow = energy * 3.0; 

  // 7. couleur finale (mix propre)
  vec3 color = mix(baseColor, energyColor, glow);
   color *= 4.0;

  gl_FragColor = vec4(color, 1.0);

    
// gl_FragColor = vec4(mask.rgb, 1.0);

}


