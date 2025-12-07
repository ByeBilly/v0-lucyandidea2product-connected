"use client";

interface LetterStripProps {
  files: string[];
  height?: number;
  gap?: number;
}

export default function LetterStrip({
  files,
  height = 110,
  gap = 6,
}: LetterStripProps) {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ gap: `${gap}px` }}
    >
      {files.map((file, index) => (
        <video
          key={index}
          src={`/letters/${file}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="max-sm:h-[70px]"
          style={{ height: `${height}px`, width: "auto" }}
        />
      ))}
    </div>
  );
}





