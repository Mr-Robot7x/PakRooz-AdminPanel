import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Category</SelectLabel>
          <SelectItem value="apple">Laptops</SelectItem>
          <SelectItem value="banana">Mobiles</SelectItem>
          <SelectItem value="blueberry">Mans Cousmetics</SelectItem>
          <SelectItem value="grapes">Women Cousmetics</SelectItem>
          <SelectItem value="pineapple">Shoes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
