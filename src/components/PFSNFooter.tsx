import React from 'react';

interface FooterProps {
  currentPage?: 'CBB' | 'CFB' | 'Fantasy' | 'MLB' | 'NASCAR' | 'NBA' | 'NFL' | 'NHL' | 'Tennis' | 'WNBA' | 'WWE';
}

const PFSNFooter: React.FC<FooterProps> = ({ currentPage = 'NHL' }) => {
  return (
    <footer className="pfsn-footer">
        <div className="pfsn-footer-container">
        <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-column-title">News & Analysis</h3>
              <ul className="footer-links">
                <li className={currentPage === 'CBB' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/mens-cbb/" target="_blank" rel="noopener noreferrer">CBB</a></li>
                <li className={currentPage === 'CFB' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/cfb/" target="_blank" rel="noopener noreferrer">CFB</a></li>
                <li className={currentPage === 'Fantasy' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/fantasy-football/" target="_blank" rel="noopener noreferrer">Fantasy</a></li>
                <li className={currentPage === 'MLB' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/mlb/" target="_blank" rel="noopener noreferrer">MLB</a></li>
                <li className={currentPage === 'NASCAR' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/nascar/" target="_blank" rel="noopener noreferrer">NASCAR</a></li>
                <li className={currentPage === 'NBA' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/nba/" target="_blank" rel="noopener noreferrer">NBA</a></li>
                <li className={currentPage === 'NFL' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/nfl/" target="_blank" rel="noopener noreferrer">NFL</a></li>
                <li className={currentPage === 'NHL' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/nhl/" target="_blank" rel="noopener noreferrer">NHL</a></li>
                <li className={currentPage === 'Tennis' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/tennis/" target="_blank" rel="noopener noreferrer">Tennis</a></li>
                <li className={currentPage === 'WNBA' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/wnba/" target="_blank" rel="noopener noreferrer">WNBA</a></li>
                <li className={currentPage === 'WWE' ? 'current-page' : ''}><a href="https://www.profootballnetwork.com/wwe-player-guessing-game/" target="_blank" rel="noopener noreferrer">WWE</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">NHL Tools & Games</h3>
              <ul className="footer-links">
                <li><a href="/">NHL Card Matching Game</a></li>
                <li><a href="https://www.profootballnetwork.com/nhl-player-guessing-game/">NHL Player Guessing Game</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">NFL Tools</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/mockdraft">NFL Mock Draft Simulator</a></li>
                <li><a href="https://www.profootballnetwork.com/nfl-playoff-predictor">NFL Season & Playoff Predictor</a></li>
                <li><a href="https://www.profootballnetwork.com/nfl-offseason-salary-cap-free-agency-manager">NFL Offseason Manager</a></li>
                <li><a href="https://www.profootballnetwork.com/cta-big-board-builder-nfl-draft/">NFL Draft Big Board Builder</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">NFL Games</h3>
              <ul className="footer-links">
                <li><a href="https://interactive-tango-pu-7of9.bolt.host/">NFL Duo</a></li>
                <li><a href="https://www.profootballnetwork.com/nfl-player-guessing-game/">NFL Player Guessing Game</a></li>
                <li><a href="https://www.profootballnetwork.com/cta-guess-nfl-prospects-tools/">NFL Draft Guessing Game</a></li>
                <li><a href="https://www.profootballnetwork.com/nfl-word-fumble-cta/">NFL Word Fumble</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Fantasy Football Tools</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/fantasy-football-mock-draft-simulator/">Fantasy Mock Draft Simulator</a></li>
                <li><a href="https://www.profootballnetwork.com/who-should-i-start-fantasy-optimizer">Fantasy Start/Sit Optimizer</a></li>
                <li><a href="https://www.profootballnetwork.com/fantasy-football-waiver-wire">Fantasy Waiver Wire Assistant</a></li>
                <li><a href="https://www.profootballnetwork.com/fantasy-football-trade-analyzer">Fantasy Trade Analyzer</a></li>
                <li><a href="https://www.profootballnetwork.com/dynasty-fantasy-football-trade-value-charts">Dynasty Trade Charts</a></li>
                <li><a href="https://www.profootballnetwork.com/fantasy-football-trade-value-charts">Redraft Trade Charts</a></li>
                <li><a href="https://www.profootballnetwork.com/nfl-dfs-optimizer-lineup-generator">NFL DFS Optimizer</a></li>
                <li><a href="https://www.profootballnetwork.com/who-should-i-draft-fantasy-football">Who Should I Draft?</a></li>
                <li><a href="https://www.profootballnetwork.com/fantasy-football-team-name-generator">Team Name Generator</a></li>
                <li><a href="https://www.profootballnetwork.com/fantasy-football-draft-order-generator-randomizer/">Draft Order Randomizer</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Betting Tools</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/betting-odds-calculator-cta/">Odds Calculator</a></li>
                <li><a href="https://www.profootballnetwork.com/parlay-calculator-cta/">Parlay Calculator</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">Company</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/about-us/">About PFSN</a></li>
                <li><a href="https://www.profootballnetwork.com/contact-media-inquiries-pro-football-network/">Contact Us</a></li>
                <li><a href="https://www.profootballnetwork.com/privacy-policy/">Privacy Policy</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">NHL Resources</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/nhl">NHL News</a></li>
                <li><a href="https://www.profootballnetwork.com/nhl/standings">NHL Standings</a></li>
                <li><a href="https://www.profootballnetwork.com/nhl/stats">NHL Stats</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">NBA Tools</h3>
              <ul className="footer-links">
                <li><a href="https://www.profootballnetwork.com/nhl-mock-draft-simulator">NHL Mock Draft Simulator</a></li>
                <li><a href="https://www.profootballnetwork.com/nhl-player-guessing-game">NHL Player Guessing Game</a></li>
              </ul>

              <h3 className="footer-column-title footer-subheading">NHL Games</h3>
              <ul className="footer-links">
                <li className="current-page"><a href="/">NHL Duo</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="social-icons">
              <a href="https://facebook.com/PFSN365" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="mailto:contact@profootballnetwork.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="/rss" aria-label="RSS Feed">
                <i className="fas fa-rss"></i>
              </a>
              <a href="https://x.com/PFSN365" aria-label="Twitter" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="copyright">
              <p>Copyright © 2019-2025. PFSN.</p>
              <p>All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default PFSNFooter;