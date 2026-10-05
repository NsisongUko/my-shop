'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="p-3 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-5 font-semibold text-slate-800 select-none min-w-[3rem] text-center">
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="p-3 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}