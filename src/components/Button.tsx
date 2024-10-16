interface ButtonProps {
  children?: string
  onClick?: VoidFunction
  selecting?: boolean
};

export const Button = ({ children, onClick, selecting }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold transition-all duration-100 hover:underline ${selecting && "underline"}`}
    >
      { children }
    </button>
  );
}
