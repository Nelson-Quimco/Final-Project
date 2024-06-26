import LogoutModal from "@/components/modals/LogoutModal";
import SearchBar from "@/components/search-bar/search-bar";
import Sidebar from "@/components/sidebar/Sidebar";
import { LogoutModalProvider } from "@/providers/modalContext";
import { ToastContainer } from "react-toastify";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LogoutModalProvider>
        <div className="flex">
          <LogoutModal></LogoutModal>
          <Sidebar></Sidebar>
          <div className="bg-offWhite p-10 px-20 w-full flex flex-col gap-10 h-[100vh]">
            <div className="flex justify-end">
              <SearchBar></SearchBar>
            </div>
            <div className="h-[100vh]">{children}</div>
          </div>
        </div>
      </LogoutModalProvider>
    </>
  );
}
