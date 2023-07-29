import { atom } from "jotai";

// Atom for filtering
export const cabinsFilterOptionAtom = atom("all");

// Atom for sorting options
export const cabinsSortOptionAtom = atom("name-az");

// using jotai to keep state of the context menu
export const expandedItemIndexAtom = atom(null);

// Atom to store cabins when fetching from API
export const cabinsAtom = atom([]);

// Atom to check if a cabin was deleted
export const cabinDeletedAtom = atom(false);
