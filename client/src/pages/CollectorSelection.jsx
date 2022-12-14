import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useRoutes } from '../hooks/useRoutes'
import { useRouteUpdate } from '../hooks/useRouteUpdate';
import { api } from '../data/api';
import { useSelectedCollectorId } from '../hooks/useSelectedCollectorId';
import SearchBar from '../components/SeachBar'
import CollectorTable from '../components/CollectorTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const CollectorSelection = () => {
  const navigate = useNavigate()
  const routes = useRoutes()
  const { route : routeId} = useParams()
  const { selectedIds, updateSelectedIds } = useSelectedCollectorId()
  const [name, setName] = useState('')
  const [collectors, setCollectors] = useState()
  const [selected, setSelected] = useState(-1)
  const updateRoute = useRouteUpdate()

  let filterCollectors = collectors?.filter(collector => {
    return !selectedIds.includes(collector.userID)
  })
  
  if(name!="") {
    filterCollectors = filterCollectors.filter(collector=>collector.userName.toLowerCase().includes(name.toLowerCase()))
  }


  function checkItem(e, i) {
      if(e.target.checked) {
          setSelected(i)
      }
      else{
          setSelected(-1)
      }
  }

  function updateCollector() {
    let selectedCollector = collectors.find(collector => collector.userID === selected)
    // check if this route did contain a selected collector
    // if yes, remove him from selected list to be available for selection
    const currentRoute = routes.find(route => route.routeIO === parseInt(routeId))
    const hasSelected = Object.keys(currentRoute).includes("colId")
    if(hasSelected) {
      const prevSelectedId = currentRoute.colId
      updateSelectedIds(prevSelectedId, selectedCollector.userID)
    } else{
      updateSelectedIds(-1, selectedCollector.userID)
    }
    updateRoute(routeId, {colName: selectedCollector.userName, colId: selectedCollector.userID})
    navigate(-1)
  }

  useEffect(() => {
    const url = '/api/collector?week=11&month=12'
    api.get(url)
    .then(res => {
      setCollectors(res.data)
    })
  }, [])


  return (
    <>
        <ArrowBackIcon className='back-btn'onClick={() => navigate(-1)}/>
        <h1>DANH S??CH C??C T??I X???</h1>

        <SearchBar 
          placeHolder='T??m ki???m t??i x??? theo t??n'
          onSearch={setName}
        />
        <CollectorTable 
          collectors={filterCollectors} 
          selected={selected} 
          checkItem={checkItem} 
        />        <button           
          className='submit' 
          style={{marginTop: "10px"}}
          disabled={selected === -1 ? true : false}
          onClick={()=>{updateCollector()}}
        >
          L??u thay ?????i
        </button>
    </>
  )
}

export default CollectorSelection