import axios from "axios";
import { useEffect, useState } from "react";

import { File } from "../ts/type";

import { SearchBar } from "../components/SearchBar";
import { Logo } from "../components/Logo";
import { Dropdown } from "../components/Dropdown";
import { FileDropZone } from "../components/FileDropZone";
import { FilesContainer } from "../components/FilesContainer";
import { addCommas } from "../ts/utils";
import { Button } from "../components/Button";
import { LoadingAnimation } from "../components/LoadingAnimation";

const pages = ["Files", "Upload"];
const sortByOption = ["Name", "Size", "Upload Date"]

const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

const dataLimit = 30;

let isHaveDataLeft = true;
let dataPageIndex = 0;

export const DashboardPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filesSize, setFilesSize] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("upload_at");
  const [currentPage, setCurrentPage] = useState<string>("Files");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isFetchError, setIsFetchError] = useState<boolean>(false);

  console.log(isFetching);

  async function fetchFiles() {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${apiServerURL}/api/file?limit=${dataLimit}`,
        { withCredentials: true }
      );
      const files: File[] = response.data.data;

      dataPageIndex++;
      setFiles(files);
    }
    catch {
      setIsFetchError(true);
    }
    finally {
      setIsFetching(false);
    }
  };

  async function scrollBottomHandle(e: React.UIEvent<HTMLElement>) {
    if (!e.currentTarget) return;
    const page = e.currentTarget;
    const isScrollBottom = (page.scrollHeight - page.scrollTop == page.clientHeight);

    if (isScrollBottom && isHaveDataLeft) {
      try {
        setIsFetching(true);

        const dataStart = dataLimit * dataPageIndex;
        const response = await axios.get(
          `${apiServerURL}/api/file?start=${dataStart}limit=${dataLimit}&sortingBy=upload_at&`,
          { withCredentials: true }
        );

        const files: File[] = response.data.data;

        if (files.length === 0) {
          isHaveDataLeft = false;
          return;
        }

        dataPageIndex++;
        setFiles((prevFiles) => [ ...prevFiles, ...files ]);
      }
      catch {
        setIsFetchError(true);
      }
      finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const totalSize = files
    .map((file) => file.info.size)
    .reduce((sum, current) => sum += current, 0); 

    setFilesSize(totalSize);

  }, [files]);

  function getPage(page: string): JSX.Element {
    switch (page) {
      case "Files" :
        return (
          <FilesContainer
            sortOption={sortOption}
            query={searchQuery}
            files={files}
          />
        );

      case "Upload":
        return <FileDropZone />
    }

    return <></>;
  };

  return (
    <section
      onScroll={scrollBottomHandle}
      className="h-screen overflow-y-auto"
    >
      <header className="w-full px-6 py-6 grid grid-cols-3">
        <Logo
          className="h-full w-48 -mt-2"
        />
        { currentPage === "Files" ?
          <SearchBar
            defaultValue={searchQuery}
            className="justify-self-center"
            onType={(query) => setSearchQuery(query)}
          />
          :
          <div/>
        }
        <div className="min-w-44 text-lg justify-self-end text-end font-semibold text-zinc-700">
          Total Used: <span className="font-bold text-lg text-black">{ addCommas(filesSize) }</span> KB
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="flex justify-between w-3/4 border-b-2 pb-2">
          <div className="flex gap-6 text-lg">
            { pages.map((page, index) => 
                <Button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  selecting={currentPage === page}
                >
                  { page }
                </Button>
            )}
          </div>
          { currentPage === "Files" && 
            <Dropdown
              title="Sort by"
              options={sortByOption}
              onSelect={(option) => setSortOption(option)}
            />
          }
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 mb-12 w-3/4 h-auto text-center">
          { isFetching && 
            <LoadingAnimation />
          }
          { isFetchError ?
            <i className="text-red-600">
              Failed to reach server please wait and reload the page to try again.
            </i>
            :
            getPage(currentPage)
          }
        </div>
      </main>
    </section>
  );
}
