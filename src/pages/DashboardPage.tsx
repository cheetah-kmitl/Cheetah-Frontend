import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { LogoHomeNavigate } from "../components/LogoHomeNavigate";
import { DiskProgressBar } from "../components/DiskProgressBar";
import { Dropdown } from "../components/Dropdown";
import { SignOutButton } from "@clerk/clerk-react";

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <header className="w-full px-10 py-6 flex justify-between items-start">
        <div className="h-full">
          <LogoHomeNavigate />
          <DiskProgressBar
            totalGB={10}
            used={5}
          />
        </div>
        <SearchBar
          onType={(query) => setSearchQuery(query)}
        />
        <SignOutButton
          redirectUrl="/auth"
        />
      </header>

      <main className="flex items-center w-4/5">
        <div className="flex bg-slate-300">
          <Dropdown
            title="Sort by"
            options={[]}
            onSelect={(option) => console.log(option)}
          />
          <Dropdown
            title="Order by"
            options={[]}
            onSelect={(option) => console.log(option)}
          />
        </div>
      </main>
    </>
  );
}
