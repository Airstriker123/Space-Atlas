import './App.css'
import Experience from "./components/Experience/page/Experience.tsx"
import Landing from "./components/Landing/Landing.tsx"
  

export default function App()
{
    const choice = 0;
    if (choice === 1) return (<Landing/>);
    else return (<Experience />);
}