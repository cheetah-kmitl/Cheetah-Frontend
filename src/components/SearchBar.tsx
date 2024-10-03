import { IoMdSearch as SearchIcon } from "react-icons/io";


interface SearchBarProps {
  onType: (query: string) => void
};

export const SearchBar = ({ onType }: SearchBarProps) => {
  return (
    <div className="flex items-center relative h-10">
      <SearchIcon 
        className="absolute ml-2 size-6 text-zinc-500"
      />
      <input
        onChange={(e) => onType(e.target.value)}
        placeholder="Search file or folder"
        className="bg-zinc-200 h-full w-96 text-lg text-center rounded-xl active:border pl-10 pr-4"
      />
    </div>
  );
}
