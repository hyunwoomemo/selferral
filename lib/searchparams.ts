import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  gender: parseAsString,
  categories: parseAsString,
  type: parseAsString,
  exchange: parseAsString,
  order: parseAsString.withDefault("createtime"),
  orderBy: parseAsString.withDefault("desc"),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
