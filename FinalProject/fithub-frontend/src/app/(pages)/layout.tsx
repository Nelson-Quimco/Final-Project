import LogoutModal from "@/components/modals/LogoutModal";
import SearchBar from "@/components/search-bar/search-bar";
import Sidebar from "@/components/sidebar/Sidebar";
import { LogoutModalProvider } from "@/providers/modalContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LogoutModalProvider>
        <div className="flex h-full bg-offWhite">
          <LogoutModal></LogoutModal>
          <Sidebar></Sidebar>
          <div className="bg-offWhite p-8 px-20 w-full flex flex-col gap-10">
            <div className="flex justify-end">
              <SearchBar></SearchBar>
            </div>
            <div className="h-full ml-[15rem]">{children}</div>
          </div>
        </div>
      </LogoutModalProvider>
    </>
  );
}
