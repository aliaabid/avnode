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

// Entity disambiguation
serve('/about-av-node-autonomous-fleet-infrastructure', 'about-av-node-autonomous-fleet-infrastructure.html');
serve('/insights/av-node-autonomous-vehicle-infrastructure', 'insights/av-node-autonomous-vehicle-infrastructure.html');

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

// Markets index
serve('/markets', 'markets/index.html');

// Active markets
serve('/markets/houston',     'markets/houston.html');
serve('/markets/austin',      'markets/austin.html');
serve('/markets/dallas',      'markets/dallas.html');
serve('/markets/phoenix',     'markets/phoenix.html');
serve('/markets/miami',       'markets/miami.html');

// Expansion markets
serve('/markets/los-angeles',   'markets/los-angeles.html');
serve('/markets/atlanta',       'markets/atlanta.html');
serve('/markets/las-vegas',     'markets/las-vegas.html');
serve('/markets/nashville',     'markets/nashville.html');
serve('/markets/seattle',       'markets/seattle.html');
serve('/markets/san-francisco', 'markets/san-francisco.html');
serve('/markets/denver',        'markets/denver.html');
serve('/markets/chicago',       'markets/chicago.html');
serve('/markets/new-york',      'markets/new-york.html');
serve('/markets/washington-dc', 'markets/washington-dc.html');
serve('/markets/charlotte',     'markets/charlotte.html');
serve('/markets/orlando',       'markets/orlando.html');
serve('/markets/tampa',         'markets/tampa.html');
serve('/markets/san-antonio',   'markets/san-antonio.html');
serve('/markets/boston',        'markets/boston.html');
serve('/markets/sacramento',    'markets/sacramento.html');
serve('/markets/pittsburgh',    'markets/pittsburgh.html');

// Core money pages
serve('/autonomous-fleet-infrastructure',    'autonomous-fleet-infrastructure.html');
serve('/robotaxi-fleet-management',          'robotaxi-fleet-management.html');
serve('/av-fleet-management',                'av-fleet-management.html');
serve('/robotaxi-depots',                    'robotaxi-depots.html');
serve('/autonomous-vehicle-depots',          'autonomous-vehicle-depots.html');
serve('/robotaxi-charging-infrastructure',   'robotaxi-charging-infrastructure.html');
serve('/av-charging-hubs',                   'av-charging-hubs.html');
serve('/autonomous-vehicle-maintenance',     'autonomous-vehicle-maintenance.html');
serve('/robotaxi-cleaning-and-inspection',   'robotaxi-cleaning-and-inspection.html');
serve('/fleet-staging-infrastructure',       'fleet-staging-infrastructure.html');
serve('/av-fleet-real-estate',               'av-fleet-real-estate.html');
serve('/ev-fleet-depot-development',         'ev-fleet-depot-development.html');

// Glossary
serve('/terms/robotaxi-depot',               'terms/robotaxi-depot.html');
serve('/terms/deadhead-miles',               'terms/deadhead-miles.html');
serve('/terms/fleet-staging',                'terms/fleet-staging.html');
serve('/terms/depot-throughput',             'terms/depot-throughput.html');
serve('/terms/charge-dwell-time',            'terms/charge-dwell-time.html');
serve('/terms/fleet-readiness',              'terms/fleet-readiness.html');
serve('/terms/distributed-depot-network',    'terms/distributed-depot-network.html');
serve('/terms/fleet-operations-center',      'terms/fleet-operations-center.html');
serve('/terms/vehicle-utilization',          'terms/vehicle-utilization.html');
serve('/terms/empty-miles',                  'terms/empty-miles.html');
serve('/terms/av-service-hub',               'terms/av-service-hub.html');
serve('/terms/fleet-charging-infrastructure','terms/fleet-charging-infrastructure.html');
serve('/terms/robotaxi-charging-hub',        'terms/robotaxi-charging-hub.html');
serve('/terms/autonomous-vehicle-maintenance','terms/autonomous-vehicle-maintenance.html');

// Resources
serve('/resources', 'resources/index.html');

// Fallback
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`AVNode running on port ${PORT}`));
