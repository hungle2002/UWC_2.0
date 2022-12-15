import { useContext } from "react";
import { SelectedVehicleContext } from "../context/SelectedVehicleContext";

export function useSelectedVehicleId() {
    return useContext(SelectedVehicleContext)
}