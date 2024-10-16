import { File } from "../ts/type";
import { FileUI } from "./FileUI";

interface FilesContainerProps {
  files: File[],
  sortOption: string
  query: string
};

export const FilesContainer = ({ files, query }: FilesContainerProps) => {
  return (
    <div className="animate-fadeIn w-full flex flex-col items-start my-2">
      { files.length === 0 ?
        <i className="w-full text-center">
          Looks like you don't have any file, wanna upload? :DD
        </i> 
        :
        <ul className="w-full grid grid-cols-5 gap-y-6 max-lg:grid-cols-4 max-md:grid-cols-3">
          { files
            .filter((file) => file.info.filename.toLowerCase().includes(query.toLowerCase()))
            .map((file, index) => 
              <li key={index}>
                <FileUI file={file} />
              </li>
          ) }
        </ul>
      }
    </div>
  );
}
