import Form from "next/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
function SearchComponent() {
  const query = "hello";
  return (
    <Form
      action={""}
      className="flex items-center justify-center gap-2"
      scroll={false}
    >
      <Input
        type="text"
        defaultValue={query}
        name="query"
        size={20}
        placeholder="search for anything.."
        className="rounded-[50px] md:py-3 border md:inline-block hidden"
      />
      <Button variant={"secondary"} className="rounded-full px-4" size={"icon"}>
        <Search />
      </Button>
    </Form>
  );
}

export default SearchComponent;
