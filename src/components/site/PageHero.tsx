import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { optimizeHeroVideo, heroPoster } from "@/lib/hero-video";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  allowAudio?: boolean;
}

export function PageHero({ eyebrow, title, description, image, imageAlt, video, allowAudio }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!videoError) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, videoError, video]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const words = title.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { y: "120%", opacity: 0, rotateZ: 3 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateZ: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border">
      {video && !videoError ? (
        <motion.div className="absolute inset-0 bg-black" style={{ y, opacity }}>
          <motion.video
            ref={videoRef}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster={heroPoster(video, image)}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
            src={optimizeHeroVideo(video)}
            onError={() => setVideoError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </motion.div>
      ) : image ? (
        <motion.div className="absolute inset-0" style={{ y, opacity }}>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={image}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover opacity-30"
            width={1280}
            height={853}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </motion.div>
      ) : null}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-wide relative pt-40 pb-16 lg:pt-56 lg:pb-24"
      >
        <motion.div variants={fadeVariants} className="flex items-center gap-3">
          <span className="h-px w-6 bg-primary/70" />
          <p className="eyebrow !text-primary/90">{eyebrow}</p>
        </motion.div>

        {allowAudio && video && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-32 right-4 lg:top-40 lg:right-12 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white shadow-xl backdrop-blur-md transition-colors hover:bg-black/60 border border-white/10"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            {isMuted && (
              <span className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-20" />
            )}
          </motion.button>
        )}
        <h1 className="font-heading mt-6 max-w-5xl text-4xl leading-[1.1] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem] break-words">
          {words.map((word, i) => (
            <span 
              key={i} 
              className="overflow-hidden inline-block pb-1 lg:pb-2 max-w-full" 
              style={{ marginRight: i === words.length - 1 ? 0 : "0.25em", marginBottom: "-0.2em" }}
            >
              <motion.span variants={wordVariants} className="inline-block origin-bottom-left max-w-full break-all sm:break-normal">
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        {description ? (
          <motion.p variants={fadeVariants} className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            {description}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}
