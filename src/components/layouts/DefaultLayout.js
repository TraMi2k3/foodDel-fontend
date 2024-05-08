import Header from './Header/Header';
import Footer from './Footer/Footer';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
