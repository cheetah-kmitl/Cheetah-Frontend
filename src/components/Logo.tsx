import CheetahLogo from "/cheetah-logo.png";

export const Logo = () => {
  return (
    <img
      src={CheetahLogo}
      alt="logo"
      className="cursor-pointer -ml-1"
    />
  );
}
