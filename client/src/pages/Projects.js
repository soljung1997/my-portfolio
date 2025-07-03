import './Projects.css';

export default function Projects() {
  return (
    <div className="page projects">
      <h1>Projects</h1>
      <div className="project-list">
        <div className="project">
          <img src="/project1.png" alt="Project 1" />
          <h3>Project One</h3>
          <p>A web app I built using React and Node.js to track expenses.</p>
        </div>
        <div className="project">
          <img src="/project2.png" alt="Project 2" />
          <h3>Project Two</h3>
          <p>An e-commerce mockup using HTML/CSS and JavaScript.</p>
        </div>
        <div className="project">
          <img src="/project3.png" alt="Project 3" />
          <h3>Project Three</h3>
          <p>A weather app that fetches real-time weather data from an API.</p>
        </div>
      </div>
    </div>
  );
}
