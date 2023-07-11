import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <Link to='/'>Home</Link>
            |
            <Link to='/new'>New</Link>
        </div>
    )
}

export default Navbar