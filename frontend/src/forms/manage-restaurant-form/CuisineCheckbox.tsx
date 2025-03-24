import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  // Define the field prop that contains the field value and the onChange function
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

export default function CuisineCheckbox({ cuisine, field }: Props) {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          // Check if the field value includes the cuisine item and set the checked prop accordingly
          checked={field.value.includes(cuisine)}
          // Call the onChange function with the updated value when the checkbox is checked or unchecked
          onCheckedChange={(checked) => {
            if (checked) {
              // Add the cuisine item to the field value if the checkbox is checked and the cuisine item is not already in the field value
              field.onChange([...field.value, cuisine]);
            } else {
              // Remove the cuisine item from the field value if the checkbox is unchecked and the cuisine item is in the field value
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
}
