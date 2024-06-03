import './exploremenu.scss';
import { menu_list } from '../../asset/asset'; 

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="text">
            Our diverse menu selection will leave you pondering every time you want to place an order. From delicious traditional dishes to creative modern cuisine, we take pride in offering a rich variety that caters to your tastes and preferences. Enjoy a delightful meal and place your order now!
            </p>
            <div className="list">

                    {menu_list.map((item, index) => (
                        <div
                            onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
                            key={index}
                            className="item"
                        >
                            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    ))}

            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
