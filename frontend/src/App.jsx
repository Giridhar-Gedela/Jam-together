import React from 'react';
import './App.css';

function App() {
  // Keep your existing state and socket logic here unchanged!
  // const [room, setRoom] = useState(...);

  return (
    <div className="app-container">
      {/* 1. LEFT SIDEBAR: Social Rooms / Active Jammers */}
      <aside className="sidebar">
        <div className="logo-section">
          <h2>JamTogether 🎧</h2>
        </div>
        <nav className="nav-menu">
          {/* Render your room selection lists here */}
          <div className="active-users-box">
            <h3>Active Jammers</h3>
            {/* Existing map function for users */}
          </div>
        </nav>
      </aside>

      {/* 2. MAIN HUB: Chat / Queue / Dynamic Content */}
      <main className="main-content">
        <header className="top-bar">
          <span className="room-status">Currently Jamming in: <b>Room Name</b></span>
          {/* Profile or Room Code indicators */}
        </header>

        <section className="content-grid">
          {/* Left Block: Chat / Feed */}
          <div className="glass-card chat-section">
            <h3>Live Chat</h3>
            {/* Place your existing chat display scrollboxes here */}
          </div>

          {/* Right Block: Track Queue */}
          <div className="glass-card queue-section">
            <h3>Upcoming Tracks</h3>
            {/* Place your song queues / search bars here */}
          </div>
        </section>
      </main>

      {/* 3. BOTTOM PANEL: Persistent Media Controller */}
      <footer className="media-player-bar">
        {/* Sync status, play/pause state icons, skip buttons */}
        <div className="now-playing">
          <div className="track-placeholder"></div>
          <div>
            <p className="track-title">Syncing Audio...</p>
            <p className="track-artist">Host Controlled</p>
          </div>
        </div>
        <div className="player-controls">
          {/* Map your play/pause click handlers directly to beautifully styled icon buttons */}
          <button className="control-btn prev-btn">⏮</button>
          <button className="control-btn play-btn">▶</button>
          <button className="control-btn next-btn">⏭</button>
        </div>
        <div className="volume-section">
          <span>🔊</span>
          <input type="range" className="volume-slider" />
        </div>
      </footer>
    </div>
  );
}

export default App;