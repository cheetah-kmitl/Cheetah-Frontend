import { useState } from "react";
import {
  IoEye    as EyeOpenIcon,
  IoEyeOff as EyeCloseIcon
}
from "react-icons/io5";

interface TextInputProps {
  onType: (text: string) => void
  placeHolder: string,
  isPasswordInput?: boolean,
  watchable?: boolean,
};

export const TextInput = ({ onType, placeHolder, isPasswordInput = false, watchable = false }: TextInputProps) => {
  const [hidingPassword, setHidingPassword] = useState<boolean>(true);

  return (
    <label className="flex items-center w-full h-auto relative">
      <input
        autoComplete="off"
        placeholder={placeHolder}
        onChange={(e) => onType(e.target.value)}
        type={hidingPassword && isPasswordInput ? "password" : "text"}
        className="bg-zinc-200 w-full px-4 py-3 font-semibold rounded-lg"
      />
      { watchable && 
        <div
          onClick={() => setHidingPassword(!hidingPassword)}
          className="absolute right-0 mr-3 cursor-pointer hover:scale-125"
        >
          { hidingPassword ?
            <EyeOpenIcon size={18} />
            :
            <EyeCloseIcon size={18} />
          }
        </div>
      }
    </label>
  )
}
