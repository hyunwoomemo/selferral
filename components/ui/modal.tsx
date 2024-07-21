const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white dark:bg-[rgb(26,26,38)] min-w-[50%] min-h-[300px] w-full h-full flex flex-col  flex-wrap break-words whitespace-pre-wrap">{children}</div>;
};

export default Modal;
