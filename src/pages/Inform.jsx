import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { api } from '../data/api';
import './Inform.css'
import avatar from '../assets/avatar.png'
import CloseIcon from '@mui/icons-material/Close';
import { FaTruck, FaRoute, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Inform = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        api.get('/api/allTask?month=12&week=11')
        .then(res => {
            setTasks(res.data)
        })
    }, [])        

    const [message, setMessage] = useState(false);

    return (
        <div className="Inform">
        {/*<h1>BẢNG THÔNG BÁO THÁNG {props.month} TUÀN {props.week}</h1>*/}
        <h2>BẢNG THÔNG BÁO THÁNG 12 TUẦN 1</h2>
            {tasks?.map((route, index) => (
                <Container key={index} className="Route">
                    <div className="Collector">
                        <h5>Tài xế</h5>
                        <img src={avatar} width={50}/>
                        <ul>
                            <li key="name"><span>Tên:</span> {route.collector.name}</li>
                            <li key="id"><span>ID:</span> {route.collector.id}</li>
                            <li><FaTruck size={20}/>: {route.collector.vehicle}</li>
                        </ul>
                    </div>
                    <Row>
                        <h3><FaRoute style={{marginBottom: 5}}/> Route: {route.name}</h3>
                        {
                            route?.mcps?.map((mcp, index) => {
                                console.log(mcp);
                                return(
                                <Container key={index} className="MCP">
                                    <Row style={{paddingBottom: 10}}>
                                        <Col xl={2} style={{fontWeight: 700}}>MCP {mcp.name}</Col>
                                        {mcp?.janiators?.map((janitor, index) => 
                                            <Col key={index} xl={2}>Janitor {index + 1}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Họ tên:</Col>
                                        {mcp?.janiators?.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.name}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>ID:</Col>
                                        {mcp?.janiators?.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.id}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Ca làm:</Col>
                                        {mcp?.janiators?.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.workship}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Ngày làm:</Col>
                                        {mcp?.janiators?.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.workday}</Col>
                                        )}
                                    </Row>
                                </Container>
                            )})
                        }
                    </Row>
                </Container>
            ))}
            <div style={{width: '70%', margin: 'auto', height: 50, paddingBottom: 30}}>
                <button onClick={() => {navigate(`/overview`)}}>
                    Quay về
                </button>
                <button style={{marginRight: 15}} onClick={() => setMessage(true)}>Gửi</button>
            </div>
            {message && 
                <div className="model" style={{background: "rgba(49,49,49,0.8)"}}>
                    <div className='pop-up'>
                        <CloseIcon className="Xbutton" onClick={()=> setMessage(false)} />
                        <h2 style={{fontSize: '150%'}}>Thông báo được gửi thành công! <FaCheckCircle /></h2>
                    </div>
                </div>
            }
        </div>
    )    
}

export default Inform;