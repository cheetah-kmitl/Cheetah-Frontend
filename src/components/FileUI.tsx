import { GoFile as FileIcon } from "react-icons/go";
import { File } from "../type"

interface FileUIProps {
  file: File
}

export const FileUI = ({ file }: FileUIProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <FileIcon size={130} />
      <h1>{ file.name }</h1>
    </div>
  );
}
