import './About.css';

export default function About() {
  return (
    <div className="page about">
      <h1>About Me</h1>
      <img src="/profile.png" alt="My profile" className="profile-pic" />
      <p>My name is Jee Won Jung. I'm currently studying Software Engineering and have a strong interest in full-stack development.</p>
      <a href="/resume.pdf" download className="btn">Download My Resume</a>
    </div>
  );
}
