import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { axios } from 'axios';
import { FaTruck, FaRoute, FaCheckCircle } from 'react-icons/fa';

const Inform = (props) => {
    
    const inform = 
    [{
        "name": "TĐ/LT",
        "collector": {
            "name": "John",
            "id": "12345",
            "vehicle": "15T - 01"
        },
        "mcps": [{
                "name": "A",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            },
            {
                "name": "B",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            },
            {
                "name": "C",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            }
        ]
    },
    {
        "name": "TĐ/HBC",
        "collector": {
            "name": "Jack",
            "id": "32815",
            "vehicle": "15T - 01"
        },
        "mcps": [{
                "name": "A",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            },
            {
                "name": "B",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            }
        ]
    },
    {
        "name": "TĐ/LD",
        "collector": {
            "name": "Jane",
            "id": "13242",
            "vehicle": "15T - 01"
        },
        "mcps": [{
                "name": "A",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            },
            {
                "name": "B",
                "janitors": [{
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Sáng"
,                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T7-CN"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    },
                    {
                        "name": "XXX",
                        "id": "00000000",
                        "workship": "Chiều",
                        "workday": "T2-T6"
                    }
                ]
            }
        ]
    }]


    /*const [inform, setInform] = useState([]);

    useEffect = (() => {

        let isMounted = true
        const controller = new AbortController;

        const getInform = async () => {
            try {
                const res = await axios.create ({
                    baseURL: 'http://localhost:3500',
                    headers: {'Content-Type': 'application/json'}
                }).get(
                    `/allTask/${props.month}/${props.week}`,
                    {
                        signal: controller.signal
                    }
                );
                isMounted && setInform(resPhong.data);
            } catch (err) {
                console.error(err);
                <Navigate to="/" state={{ from: location }} replace />
            }
        }

        getInform();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])*/

    const [message, setMessage] = useState(false);

    return (
        <div className="Inform">
        {/*<h1>BẢNG THÔNG BÁO THÁNG {props.month} TUÀN {props.week}</h1>*/}
        <h2>BẢNG THÔNG BÁO THÁNG 1 TUẦN 1</h2>
            {inform.map((route, index) => (
                <Container key={index} fluid className="Route">
                    <div className="Collector">
                        <h5>Collector</h5>
                        <img src='/avatar.png' width={50}/>
                        <ul>
                            <li key="name"><span>Name:</span> {route.collector.name}</li>
                            <li key="id"><span>ID:      </span> {route.collector.id}</li>
                            <p><FaTruck size={35}/> {route.collector.vehicle}</p>
                        </ul>
                    </div>
                    <Row>
                        <h3><FaRoute style={{marginBottom: 5}}/> Route {route.name}</h3>
                        {
                            route.mcps.map((mcp, index) => 
                                <Container key={index} fluid className="MCP">
                                    <Row style={{paddingBottom: 10}}>
                                        <Col xl={2} style={{fontWeight: 700}}>MCP {mcp.name}</Col>
                                        {mcp.janitors.map((janitor, index) => 
                                            <Col key={index} xl={2}>Janitor {index + 1}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Họ tên:</Col>
                                        {mcp.janitors.map((janitor, index) => 
                                            <Col key={index} xl={2}>{(janitor, index).name}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>ID:</Col>
                                        {mcp.janitors.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.id}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Ca làm:</Col>
                                        {mcp.janitors.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.workship}</Col>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col xl={2}>Ngày làm:</Col>
                                        {mcp.janitors.map((janitor, index) => 
                                            <Col key={index} xl={2}>{janitor.workday}</Col>
                                        )}
                                    </Row>
                                </Container>
                            )
                        }
                    </Row>
                </Container>
            ))}
            <div style={{width: '70%', margin: 'auto', height: 50, paddingBottom: 30}}>
                <button>Thay đổi</button>
                <button style={{marginRight: 15}} onClick={() => setMessage(true)}>Gửi</button>
            </div>
            {message && 
                <div className="model" style={{background: "rgba(49,49,49,0.8)"}}>
                    <div style={{backgroundColor: 'white', width: '40%', margin: 'auto'}}>
                        <button className="Xbutton" onClick={()=> setMessage(false)}>X</button>
                        <h2 style={{fontSize: '150%'}}>Thông báo được gửi thành công! <FaCheckCircle /></h2>
                    </div>
                </div>
            }
        </div>
    )    
}

export default Inform;