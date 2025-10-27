import { useQuery } from "@tanstack/react-query";
import settingApi from "./api";

export const useGetSetting = () =>
    useQuery({
        queryKey: ["setting", "list"],
        queryFn: settingApi.getSetting,
    });
