import { Plus, Share2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import connectMongo from "../../config/db";

//models
import Grocery from "../../models/grocery";

//utils
import { sortItems } from "../../utils/helpers";

//component
import ListItem from "../../components/listItem";
import ShareList from "../../components/shareList";
import AddNewItem from "../../components/addNewItem";

export default async function GroceryListPage({ params }) {
  const { listId } = params;
  await connectMongo();
  const grocery = await Grocery.findOne({ listId });
  const sortedItems = sortItems(grocery.items);

  return (
    <main className="flex h-screen items-center justify-center w-[90%] mx-auto ">
      <div className="border border-gray-300 rounded-md  max-h-[80vh] overflow-y-auto">
        <h1
          className={`text-3xl font-bold text-center sticky top-0 bg-white z-10 px-5 sm:px-10 py-8 ${
            sortedItems?.length > 0 ? "border-b border-gray-300" : ""
          }`}
        >
          My Groceries List
        </h1>
        <div className="py-8 px-5 sm:px-8">
          <AddNewItem listId={listId} sortedItems={sortedItems} />
          {sortedItems.map((item) => (
            <ListItem
              key={item.id}
              itemDetails={item}
              listId={listId}
              items={sortedItems}
            />
          ))}
          <ShareList listId={listId} />
        </div>
      </div>
    </main>
  );
}
