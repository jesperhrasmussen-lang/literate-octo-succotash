import { SearchForm } from '@/components/search-form';

export default function SearchPage() {
  return (
    <main className="page-stack">
      <section className="intro-block">
        <p className="eyebrow">Søg</p>
        <h1>Find tilbud i nærheden</h1>
        <p className="page-copy">
          Indtast adresse, vælg adgangsfilter, og søg i den aktuelle tilbudsdatabase uden opskrifter eller konto-lag.
        </p>
      </section>
      <SearchForm />
    </main>
  );
}
