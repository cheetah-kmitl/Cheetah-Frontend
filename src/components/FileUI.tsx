import { GoFile as FileIcon } from "react-icons/go";
import { MdOutlineFileDownload as DownloadIcon } from "react-icons/md";
import { FaRegTrashAlt as TrashIcon } from "react-icons/fa";
import { RxDotsVertical as ThreeDotsIcon } from "react-icons/rx";

import { File } from "../ts/type"
import { useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { addCommas } from "../ts/utils";
import axios from "axios";

interface FileUIProps {
  file: File
}

const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

export const FileUI = ({ file }: FileUIProps) => {
  const [contextMenuX, setContextMenuX] = useState<number>(0);
  const [contextMenuY, setContextMenuY] = useState<number>(0);

  const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false);

  function openContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    setContextMenuX(e.clientX);
    setContextMenuY(e.clientY);
    setIsOpenContextMenu(true);
  };

  async function deleteFile() {
    try {
      setIsOpenContextMenu(false);
      await axios.delete(`${apiServerURL}/api/file/${file._id}`, { withCredentials: true });
      window.location.reload();
    }
    catch (err) {
      console.error(err);
    }
  };

  function downloadFile() {
    setIsOpenContextMenu(false);
    window.open(`${file.public_url}?download=1`);
  };

  function openFile(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    window.open(file.public_url, "_blank");
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <FileIcon
        onClick={openFile}
        onContextMenu={openContextMenu}
        size={128}
        className="transition-all hover:scale-105 cursor-pointer"
      />
      <div className="flex gap-1 items-center">
        <h1 className="ml-2 text-center truncate max-w-28">
          { file.info.filename }
        </h1>
        <ThreeDotsIcon
          onClick={openContextMenu}
          className="cursor-pointer"
        />
      </div>

      { isOpenContextMenu &&
        <ContextMenu
          x={contextMenuX}
          y={contextMenuY}
          onClose={() => setIsOpenContextMenu(false)}
        >
          <div className="flex flex-col gap-2 bg-white p-3 rounded-sm drop-shadow-lg">
            <div className="max-w-48 pb-2 border-b text-sm">
              <h2>
                <span className="font-bold text-base">Size:</span> { addCommas(file.info.size) } KB
              </h2>
              <h2>
                <span className="font-bold text-base">Upload:</span> { new Date(file.info.upload_at).toLocaleDateString() }
              </h2>
            </div>
            
            <div
              onClick={downloadFile}
              className="flex gap-2 items-center px-2 py-1 cursor-pointer hover:bg-zinc-100 rounded-md"
            >
              <DownloadIcon size={18} />
              <h1>Download</h1>
            </div>
            
            <div
              onClick={deleteFile}
              className="flex gap-2 items-center px-2 py-1 text-red-500 font-bold cursor-pointer rounded-md hover:bg-red-100"
            >
              <TrashIcon color="red" />
              <h1>
                Delete
              </h1>
            </div>
          </div>
        </ContextMenu>
      }
    </div>
  );
}
