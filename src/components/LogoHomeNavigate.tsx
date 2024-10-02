import { useNavigate } from "react-router-dom";
import CheetahLogo from "/cheetah-logo.png";

export const LogoHomeNavigate = () => {
  const navigate = useNavigate();
  
  return (
    <img
      src={CheetahLogo}
      alt="logo"
      onClick={() => navigate("/")}
      className="h-24 cursor-pointer"
    />
  );
}
