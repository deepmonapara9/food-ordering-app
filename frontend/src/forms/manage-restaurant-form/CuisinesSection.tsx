import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cuisineList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";

// Define the CuisinesSection component that contains the form fields for the cuisines section
export default function CuisinesSection() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            {/* Define the CuisineCheckbox component that renders a checkbox for a cuisine item  */}
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage /> 
          </FormItem>
        )}
      />
    </div>
  );
}
