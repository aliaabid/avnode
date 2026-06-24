const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

function serve(route, file) {
  app.get(route, (req, res) =>
    res.sendFile(path.join(__dirname, 'public', file)));
}

// Core
serve('/deck',        'deck.html');
serve('/team',        'team.html');
serve('/marketplace', 'marketplace.html');

// Services
serve('/services',                                   'services/index.html');
serve('/services/av-infrastructure',                 'services/av-infrastructure.html');
serve('/services/robotaxi-depot-development',        'services/robotaxi-depot-development.html');
serve('/services/fleet-charging-infrastructure',     'services/fleet-charging-infrastructure.html');
serve('/services/av-site-selection',                 'services/av-site-selection.html');
serve('/services/fleet-operations-centers',          'services/fleet-operations-centers.html');
serve('/services/av-maintenance-facilities',         'services/av-maintenance-facilities.html');
serve('/services/autonomous-delivery-infrastructure','services/autonomous-delivery-infrastructure.html');
serve('/services/commercial-real-estate-av',         'services/commercial-real-estate-av.html');

// Industries
serve('/industries/robotaxis',            'industries/robotaxis.html');
serve('/industries/autonomous-delivery',  'industries/autonomous-delivery.html');
serve('/industries/autonomous-trucking',  'industries/autonomous-trucking.html');
serve('/industries/fleet-operators',      'industries/fleet-operators.html');

// Markets
serve('/markets/houston',     'markets/houston.html');
serve('/markets/austin',      'markets/austin.html');
serve('/markets/dallas',      'markets/dallas.html');
serve('/markets/phoenix',     'markets/phoenix.html');
serve('/markets/miami',       'markets/miami.html');
serve('/markets/los-angeles', 'markets/los-angeles.html');
serve('/markets/atlanta',     'markets/atlanta.html');
serve('/markets/las-vegas',   'markets/las-vegas.html');
serve('/markets/nashville',   'markets/nashville.html');
serve('/markets/seattle',     'markets/seattle.html');

// Resources
serve('/resources', 'resources/index.html');

// Fallback
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`AVNode running on port ${PORT}`));
