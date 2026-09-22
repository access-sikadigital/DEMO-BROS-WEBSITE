import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", light }: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`font-heading mt-5 text-3xl text-balance sm:text-4xl lg:text-5xl ${
          light ? "text-light-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-6 text-lg leading-relaxed pr-4 ${light ? "text-light-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
