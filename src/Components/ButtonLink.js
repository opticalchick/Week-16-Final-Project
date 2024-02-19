import { Link } from "react-router-dom";

export default function ButtonLink({ to, children }) {
    return <Link to={to}><button className="btn btn-primary">{children}</button></Link>;
};
