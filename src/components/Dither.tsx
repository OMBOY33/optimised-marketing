import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface DitherProps {
  waveColor?: [number, number, number];
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  colorNum?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
}

function DitherPlane({
  waveColor = [0.5, 0.5, 0.5],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05,
}: DitherProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color: { value: new THREE.Vector3(...waveColor) },
      u_mouseRadius: { value: mouseRadius },
      u_colorNum: { value: colorNum },
      u_amplitude: { value: waveAmplitude },
      u_frequency: { value: waveFrequency },
      u_speed: { value: waveSpeed },
      u_mouseEnabled: { value: enableMouseInteraction ? 1.0 : 0.0 },
    }),
    [waveColor, mouseRadius, colorNum, waveAmplitude, waveFrequency, waveSpeed, enableMouseInteraction]
  );

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec3 u_color;
    uniform float u_mouseRadius;
    uniform float u_colorNum;
    uniform float u_amplitude;
    uniform float u_frequency;
    uniform float u_speed;
    uniform float u_mouseEnabled;

    varying vec2 vUv;

    float dither8x8(vec2 position, float brightness) {
      int x = int(mod(position.x, 8.0));
      int y = int(mod(position.y, 8.0));
      int index = x + y * 8;
      float limit = 0.0;

      if (index == 0) limit = 1.0/65.0;
      if (index == 1) limit = 49.0/65.0;
      if (index == 2) limit = 13.0/65.0;
      if (index == 3) limit = 61.0/65.0;
      if (index == 4) limit = 4.0/65.0;
      if (index == 5) limit = 52.0/65.0;
      if (index == 6) limit = 16.0/65.0;
      if (index == 7) limit = 64.0/65.0;

      if (index == 8) limit = 33.0/65.0;
      if (index == 9) limit = 17.0/65.0;
      if (index == 10) limit = 45.0/65.0;
      if (index == 11) limit = 29.0/65.0;
      if (index == 12) limit = 36.0/65.0;
      if (index == 13) limit = 20.0/65.0;
      if (index == 14) limit = 48.0/65.0;
      if (index == 15) limit = 32.0/65.0;

      if (index == 16) limit = 9.0/65.0;
      if (index == 17) limit = 57.0/65.0;
      if (index == 18) limit = 5.0/65.0;
      if (index == 19) limit = 53.0/65.0;
      if (index == 20) limit = 12.0/65.0;
      if (index == 21) limit = 60.0/65.0;
      if (index == 22) limit = 8.0/65.0;
      if (index == 23) limit = 56.0/65.0;

      if (index == 24) limit = 41.0/65.0;
      if (index == 25) limit = 25.0/65.0;
      if (index == 26) limit = 37.0/65.0;
      if (index == 27) limit = 21.0/65.0;
      if (index == 28) limit = 44.0/65.0;
      if (index == 29) limit = 28.0/65.0;
      if (index == 30) limit = 40.0/65.0;
      if (index == 31) limit = 24.0/65.0;

      if (index == 32) limit = 3.0/65.0;
      if (index == 33) limit = 51.0/65.0;
      if (index == 34) limit = 15.0/65.0;
      if (index == 35) limit = 63.0/65.0;
      if (index == 36) limit = 2.0/65.0;
      if (index == 37) limit = 50.0/65.0;
      if (index == 38) limit = 14.0/65.0;
      if (index == 39) limit = 62.0/65.0;

      if (index == 40) limit = 35.0/65.0;
      if (index == 41) limit = 19.0/65.0;
      if (index == 42) limit = 47.0/65.0;
      if (index == 43) limit = 31.0/65.0;
      if (index == 44) limit = 34.0/65.0;
      if (index == 45) limit = 18.0/65.0;
      if (index == 46) limit = 46.0/65.0;
      if (index == 47) limit = 30.0/65.0;

      if (index == 48) limit = 11.0/65.0;
      if (index == 49) limit = 59.0/65.0;
      if (index == 50) limit = 7.0/65.0;
      if (index == 51) limit = 55.0/65.0;
      if (index == 52) limit = 10.0/65.0;
      if (index == 53) limit = 58.0/65.0;
      if (index == 54) limit = 6.0/65.0;
      if (index == 55) limit = 54.0/65.0;

      if (index == 56) limit = 43.0/65.0;
      if (index == 57) limit = 27.0/65.0;
      if (index == 58) limit = 39.0/65.0;
      if (index == 59) limit = 23.0/65.0;
      if (index == 60) limit = 42.0/65.0;
      if (index == 61) limit = 26.0/65.0;
      if (index == 62) limit = 38.0/65.0;
      if (index == 63) limit = 22.0/65.0;

      return brightness < limit ? 0.0 : 1.0;
    }

    void main() {
      vec2 uv = vUv;

      float wave = sin(uv.x * u_frequency + u_time * u_speed) *
                   cos(uv.y * u_frequency - u_time * u_speed) * u_amplitude;

      float dist = distance(uv, u_mouse);
      float mouseEffect = smoothstep(u_mouseRadius, 0.0, dist) * u_mouseEnabled;

      float brightness = 0.5 + wave + mouseEffect * 0.3;
      brightness = clamp(brightness, 0.0, 1.0);

      vec2 pixelPos = gl_FragCoord.xy;
      float dithered = dither8x8(pixelPos, brightness);

      float quantized = floor(dithered * u_colorNum) / u_colorNum;

      vec3 color = u_color * quantized;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current && !disableAnimation) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  const handlePointerMove = (event: any) => {
    if (enableMouseInteraction) {
      mousePos.current = { x: event.uv.x, y: event.uv.y };
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.u_mouse.value.set(event.uv.x, event.uv.y);
      }
    }
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function Dither(props: DitherProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <DitherPlane {...props} />
      </Canvas>
    </div>
  );
}
