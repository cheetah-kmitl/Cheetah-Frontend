interface ProgressBarProps {
  total: number,
  used: number
};

export const ProgressBar = ({ total, used }: ProgressBarProps) => {
  // Stick to upper and lower when props value is too high or too low
  used = Math.max(0, used);
  used = Math.min(used, total);

  return (
    <div className="w-28 h-2 bg-zinc-300 rounded-full">
      <div
        style={{ width: `${ used / total * 100 }%` }}
        className="h-full bg-zinc-500 rounded-full transition-all duration-500 ease-in-out"
      />
    </div>
  );
}


