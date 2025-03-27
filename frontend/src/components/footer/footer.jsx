import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="spaceous">
                <div className="left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio rerum cupiditate amet 
                    aperiam reprehenderit fugiat.
                </div>
                <div className="center">
                    <a className='shidd' href="#">Abut robi</a>
                    <a className='shidd' href="#">Abut them</a>
                    <a className='shidd' href="#">Abut us</a>
                </div>
                <div className="right">
                    <a className='shidd' href="#">github von alpi</a>
                    <a className='shidd' href="#">github von bo</a>
                    <a className='shidd' href="#">github von gyula</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;