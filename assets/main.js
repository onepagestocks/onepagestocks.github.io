// Fetch latest weekly reports and update #reports-container and "2. The Cull" section
fetch('./indices/index.json')
  .then(response => response.json())
  .then(reports => {
    // Update #reports-container with latest reports links (existing UI block)
    const container = document.getElementById('reports-container');
    container.innerHTML = '';
    if (reports.length === 0) {
      container.innerHTML = '<p>No reports available yet.</p>';
    } else {
      const latest = reports[0];
      const dateMatch = latest.match(/(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : '';

      const latestLink = document.createElement('a');
      latestLink.href = `./reports/${latest}`;
      latestLink.textContent = `Latest Report → ${date}`;
      latestLink.className = 'report-button';

      const latestCard = document.createElement('div');
      latestCard.className = 'card bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600 hover:shadow-lg';
      latestCard.innerHTML = `<p class="mb-4">Check out the latest HTML report with visual analysis and insights.</p>`;
      latestCard.appendChild(latestLink);

      const allReportsLink = document.createElement('a');
      allReportsLink.href = './reports/';
      allReportsLink.textContent = 'View All Reports →';
      allReportsLink.className = 'report-button mt-4';

      container.appendChild(latestCard);
      container.appendChild(allReportsLink);
    }

    // Update "2. The Cull" section in main content to link to the latest weekly report
    const cullSection = document.getElementById('the-cull');
    if (cullSection && reports.length > 0) {
      const latestWeekly = reports[0];
      cullSection.innerHTML = `
        <h3><a href="./reports/${latestWeekly}" class="report-button">2. The Cull</a></h3>
        <p><a href="./reports/${latestWeekly}" class="report-button">
          Use the Weekly Reports to cull specific momentum stocks showing promise within those hot sectors.
        </a></p>
      `;
    }
  })
  .catch(error => {
    const container = document.getElementById('reports-container');
    if (container) container.innerHTML = '<p>Error loading reports.</p>';
    console.error('Error fetching weekly reports:', error);
  });

// Fetch latest sectoral report and update #sectoral-report and "1. The Catch" section
fetch('./indices/sectoral_index.json')
  .then(response => response.json())
  .then(data => {
    const reportCard = document.getElementById('sectoral-report');
    const latest = data.latest;

    if (latest && reportCard) {
      const link = document.createElement('a');
      link.href = `./sectoral/${latest}`;
      link.textContent = 'View Latest Sectoral Report →';
      link.className = 'report-button mt-4';
      reportCard.appendChild(link);
    } else if (reportCard) {
      reportCard.innerHTML += '<p>No report found.</p>';
    }

    // Update "1. The Catch" section in main content to link to latest sectoral report
    const catchSection = document.getElementById('the-catch');
    if (catchSection && latest) {
      catchSection.innerHTML = `
        <h3><a href="./sectoral/${latest}" class="report-button">1. The Catch</a></h3>
        <p><a href="./sectoral/${latest}" class="report-button">
          Begin with our Sectoral Report to cast a wide net, see sectors on the move.
        </a></p>
      `;
    }
  })
  .catch(error => {
    console.error('Error fetching sectoral report:', error);
  });
