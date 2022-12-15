import { useContext } from "react";
import { SelectedCollectorContext } from "../context/SelectedCollectorContext";

export function useSelectedCollectorId() {
    return useContext(SelectedCollectorContext)
}