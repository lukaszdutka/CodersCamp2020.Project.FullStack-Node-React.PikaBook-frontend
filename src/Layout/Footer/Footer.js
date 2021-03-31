import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.scss";
import pikachu from "../../Assets/Images/pikachu.png";

const Footer  = () => {
    return ( 
        <footer>
            <div className="books"></div>
            <div className="about">
                <p>
                Pikabook APP is for book lovers. Are you one of them? If so, <span>pick a book</span> you want to read. Then suggest yours you have already read. That's all. <span>Connect with other bookworms!</span>
                </p>
            </div>
            <div className="authors">
                <b>Created by Mangosteam</b>
                <ul>
                    <li>Mentor: Łukasz Dutka</li>
                    <li>Aleksandra Cypko</li>
                    <li>Małgorzata Dziewit</li>
                    <li>Daria Dziubałtowska</li>
                    <li>Agata Ludwiczyńska</li>
                    <li>Mariusz Smarż</li>
                </ul>
                <img src={pikachu} alt="pikachu" />
            </div>
            <div className="github">
                Application made as part of the <b>CodersCamp2020</b> project.<br />
                <Link to={{ pathname: "https://github.com/lukaszdutka/CodersCamp2020.Project.FullStack-Node-React.PikaBook-frontend" }} target="_blank">Visit Github for more information.</Link>
            </div>
        </footer>
      );
}
 
export default Footer;