import formatDate from "@/lib/formatDate";
import { Category } from "@/Types/category";
import { CalendarCheckIcon } from "lucide-react";
import Image from "next/image";

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="border-b w-full flex gap-2 items-center p-1 transition-colors hover:bg-secondary cursor-pointer rounded-lg">
      <div className="w-16 h-16 bg-secondary rounded-lg relative overflow-hidden ">
        <Image
          alt={category.name}
          src={category.images[0]}
          fill
          quality={60}
          className="object-cover object-center"
        />
      </div>
      <div className=" w-[90%]">
        <span className="line-clamp-1 font-semibold text-[15px]">
          {category.name}
        </span>
        <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
          {category.description}
        </span>
        <div className="flex text-muted-foreground items-center gap-1 mt-1">
          <CalendarCheckIcon size={15} />{" "}
          <span className="text-[12px]">
            {formatDate(category.createdAt.toString())}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
