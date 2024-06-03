import { asset } from '../../asset/asset';
import './appdownload.scss';
const AppDownload = () => {
    return (
        <div className="app-download" id="app-download">
            <p>
                For Better Exprience Download <br /> Tomato App
            </p>
            <div className="platforms">
                <img src={asset.play_store} alt="" />
                <img src={asset.app_store} alt="" />
            </div>
        </div>
    );
};

export default AppDownload;
