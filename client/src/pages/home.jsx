import "../index.css";
function Home() {
  return (
    <section className="home">
      <div className="home-hero">
        <h1>Welcome to Our Website</h1>
        <p>Build amazing projects with React, Express, MongoDB, and Node.js.</p>
        <button className="home-btn">Get Started</button>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h2>🚀 Fast</h2>
          <p>Optimized for performance and scalability.</p>
        </div>
        <div className="feature-card">
          <h2>⚡ Modern</h2>
          <p>Built with the latest technologies and tools.</p>
        </div>
        <div className="feature-card">
          <h2>🔒 Secure</h2>
          <p>Robust authentication & authorization system.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
