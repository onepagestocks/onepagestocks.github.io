// Fetch latest weekly reports
fetch('./indices/index.json')
  .then(response => response.json())
  .then(reports => {
    const container = document.getElementById('reports-container');
    container.innerHTML = '';
    if (reports.length === 0) {
      container.innerHTML = '<p>No reports available yet.</p>';
      return;
    }

    const latest = reports[0];
    const dateMatch = latest.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '';

    // Create a container for the buttons to manage spacing
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'flex flex-col gap-4'; // Tailwind classes for a vertical stack with a gap

    // Create the 'Latest Report' link and apply the button class
    const latestLink = document.createElement('a');
    latestLink.href = `./reports/${latest}`;
    latestLink.textContent = `Latest Report → ${date}`;
    latestLink.className = 'report-button'; // Apply the custom button class
    
    // Append the link to the card
    const latestCard = document.createElement('div');
    latestCard.className = 'card bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600 hover:shadow-lg'; // Re-adding the card classes for proper styling
    latestCard.innerHTML = `
      <h3 class="text-xl font-semibold text-white mb-2">Weekly Reports</h3>
      <p class="text-gray-300 mb-4">Check out the latest HTML report with visual analysis and insights.</p>
    `;
    latestCard.appendChild(latestLink);
    
    // Create the 'View All Reports' link and apply the button class
    const allReportsLink = document.createElement('a');
    allReportsLink.href = './reports/';
    allReportsLink.textContent = 'View All Reports →';
    allReportsLink.className = 'report-button mt-4'; // Apply the custom button class and margin-top

    // Append the links to the container
    container.appendChild(latestCard);
    container.appendChild(allReportsLink);
  })
  .catch(error => {
    document.getElementById('reports-container').innerHTML = '<p>Error loading reports.</p>';
    console.error('Error fetching reports:', error);
  });


// Fetch latest sectoral report
fetch('./indices/sectoral_index.json')
  .then(response => response.json())
  .then(data => {
    const reportCard = document.getElementById('sectoral-report');
    const latest = data.latest;
    if (latest) {
      const link = document.createElement('a');
      link.href = `./sectoral/${latest}`;
      link.textContent = 'View Latest Sectoral Report →';
      link.className = 'report-button mt-4'; // Apply the custom button class with margin-top
      
      // Append the button to the existing card
      reportCard.appendChild(link);
    } else {
      reportCard.innerHTML += '<p>No report found.</p>';
    }
  })
  .catch(error => {
    console.error('Error loading sectoral report:', error);
  });
