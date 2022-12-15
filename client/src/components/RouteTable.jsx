import { useState } from 'react';
import './RouteTable.css'
import { useNavigate } from 'react-router-dom'
import { api } from '../data/api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const RouteTable = ({routes}) => {
    const navigate = useNavigate()
    const [completeRouteIds, setCompleteRouteIds] = useState([])

    function updateCompleteRouteIds(newId) {
        setCompleteRouteIds(prevIds => {return [...prevIds, newId]})
    }

    async function submitRoute(e, route, updateCompleteRouteIds) {

        if(checkCompleted(route) === "Đã hoàn thành") {
            await api.post('/api/route', {
                route_id: route.routeIO,
                collector_id: route.colId,
                vehicle_id: route.vecId,
                month : 12,
                week: 11
            })
            .then(res => {
                updateCompleteRouteIds(route.routeIO)
                console.log(res)
            })
        } else {
            alert("Xin vui lòng hoàn thành các phân công trước khi xác nhận tuyến đường")
        }
    }

    return(
        <table className="route-table">
            <thead>
                <tr>
                    <th>Tuyến đường</th>
                    <th>Tài xế</th>
                    <th>Phương tiện</th>
                    <th>MCP</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {routes?.map((route, i) => {
                    return(
                    <tr key={i}>
                        <td>{route.routeName}</td>
                        <td 
                            className={!isComplete(route.colName) ? 'red' : ''}
                            onClick={() => navigate(`${route.routeIO}/collector`)}
                        >
                            {formatData(route.colName)}
                        </td>
                        <td 
                            className={!isComplete(route.vecName) ? 'red' : ''}
                            onClick={() => navigate(`${route.routeIO}/vehicle`)}
                        >
                            {formatData(route.vecName)}
                        </td>
                        <td 
                            className={!isFull(route.MCP) ? 'red' : ''}
                            onClick={() => navigate(`${route.routeIO}/MCP`)}
                        >
                            {route.MCP}
                        </td>
                        <td>{checkCompleted(route)}</td>
                        <td>
                            {
                                completeRouteIds.includes(route.routeIO) 
                                ?<CheckCircleOutlineIcon className='complete-icon'/>
                                :<button onClick={(e) => {
                                    submitRoute(e, route, updateCompleteRouteIds)
                                }}>
                                    Xác nhận
                                </button>
                            }

                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function isFull(MCP) {
    let [completeMCP, maxMCP] = MCP.split('/')
    return completeMCP === maxMCP
}

function isComplete(data) {
    return data.toLowerCase() !== 'chua phan cong'
}

function formatData(data) {
    if(data.toLowerCase() === 'chua phan cong') return "Chưa phân công"
    return data
}

function checkCompleted({colName, vecName, MCP}) {
    let [completeMCP, maxMCP] = MCP.split('/')
    if(completeMCP === maxMCP && colName.toLowerCase() !== 'chua phan cong' && vecName.toLowerCase() !== 'chua phan cong') {
        return "Đã hoàn thành"
    }
    return "Chưa hoàn thành"
}

export default RouteTable