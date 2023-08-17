import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMount } from "./hooks";
import UserStore from "./store/user";
import { MainLayout } from "./components";
import {
  AuthorizationPage,
  Userpage,
  NotFoundPage,
  ForHookah,
  TobaccoPage,
  CoalPage,
} from "./pages";
import "./App.scss";
import "./styles/globalStyles.scss";
import { StartingSpinner } from "./UI";

export default function App() {
  const [loading, toggleLoading] = useState<boolean>(true);

  const getUser = async () => {
    await UserStore.autoAuth();
    setTimeout(() => {
      toggleLoading(false);
      // 500млс, потому что запросы обрабатываются слишком быстро, и спинер прячется сразу же
    }, 500);
  };

  // Если юзер авторизировался ранее и его токен еще жив
  // Тогда происходит автоматическая авторизация
  useMount(() => {
    getUser();
  });

  return (
    <BrowserRouter>
      <div className="app">
        <StartingSpinner loading={loading} />
        <Routes>
          <Route path="/auth/:refCode" element={<AuthorizationPage />} />
          <Route path="/auth" element={<AuthorizationPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<ForHookah />} />
            <Route path="/my-page" element={<Userpage />} />
            <Route path="/tobacco/:id" element={<TobaccoPage />} />
            <Route path="/coal/:id" element={<CoalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
