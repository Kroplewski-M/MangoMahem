import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { NotificationsContext } from "./context/NotificationsContext.tsx";
import {CompletedQuizesContext} from "./context/CompletedQuizesContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserContext>
      <CompletedQuizesContext>
        <NotificationsContext>
          <App />
        </NotificationsContext>
      </CompletedQuizesContext>
    </UserContext>
  </BrowserRouter>
);
