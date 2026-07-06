// @ts-ignore
import logoUrl from "../../assets/zopiqnow.png";
import { ReactNode } from "react";

interface ZopiqLogoProps {
  className?: string;
  showText?: boolean;
  textColorClass?: string;
  height?: number | string;
}

export default function ZopiqLogo({
  className = "",
  textColorClass = "text-[#111111]",
  height = "3rem",
}: ZopiqLogoProps): ReactNode {
  const isDark = textColorClass === "text-white";

  return (
    <div className={`flex items-center ${className}`} style={{ height }}>
      <img
        src={logoUrl}
        alt="ZOPIQ Logo"
        className={`h-full w-auto object-contain rounded-[15px] ${
          isDark ? "bg-white p-1.5 shadow-md" : ""
        }`}
      />
    </div>
  );
}

