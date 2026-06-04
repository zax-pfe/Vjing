varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uRevealMask;
uniform float uTime;
uniform float uOffSet;

void main()
{

vec2 uv = vUv;
uv.y = 1.0 - uv.y;  // ← flip Y
vec4 mask = texture2D(uRevealMask, uv);
mask *= 0.1;

float intensity = mask.r;

  vec3 baseColor = vec3(0.0);
  vec3 energyColor = vec3(0.94, 0.46, 0.46);

  // intensity = 1.0 - intensity;
intensity *= 6.0;

  // float wave = sin(uTime * 2.0 + uOffSet) * 0.4 + 0.5; // between 0 and 1 map to 0.1 and 0.9
  // float wave = fract(uTime * 1.0) ; 
  float wave = abs(fract(uTime * 0.1 + uOffSet) * 2.0 - 1.0); // between 0 and 1 map to 0.1 and 0.9

  // wave = 0.1;
  wave = 1.0- wave +0.1;



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
   color *= 2.0;

  gl_FragColor = vec4(color, 1.0);


}


