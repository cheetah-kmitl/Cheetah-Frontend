interface DropDownProps {
  title: string,
  options: string[]
  onSelect: (option: string) => void 
};

export const Dropdown = ({ title, options, onSelect }: DropDownProps) => {
  return (
    <select defaultValue={title} onChange={(e) => onSelect(e.target.value)}>
      <option value={title} disabled>
        { title }
      </option>
      { options.map((option) => 
        <option value={option}>
          { option }
        </option>
      )}
    </select>
  );
}
