import React, { useRef, useState } from "react";
import { GoFile as FileIcon } from "react-icons/go";
import { FaTimes as CrossIcon } from "react-icons/fa";
import axios, { AxiosRequestConfig } from "axios";
import { FileUploadResponse } from "../ts/type";
import { addCommas, kilobyte } from "../ts/utils";
import { ProgressBar } from "./ProgressBar";

const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

export const FileDropZone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgresses, setUploadProgresses] = useState({});

  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false); 
  const [isUploading, setIsUploading] = useState<boolean>(false);
 
  const fileInputRef = useRef<HTMLInputElement>(null);

  function dragOverHandle(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDraggingFile(true);
  }

  function dragLeaveHandle(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDraggingFile(false);
  }

  function dropHandle(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setIsDraggingFile(false);
    setFiles([ ...files, ...e.dataTransfer.files ]);
  };

  function fileInputUploadHandle(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();

    setFiles([ ...files, ...Array.from(e.target.files!) ]);
  }

  function removeFileAt(index: number) {
    setFiles(files.filter((_, fileIndex) => fileIndex !== index));
  };

  async function onUpload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setIsUploading(true);

      // Request queue
      const queueResponse = await axios.put(`${apiServerURL}/api/file`, null, { withCredentials: true });

      // Send for req upload file
      const jobID = queueResponse.data.id;
      const storagePath = queueResponse.data.server_url + "/api/file/put?job_id=" + jobID
      const fileRequest = {
        details: files.map((file) => (
          {
            filename: file.name,
            size: kilobyte(file.size)
          }
        ))
      };

      let isReady = false;
      while (!isReady) {
        const queueReadyResponse = await axios.get(storagePath, { withCredentials: true });
        isReady = queueReadyResponse.data.isReady;
        
        if (!isReady) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }

      const fileReqResponse = await axios.post(storagePath, fileRequest, { withCredentials: true });
      
      // Upload file
      const fileReqData: FileUploadResponse = fileReqResponse.data;
      const token = fileReqData.info.token;
      const jobs = fileReqData.info.init_info;
      const jobsID = Object.keys(jobs);

      if (jobsID.length === 0) {
        throw new Error("Jobs not sent");
      }

      const fileUploadRequests = [];

      for (let i = 0; i < jobsID.length; i++) {
        const id = jobsID[i];
        const file = files[i];

        const CHUNK_PER_UPLOAD = 4096 * 1024;  // 4096 kB
        const totalChunks = Math.ceil(file.size / CHUNK_PER_UPLOAD);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
          const config: AxiosRequestConfig = {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-upload-token": token,
              "x-upload-id": id,
              "x-upload-chunk-index": chunkIndex
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
              setUploadProgresses((prevProgress) => ({
                ...prevProgress,
                [i]: progress
              }));
            },
            withCredentials: true
          };
          
          const startChunk = chunkIndex * CHUNK_PER_UPLOAD;
          const endChunk = Math.min((chunkIndex + 1) * CHUNK_PER_UPLOAD, file.size);

          const chunkedFile = file.slice(startChunk, endChunk);          
          const formData = new FormData();
          formData.append("file", chunkedFile);

          fileUploadRequests.push(axios.put(storagePath, formData, config));
        }
      };

      await Promise.all(fileUploadRequests);
      window.location.reload();
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div
        onDragOver={dragOverHandle}
        onDragLeave={dragLeaveHandle}
        onDrop={dropHandle}
        onClick={() => fileInputRef.current?.click()}
        style={{ backgroundColor: `${isDraggingFile ? "rgb(204, 251, 241)" : "transparent"}` }}
        className={`flex flex-col justify-center items-center gap-2 w-full border border-dashed border-zinc-400 p-28 bg-teal hover:cursor-pointer`}
      >
        <FileIcon size={72}/>
        <h1 className="text-center">
          Drop your file or click to upload
        </h1>
      </div>

      <input
        ref={fileInputRef}
        hidden
        multiple
        type="file"
        onChange={fileInputUploadHandle}
      />

      <h1 className="font-semibold text-xl mt-6 mb-2">
        Selected Files
      </h1>
      <section className="p-3 h-64 border overflow-y-auto">
        <ul className="flex flex-col gap-2">
          { files.map((file, index) => 
              <li key={index} className="flex items-center gap-4">
                <FileIcon
                  size={22}
                  className="min-w-6"
                />
                <h1 className="text-sm text-zinc-500 font-bold w-24">
                  { addCommas(kilobyte(file.size)) } KB
                </h1>
                <h1 className="truncate">
                  { file.name }
                </h1>
                <div className="flex gap-4 items-center ml-auto">
                  <ProgressBar
                    used={uploadProgresses[index as keyof typeof uploadProgresses] || 0}
                    total={100}
                  />
                  <CrossIcon
                    size={16}
                    color="red"
                    onClick={() => removeFileAt(index)}
                    className="cursor-pointer"
                  />
                </div>
              </li>
          ) }
        </ul>
      </section>

      <div className="flex justify-end mt-4">
        <button
          disabled={files.length === 0}
          onClick={onUpload}
          className={`px-4 py-2 rounded-md text-white ${files.length === 0 || isUploading ? "bg-zinc-500" : "bg-green-500"}`}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
