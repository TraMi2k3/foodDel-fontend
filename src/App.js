import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';

function App() {
    return (
        <div className="App">
            <Router>
                <DefaultLayout>
                    <Routes>
                        {routes.map((route, index) => {
                            return <Route key={index} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                </DefaultLayout>
            </Router>
        </div>
    );
}

export default App;
