import { atom } from "jotai";

// Atom for filtering options on cabins
export const cabinsFilterOptionAtom = atom("all");

// Atom for sorting options on cabins
export const cabinsSortOptionAtom = atom("name-az");

// Atom for filtering options on bookings
export const bookingsFilterOptionAtom = atom("all");

// Atom for sorting options on bookings
export const bookingsSortOptionAtom = atom("name-az");

// using jotai to keep state of the context menu
export const expandedItemIndexAtom = atom(null);

// Atom to store cabins when fetching from API
export const cabinsAtom = atom([]);

// Atom to check if a cabin was deleted
export const cabinDeletedAtom = atom(false);
