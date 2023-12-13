import { getItem } from "@/app/ingredients/actions/getItem";
import { getItems } from "@/app/ingredients/actions/getItems";

export const itemFetcher = async (id: string, type: string) => await getItem(id, type);
export const itemsFetcher = async (type: string) => await getItems(type);
