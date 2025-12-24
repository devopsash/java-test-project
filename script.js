document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for animation on scroll
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate cards
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`; // Staggered delay
    observer.observe(card);
  });

  // --- Cluster Availability Logic ---
  renderClusters();
});

function renderClusters() {
  const container = document.getElementById('cluster-grid');
  if (!container) return; // Guard clause if not on index page or section missing

  const datacenters = [
    { name: "US-East (Virginia)", code: "US-VA-01" },
    { name: "EU-West (London)", code: "EU-LDN-01" },
    { name: "MN-WEST (Mumbai)", code: "MN-MB-01" },
    { name: "AP-South (Sydney)", code: "AP-SYD-01" }
  ];

  let html = '';

  datacenters.forEach(dc => {
    let clustersHtml = '';
    // Generate 4 clusters for each DC
    for (let i = 1; i <= 4; i++) {
      // Mock Node Status: Random between 90 and 100 for healthy feel, occasionally lower
      const activeNodes = Math.random() > 0.1 ? Math.floor(Math.random() * 5) + 96 : Math.floor(Math.random() * 20) + 70;
      const totalNodes = 100;
      const percentage = (activeNodes / totalNodes) * 100;

      // Color Logic
      let colorVar = '--status-good';
      if (percentage < 80) colorVar = '--status-warning';
      if (percentage < 60) colorVar = '--status-danger';

      clustersHtml += `
            <div style="margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                    <span style="color: var(--text-secondary);">Cluster ${i.toString().padStart(2, '0')}</span>
                    <span style="font-weight: bold; color: var(${colorVar});">${activeNodes}/${totalNodes}</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background: var(${colorVar}); border-radius: 3px;"></div>
                </div>
            </div>
        `;
    }

    html += `
      <div class="glass glass-card" style="min-width: 320px; flex-shrink: 0;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
            <div style="width: 32px; height: 32px; background: rgba(6, 182, 212, 0.1); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--accent-cyan);">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
            </div>
            <div>
                <h3 style="font-size: 1.1rem;">${dc.name}</h3>
                <div style="font-size: 0.75rem; color: var(--text-secondary); letter-spacing: 0.5px;">${dc.code}</div>
            </div>
        </div>
        ${clustersHtml}
      </div>
    `;
  });

  container.innerHTML = html;
}
