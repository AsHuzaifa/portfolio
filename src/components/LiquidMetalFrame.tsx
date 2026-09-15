import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface LiquidMetalFrameProps {
  borderWidth?: number;
  borderRadius?: number;
  speed?: number;
  className?: string;
  children?: ReactNode;
}

// Wraps children in an animated chrome/liquid-metal rim: a WebGL shader
// canvas fills the outer box, and the children sit in an inset div on top,
// covering everything except a `borderWidth`-wide ring where the shader
// shows through. Dynamic import keeps the shader lib out of the main
// bundle until this island actually hydrates.
export default function LiquidMetalFrame({
  borderWidth = 1.5,
  borderRadius = 8,
  speed = 0.3,
  className = '',
  children,
}: LiquidMetalFrameProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    let disposed = false;

    import('@paper-design/shaders').then(({ ShaderMount, liquidMetalFragmentShader }) => {
      if (disposed || !shaderRef.current) return;

      mountRef.current = new ShaderMount(
        shaderRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 4,
          u_softness: 0.5,
          u_shiftRed: 0.24,
          u_shiftBlue: 0.1,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 90,
          u_scale: 8,
          u_shape: 1,
          u_offsetX: 0,
          u_offsetY: 0,
          u_originX: 0.5,
          u_originY: 0.5,
          // Colour-burn tint toward the site's terracotta accent instead of
          // the shader's default neutral (rainbow) chromatic shimmer. Blue
          // dispersion also turned down (0.22 -> 0.1) since it was the main
          // source of the cool blue/purple fringe fighting the warm tint.
          u_colorTint: [0.788, 0.29, 0.165, 0.55],
        },
        undefined,
        speed,
      );
    });

    return () => {
      disposed = true;
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={shaderRef} className="absolute inset-0" style={{ borderRadius }} />
      <div
        className="absolute overflow-hidden"
        style={{ inset: borderWidth, borderRadius: Math.max(borderRadius - borderWidth, 0) }}
      >
        {children}
      </div>
    </div>
  );
}
