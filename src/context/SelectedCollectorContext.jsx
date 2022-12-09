import { useState, createContext } from "react";

export const SelectedCollectorContext = createContext()

const SelectedCollectorProvider = ({children}) => {
    const [selectedIds, setSelectedIds] = useState([])

    function updateSelectedIds(prevId, newId) {
        const filterIds = selectedIds.filter(id => id !== prevId)
        setSelectedIds([...filterIds, newId])
        
    }

    return (
        <SelectedCollectorContext.Provider value={{selectedIds, updateSelectedIds}}>
            {children}
        </SelectedCollectorContext.Provider>
    )
}

export default SelectedCollectorProvider