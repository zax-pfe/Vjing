varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;
uniform float uSpeed;
uniform sampler2D uRevealMask;
uniform float uVolume;
uniform float uKick;



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
    float speed = 0.05; 
float wave = fract(uTime * speed);
wave = 1.0 - wave; 

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

  vec3 color = mix(baseColor, energyColor, glow);
   color *= 3.0 ;
   color *= uVolume;
   color *= uKick;

  gl_FragColor = vec4(color, 1.0);



}