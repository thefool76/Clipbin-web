const cards = [
  {
    title: "Capture",
    body: "Start drawing and your trail becomes a living memory. Nothing to configure, nothing to learn."
  },
  {
    title: "Reflect",
    body: "Scroll through prompts that reframe attention from urgency to intention with a calm, deliberate pace."
  },
  {
    title: "Preserve",
    body: "Store moments as compact visual notes you can revisit when your day gets noisy."
  }
];

export function InfoGrid() {
  return (
    <section id="how-it-works" className="info-wrap" aria-labelledby="how-it-works-title">
      <div className="section-head">
        <p className="kicker">How It Works</p>
        <h2 id="how-it-works-title">A slow interface for clear thought.</h2>
      </div>
      <div className="info-grid">
        {cards.map((card) => (
          <article key={card.title} className="info-card">
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
