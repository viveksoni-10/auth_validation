import "../index.css";
import { useAuth } from "../store/auth";

function About() {
  const { user } = useAuth();

  return (
    <section className="about">
      <div className="about-top">
        {user ? <h1>Welcome, {user.username} bhaiya 👋</h1> : <h1>About Us</h1>}
        <p>
          We are a team of developers and learners, working together to create
          impactful digital experiences using MERN stack and modern
          technologies.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-box">
          <h2>🌟 Mission</h2>
          <p>
            To empower learners and developers with real-world projects and
            hands-on knowledge.
          </p>
        </div>
        <div className="about-box">
          <h2>💡 Vision</h2>
          <p>
            To build a community where everyone can learn, grow, and innovate
            together.
          </p>
        </div>
        <div className="about-box">
          <h2>🤝 Values</h2>
          <p>
            Collaboration, honesty, and continuous growth are the foundation of
            everything we do.
          </p>
        </div>
      </div>

      <div className="about-footer">
        <p>📌 Always learning. Always building. Always sharing.</p>
      </div>
    </section>
  );
}

export default About;
