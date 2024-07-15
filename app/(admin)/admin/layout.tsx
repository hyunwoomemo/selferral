import Sidebar from "./sidebar";

export default function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div className="flex-1 flex">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[4] p-0 flex">{children}</div>
      {modal}
    </div>
  );
}