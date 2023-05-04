import { createRoot } from 'react-dom/client';

function NavigationBar() {
    return <h1>Hello from React!</h1>;
}

const element = document.getElementById('navigation');
const root = createRoot(element);
root.render(<NavigationBar />);
