import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

const ApplicationViews = () => {

    return(
        <React.Fragment>
            {/* <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            /> */}

            <Route
                exact path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                exact path="/login" render={props => {
                    return <Login {...props} />
                }}
            />





        </React.Fragment>
    )


}

export default withRouter(ApplicationViews)
