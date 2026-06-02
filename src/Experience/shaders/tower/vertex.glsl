varying vec3 vPosition;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vPosition = modelPosition.xyz;
    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}


        // varying vec3 vPosition;
        // void main() {
        //   vPosition = position;
        //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        // }