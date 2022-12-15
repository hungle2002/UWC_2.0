import { useState } from 'react'
import './CollectorTable.css'



const CollectorTable = ({collectors, selected, checkItem}) => {
    return(
        <table className="collector-table">
            <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th>Lịch làm việc</th>
                    <th>Giờ làm việc</th>
                    <th>Số điện thoại</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {collectors?.map((collector) => {
                    return(
                    <tr key={collector.userID}>
                        <td>{collector.userName}</td>
                        <td>{collector.workDay}</td>
                        <td>{collector.workTime}</td>
                        <td>{collector.licenseNumber}</td>
                        <td>
                            <input 
                                className='checkbox' 
                                type='checkbox' 
                                checked={collector.userID === selected ? true : false}
                                onChange={(e)=>checkItem(e, collector.userID)}    
                            />  
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CollectorTable