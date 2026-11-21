import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AFRICA_COUNTRY_PATHS } from '../data/africaPaths';

interface DestinationNode {
  id: string;
  countryId: string;
  name: string;
  city: string;
  x: number;
  y: number;
  product: string;
  metric: string;
  description: string;
}

export const AfricaMotionMap: React.FC = () => {
  // Origin hub: Nigeria (Lagos HQ) in continental SVG coordinate space
  const origin = useMemo(() => ({
    name: 'Nigeria',
    countryId: 'Nigeria',
    city: 'Lagos (HQ)',
    x: 3750,
    y: 5250,
    label: 'Neotro Core Engine'
  }), []);

  // Destination cities we aim to reach across Africa
  const destinations: DestinationNode[] = useMemo(() => [
    {
      id: 'ghana',
      countryId: 'Ghana',
      name: 'Ghana',
      city: 'Accra',
      x: 2850,
      y: 5250,
      product: 'Neotro School ERP',
      metric: 'Target City',
      description: 'Result verification & automated GPA engine'
    },
    {
      id: 'kenya',
      countryId: 'Kenya',
      name: 'Kenya',
      city: 'Nairobi',
      x: 8750,
      y: 6100,
      product: 'Digital Exam Hub',
      metric: 'Target City',
      description: 'Institutional assessment & multi-school analytics'
    },
    {
      id: 'rwanda',
      countryId: 'Rwanda',
      name: 'Rwanda',
      city: 'Kigali',
      x: 7640,
      y: 6445,
      product: 'Campus Biometrics',
      metric: 'Target City',
      description: 'Automated facial & RFID attendance sync'
    },
    {
      id: 'south-africa',
      countryId: 'South Africa',
      name: 'South Africa',
      city: 'Johannesburg',
      x: 7100,
      y: 9950,
      product: 'Neoppe QS Takeoff',
      metric: 'Target City',
      description: 'Quantity surveying bill generation & audit parity'
    },
    {
      id: 'egypt',
      countryId: 'Egypt',
      name: 'Egypt',
      city: 'Cairo',
      x: 7650,
      y: 1650,
      product: 'Enterprise Portals',
      metric: 'Target City',
      description: 'Zero-latency administrative command dashboards'
    },
    {
      id: 'senegal',
      countryId: 'Senegal',
      name: 'Senegal',
      city: 'Dakar',
      x: 650,
      y: 3680,
      product: 'Cloud Infrastructure',
      metric: 'Target City',
      description: 'High-availability localized failover cluster'
    }
  ], []);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 1 during flight
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check user motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Compute curved trajectory (Quadratic Bezier arc) between Nigeria and active destination
  const activeDest = destinations[activeIdx];
  const arcControlPoint = useMemo(() => {
    const dx = activeDest.x - origin.x;
    const dy = activeDest.y - origin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Arc curvature perpendicular to the direct vector
    const curvature = Math.min(dist * 0.24, 750);
    // Normal vector
    const normalX = -dy / dist;
    const normalY = dx / dist;
    
    // Choose elevation side for aesthetic harmony over the continent
    const sign = activeDest.y > origin.y ? (activeDest.x < origin.x ? 1 : -1) : -1;

    return {
      x: (origin.x + activeDest.x) / 2 + normalX * curvature * sign,
      y: (origin.y + activeDest.y) / 2 + normalY * curvature * sign
    };
  }, [origin, activeDest]);

  // Current position of the moving packet along the curve
  const packetPos = useMemo(() => {
    const t = Math.min(Math.max(progress, 0), 1);
    const oneMinusT = 1 - t;
    const x = oneMinusT * oneMinusT * origin.x + 2 * oneMinusT * t * arcControlPoint.x + t * t * activeDest.x;
    const y = oneMinusT * oneMinusT * origin.y + 2 * oneMinusT * t * arcControlPoint.y + t * t * activeDest.y;
    return { x, y };
  }, [progress, origin, arcControlPoint, activeDest]);

  // Tail particle 1
  const tail1Pos = useMemo(() => {
    const t = Math.max(progress - 0.04, 0);
    const oneMinusT = 1 - t;
    return {
      x: oneMinusT * oneMinusT * origin.x + 2 * oneMinusT * t * arcControlPoint.x + t * t * activeDest.x,
      y: oneMinusT * oneMinusT * origin.y + 2 * oneMinusT * t * arcControlPoint.y + t * t * activeDest.y
    };
  }, [progress, origin, arcControlPoint, activeDest]);

  // Tail particle 2
  const tail2Pos = useMemo(() => {
    const t = Math.max(progress - 0.08, 0);
    const oneMinusT = 1 - t;
    return {
      x: oneMinusT * oneMinusT * origin.x + 2 * oneMinusT * t * arcControlPoint.x + t * t * activeDest.x,
      y: oneMinusT * oneMinusT * origin.y + 2 * oneMinusT * t * arcControlPoint.y + t * t * activeDest.y
    };
  }, [progress, origin, arcControlPoint, activeDest]);

  // Animation Loop: One country at a time
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const FLIGHT_DURATION = 1400; // ms for packet to travel from Nigeria to destination
    const DWELL_DURATION = 1800;  // ms destination card is highlighted before moving to next country
    const TOTAL_CYCLE = FLIGHT_DURATION + DWELL_DURATION;

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      if (elapsed < FLIGHT_DURATION) {
        // In flight: smooth easeInOut cubic progression
        const rawT = elapsed / FLIGHT_DURATION;
        const easedT = rawT < 0.5 
          ? 4 * rawT * rawT * rawT 
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
        setProgress(easedT);
      } else if (elapsed < TOTAL_CYCLE) {
        // Arrived at destination: dwell at 1
        setProgress(1);
      } else {
        // Move to next country in sequence
        if (!isHovered) {
          setActiveIdx((prev) => (prev + 1) % destinations.length);
        }
        startTimeRef.current = now;
        setProgress(0);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [destinations.length, isHovered, prefersReducedMotion, activeIdx]);

  return (
    <div 
      className="relative w-full max-w-[580px] mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Bar: Status Indicator */}
      <div className="flex items-center justify-between pb-1.5 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold tracking-wider uppercase text-[#093824] font-mono">
            Pan-African Expansion Vision
          </span>
        </div>
      </div>

      {/* Map & Motion Canvas Viewport (Unboxed: Sits Directly On Background with Crisp Country Lines) */}
      <div className="relative w-full aspect-[8200/10800] sm:aspect-square flex items-center justify-center">
        
        {/* Interactive SVG: Vector African Country Lines + Live Motion Routes */}
        <svg 
          viewBox="400 600 8200 10800" 
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Radial glow for moving data packet */}
            <radialGradient id="packetCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#34D399" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>

            {/* Gradient for active flight route */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.5" />
            </linearGradient>

            {/* Soft Drop Shadow Filter for nodes */}
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor="#093824" floodOpacity="0.3" />
            </filter>

            {/* Subtle text outline filter for legibility */}
            <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#FFFFFF" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* LAYER 1: Vector African Country Boundary Lines */}
          <g id="african-country-borders">
            {AFRICA_COUNTRY_PATHS.map((item) => {
              const isOrigin = item.id === 'Nigeria';
              const isDestination = destinations.some(d => d.countryId === item.id);
              const isCurrentActive = activeDest.countryId === item.id;

              return (
                <path
                  key={item.id}
                  id={item.id}
                  d={item.d}
                  onClick={() => {
                    const foundIdx = destinations.findIndex(d => d.countryId === item.id);
                    if (foundIdx !== -1) {
                      setActiveIdx(foundIdx);
                      setProgress(0);
                      startTimeRef.current = null;
                    }
                  }}
                  className={`transition-colors duration-300 ${
                    (item.isLake || item.id.startsWith('Lake'))
                      ? 'fill-[#D1FAE5]/60 stroke-[#059669]/50 stroke-[14]'
                      : isOrigin
                      ? 'fill-[#DCFCE7] stroke-[#047857] stroke-[28]'
                      : isCurrentActive
                      ? 'fill-[#BBF7D0]/70 stroke-[#059669] stroke-[28]'
                      : isDestination
                      ? 'fill-[#E8F5EE] hover:fill-[#DCFCE7] stroke-[#059669]/80 stroke-[20] cursor-pointer'
                      : 'fill-white/85 hover:fill-[#EBF4EF] stroke-[#059669]/65 hover:stroke-[#059669] stroke-[16] transition-all'
                  }`}
                />
              );
            })}
          </g>

          {/* LAYER 2: Static Background Route Lines (Faint Guide Tracks) */}
          {destinations.map((dest) => {
            const isCurrent = dest.id === activeDest.id;
            if (isCurrent) return null; // Rendered dynamically below
            return (
              <path
                key={`track-${dest.id}`}
                d={`M ${origin.x} ${origin.y} Q ${(origin.x + dest.x) / 2} ${(origin.y + dest.y) / 2 - 250} ${dest.x} ${dest.y}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="18"
                strokeDasharray="40 60"
                strokeOpacity="0.35"
              />
            );
          })}

          {/* Active Flight Route Arc (Nigeria -> Active Destination) */}
          <path
            d={`M ${origin.x} ${origin.y} Q ${arcControlPoint.x} ${arcControlPoint.y} ${activeDest.x} ${activeDest.y}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="30"
            strokeDasharray="60 40"
          />

          {/* Dynamic illuminated trail along the active route up to packetPos */}
          <path
            d={`M ${origin.x} ${origin.y} Q ${origin.x + (arcControlPoint.x - origin.x) * progress} ${origin.y + (arcControlPoint.y - origin.y) * progress} ${packetPos.x} ${packetPos.y}`}
            fill="none"
            stroke="#047857"
            strokeWidth="42"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />

          {/* In-Flight Moving Item / Data Packet with Particle Trail */}
          {progress < 0.98 && (
            <g>
              {/* Secondary particle tail 2 */}
              <circle
                cx={tail2Pos.x}
                cy={tail2Pos.y}
                r="35"
                fill="#6EE7B7"
                opacity="0.45"
              />
              {/* Secondary particle tail 1 */}
              <circle
                cx={tail1Pos.x}
                cy={tail1Pos.y}
                r="55"
                fill="#34D399"
                opacity="0.75"
              />
              {/* Main radiant packet orb */}
              <circle
                cx={packetPos.x}
                cy={packetPos.y}
                r="160"
                fill="url(#packetCoreGlow)"
              />
              <circle
                cx={packetPos.x}
                cy={packetPos.y}
                r="75"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="24"
                filter="url(#nodeShadow)"
              />
            </g>
          )}

          {/* Origin Node: NIGERIA (Lagos/Abuja Hub) */}
          <g className="cursor-pointer" filter="url(#nodeShadow)">
            {/* Radar pulse ripples */}
            <circle cx={origin.x} cy={origin.y} r="180" fill="none" stroke="#10B981" strokeWidth="20" opacity="0.6">
              <animate attributeName="r" values="90;360" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={origin.x} cy={origin.y} r="130" fill="#093824" stroke="#BBF7D0" strokeWidth="28" />
            <circle cx={origin.x} cy={origin.y} r="50" fill="#10B981" />
            
            {/* Permanent Label Pin for Nigeria HQ */}
            <g transform={`translate(${origin.x - 700}, ${origin.y + 180})`}>
              <rect width="1400" height="240" rx="60" fill="#093824" fillOpacity="0.95" stroke="#34D399" strokeWidth="12" />
              <text x="700" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="125" fontWeight="bold" fontFamily="sans-serif">
                ★ LAGOS, NG (HQ)
              </text>
            </g>
          </g>

          {/* Destination Country Nodes */}
          {destinations.map((dest, idx) => {
            const isCurrent = idx === activeIdx;
            const hasArrived = isCurrent && progress >= 0.98;

            return (
              <g 
                key={dest.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setProgress(0);
                  startTimeRef.current = null;
                }}
                className="cursor-pointer group"
              >
                {/* Arrival Ripple Wave when packet arrives */}
                {hasArrived && (
                  <circle cx={dest.x} cy={dest.y} r="180" fill="none" stroke="#059669" strokeWidth="26">
                    <animate attributeName="r" values="90;380" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Destination Marker */}
                <circle
                  cx={dest.x}
                  cy={dest.y}
                  r={isCurrent ? "110" : "80"}
                  fill={isCurrent ? "#059669" : "#FFFFFF"}
                  stroke={isCurrent ? "#BBF7D0" : "#093824"}
                  strokeWidth={isCurrent ? "32" : "22"}
                  className="transition-all duration-300"
                  filter="url(#nodeShadow)"
                />
                <circle
                  cx={dest.x}
                  cy={dest.y}
                  r={isCurrent ? "50" : "30"}
                  fill={isCurrent ? "#FFFFFF" : "#10B981"}
                />

                {/* City & Country Label */}
                <text
                  x={dest.x + (dest.x > 6000 ? -150 : 150)}
                  y={dest.y - 140}
                  textAnchor={dest.x > 6000 ? "end" : "start"}
                  fill={isCurrent ? "#093824" : "#1F2937"}
                  fontSize={isCurrent ? "160" : "135"}
                  fontWeight={isCurrent ? "900" : "700"}
                  fontFamily="sans-serif"
                  filter="url(#textGlow)"
                  className="transition-colors duration-200"
                >
                  {dest.city}
                </text>
              </g>
            );
          })}
        </svg>

      </div>

    </div>
  );
};
