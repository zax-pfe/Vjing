

uniform sampler2D tDiffuse;
uniform sampler2D uPalette;
uniform float uOffsetX;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  // vec4 paletteColor = texture2D(uPalette, vec2(vUv.x, 0.5));

  float intensity = dot(color.rgb, vec3(0.299, 0.587, 0.114));

  vec4 paletteColor = texture2D(uPalette, vec2(intensity, 0.5));


  gl_FragColor = paletteColor;

}


//   // float intensity = dot(color.rgb, vec3(0.299, 0.587, 0.114));

// // gl_FragColor = paletteColor;
//   // vec4 paletteColor = texture2D(uPalette, vec2(intensity + uOffsetX, 0.5));

//   // //  color *= vec4(1.0, 0.5, 0.5, 1.0);
//   // gl_FragColor = paletteColor;