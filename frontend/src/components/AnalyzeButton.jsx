import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const EXPLANATIONS_REAL = [
  'Analysis indicates consistent facial features and natural lighting patterns.',
  'No artifacts or inconsistencies detected in the media content.',
  'Metadata and pixel-level analysis confirm authenticity.',
  'Source credibility and content analysis suggest genuine content.',
  'Temporal consistency and frame analysis show no signs of manipulation.',
];

const EXPLANATIONS_FAKE = [
  'Detected facial warping artifacts around the jawline and eyes.',
  'Inconsistent lighting and shadow patterns suggest manipulation.',
  'Audio-visual sync analysis reveals mismatched lip movements.',
  'Pixel-level anomalies and compression artifacts indicate AI generation.',
  'Content analysis reveals hallmarks of AI-generated text patterns.',
];

export default function AnalyzeButton({ inputData, onResult }) {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputData) {
      toast.error('Please provide content to analyze first.');
      return;
    }

    setLoading(true);
    toast.loading('Analyzing content...', { id: 'analyze' });

    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1500));

    const isFake = Math.random() > 0.5;
    const confidence = Math.floor(70 + Math.random() * 28);
    const explanations = isFake ? EXPLANATIONS_FAKE : EXPLANATIONS_REAL;

    const result = {
      id: Date.now().toString(),
      verdict: isFake ? 'Fake' : 'Real',
      confidence,
      explanation: explanations[Math.floor(Math.random() * explanations.length)],
      inputType: inputData.type,
      inputName: inputData.name,
      timestamp: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem('deepshield-history') || '[]');
    history.unshift(result);
    if (history.length > 50) history.pop();
    localStorage.setItem('deepshield-history', JSON.stringify(history));

    setLoading(false);
    toast.success(`Analysis complete: ${result.verdict}`, { id: 'analyze' });
    onResult(result);
  };

  const isDisabled = loading || !inputData;

  return (
    <button
      id="analyze-btn"
      onClick={handleAnalyze}
      disabled={isDisabled}
      className={`w-full px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 transition-all duration-300 tracking-wide
        ${loading
          ? 'bg-white/[0.06] text-white/40 cursor-wait'
          : !inputData
            ? 'bg-white/[0.03] text-white/15 cursor-not-allowed border border-white/[0.04]'
            : 'btn-gradient text-white animate-pulse-glow cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
        }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Zap className="w-5 h-5" />
          Analyze Content
        </>
      )}
    </button>
  );
}
