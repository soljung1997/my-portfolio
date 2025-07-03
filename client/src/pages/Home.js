import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="page home">
      <h1>Welcome to My Portfolio</h1>
      <p>Hi, I'm Jee Won Jung. I'm a passionate software developer building modern, functional websites.</p>
      <p>Mission: To create clean, responsive, and user-friendly web applications.</p>
      <Link to="/about" className="btn">About Me</Link>
    </div>
  );
}
