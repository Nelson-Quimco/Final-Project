import LogoutModal from "@/components/modals/LogoutModal";
import SearchBar from "@/components/search-bar/search-bar";
import Sidebar from "@/components/sidebar/Sidebar";
import { LogoutModalProvider } from "@/providers/modalContext";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LogoutModalProvider>
        <div className="flex h-full ">
          <LogoutModal></LogoutModal>
          <Sidebar></Sidebar>
          <div className="w-full flex flex-col gap-10 ">
            <div className="h-screen ml-[15rem] py-10 px-20">{children}</div>
          </div>
        </div>
      </LogoutModalProvider>
    </>
  );
}
