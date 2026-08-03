import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { TextReveal } from "./TextReveal";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Единый блок заголовка секции: бровка + пословный reveal + подводка.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <TextReveal
        as="h2"
        text={title}
        className="mt-5 text-balance text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-[3.4rem]"
      />
      {intro && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed text-ash sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
