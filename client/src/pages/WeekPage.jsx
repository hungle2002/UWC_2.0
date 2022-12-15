import SeachBar from '../components/SeachBar'
import WeekSummary from '../components/WeekSummary'
import { useRoutes } from '../hooks/useRoutes'
import { useState } from 'react'
import RouteTable from '../components/RouteTable'
import { useNavigate } from 'react-router-dom'
import './WeekPage.css'



const WeekPage = () => {
    const navigate = useNavigate()
    const [name,setName]=useState('')
    let routes = useRoutes()
    if(name!=''){
        routes=routes.filter(route=>route.routeName.toLowerCase().includes(name.toLowerCase()))
    }

    
    function handleRouteSubmit(routes) {
        const hasCompleteRoute = routes.some(route => isCompleteRoute(route))
        if(hasCompleteRoute) {
            navigate('inform')
        } else{
            alert('Vui lòng hoàn thành phân công ít nhất một tuyến đường trước khi gửi thông báo')
        }
    }

    return(
        <div>
            <WeekSummary />
            <div className='seach-filter'>
                <SeachBar 
                    placeHolder={'tìm kiếm theo tuyến đường'}
                    onSearch={setName}
                />
            </div>
            <RouteTable routes={routes} />
            <button 
                onClick={() => {handleRouteSubmit(routes)}}
                className='submit' 
                style={{marginTop: "10px"}}
            >
                Gửi thông báo
            </button>
        </div>
    )
}

function isCompleteRoute({colName, vecName, MCP}) {
    const [selectMCP, maxMCP] = MCP.split('/')
    return colName.toLowerCase() !== 'chua phan cong' && vecName.toLowerCase() !== 'chua phan cong' && selectMCP===maxMCP
}


export default WeekPage