import React, { useEffect, useState, useRef } from "react"
// import Product from "../cards/Product"
// import "./HomePage.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"




const HomePage = props => {
    const [myEvents, setMyEvents] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    const searchTerm = useRef()
    const [city, setCity] = useState(undefined)





    const getMyEvents = (event) => {
            if (event) {
              event.preventDefault()
            }
              fetch(`http://localhost:8000/playerevent?customer=true&is_aproved=true`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

                  }
              })
              .then(response => response.json())
              .then((response) => {
                  setMyEvents(response)
                })

      }




    useEffect(getMyEvents, [])

      return(
        <>
          <h1> WELCOME TO boarDOM</h1>

          {isAuthenticated() ?

          <h3>My Upcoming Events</h3>

          <form>
            <input
                placeholder="Search by city..."
                name="search"
                ref={searchTerm}
            />
            <button
            id="search"
            onClick = {(event) => {
              searchProducts(event)
            }}>Search</button>
            <button
            id="clear"
            onClick = {(event) => {
              getQuantity(event)

              }}
            >Clear</button>
          </form>


          {dynamicHeader(city)}
          <div className="homePage-Div">
          {products.length > 0 ?
          // looping through products and displaying the information in a card component
          products.map(product =>{
              return( <Product key={product.id} product={product} showCategory={true} /> )
          })


          : ""}
          </div>
        </>
    )
  }



export default HomePage