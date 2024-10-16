import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";

interface LoadingAnimationProps {
  size?: number;
};

export const LoadingAnimation = ({ size = 20 }: LoadingAnimationProps) => {
  return (
    <LoadingIcon
      color="black"
      className="animate-easeSpin"
      size={size}
    />
  );
}