import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';



function Stocks() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchData, setSearchData] = useState([]);


    const onchange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }


    const handleSearch = async () => {
        try {
            if (searchQuery.length >= 1) {
                const response = await fetch(`http://localhost:3000/api/search?query=${searchQuery}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSearchData(data.result);
            }
        } catch (error) {
            console.error('Error fetching search data:', error);
        }
    };
    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    useEffect(() => {
        console.log(searchData);
    }, [searchData]);


    return (
        <div>
<Navbar></Navbar>
            <h1 className='text-success '>Enter to Search a Stock. </h1>

            <div className='container border' >
                <form className='p-4' onSubmit={handleSearch}>
                    <div >
                        <input
                            className="text-center form-control"
                            type="search"
                            placeholder="Stocks"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={onchange}
                        />

                    </div>
                </form>
                <div className="p-4 dropdown-menu-active">
                    {searchData.slice(0, 5).map((e) => (
                        <Link className='p-2 dropdown-item text-success ' to={`/orderform/${e.description}/${e.displaySymbol}`} key={e.displaySymbol}> Name: {e.description},  Symbol: {e.symbol}, Type: {e.type} </Link>
                    ))}
                </div>


            </div>


        </div>
    )
}

export default Stocks