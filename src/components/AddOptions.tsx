import { useState } from "react";
import { FaCirclePlus as PlusIcon } from "react-icons/fa6";
import { ActionOption } from "../type";

interface AddOptionsProps {
  options: ActionOption[]
}

export const AddOptions = ({ options }: AddOptionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed right-10 bottom-10">
      { isOpen && 
        <div
          onPointerEnter={() => setIsOpen(true)}
          onPointerLeave={() => setIsOpen(false)}
          className="flex flex-col gap-2 absolute bottom-full right-0 pb-4"
        >
          { options.map(({ name, action }, index) => 
            <button
              key={index}
              onClick={action}
              className="text-xl text-start min-w-44"
            >
              { name }
            </button>
          )}
        </div>
      }
      <PlusIcon
        size={64}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
        className="cursor-pointer hover:scale-110 transition-all"
      />
    </div>
  );
}