import { useState, createContext } from "react";

export const SelectedVehicleContext = createContext()

const SelectedVehicleProvider = ({children}) => {
    const [selectedIds, setSelectedIds] = useState([])

    function updateSelectedIds(prevId, newId) {
        const filterIds = selectedIds.filter(id => id !== prevId)
        setSelectedIds([...filterIds, newId])
        
    }

    return (
        <SelectedVehicleContext.Provider value={{selectedIds, updateSelectedIds}}>
            {children}
        </SelectedVehicleContext.Provider>
    )
}

export default SelectedVehicleProvider