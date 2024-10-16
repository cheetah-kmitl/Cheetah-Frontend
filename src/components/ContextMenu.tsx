import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface ContextMenuProps {
  children: JSX.Element,
  x: number,
  y: number,
  onClose: VoidFunction
}

export const ContextMenu = ({ children, x, y, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside<HTMLDivElement>(menuRef, (e) => {
    e.stopPropagation();
    onClose();
  });
  
  return (
    <div
      ref={menuRef}
      style={{ top: `${y}px`, left: `${x}px` }}
      className="absolute z-20"
    >
      { children }
    </div>
  );
}
