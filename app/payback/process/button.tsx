import { IPageObj } from "./page(full)";
import { cn } from "@/lib/utils";

interface IButtonsProps {
  pageObjArray: IPageObj[];
  currentPageNum: number;
  handlePointClick: (pageNum: number) => void;
}

const Buttons = (props: IButtonsProps) => {
  return (
    <>
      {props.pageObjArray.map((item, index) => {
        return (
          <div
            key={item.pageNum}
            className={cn("w-4 h-4  rounded-full cursor-pointer transition-all", props.currentPageNum === item.pageNum ? "bg-black" : "bg-gray-400")}
            onClick={() => {
              props.handlePointClick(item.pageNum);
            }}
          ></div>
        );
      })}
    </>
  );
};

export default Buttons;
