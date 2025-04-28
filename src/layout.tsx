import { Outlet } from "react-router-dom";
import { Header } from "./componets/Header";
import Sidebar from "./componets/Sidebar";
import { Toaster } from "sonner";

export default function Layout() {
    return (
        <div className="grid grid-cols-[auto_1fr] min-h-[100vh]">
                <Sidebar />
            <main className="flex flex-col overflow-auto h-screen">
                <Header />
                <Outlet/>
                <Toaster position="bottom-right" />
            </main>
        </div>
    )
}