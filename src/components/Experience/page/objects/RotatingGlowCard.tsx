import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface RotatingGlowCardProps {
    children: React.ReactNode;
    isHovered: boolean;
    borderRadius?: string;
    scale?: number;
    y?: number;
}

export function RotatingGlowCard({
                                     children,
                                     isHovered,
                                     borderRadius = "1rem",
                                     scale = 1,
                                     y = 0
                                 }: RotatingGlowCardProps) {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        if (!isHovered) return;

        let frame: number;
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            setAngle((elapsed / 3) % 360);
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [isHovered]);

    const rad = (angle * Math.PI) / 180;
    const dist = 3;
    const offsetX = Math.cos(rad) * dist;
    const offsetY = Math.sin(rad) * dist;

    const glow = isHovered
        ? `
      ${offsetX}px ${offsetY}px 15px 5px rgba(168, 85, 247, 1),
      ${-offsetX}px ${-offsetY}px 15px 5px rgba(236, 72, 153, 1),
      ${offsetY}px ${-offsetX}px 10px 3px rgba(59, 130, 246, 1),
      0 0 60px rgba(168, 85, 247, 0.3),
      inset 0 0 40px rgba(168, 85, 247, 0.1)
    `
        : `0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(168, 85, 247, 0.05)`;

    return (
        <motion.div
            style={{ borderRadius }}
            animate={{ scale, y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full"
        >
            {/* Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius,
                    boxShadow: glow,
                    transition: isHovered ? "none" : "box-shadow 0.3s ease-in-out"
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
