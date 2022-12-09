import { useState, useEffect} from 'react'
import { api } from '../data/api'
import { useParams, useNavigate } from 'react-router-dom'
import { useRouteUpdate } from '../hooks/useRouteUpdate'
import { useRoutes } from '../hooks/useRoutes'
import { useSelectedVehicleId } from '../hooks/useSelectedVehicleId'
import SearchBar from '../components/SeachBar'
import VehicleTable from '../components/VehicleTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './VehicleSelection.css'

const VehicleSelection = () => {
  const navigate = useNavigate()
  const { route : routeId } = useParams()
  const [vehicles, setVehicles] = useState()
  const [selected, setSelected] = useState(-1)
  const [name, setName ] = useState('')
  const { selectedIds, updateSelectedIds } = useSelectedVehicleId()
  const routes = useRoutes()
  const updateRoute  = useRouteUpdate()

  let filterVehicles = vehicles?.filter(vehicle => {
    return !selectedIds.includes(vehicle.vehicleID)
  })

  if(name!="") {
    filterVehicles = filterVehicles.filter(vehicle=>vehicle.vehicleName.toLowerCase().includes(name.toLowerCase()))
  }


  function checkItem(e, i) {
      if(e.target.checked) {
          setSelected(i)
      }
      else{
          setSelected(-1)
      }
  }

  function updateVehicle() {
    let selectedVehicle = vehicles.find(vehicle => vehicle.vehicleID === selected)
    // check if this route did contain a selected vehicle
    // if yes, remove it from selected list to be available for selection
    const currentRoute = routes.find(route => route.routeIO === parseInt(routeId))
    const hasSelected = Object.keys(currentRoute).includes("vecId")
    if(hasSelected) {
      const prevSelectedId = currentRoute.vecId
      updateSelectedIds(prevSelectedId, selectedVehicle.vehicleID)
    } else{
      updateSelectedIds(-1, selectedVehicle.vehicleID)
    }
    updateRoute(routeId, {vecName: selectedVehicle.vehicleName, vecId: selectedVehicle.vehicleID})
    navigate(-1)
  }

  useEffect(() => {
    const url = '/api/vehicle?week=11&month=12'
    api.get(url)
    .then(res => {
      setVehicles(res.data)
    })
  }, [])
  return (
    <>
        <ArrowBackIcon className='back-btn'onClick={() => navigate(-1)}/>
        <h1>DANH SÁCH PHƯƠNG TIỆN</h1>

        <SearchBar 
          placeHolder='Tìm kiếm phương tiện'
          onSearch={setName}
        />
        <VehicleTable 
          vehicles={filterVehicles} 
          selected={selected} 
          checkItem={checkItem}
        />
        <button 
            className='submit' 
            style={{marginTop: "10px"}}
            disabled={selected === -1 ? true : false}
            onClick={() => updateVehicle()}
          >
          Lưu thay đổi
        </button>

    </>
  )
}

export default VehicleSelection