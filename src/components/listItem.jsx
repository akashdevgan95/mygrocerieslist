//utils
import { sortItems } from "../utils/helpers";

//components
import ListItemAction from "./listItemAction";
import AddNewItem from "./addNewItem";

const ListItem = ({ itemDetails, listId, items }) => {
  const { name, id } = itemDetails;

  return (
    <div
      className={`flex items-center justify-between border border-gray-300 py-2 px-4 rounded-md mb-4 ${
        itemDetails.isPurchased ? "bg-gray-100" : ""
      }`}
    >
      <h2
        className={`text-lg font-medium ${
          itemDetails.isPurchased ? "line-through text-gray-500" : ""
        }`}
      >
        {name}
      </h2>
      <ListItemAction
        itemDetails={itemDetails}
        listId={listId}
        items={items}
        id={id}
      />
    </div>
  );
};

export default ListItem;
