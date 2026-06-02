#include ../noises/perlin_3D.glsl
varying vec3 vPosition;
uniform float uTime;
uniform sampler2D uPalette;
varying vec2 vUv;


uniform float uCoordPaletteX;
uniform float uCoordPaletteY;

void main() {


    // float xCoord =  uCoordPaletteX; 
    // float yCoord =  uCoordPaletteY;

    // vec4 paletteColor = texture2D(uPalette, vec2(xCoord, yCoord));
    vec4 color = vec4(0.39, 0.51, 0.61, 1.0); // Couleur de base du tower
    gl_FragColor = color;

//     vPosition.y += 1.0; // Décalage pour que le fog commence un peu au-dessus du sol


//     vec3 color = vec3(0.2, 0.4, 0.6);


//     float heightFog = smoothstep(0.0, 2.0, vPosition.y + 1.0);


//      float fogNoise = cnoise(vPosition * 1.0 + uTime * 0.1);
//      float fog = mix(0.3, 1.0, heightFog);
//     float blackBottom = smoothstep(0.0, -1.0, vPosition.y);
//   blackBottom *= 0.8*fogNoise+1.0 ; 
//   color *= (1.0-blackBottom);
  
//   gl_FragColor = vec4(color, 1.0);


}




// permettre d'ajouter un fog avec un noise en bas de ma tour 

  // vec3 color = vec3(0.2, 0.4, 0.6); // Couleur de base du tower
  
 
  // // float heightFog = smoothstep(0.0, 2.0, vPosition.y + 1.0); 

  // float fogNoise = cnoise(vPosition * 1.0 + uTime * 0.1);
  // // float fog = mix(0.3, 1.0, heightFog) ;
  
  // // color *= fog;
  
  // // // Noir en bas
  // float blackBottom = smoothstep(0.0, -1.0, vPosition.y);
  // blackBottom *= 0.8*fogNoise+1.0 ; 
  // color *= (1.0-blackBottom);
  
  // gl_FragColor = vec4(color, 1.0);