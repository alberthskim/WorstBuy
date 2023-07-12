import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "85vh", alignItems: "center"}}>
            <h1 style={{textAlign: "center"}}>We're sorry, something went wrong.</h1>
            <img style={{height: "400px", width:"500px"}} src="https://i.imgur.com/m02wFJ5.png" />
            <p style={{textAlign:"center", paddingTop: "1rem"}}>You can use our search bar or click <Link to="/">here</Link> to go back home.</p>
        </div>
    )
}

export default ErrorPage
