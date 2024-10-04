import { HTMLAttributes } from "react";
import { IoMdSearch as SearchIcon } from "react-icons/io";


interface SearchBarProps {
  defaultValue: string
  onType: (query: string) => void
};

export const SearchBar = ({ defaultValue, onType, className }: SearchBarProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div  className={`flex items-center relative h-10 ${className}`}>
      <SearchIcon 
        className="absolute ml-2 size-6 text-zinc-500"
      />
      <input
        defaultValue={defaultValue}
        onChange={(e) => onType(e.target.value)}
        placeholder="Search file or folder"
        className="bg-zinc-200 h-full w-96 text-lg text-center rounded-xl active:border pl-10 pr-4"
      />
    </div>
  );
}
