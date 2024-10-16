import CheetahLogo from "/cheetah-logo.png";

export const Logo = ({ className }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <img
      src={CheetahLogo}
      alt="logo"
      className={`-ml-1 ${className}`}
    />
  );
}
