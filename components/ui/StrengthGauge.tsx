export interface StrengthGaugeProps {
  score: number;
}

export function StrengthGauge({ score }: StrengthGaugeProps) {
  // Score displayed in JetBrains Mono
  // Color interpolates based on score:
  //   0–39: --score-weak (red)
  //   40–69: --score-moderate (amber)
  //   70–100: --score-strong (emerald)
  const scoreColorClass = score < 40 ? "text-score-weak" : score < 70 ? "text-score-moderate" : "text-score-strong";
  const ringColor = score < 40 ? "#F43F5E" : score < 70 ? "#F59E0B" : "#10B981";

  // SVG calculations for arc
  const radius = 80;
  const stroke = 12;
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
          className="-rotate-90 transform"
        >
          <circle
            stroke="#1E2235"
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
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score Text */}
        <div className={`absolute text-5xl font-mono font-bold ${scoreColorClass}`}>
          {score}
        </div>

        {/* Pulsing ring visual effect (CSS-only approximation) */}
        <div className={`absolute inset-0 rounded-full border-2 opacity-20 animate-pulse`} 
             style={{ borderColor: ringColor }} 
        />
      </div>

      <div className="mt-4 text-center">
        <div className="text-[10px] font-syne uppercase tracking-wider text-text-tertiary mb-1">
          THESIS STRENGTH
        </div>
        <div className="text-sm text-text-secondary">
          {score >= 70 ? "Strong" : score >= 40 ? "Moderate" : "Weak"}
        </div>
      </div>
    </div>
  );
}
