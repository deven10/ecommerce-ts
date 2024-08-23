import { SingleItem } from "./SingleItem";
import items from "../data/items.json";

export const Store = () => {
  return (
    <div>
      <div className="mt-4 mb-4 d-flex flex-wrap gap-3">
        {items.map((item) => (
          <SingleItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
