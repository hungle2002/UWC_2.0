import { useState } from 'react'
import './VehicleTable.css'


const VehicleTable = ({vehicles, selected, checkItem}) => {


    return(
        <table className="vehicle-table">
            <thead>
                <tr>
                    <th>Mã số xe</th>
                    <th>Tên xe</th>
                    <th>Sức chứa</th>
                    <th>Tiêu hao nhiên liệu</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {vehicles?.map((vehicle) => {
                    return(
                    <tr key={vehicle.vehicleID}>
                        <td>{vehicle.vehicleID}</td>
                        <td>{vehicle.vehicleName}</td>
                        <td>{vehicle.capacity}</td>
                        <td>{vehicle.fuelConsumption}</td>
                        <td>
                            <input 
                                className='checkbox' 
                                type='checkbox' 
                                checked={vehicle.vehicleID === selected ? true : false}
                                onChange={(e)=>checkItem(e, vehicle.vehicleID)}
                            />
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default VehicleTable