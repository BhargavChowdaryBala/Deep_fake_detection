import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, TrendingUp, FileType, Clock, Lightbulb } from 'lucide-react';

export default function ResultsCard({ result }) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const isFake = result.verdict === 'Fake';

  useEffect(() => {
    setAnimatedConfidence(0);
    const timer = setTimeout(() => setAnimatedConfidence(result.confidence), 100);
    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Analysis <span className="gradient-text">Results</span>
        </h2>
      </div>

      {/* Main Card */}
      <div className="w-full glass-elevated rounded-2xl p-6 sm:p-8 flex flex-col gap-7">
        {/* Verdict — centered */}
        <div className="flex flex-col items-center justify-center gap-3 text-center py-2">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isFake ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
            }`}
          >
            {isFake ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[11px] text-white/30 uppercase tracking-[0.15em] font-medium">Verdict</p>
            <p className={`text-4xl font-black tracking-tight ${isFake ? 'text-red-400' : 'text-green-400'}`}>
              {result.verdict}
            </p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] text-white/40 font-medium">
              <TrendingUp className="w-4 h-4" />
              Confidence Score
            </span>
            <span className={`text-xl font-bold tabular-nums ${isFake ? 'text-red-400' : 'text-green-400'}`}>
              {animatedConfidence}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${isFake ? 'bg-red-400' : 'bg-green-400'}`}
              style={{
                width: `${animatedConfidence}%`,
                transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-white/25 text-[10px] uppercase tracking-[0.15em] font-medium">
              <FileType className="w-3.5 h-3.5" /> Input Type
            </span>
            <span className="text-white/70 font-semibold text-sm capitalize">{result.inputType}</span>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-white/25 text-[10px] uppercase tracking-[0.15em] font-medium">
              <Clock className="w-3.5 h-3.5" /> Analyzed At
            </span>
            <span className="text-white/70 font-semibold text-sm">
              {new Date(result.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col gap-2">
          <span className="flex items-center gap-2 text-neon-blue/70 text-[13px] font-semibold">
            <Lightbulb className="w-4 h-4" /> AI Explanation
          </span>
          <p className="text-white/45 text-sm leading-relaxed font-light">{result.explanation}</p>
        </div>
      </div>
    </div>
  );
}
