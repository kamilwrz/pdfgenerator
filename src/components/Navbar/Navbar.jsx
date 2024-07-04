import classes from "./Navbar.module.css";

export default function Navbar({children}){
    return(
        <nav className={classes.navbar}>{children}</nav>
    )
}