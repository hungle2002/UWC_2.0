import './SeachBar.css'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({placeHolder, onSearch}) => {
    return(
        <div className="search-bar">
            <SearchIcon className='search-icon'/>
            <input type='text' placeholder={placeHolder}
            onChange={(e)=>{onSearch(e.target.value)}}/>
        </div>
    )
}

export default SearchBar