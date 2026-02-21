import { Metadata } from "next";

import { SelectUserRole } from "./select-user-role";

export const metadata: Metadata = {
  title: "Select your role - Careerly",
};

export default async function SelectRolePage() {
  return <SelectUserRole />;
}
