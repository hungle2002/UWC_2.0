import './JanitorsList.css'
import Table from 'react-bootstrap/Table';
import {Tabligation} from '../../components/Table/Table'
import {Button} from 'react-bootstrap/'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import {FaArrowLeft} from 'react-icons/fa'

const Confirm = (props) => {
    const [confirm, setConfirm] = useState(false)
    const theads = [
        {id: 'userID', label: "MSNV"}, 
        {id: 'userName', label: "Họ và tên"}, 
        {id: 'workDay', label: "Ca làm việc"},
        {id: 'workTime', label: "Lịch làm việc"} 
    ] 
    const {id} = useParams()
    const navigate = useNavigate();
    

    //const choices = janitors.reduce((acc, janitor) => props.select[janitor.id] ? [...acc, janitor] : acc, [])
    const choices = props.janitors.filter(janitor => janitor?.isChecked)
    const handleSubmit = async () => {
        const ids = choices.map(choice => choice.userID)
        console.log(ids)
        setConfirm(true)
        const res = await axios.post("http://localhost:3000/api/mcp", 
            {"mcpId": id, "janiatorId": ids, "month":12, "week": 11}
        )
        .then((res) => {

        })
        .catch((err) =>
            alert("failed")
        )
    }
    return(
    <Modal centered show={true} onHide={props.onHide}>
      <Modal.Header style={{flexDirection: 'column'}}>
        {confirm && <img src={require('../../img/checkcircle.png')} style={{width: '60px'}}/>}
        {!confirm ? <Modal.Title className="text-center header-text">Các thông tin đã chọn</Modal.Title> : <Modal.Title className="text-center header-text">Lưu thành công</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <h6>Thông tin MCP</h6>
        <div className='mcp-info'>
            <h6>Tuyến đường: TD/LT</h6>
            <h6>Địa chỉ: {props.address}</h6>
        </div>
        <Table className="select-list">
            <tbody>
                {
                    choices.map((choice, index) => (
                        <tr key={index}>
                                {
                                    theads.map((thead, index) => (
                                        <td key={index}>{choice[thead.id]}</td>
                                    ))
                                }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <div className="d-flex justify-content-center">
            {!confirm ? <><Button variant="dark" style={{marginRight: '5px'}} onClick={handleSubmit}>Xác nhận</Button><Button variant="dark" onClick={props.onHide}>Hủy bỏ</Button></> :
            <Button variant="dark" onClick={() => navigate(-1)}>Tiếp tục</Button>}
        </div>
      </Modal.Body>
    </Modal>
    )
}
const JanitorsList = (props) => {
    const [janitors, setJanitors] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/api/janiator?week=11&month=12`)
        .then((res) => {
            setJanitors(res.data)
        }
        )
       
    }, [])
    const location = useLocation()
    const theads = [
        {id: 'userID', label: "MSNV"}, 
        {id: 'userName', label: "Họ và tên"}, 
        {id: 'workDay', label: "Lịch làm việc"}, 
        {id: 'workTime', label: "Ca làm việc"}, 
        {id: 'phone', label: "Số điện thoại"},
    ] 

    const max = location.state.info.janiator.split('/')[1];
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState("Tất cả")
    const [search, setSearch] = useState("")
    const [openConfirm, setOpenConfirm] = useState("")
    const [showAlert, setShowAlert] = useState("")
    //const [select, setSelect] = useState(janitors.reduce((o, janitor) => { return {...o, [janitor.userID]: false}}, {}))

    
    showAlert ? setTimeout(() => {setShowAlert("");}, 5000) : void(0)
    const table = janitors.filter(janitor => filter === "Tất cả" || janitor.workTime === filter ? true : false)
    //const numbers = Object.keys(Object.fromEntries(Object.entries(select).filter(([key, val]) => val === true))).length
    const numbers = janitors.filter((janitor) => janitor.isChecked).length
    
    const handleSubmit = () => {
        numbers !== 0 ? setOpenConfirm() : setShowAlert("Hãy chọn ít nhất 1 janitor nhé!")
    }

    const handleSelect = (e) => {
        const {name, checked} = e.target
        console.log(name, checked, e.target)
        let janitorsSelection = janitors.map((janitor) =>
            janitor.userID == name ? {...janitor, isChecked: checked} : janitor
        )
        numbers >= max && checked ? setShowAlert(`Chọn tối đa ${max} janitors`) : setJanitors(janitorsSelection);
    }

    return (
        <>
        <FaArrowLeft size = {50} style={{padding: '10px', cursor: 'pointer'}} onClick={() => navigate(-1)}/>
        <div className="main">
             <h1 className='header-text'>DANH SÁCH CÁC JANITOR</h1>
             <h6>Thông tin MCP</h6>
             <div className='mcp-info'>
                <h6>Tuyến đường:</h6>
                <h6>Địa chỉ: {location.state.info.address}</h6>
                <h6>Số lượng Janitors: {max}</h6>
             </div>
             <div className='d-flex justify-content-between'>
                <p>Số lượng Janitors đã chọn: {numbers}</p>
                <span className='select-info'>
                    <Form.Select onChange = {(option) => setFilter(option.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="Sang">Sáng</option>
                        <option value="Toi">Tối</option>
                        <option value="Dem">Đêm</option>
                    </Form.Select>
                    <Form.Control 
                        type="search"
                        placeholder="Tìm kiếm janitor"
                        onChange={(e) => {setSearch(e.target.value); console.log(e.target.value)}}
                        aria-label="Search"
                        style = {{marginLeft: '10px', minWidth: '300px'}}
                    />
                </span>
             </div>
            <Table>
                <thead>
                    <tr>
                    {
                        theads.map((thead, index) => (
                            <th key={index}>{thead.label}</th>
                        ))
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        table.filter(janitor=>janitor.userName.includes(search) ).slice(page * 10, page * 10 + 10).map((janitor, index) => (
                            <tr key={index}>
                                {
                                    theads.map((thead, index) => (
                                        <td key={index}>{janitor[thead.id]}</td>
                                    ))
                                }
                                <td><Form.Check type="checkbox" checked={janitor?.isChecked || false } name={janitor.userID} onChange={handleSelect}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <Button variant="dark" onClick={handleSubmit}>Lưu thay đổi</Button>
                <Tabligation count={table.length} page={page} rowsPerPage={10} onPageChange={(newPage) => setPage(newPage)}></Tabligation>
            </div>
            {openConfirm !== "" && <Confirm onHide={()=>setOpenConfirm("")} janitors={janitors} address={location.state.info.address}></Confirm>}
            {showAlert !== "" && <Alert variant="danger">{showAlert}</Alert>}
        </div>      
        </>
    )
}

export default JanitorsList