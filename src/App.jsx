import { useState } from "react";
import { useEffect } from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

import Parse from "parse/dist/parse.min.js";

import dataMethods from "./data.js";
import { DataTable } from "./components/DataTable.jsx";
import { Filter } from "./components/Filter.jsx";
import { AddDialog } from "./components/AddDialog";

Parse.serverURL = "https://stock.b4a.io";
Parse.initialize(
  "Ree9q8bPMbA4c9rW4zfcQ0vxJyXNDJS16KfNvwDr",
  "wqlg8l2fnyxmFdmhPJYTOTV4rdAxrIl3XnOw2otE"
);

function App() {
  const [searchParams, setSearchParams] = useState({
    title: "",
    size: "",
    color: "",
  });

  const [items, setItems] = useState([]);

  const [buttonDisabled, setButtonDisabled] = useState({
    disabled: false,
    buttonId: null,
  });

  const startLiveQuery = () => {
    var client = new Parse.LiveQueryClient({
      applicationId: "Ree9q8bPMbA4c9rW4zfcQ0vxJyXNDJS16KfNvwDr",
      serverURL: "wss://" + "stock.b4a.io",
      javascriptKey: "wqlg8l2fnyxmFdmhPJYTOTV4rdAxrIl3XnOw2otE",
    });
    client.open();

    var query = new Parse.Query("listItem");
    query.ascending("createdAt").limit(5);
    var itemSubscription = client.subscribe(query);

    itemSubscription.on("update", (obj) => {
      refreshItems();
    });

    itemSubscription.on("create", (obj) => {
      refreshItems();
    });
    itemSubscription.on("delete", (obj) => {
      refreshItems();
    });
  };

  const refreshItems = async () => {
    const listItem = Parse.Object.extend("listItem");
    const query = new Parse.Query(listItem);
    try {
      const results = await query.find();
      setItems(results);
    } catch (error) {
      console.error("Error while fetching items", error);
    }
  };

  useEffect(() => {
    refreshItems();
    startLiveQuery();
  }, []);

  const handleSearchParamsChange = (name, value) => {
    const newSearchParams = { ...searchParams };
    newSearchParams[name] = value;
    setSearchParams(newSearchParams);
  };

  const handleIncrease = (newItem) => {
    editItemAmountOnServer(newItem.id, newItem.get("amount") + 1);
  };

  const handleDecrease = (newItem) => {
    editItemAmountOnServer(newItem.id, newItem.get("amount") - 1);
  };

  const editItemAmountOnServer = async (id, newAmount) => {
    const listItem = Parse.Object.extend("listItem");
    const query = new Parse.Query(listItem);
    setButtonDisabled({ disabled: true, buttonId: id });
    try {
      const object = await query.get(id);
      object.set("amount", newAmount);
      try {
        await object.save();
      } catch (error) {
        console.error("Error while updating item", error);
      }
    } catch (error) {
      console.error("Error while retrieving object item", error);
    }
    setButtonDisabled({ disabled: false, buttonId: id });
  };

  const handleAddItem = async (values) => {
    const newItemList = new Parse.Object("listItem");
    newItemList.set("title", values.title);
    newItemList.set("color", values.color);
    newItemList.set("material", values.material);
    newItemList.set("size", values.size);
    newItemList.set("amount", +values.amount);

    try {
      await newItemList.save();
    } catch (error) {
      console.error("Error while creating item: ", error);
    }
  };

  const handleDeleteItem = async (item) => {
    setButtonDisabled({ disabled: true, buttonId: item.id });
    const query = new Parse.Query("listItem");
    try {
      const object = await query.get(item.id);
      await object.destroy();
    } catch (error) {
      console.log(error);
    }
    setButtonDisabled({ disabled: true, buttonId: item.id });
  };

  return (
    <MantineProvider emotionCache={myCache}>
      <div className="h-screen w-screen flex flex-col items-center">
        <h1 className="font-mono text-3xl pt-4 text-left w-full pl-2 shadow-lg pb-4 bg-white z-10">
          Creation Stock
        </h1>
        <AddDialog onSubmit={handleAddItem} />
        <Filter
          onParamsChange={(name, value) =>
            handleSearchParamsChange(name, value)
          }
        />
        <DataTable
          data={dataMethods.filterItems(items, searchParams)}
          onItemIncrease={handleIncrease}
          onItemDecrease={handleDecrease}
          onItemDelete={handleDeleteItem}
          buttonDisabled={buttonDisabled}
        />
      </div>
    </MantineProvider>
  );
}

export default App;
