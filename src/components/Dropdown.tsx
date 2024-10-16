interface DropDownProps {
  title: string,
  options: string[]
  onSelect: (option: string) => void 
};

export const Dropdown = ({ title, options, onSelect }: DropDownProps) => {
  return (
    <div className="flex gap-2 items-center">
      <h1 className="text-xs">
        { title }
      </h1>
      <select
        defaultValue={title}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white border rounded-md px-1"
      >
        { options.map((option, index) => 
          <option
            key={index}
            value={option}
          >
            { option }
          </option>
        )}
      </select>
    </div>
  );
}
