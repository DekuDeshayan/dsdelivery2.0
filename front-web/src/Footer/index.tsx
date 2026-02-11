import "./style.css";
import { ReactComponent as Instagram } from "./Instagram.svg";
import { ReactComponent as LInkedIn } from "./Linkedin.svg";
import { ReactComponent as Youtube } from "./Youtube.svg";


function Footer(){
    return (
        <footer className="main-footer">
            Ds delivery - Todos os direitos reservados, 2024
            <div className="footer-icons">
                <a href="#">
                    <Instagram/>
                </a>
                <a href="#">
                    <Youtube/>
                </a>
                <a href="#">
                    <LInkedIn/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;