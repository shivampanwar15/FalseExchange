import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <div>


      <nav className="navbar navbar-expand-lg navbar-light bg-success text-light">
        <a className="navbar-brand" to="/">FalseExchange</a>
        <button className="navbar-toggler btn-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link text-light" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item active">
                <Link className="nav-link text-light" to="/portfolio">Portfolio</Link>
              </li>
              : ""}
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item active">
                <Link className="nav-link text-light" to="/orders">Orders</Link>
              </li>
              : ""}




            <li className="nav-item active">
              <Link className="nav-link text-light" to="/stocks">Stocks</Link>
            </li>
          </ul>

          {
            !(localStorage.getItem("authToken")) ?

              <div> <Link className="btn btn-light my-4 my-sm-0 m-2" to="/login">Login</Link>
                <Link className="btn btn-light my-4 my-sm-0 m-2" to="/signup">SignUp</Link></div>

              : <div>
                <h4 className='btn mx-1 p-2 m-2'>{localStorage.getItem("username")}</h4>
                <div className='btn btn-light mx-1' onClick={handleLogout} >  Log Out </div>


              </div>



          }


        </div>
      </nav>

    </div>
  )
}

export default Navbar