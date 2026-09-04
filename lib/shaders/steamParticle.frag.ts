export const steamParticleFragment = `
varying float vAlpha;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vec2 centerUv = vUv - 0.5;
    float dist = length(centerUv);
    
    // Soft circular shape
    float circleAlpha = 1.0 - smoothstep(0.1, 0.5, dist);
    
    // Fresnel-style softening on edges (using normal and viewdir)
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = dot(normal, viewDir);
    fresnel = max(0.0, fresnel);
    fresnel = pow(fresnel, 1.5); // Soften edges
    
    vec3 warmWhite = vec3(1.0, 0.98, 0.95);
    vec3 amber = vec3(0.85, 0.61, 0.35);
    
    // Mix color based on distance from center for a glowing effect
    vec3 color = mix(amber, warmWhite, circleAlpha);
    
    float finalAlpha = circleAlpha * fresnel * vAlpha;
    finalAlpha = clamp(finalAlpha, 0.0, 1.0);
    
    // Premultiplied alpha for additive-style blending look
    gl_FragColor = vec4(color * finalAlpha, finalAlpha);
}
`;
