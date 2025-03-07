// Type definitions for the frontend application are defined in the frontend/src/types.ts file. The UpdateUserRequest type is defined to represent the data that is sent to the API when updating a user. The User type is defined to represent the data that is returned from the API when creating a user. The User type is used in the useCreateMyUser hook to define the type of the user data that is returned from the API. The UpdateUserRequest type is used in the useUpdateMyUser hook to define the type of the user data that is sent to the API.

export type User = {
   _id: string;
   email: string;
   name: string;
   addressLine1: string;
   city: string;
   country: string;
}