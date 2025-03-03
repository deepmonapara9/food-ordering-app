import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

// Define the schema for the form
const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Define the type of the form data
// infer is used to get the type of the schema
type UserFormData = z.infer<typeof formSchema>;

// Define the initial form data
// This is used to reset the form
type Props = {
  onSave: (userProfileData: UserFormData) => void; // Function to save the form data
  isLoading: boolean; // Flag to show loading state
};

// Define the form component
const UserProfileForm = ({ onSave, isLoading }: Props) => {
  //   Create the form
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema), //Use zod resolver to validate the form
  });

  //   Handle form submit
  return (
    //  Use the Form component to handle form state
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          {/* Show form description */}
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        {/* Use FormField to handle form state for each input for email */}
        <FormField
          control={form.control}
          name="email"
          //  Render the input field
          render={({ field }) => (
            // Use FormItem to handle form state for each input
            <FormItem>
              <FormLabel>Email</FormLabel>
              // Use FormControl to handle form state for each input
              <FormControl>
                // Use Input component to render the input field
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Use FormField to handle form state for each input for name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Use FormField to handle form state for each input for address */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Use FormField to handle form state for each input for city */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Use FormField to handle form state for each input for country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export type UserFormData = z.infer<typeof formSchema>;
