import LogoutModal from "@/components/modals/LogoutModal";
import SearchBar from "@/components/search-bar/search-bar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="p-6 w-full flex flex-col gap-10 h-[100vh]">
          <div className="flex justify-end">
            <SearchBar></SearchBar>
          </div>
          <div className="h-[100vh]">{children}</div>
        </div>
      </div>
    </>
  );
}
