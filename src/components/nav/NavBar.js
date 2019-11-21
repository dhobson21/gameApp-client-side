import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"



const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const [myMessages, setMyMessages] = useState([])

    const getMessages = () => {


        fetch(`http://localhost:8000/messages?new=true`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

            }
        })
        .then(response => response.json())
        .then((response) => {
            setMyMessages(response)
            console.log('done')
        })

}

useEffect(getMessages, [props.myMessages])

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>

            {
                isAuthenticated() ?
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/collection">Game Collection</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/host-form">Host an Event</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/explore">Explore Events</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/messages">Messages {}({myMessages.length})</Link>
                    </li>

                    <li className="nav-item ">
                        <button className="nav-link "
                            onClick={() => {
                                logout()
                                props.history.push({
                                    pathname: "/"
                                })
                            }
                            }
                        >Logout</button>
                    </li>
                    </> :
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    </>
            }
        </ul>
    </nav>
        // <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        //     <ul className="nav nav-pills nav-fill">
        //         <li className="nav-item">
        //             <Link className="nav-link" to="/">Home</Link>
        //         </li>

        //         {
        //             isAuthenticated() ?
        //             <>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/collection">Game Collection</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/host-form">Host an Event</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/explore">Explore Events</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                 <Link className="nav-link" to="/messages">Messages</Link>
        //                 </li>

        //                 <li className="nav-item ">
        //                     <button className="nav-link "
        //                         onClick={() => {
        //                             logout()
        //                             props.history.push({
        //                                 pathname: "/"
        //                             })
        //                         }
        //                         }
        //                     >Logout</button>
        //                 </li>
        //                 </> :
        //                 <>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/login">Login</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/register">Register</Link>
        //                 </li>
        //                 </>
        //         }
        //     </ul>
        // </nav>
    )
}

export default NavBar