import { Role } from "@/types";
import { ApiTokenType } from "../tokens/RenderApiTokens";

export type UserType = {
  _id: string;
  email: string;
  full_name: string;
  role: Role;
  auth_api_token: string;
  api_tokens: ApiTokenType[];
  created_at: string;
};

// const User = ({
//   _id,
//   email,
//   full_name,
//   role,
//   auth_api_token,
//   api_tokens,
//   created_at,
// }: UserType) => {
//   return <div>User</div>;
// };
// export default User;
