export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="magazine-wrapper">
      <header className="masthead">
        <div className="title-container">
          <span className="title-line-1">THE</span>
          <span className="title-line-2">APT FINDER</span>
        </div>
        <h2 className="subtitle">A PLACE OF YOUR OWN</h2>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <nav>
          <a href="/">HOME</a>
          <a href="/apartments">APARTMENTS</a>
          <a href="/realtors">REALTORS</a>
          <a href="/articles">ARTICLES</a>
          <a href="/favorites">FAVORITES</a>
        </nav>
        <p>© 2025 The Apt Finder. A Place of Your Own.</p>
      </footer>
    </div>
  );
}

