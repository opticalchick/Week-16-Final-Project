import { Link } from "react-router-dom";

// This looks like a button, but functions like a Link.  It sends the user to the 
// create page.

export default function ButtonLink({ to, children }) {
    return <Link to={to}><button className="btn btn-primary">{children}</button></Link>;
};
