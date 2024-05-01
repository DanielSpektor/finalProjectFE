import React, {useContext, useEffect, useState} from "react";
import AuthContext from "./context/AuthProvider";
import { testAuthenticatedApi } from "../services/api";
import CreditCardForm from "./Payment";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./products/Items";
import OrderProcessPage from "./OrderProccessPage";


function Home() {

    const authContext = useContext(AuthContext);
    const [testResponse, setTestResponse] = useState();
    const [showFakePaymentPopup, setShowFakePaymentPopup] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(Object.keys(authContext["auth"]).length > 0 ) {
            testAuthenticatedApi({"Authorization": "Bearer " + authContext["auth"]}
            ).then(
                res => {
                    setTestResponse(res.data.response);
                }
            )
        }
    }, [authContext])

    const handlePayClick = () => {
        setShowFakePaymentPopup(true);
    };
    
    const handleCloseFakePaymentPopup = () => {
        setShowFakePaymentPopup(false);
    };


    return (
        <>
            {Object.keys(authContext["auth"]).length > 0 && <p>{testResponse}</p>}
            <Items/>
            <OrderProcessPage/>
            <div className="container mt-5">
                <button onClick={handlePayClick}>Pay Now</button>
                {showFakePaymentPopup && (
                <CreditCardForm onClose={handleCloseFakePaymentPopup}/>
                )}
            </div>
        </>
    )
}

export default Home;