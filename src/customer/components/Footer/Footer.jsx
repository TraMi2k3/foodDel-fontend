import { asset } from '../../asset/asset';
import './footer.scss';
const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="content">
                <div className="left">
                    <img src={asset.footer} alt="" />
                    <span>Thank you</span>
                </div>
                <div className="center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@harumi.com</li>
                    </ul>
                </div>
            </div>
            <div className="social">
                <p>
                Our diverse menu selection will leave you pondering every time you want to place an order. From delicious traditional dishes to creative modern cuisine, we take pride in offering a rich variety that caters to your tastes and preferences. Enjoy a delightful meal and place your order now!
                </p>
                <div className="social-icon">
                    <img src={asset.facebook_icon} alt="" />
                    <img src={asset.twitter_icon} alt="" />
                    <img src={asset.linkedin_icon} alt="" />
                </div>
            </div>
            <hr />
            <p className="copyright">copyright 2024 @ harumi.com - All rights reserved</p>
        </div>
    );
};

export default Footer;
