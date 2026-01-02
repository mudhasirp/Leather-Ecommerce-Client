
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ShopBanner() {
    return (
        <section className="relative w-full bg-background">
            <LampBackground className="min-h-[420px] md:min-h-[520px]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-40 flex flex-col items-center text-center px-6 max-w-3xl mx-auto space-y-5"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/40 bg-background/70 backdrop-blur-sm text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Leather Haven · Fine Leather Goods
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                        className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight bg-gradient-to-r from-[#8a6a4a] via-[#6b4c33] to-[#3a2b1f] bg-clip-text text-transparent"
                    >
                        The Collection
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.26, ease: "easeOut" }}
                        className="text-sm sm:text-base md:text-lg text-foreground/80 font-light max-w-xl mx-auto tracking-wide"
                    >
                        Handcrafted leather pieces built to endure — slow made, timeless, and truly yours.
                    </motion.p>
                </motion.div>
            </LampBackground>
        </section>
    );
}

function LampBackground({ children, className }) {
    return (
        <div
            className={cn(
                "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-none",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

            <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(180,160,130,0.45)_1px,transparent_1px)] bg-size-[34px_34px]" />
            </div>

           
            <motion.div
                initial={{ opacity: 0.4, x: 30, y: -30 }}
                animate={{ opacity: 0.8, x: 10, y: -10 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-[-90px] right-[-60px] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(205,175,120,0.7),transparent_70%)] blur-3xl z-10"
            />

            <motion.div
                initial={{ opacity: 0.35, x: -50, y: 30 }}
                animate={{ opacity: 0.9, x: -15, y: 0 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-[-90px] left-[-50px] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(90,60,50,0.8),transparent_70%)] blur-3xl z-10"
            />

        
            <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">

                <motion.div
                    initial={{ opacity: 0.35, width: "10rem" }}
                    animate={{ opacity: 0.65, width: "22rem" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{
                        backgroundImage:
                            "conic-gradient(from 110deg at center, rgba(201,172,118,0.55), transparent 75%)",
                    }}
                    className="absolute inset-auto right-[52%] h-44 w-[26rem] blur-[2px]"
                />


                <motion.div
                    initial={{ opacity: 0.35, width: "10rem" }}
                    animate={{ opacity: 0.65, width: "22rem" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{
                        backgroundImage:
                            "conic-gradient(from 290deg at center top, transparent 40%, rgba(120,90,70,0.65) 80%)",
                    }}
                    className="absolute inset-auto left-1/2 h-40 w-[22rem]"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 0.85 }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute z-20 w-[260px] h-20 rounded-full bg-primary/35 blur-[60px] -translate-y-10"
                />
            </div>


            
            <div className="relative z-40 flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
}
