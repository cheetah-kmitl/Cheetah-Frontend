interface DiskProgressBarProps {
  totalGB: number,
  used: number
};

export const DiskProgressBar = ({ totalGB, used }: DiskProgressBarProps) => {
  if (used < 0)
    used = 0;
  
  if (used > totalGB)
    used = totalGB;

  console.log((used / 100) * totalGB);

  return (
    <div>
      <div className="flex justify-between text-lg">
        <h1 className="font-bold">
          { used } GB
        </h1>
        <h1>
          { totalGB } GB
        </h1>
      </div>

      {/* Progress bar */}
      <div className="h-4 p-1 bg-zinc-300 rounded-full">
        <div
          style={{ width: `${ used / totalGB * 100 }%` }}
          className="h-full bg-zinc-500 rounded-full"
        />
      </div>
    </div>
  );
}


