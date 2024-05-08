import { ReadAccess } from "@/types";
import { Loader } from "lucide-react";
import { UseQueryResult } from "react-query";
import ShowImages from "./ShowImages";

const Images = ({
  query: { isLoading, data, error },
  refetch,
  access_type,
}: {
  query: UseQueryResult<any, unknown>;
  refetch: () => void;
  access_type: ReadAccess;
}) => {
  return isLoading ? (
    <Loader className="mr-2 h-4 w-4 animate-spin" />
  ) : error ? (
    <>{error}</>
  ) : (
    <ShowImages images={data} refetch={refetch} access_type={access_type} />
  );
};
export default Images;
