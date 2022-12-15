import {useState} from 'react'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import {BsSlashLg} from 'react-icons/bs'
import './Table.css'

export const Tabligation = (props) => {
  const maxPage = Math.ceil(props.count/props.rowsPerPage)
  const [page, setPage] = useState(props.page + 1)
  const handleNextPage = () => {
    props.onPageChange(props.page + 1)
  }
  const handlePrevPage = () => {
    props.onPageChange(props.page - 1)
  }
  return (
    <div className="tabligation">
      {props.page === 0 ? <FaArrowLeft className="button"/>
      : <FaArrowLeft className="button active" onClick={handlePrevPage}/>}
      <input type="number" value={page} onChange={(e) => setPage(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && page > 0) props.onPageChange(page - 1)}}></input>
      <BsSlashLg></BsSlashLg>
      <p>{maxPage}</p>
      {props.page + 1 >= maxPage ? <FaArrowRight className="button"/>
      : <FaArrowRight className="button active" onClick={handleNextPage}/>}
    </div>
  )

}