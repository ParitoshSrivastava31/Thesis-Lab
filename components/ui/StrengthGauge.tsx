export interface StrengthGaugeProps {
  score: number;
}

export function StrengthGauge({ score }: StrengthGaugeProps) {
  // Score displayed in JetBrains Mono
  // Color interpolates based on score:
  //   0–39: --score-weak (red)
  //   40–69: --score-moderate (amber)
  //   70–100: --score-strong (emerald)
  const scoreColorClass = score < 40 ? "text-negative" : score < 70 ? "text-warning" : "text-positive";
  const ringColor = score < 40 ? "#FB7185" : score < 70 ? "#FBBF24" : "#34D399";
  const glowColor = score < 40 ? "rgba(251, 113, 133, 0.2)" : score < 70 ? "rgba(251, 191, 36, 0.2)" : "rgba(52, 211, 153, 0.2)";

  // SVG calculations for arc
  const radius = 80;
  const stroke = 14;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 relative">
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        {/* Background Ring */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform drop-shadow-sm"
          style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
        >
          <circle
            stroke="rgba(209, 213, 219, 0.3)" /* softer bg ring */
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={ringColor}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
        </svg>

        {/* Score Text */}
        <div className={`absolute text-5xl font-jetbrains font-light tracking-tighter ${scoreColorClass}`}>
          {score}
        </div>

        {/* Pulsing ring visual effect */}
        <div className="absolute inset-2 rounded-full border border-white/40 shadow-inner bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        <div
          className="absolute inset-[15px] rounded-full border-2 opacity-10 animate-pulse pointer-events-none"
          style={{ borderColor: ringColor }}
        />
      </div>

      <div className="mt-6 text-center">
        <div className="text-[10px] font-syne font-bold uppercase tracking-widest text-text-tertiary mb-1.5">
          THESIS STRENGTH
        </div>
        <div className={`text-sm font-semibold ${scoreColorClass}`}>
          {score >= 70 ? "High Conviction" : score >= 40 ? "Moderate Conviction" : "Low Conviction"}
        </div>
      </div>
    </div>
  );
}

