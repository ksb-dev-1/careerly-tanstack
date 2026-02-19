// External libraries
import { Metadata } from "next";

// Internal absolute imports (@/)
import { SelectUserRole } from "./select-user-role";

// Page metadata
export const metadata: Metadata = {
  title: "Select your role - Careerly",
};

// Select role page component
export default async function SelectRolePage() {
  return <SelectUserRole />;
}
