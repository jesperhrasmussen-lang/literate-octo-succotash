import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="hero-card">
        <p className="eyebrow">V1 prototype</p>
        <h1>Nearby Offers</h1>
        <p className="hero-copy">
          Søg-først webapp med live tilbudsdata, klar til videre produktisering.
        </p>
        <div className="hero-actions">
          <Link href="/search" className="primary-button link-button">
            Gå til søgning
          </Link>
          <Link href="/results" className="secondary-button link-button">
            Se resultater
          </Link>
        </div>
      </div>
    </main>
  );
}
