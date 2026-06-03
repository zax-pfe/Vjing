varying vec2 vUv;

void main()
{
    // ...

    vec3 color = vec3(0.0);
    color *= 0.2; // Couleur bleue
    gl_FragColor = vec4(color, 1.0);
    // vUv = uv;
}