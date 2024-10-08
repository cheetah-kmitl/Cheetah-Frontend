import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Logo } from "../components/Logo";
import { DiskProgressBar } from "../components/DiskProgressBar";
import { Dropdown } from "../components/Dropdown";

import { AddOptions } from "../components/AddOptions";
import { ActionOption, File } from "../type";
import { useFetch } from "../hooks/useFetch";
import { FileUI } from "../components/FileUI";

const sortByOption  = ["Name", "Date"];
const orderByOption = ["Name", "Type"];

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const filesFetcher = useFetch<File[]>("/data.json", "GET");

  useEffect(() => {
    const fetchFiles = async () => {
      const data = await filesFetcher.fetchData();
      if (data !== null) {
        setFiles(data);
      }
    }
    fetchFiles();

  }, [filesFetcher]);

  const addButtonOptions: ActionOption[] = [
    {
      name: "Upload file",
      action: () => {}
    },
    {
      name: "Upload something",
      action: () => {}
    }
  ];

  return (
    <>
      <header className="w-full px-10 py-6 grid grid-cols-3">
        <div className="h-full w-48 -mt-2">
          <Logo />
          <DiskProgressBar
            used={1}
            totalGB={10}
          />
        </div>
        <SearchBar
          defaultValue={searchQuery}
          className="justify-self-center"
          onType={(query) => {
            setSearchQuery(query);
          }}
        />
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="flex justify-end gap-4 w-3/4 border-b-2 pb-2">
          <Dropdown
            title="Sort by"
            options={sortByOption}
            onSelect={(option) => console.log(option)}
          />
          <Dropdown
            title="Order by"
            options={orderByOption}
            onSelect={(option) => console.log(option)}
          />
        </div>

        <div className="mt-4 w-3/4 h-auto">
          { files.length === 0 ?
            <i>
              Looks like you don't have a file, Add some?
            </i>
            :
            <ul className="grid grid-cols-5 w-full gap-12 p-4">
              { files
                .filter((file) =>
                  file.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((file, index) =>
                  <li key={index}>
                    <FileUI file={file} />
                  </li>
                )
              }
            </ul> 
          }
        </div>
      </main>

      <AddOptions
        options={addButtonOptions}
      />
    </>
  );
}
