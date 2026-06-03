uniform sampler2D uRevealMask;
varying vec2 vUv;
uniform float uTime;

// void main() {

//   vec3 baseColor = vec3(0.0); // Couleur de base (bleu)

//   vec3 redColor = vec3(1.0, 0.8, 0.8); 
//   float intensity = texture2D(uRevealMask, vUv).r;
//   intensity = 1.0 - intensity;



//   float shift = sin(uTime * 1.0)- 0.8;

//     float animatedIntensity = intensity + shift;
//       // float eased = 1.0 - smoothstep(-0.8, 1.0, animatedIntensity);


//   vec3 color = vec3(intensity);

//   if (animatedIntensity >= 0.2 && animatedIntensity <= 0.4) {
//     color = redColor; 
//   } 
  
//   else {
//     color = baseColor; 
//   }

//     gl_FragColor = vec4(color, 1.0);



// }


void main() {

  vec3 baseColor = vec3(0.0);
  vec3 energyColor = vec3(0.94, 0.46, 0.46);

  float mask = texture2D(uRevealMask, vUv).r;
  mask = 1.0 - mask;

  // float wave = sin(uTime *1.0) * 0.4 + 0.5;
  float wave = mod(uTime, 1.0) * 0.8 + 0.2;
  wave = 1.0- wave +0.1;

  float thickness = 0.06;


  

  // energy wave 1
  float energyFront = smoothstep(
    wave - thickness,
    wave + thickness,
    mask
  );
  float energy = energyFront - smoothstep(
    wave,
    wave + thickness,
    mask
  );


  

  float glow = energy * 3.0; 

  // 7. couleur finale (mix propre)
  vec3 color = mix(baseColor, energyColor, glow);
   color *= 2.0;

  gl_FragColor = vec4(color, 1.0);
}