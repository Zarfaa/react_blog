import "./Home.css"
import { Link } from "react-router-dom"

let Home = () => {
    return (
        <div className="Home_Container">
            <h1>React Blog</h1>
            <h3>To read Blogs Do <Link to="/signup">Signup</Link></h3>
            <h3>In case You Already have an Account,<Link to="/login">Login</Link></h3>
        </div>
    )
}

export default Home
