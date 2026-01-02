
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CraftsmanshipSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-60px", "60px"] : ["-200px", "200px"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1.1, 1] : [1.3, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["40px", "-20px"] : ["120px", "-60px"]
  );

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-32 px-4 md:px-6 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <motion.div
            style={{ y: textY }}
            className="space-y-6 will-change-transform"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-green-900">
                Grown with Care.
                <br />
                Harvested Fresh.
              </h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <p className="text-lg text-green-700 leading-relaxed">
              Our vegetables are grown by trusted local farmers using natural
              farming practices. Every harvest is carefully selected at peak
              freshness to ensure rich taste, nutrition, and quality.
            </p>

            <p className="text-sm text-green-600 tracking-wide py-4">
              From soil preparation to harvest day, every step is handled with
              care — so you receive produce that’s fresh, healthy, and honest.
            </p>
          </motion.div>

          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="
              relative overflow-hidden will-change-transform shadow-xl
              rounded-xl
              aspect-[4/5] md:aspect-4/3
            "
          >
            <img
              src="/vegetables-hero.png"
              alt="Fresh vegetables being harvested"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
