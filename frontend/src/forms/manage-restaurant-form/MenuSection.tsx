import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

export default function MenuSection() {
  const { control } = useFormContext();

  // Use the useFieldArray hook to manage the menuItems field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {/* Map over the fields array to render the MenuItemInput component for each menu item */}
            {fields.map((_, index) => (
              // Add the index prop to the MenuItemInput component to identify the menu item
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      {/* Here append is used to add a new menu item to the menuItems field array */}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
}
