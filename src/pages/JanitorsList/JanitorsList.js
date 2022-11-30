import {useState} from 'react'
import './JanitorsList.css'
import Table from 'react-bootstrap/Table';
import {Tabligation} from '../../components/Table/Table'
import {Button} from 'react-bootstrap/'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import {useLocation} from 'react-router-dom';

const janitors = require('../../data/janitors.json')

const Confirm = (props) => {
    const theads = [
        {id: 'id', label: "MSNV"}, 
        {id: 'name', label: "Họ và tên"}, 
        {id: 'shift', label: "Ca làm việc"}, 
    ] 
    const choices = janitors.reduce((acc, janitor) => props.select[janitor.id] ? [...acc, janitor] : acc, [])
    return(
    <Modal centered show={true} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title className="text-center header-text">Các thông tin đã chọn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Thông tin MCP</h6>
        <div className='mcp-info'>
            <h6>Tuyến đường: TD/LT</h6>
            <h6>Địa chỉ: 1, Võ Văn Ngân</h6>
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
            <Button variant="dark" style={{marginRight: '5px'}}>Xác nhận</Button>
            <Button variant="dark" onClick={props.onHide}>Hủy bỏ</Button>
        </div>
      </Modal.Body>
    </Modal>
    )
}
const JanitorsList = (props) => {
    const location = useLocation()
    const theads = [
        {id: 'id', label: "MSNV"}, 
        {id: 'name', label: "Họ và tên"}, 
        {id: 'workday', label: "Lịch làm việc"}, 
        {id: 'shift', label: "Ca làm việc"}, 
        {id: 'phone', label: "Số điện thoại"},
    ] 
    const [page, setPage] = useState(0)
    const [select, setSelect] = useState(janitors.reduce((o, janitor) => { return {...o, [janitor.id]: false}}, {}))
    const [filter, setFilter] = useState("Tất cả")
    const [openConfirm, setOpenConfirm] = useState("")
    const [showAlert, setShowAlert] = useState("")
    showAlert ? setTimeout(() => {setShowAlert("");}, 5000) : void(0)

    const table = janitors.filter(janitor => filter !== "Tất cả" ? janitor.shift === filter : true)
    const numbers = Object.keys(Object.fromEntries(Object.entries(select).filter(([key, val]) => val === true))).length

    const handleSubmit = () => {
        numbers !== 0 ? setOpenConfirm(select) : setShowAlert("Hãy chọn ít nhất 1 janitor nhé!")
    }

    const handleSelect = (janitor) => {
        numbers >= 6 && !select[janitor.id] ? setShowAlert("Chọn tối ta 6 janitors") : setSelect({...select, [janitor.id]: !select[janitor.id]})
    }
    return (
        <div className="main">
             <h1 className='header-text'>DANH SÁCH CÁC JANITOR</h1>
             <h6>Thông tin MCP</h6>
             <div className='mcp-info'>
                <h6>Tuyến đường:</h6>
                <h6>Địa chỉ: {location.state.info.address}</h6>
                <h6>Số lượng Janitors: {location.state.info.max}</h6>
             </div>
             <div className='d-flex justify-content-between'>
                <p>Số lượng Janitors đã chọn: {numbers}</p>
                <span className='select-info'>
                    <Form.Select onChange = {(option) => setFilter(option.target.value)}>
                        <option value="Tất cả">Tất cả</option>
                        <option value="Sáng">Sáng</option>
                        <option value="Chiều">Chiều</option>
                        <option value="Đêm">Đêm</option>
                    </Form.Select>
                    <Form.Control 
                        type="search"
                        placeholder="Tìm kiếm janitor theo MSNV"
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
                        table.slice(page * 10, page * 10 + 10).map((janitor, index) => (
                            <tr key={index}>
                                {
                                    theads.map((thead, index) => (
                                        <td key={index}>{janitor[thead.id]}</td>
                                    ))
                                }
                                <td><Form.Check type="checkbox" checked={select[janitor.id]} onChange={() => handleSelect(janitor)}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <Button variant="dark" onClick={handleSubmit}>Lưu thay đổi</Button>
                <Tabligation count={table.length} page={page} rowsPerPage={10} onPageChange={(newPage) => setPage(newPage)}></Tabligation>
            </div>
            {openConfirm !== "" && <Confirm onHide={()=>setOpenConfirm("")} select={select}></Confirm>}
            {showAlert !== "" && <Alert variant="danger">{showAlert}</Alert>}
        </div>      
    )
}

export default JanitorsList