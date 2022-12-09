import SeachBar from '../components/SeachBar'
import WeekSummary from '../components/WeekSummary'
import { useRoutes } from '../hooks/useRoutes'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import RouteTable from '../components/RouteTable'

import './WeekPage.css'

const options = ['Phân loại','Đã hoàn thành', 'Chưa hoàn thành', 'Chưa phân công tài xế', 'Chưa phân công phương tiện']


const WeekPage = () => {
    const navigate = useNavigate()
    const routes = useRoutes()

    function handleRouteSubmit() {
        navigate('inform')
    }

    return(
        <div>
            <WeekSummary />
            <div className='seach-filter'>
                <SeachBar placeHolder={'tìm kiếm theo tuyến đường'}/>
                <Form.Select>   
                    {options.map((option, i) => {
                        return <option key={i} value={option}>{option}</option>
                    })}
                </Form.Select>
            </div>
            <RouteTable routes={routes} />
            <button 
                onClick={() => {handleRouteSubmit()}}
                className='submit' 
                style={{marginTop: "10px"}}>
                Gửi thông báo
            </button>
        </div>
    )
}


export default WeekPage