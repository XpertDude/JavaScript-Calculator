import ReactDOM from "react-dom/client";
import App from "./JavaScript Calculator/App"
const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <>
        <App />
        </>
    );
} else {
    console.error("Root element not found");
}
