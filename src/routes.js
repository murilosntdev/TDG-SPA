import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import GameRoom from "./pages/GameRoom/GameRoom";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/u/:username" element={<Dashboard />} />
            <Route path="/r/:roomId" element={<GameRoom />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;