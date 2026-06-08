
#include ../noises/perlin_2D.glsl


uniform sampler2D tDiffuse;
varying vec2 vUv;


uniform float uStrengthRatio;
uniform float uStrength;
uniform float uScale;









void main() {


  
  vec2 displacedUv = vUv + cnoise(vUv*uStrengthRatio*uStrength) * uScale; 
    // vec2 displacedUv = vUv + cnoise(vUv*uStrengthRatio); 

  // float strength = cnoise(vec2(displacedUv* 10.0)); 


  vec4 color = texture2D(tDiffuse, displacedUv);

  // color += strength * 0.1; // Adjust the strength of the noise effect





  gl_FragColor = color;

}




// uniform sampler2D tDiffuse;
// uniform sampler2D uPalette;
// uniform float uOffsetX;
// varying vec2 vUv;

// void main() {
//   vec4 color = texture2D(tDiffuse, vUv);
//   // vec4 paletteColor = texture2D(uPalette, vec2(vUv.x, 0.5));

//   float intensity = dot(color.rgb, vec3(0.299, 0.587, 0.114));

//   vec4 paletteColor = texture2D(uPalette, vec2(intensity, 0.5));


//   gl_FragColor = paletteColor;

// }

