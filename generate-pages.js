const fs = require('fs');
const path = require('path');

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#09090C;--surface:#101013;--surface2:#14141a;--border:#1A1A22;--border-hi:#2A2A36;--text:#EEEEF2;--muted:#6A6A7E;--dim:#32323F;--blue:#2F6BF5;--blue-faint:rgba(47,107,245,0.1);--blue-line:rgba(47,107,245,0.22);--green:#2DCE6C}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100vh}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:24px 48px;transition:all .3s;border-bottom:1px solid transparent}
nav.scrolled{padding:16px 48px;background:rgba(9,9,12,.95);backdrop-filter:blur(20px);border-color:var(--border)}
.nav-logo{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:600;letter-spacing:-.02em;color:var(--text);text-decoration:none}
.nav-right{display:flex;align-items:center;gap:28px}
.nav-link{font-size:13px;color:var(--muted);text-decoration:none;transition:color .2s}
.nav-link:hover{color:var(--text)}
.nav-apply{font-size:13px;font-weight:500;color:var(--text);text-decoration:none;border:1px solid var(--border-hi);padding:7px 18px;border-radius:100px;transition:all .2s}
.nav-apply:hover{border-color:var(--blue)}
@media(max-width:768px){nav{padding:20px 24px}.nav-link{display:none}}
.page-hero{padding:160px 48px 80px;max-width:1100px;margin:0 auto;border-bottom:1px solid var(--border)}
.hero-eyebrow{font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-bottom:20px;font-family:'Space Grotesk',sans-serif}
.hero-h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(36px,4.5vw,64px);font-weight:600;line-height:1.05;letter-spacing:-.03em;margin-bottom:24px;max-width:820px}
.hero-sub{font-size:18px;color:var(--muted);line-height:1.7;max-width:620px;margin-bottom:36px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;padding:12px 28px;background:var(--blue);color:#fff;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;transition:opacity .2s}
.btn-primary:hover{opacity:.88}
.btn-ghost{display:inline-flex;align-items:center;padding:12px 28px;border:1px solid var(--border-hi);color:var(--text);border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;transition:all .2s}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue)}
.content{max-width:1100px;margin:0 auto;padding:0 48px}
@media(max-width:768px){.content{padding:0 24px}.page-hero{padding:120px 24px 60px}}
.section{padding:72px 0;border-bottom:1px solid var(--border)}
.section:last-child{border-bottom:none}
.section-label{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:14px}
.section-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3vw,44px);font-weight:600;letter-spacing:-.025em;line-height:1.1;margin-bottom:20px}
.section-body{font-size:16px;color:var(--muted);line-height:1.75;max-width:680px;margin-bottom:32px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px}
@media(max-width:860px){.two-col{grid-template-columns:1fr}.three-col{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.three-col{grid-template-columns:1fr}}
.card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:28px 32px;margin-bottom:16px}
.card.blue{border-color:var(--blue-line);background:var(--blue-faint)}
.card h3{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;letter-spacing:-.01em;margin-bottom:10px;color:var(--text)}
.card p{font-size:14px;color:var(--muted);line-height:1.65;margin:0}
.grid-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.grid-cards{grid-template-columns:1fr}}
.list-item{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid var(--border)}
.list-item:last-child{border-bottom:none}
.list-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);margin-top:8px;flex-shrink:0;box-shadow:0 0 8px var(--blue)}
.list-text h4{font-size:15px;font-weight:600;color:var(--text);margin-bottom:4px}
.list-text p{font-size:13px;color:var(--muted);line-height:1.55;margin:0}
.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin:32px 0}
@media(max-width:600px){.stat-row{grid-template-columns:1fr 1fr}}
.stat-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px}
.stat-num{font-family:'Space Grotesk',sans-serif;font-size:40px;font-weight:600;color:var(--blue);letter-spacing:-.03em;line-height:1;margin-bottom:6px}
.stat-label{font-size:12px;color:var(--muted);letter-spacing:.03em}
.check-list{display:flex;flex-direction:column;gap:10px;margin-top:8px}
.check-item{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:var(--muted);line-height:1.5}
.check-item::before{content:'✓';color:var(--green);font-weight:700;font-size:13px;flex-shrink:0;margin-top:1px}
.bullet-list{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.bullet-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--muted)}
.bullet-item::before{content:'·';color:var(--blue);font-weight:700;font-size:18px;line-height:1.1;flex-shrink:0}
.tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.tag{display:inline-block;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:500;background:var(--surface2);border:1px solid var(--border-hi);color:var(--muted)}
.page-cta{background:var(--surface);border-top:1px solid var(--border);padding:80px 48px;text-align:center}
.cta-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3vw,44px);font-weight:600;letter-spacing:-.025em;margin-bottom:16px}
.cta-sub{font-size:16px;color:var(--muted);margin-bottom:36px;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.65}
@media(max-width:768px){.page-cta{padding:60px 24px}}
footer{background:var(--bg);border-top:1px solid var(--border);padding:40px 48px;display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;color:var(--muted)}
.footer-links{display:flex;gap:24px}
.footer-links a{font-size:12px;color:var(--dim);text-decoration:none;transition:color .2s}
.footer-links a:hover{color:var(--muted)}
.footer-copy{font-size:12px;color:var(--dim)}
@media(max-width:600px){footer{flex-direction:column;gap:16px;padding:32px 24px;text-align:center}.footer-links{display:none}}
`;

function shell(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="https://www.av-node.com${p.url}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<nav id="mainNav">
  <a href="/" class="nav-logo">AVNode</a>
  <div class="nav-right">
    <a href="/#operators" class="nav-link">Fleet Operators</a>
    <a href="/#owners" class="nav-link">Property Owners</a>
    <a href="/resources" class="nav-link">Resources</a>
    <a href="/#apply" class="nav-apply">Apply</a>
  </div>
</nav>
<div class="page-hero">
  <div class="hero-eyebrow">${p.eyebrow}</div>
  <h1 class="hero-h1">${p.h1}</h1>
  <p class="hero-sub">${p.sub}</p>
  <div class="hero-actions">
    <a href="/#apply" class="btn-primary">Start a Partnership</a>
    <a href="/services" class="btn-ghost">All Services</a>
  </div>
</div>
<div class="content">${p.body}</div>
${p.cta !== false ? `
<div class="page-cta">
  <h2 class="cta-h2">Ready to deploy infrastructure?</h2>
  <p class="cta-sub">AVNode handles site sourcing, landlords, utilities, charging, and operations. You focus on your fleet.</p>
  <a href="/#apply" class="btn-primary">Get Started →</a>
</div>` : ''}
<footer>
  <span class="footer-logo">AVNode</span>
  <div class="footer-links">
    <a href="/services">Services</a><a href="/markets/houston">Markets</a>
    <a href="/resources">Resources</a><a href="/#apply">Contact</a>
  </div>
  <span class="footer-copy">© 2026 AVNode</span>
</footer>
<script>
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
</script>
</body></html>`;
}

// helpers
const sec = (label,h2,body,inner) => `<div class="section"><div class="section-label">${label}</div><h2 class="section-h2">${h2}</h2>${body?`<p class="section-body">${body}</p>`:''}${inner}</div>`;
const twoCol = (left,right) => `<div class="two-col">${left}${right}</div>`;
const threeCards = cards => `<div class="three-col">${cards.map(c=>`<div class="card ${c.blue?'blue':''}" style="margin-bottom:0"><h3>${c.h}</h3><p>${c.p}</p></div>`).join('')}</div>`;
const gridCards = cards => `<div class="grid-cards">${cards.map(c=>`<div class="card" style="margin-bottom:0"><h3>${c.h}</h3><p>${c.p}</p></div>`).join('')}</div>`;
const statRow = stats => `<div class="stat-row">${stats.map(s=>`<div class="stat-box"><div class="stat-num">${s.n}</div><div class="stat-label">${s.l}</div></div>`).join('')}</div>`;
const checklist = items => `<div class="check-list">${items.map(i=>`<div class="check-item">${i}</div>`).join('')}</div>`;
const bullets = items => `<div class="bullet-list">${items.map(i=>`<div class="bullet-item">${i}</div>`).join('')}</div>`;
const listItems = items => items.map(i=>`<div class="list-item"><div class="list-dot"></div><div class="list-text"><h4>${i.h}</h4><p>${i.p}</p></div></div>`).join('');
const tags = items => `<div class="tag-row">${items.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`;

const pages = [

// ── SERVICES ─────────────────────────────────────────────────────

{ file:'public/services/index.html', p:{
  title:'Autonomous Vehicle Infrastructure Services — AVNode',
  desc:'End-to-end infrastructure services for autonomous vehicle fleets — charging depots, staging hubs, fleet operations centers, site selection, and AV maintenance facilities.',
  url:'/services', eyebrow:'What We Build',
  h1:'Infrastructure Services for Autonomous Fleets',
  sub:'From site selection to daily operations, AVNode handles every layer of physical infrastructure so autonomous fleets can scale without distraction.',
  body:
    sec('Core Services','Everything the physical layer requires',
      'AVNode provides the full infrastructure stack autonomous fleet operators need — deployed in weeks, not years.',
      threeCards([
        {h:'Charging Infrastructure',p:'DC fast charging and Level 2 nodes deployed inside your demand zones — not at a distant central depot.'},
        {h:'Fleet Staging Hubs',p:'Pre-positioned vehicles near high-demand corridors. Ready to dispatch, not sitting idle.'},
        {h:'Operations Centers',p:'Fleet operations facilities with monitoring, dispatch, cleaning, and maintenance coordination.'},
        {h:'Site Selection',p:'Six-point qualification process to identify the right properties in the right locations.'},
        {h:'Maintenance Facilities',p:'Inspection bays, sensor calibration zones, and AV-capable service infrastructure.'},
        {h:'Real Estate Activation',p:'Hotel, parking, and commercial properties sourced, negotiated, and activated as AV nodes.'},
      ])
    )+
    sec('Who We Serve','Built for every autonomous fleet operator',
      'AVNode serves robotaxi networks, autonomous delivery companies, EV fleet managers, and autonomous trucking operators across our launch markets.',
      tags(['Waymo','Zoox','Uber AV','Nuro','Serve Robotics','Coco Robotics','Cartken','Avride','Moove','EV Fleet Operators','Autonomous Trucking'])
    )
}},

{ file:'public/services/av-infrastructure.html', p:{
  title:'Autonomous Vehicle Infrastructure | Charging Depots & Fleet Hubs — AVNode',
  desc:'AVNode deploys and operates distributed infrastructure for autonomous vehicle fleets. Charging depots, staging hubs, and fleet operations centers across major US markets.',
  url:'/services/av-infrastructure', eyebrow:'Autonomous Vehicle Infrastructure',
  h1:'End-to-End Infrastructure for Autonomous Vehicle Fleets',
  sub:'AVNode is the infrastructure operating system for autonomous mobility — sourcing, activating, and operating the physical layer that AV companies cannot build themselves at speed.',
  body:
    sec('The Problem at Scale','Infrastructure is the bottleneck to AV deployment',
      'Every AV company has world-class software and vehicles. None of them have solved physical infrastructure fast enough to match deployment timelines.',
      statRow([
        {n:'14 mi',l:'Average daily deadhead miles per vehicle driving to distant central depots'},
        {n:'47 min',l:'Productive time lost per vehicle per day in centralized charging queues'},
        {n:'$16.1M',l:'Annual operational drag for a 500-vehicle fleet using centralized infrastructure'},
      ])
    )+
    sec('The AVNode Model','Distributed nodes. Centralized management.',
      'AVNode activates a network of distributed charging and operations nodes — positioned inside your demand zones. Your central hub handles heavy operations. AVNode nodes handle daily charging, staging, and dispatch support.',
      twoCol(
        checklist(['Sites pre-qualified across active markets','Landlord relationships established before you arrive','Utility upgrades coordinated by AVNode','Charging hardware deployed and maintained','Operations managed end-to-end']),
        gridCards([
          {h:'Site Sourcing',p:'Demand-zone mapping and six-point qualification identifies the right properties.'},
          {h:'Activation',p:'Utility coordination, lease negotiation, and charging deployment — handled by AVNode.'},
          {h:'Operations',p:'Ongoing facility management, cleaning coordination, and fleet support.'},
          {h:'Expansion',p:'As your fleet grows, AVNode scales the node network to match deployment.'},
        ])
      )
    )+
    sec('Infrastructure Categories','Every layer of the physical stack','',
      threeCards([
        {h:'Charging Depots',p:'DC fast charging and Level 2 infrastructure at qualified sites near demand zones.'},
        {h:'Staging Hubs',p:'Vehicle staging that keeps your fleet close to where trips originate.'},
        {h:'Fleet Operations',p:'Dispatch support, cleaning, inspection, and minor maintenance coordination.'},
        {h:'Site Selection',p:'Market analysis, demand mapping, and property qualification in target cities.'},
        {h:'Maintenance Facilities',p:'Inspection bays, sensor calibration zones, and scheduled service infrastructure.'},
        {h:'Real Estate',p:'Hotel, parking, and commercial property activation as AV infrastructure nodes.'},
      ])
    )
}},

{ file:'public/services/robotaxi-depot-development.html', p:{
  title:'Robotaxi Depot Development | AV Fleet Infrastructure — AVNode',
  desc:'AVNode develops robotaxi depots — site selection, utility coordination, charging deployment, and daily operations. Built for Waymo, Zoox, Uber AV, and next-gen robotaxi fleets.',
  url:'/services/robotaxi-depot-development', eyebrow:'Robotaxi Infrastructure',
  h1:'Robotaxi Depot Development — Built for Scale',
  sub:'Robotaxi fleets need 24/7 charging, staging, cleaning, inspection, and dispatch infrastructure. AVNode develops and operates these facilities so operators focus on vehicles, not real estate.',
  body:
    sec('The Depot Challenge','Robotaxi depots don\'t exist in the commercial real estate market',
      'Traditional commercial real estate was never designed for autonomous vehicle operations — wrong power, wrong layout, no AV support, long permitting timelines. AVNode solves this by sourcing, qualifying, and activating properties purpose-fit for robotaxi operations.',
      twoCol(
        checklist(['480V+ DC fast charging infrastructure','Dedicated AV lanes and staging zones','24/7 staffed operations support','Security camera coverage and access control','Flexible lease terms matched to fleet growth','Pre-permitted and deployment-ready']),
        gridCards([
          {h:'Site Identification',p:'Demand-zone mapping to find viable properties — hotels, parking garages, commercial sites.'},
          {h:'Qualification',p:'Six-point assessment: power, access, security, capacity, location, lease stability.'},
          {h:'Buildout',p:'Charging hardware, traffic flow design, cleaning stations, inspection infrastructure.'},
          {h:'Operations',p:'Ongoing depot management, staffing, and fleet support services.'},
        ])
      )
    )+
    sec('Depot Specifications','What a robotaxi depot actually requires',
      'Requirements scale with fleet size. AVNode designs for current needs with growth capacity built in.',
      statRow([
        {n:'500–2,000',l:'Square feet per vehicle including charging, circulation, and staging space'},
        {n:'150+ kW',l:'DC fast charging power per stall for full charge in under 45 minutes'},
        {n:'30–90 days',l:'AVNode activation timeline vs. 12–24 months for independent buildout'},
      ])
    )+
    sec('Active Markets','Depot-ready infrastructure across launch markets',
      'AVNode has qualified property partners and deployment-ready nodes across six launch markets — with expansion underway in Los Angeles, Atlanta, and Las Vegas.',
      tags(['Houston, TX','Austin, TX','Dallas, TX','Phoenix, AZ','Tempe, AZ','Miami, FL','Los Angeles, CA ↗','Atlanta, GA ↗','Las Vegas, NV ↗'])
    )
}},

{ file:'public/services/fleet-charging-infrastructure.html', p:{
  title:'Fleet Charging Infrastructure | Autonomous Vehicle Charging Depots — AVNode',
  desc:'AVNode deploys distributed fleet charging infrastructure for autonomous vehicle operators. DC fast charging and Level 2 nodes inside demand zones — not at distant central depots.',
  url:'/services/fleet-charging-infrastructure', eyebrow:'Fleet Charging',
  h1:'Fleet Charging Infrastructure — Distributed, Fast, Operational',
  sub:'Central depot charging creates deadhead miles. AVNode places fast-charging nodes inside your demand zones so vehicles charge where they operate and return to service in minutes.',
  body:
    sec('The Centralized Charging Problem','When every vehicle has to drive back to charge, you lose on every dimension',
      'Seven miles to the depot. Forty-seven minutes in queue. Seven miles back. For every vehicle. Every shift. Multiply that across your fleet and the cost is staggering. AVNode\'s distributed charging model eliminates this entirely.',
      statRow([
        {n:'14 mi',l:'Daily deadhead miles eliminated per vehicle with distributed charging nodes'},
        {n:'47 min',l:'Productive time recovered per vehicle per day'},
        {n:'~80%',l:'Reduction in empty miles to/from charging when nodes are inside demand zones'},
      ])
    )+
    sec('Charging Infrastructure Types','Right hardware for every location and use case','',
      twoCol(
        gridCards([
          {h:'DC Fast Charging (50–350 kW)',p:'Deployed at high-traffic demand-zone nodes. Full charge in 20–45 minutes. Ideal for daytime between-shift charging.'},
          {h:'Level 2 (7–22 kW)',p:'Overnight and off-peak charging at hotel nodes and staging locations. Cost-effective for dwell-time locations.'},
          {h:'Utility Coordination',p:'AVNode manages all interconnection applications, panel upgrades, and utility negotiations on your behalf.'},
          {h:'Software Integration',p:'Charging management systems integrate with your fleet software for automated SOC monitoring and queue management.'},
        ]),
        checklist(['Sites pre-qualified for power capacity','Charging hardware procured and installed by AVNode','Uptime SLA and ongoing maintenance included','Demand charge management built into node design','Scalable from 10 to 10,000 vehicles','Multi-market deployment under one contract'])
      )
    )+
    sec('How It Works','Three phases to a charged fleet','',
      threeCards([
        {h:'01 — Site & Power Assessment',p:'We evaluate your operational area, map demand zones, and identify qualified charging sites with available power capacity.'},
        {h:'02 — Infrastructure Deployment',p:'Charging hardware is procured, installed, and commissioned. Utility upgrades are fully coordinated by AVNode.'},
        {h:'03 — Live Operations',p:'Nodes go live with charging management integration, uptime monitoring, and ongoing maintenance included.'},
      ])
    )
}},

{ file:'public/services/av-site-selection.html', p:{
  title:'Autonomous Vehicle Site Selection | AV Infrastructure Location Strategy — AVNode',
  desc:'AVNode\'s six-point site qualification process identifies the right properties for AV infrastructure. Demand-zone mapping, power assessment, and lease strategy included.',
  url:'/services/av-site-selection', eyebrow:'Site Selection',
  h1:'AV Site Selection — The Right Location Changes Everything',
  sub:'Infrastructure in the wrong location is worse than no infrastructure. AVNode\'s site selection process starts with demand-zone mapping and works backwards to the properties that will actually serve your fleet.',
  body:
    sec('The Six-Point Qualification','How AVNode evaluates every site',
      'Approximately 30% of submitted properties qualify as AVNode nodes. These are the six dimensions that determine whether a site makes the cut.',
      `<div>${listItems([
        {h:'24/7 Access or Staffing',p:'Autonomous fleets operate around the clock. Sites must have reliable 24/7 vehicle access and on-site staffing or remote monitoring capability.'},
        {h:'Minimum Space Capacity',p:'At least 5 dedicated vehicle spaces with appropriate ingress/egress for AV traffic flow and charging equipment placement.'},
        {h:'Existing Electrical Infrastructure',p:'Existing panel capacity that can support charging upgrades within a viable timeline and cost structure.'},
        {h:'Security Infrastructure',p:'Camera coverage and controlled access. AV vehicles represent significant capital assets requiring active protection.'},
        {h:'Demand Zone Proximity',p:'Within viable range of high-density ride or delivery demand — downtown cores, airports, hotel districts, medical centers.'},
        {h:'Lease or Ownership Stability',p:'Minimum 3-year commitment horizon. AV infrastructure requires stable, long-term property relationships.'},
      ])}</div>`
    )+
    sec('Property Types','Where AVNode nodes get activated','',
      threeCards([
        {h:'Hotel Parking',p:'Excess hotel parking near airports and downtown corridors. 24/7 staffing, existing utilities, prime locations — the highest-quality AV node category.', blue:true},
        {h:'Parking Garages',p:'Structured parking with available electrical panels and security infrastructure near transit and demand zones.'},
        {h:'Commercial Properties',p:'Office parks, retail centers, and mixed-use developments with underutilized parking assets.'},
        {h:'Industrial Sites',p:'For larger depot operations requiring maintenance bays, wash facilities, and high-power charging capacity.'},
      ])
    )+
    sec('Timeline','From first look to activated node',
      'AVNode compresses what typically takes 12–24 months into a 30–90 day activation process. We pre-qualify property relationships before fleet operators need them.',
      checklist([
        'Week 1–2: Demand zone mapping and initial property identification',
        'Week 2–4: Site visits, power assessment, and six-point qualification',
        'Week 4–8: Lease negotiation and utility coordination',
        'Week 8–12: Hardware deployment and commissioning',
        'Week 12+: Live operations with uptime SLA monitoring',
      ])
    )
}},

{ file:'public/services/fleet-operations-centers.html', p:{
  title:'Fleet Operations Centers | Autonomous Vehicle Operations Hub — AVNode',
  desc:'AVNode develops and operates fleet operations centers for autonomous vehicle companies — dispatch, monitoring, cleaning, inspection, and maintenance coordination under one roof.',
  url:'/services/fleet-operations-centers', eyebrow:'Fleet Operations',
  h1:'Fleet Operations Centers — The Command Layer for Autonomous Fleets',
  sub:'Autonomous vehicles need a physical operations hub. A place where cleaning happens, inspections run, remote assistance operators work, and the fleet is dispatched. AVNode builds and operates these facilities.',
  body:
    sec('What Happens Inside','Every fleet function under one roof','',
      threeCards([
        {h:'Fleet Dispatch',p:'Vehicle staging and dispatch coordination aligned with software dispatch systems and demand-zone positioning.'},
        {h:'Remote Monitoring',p:'Remote assistance operator stations with connectivity infrastructure for AV fleet oversight.'},
        {h:'Cleaning & Detailing',p:'Interior and exterior vehicle cleaning on regular cadence to maintain passenger experience standards.'},
        {h:'Inspection Lanes',p:'Daily inspection bays for visual checks, sensor verification, and tire and brake assessment.'},
        {h:'Minor Maintenance',p:'Tire rotation, fluid checks, and minor repair staging before vehicles return to active service.'},
        {h:'Charging Coordination',p:'Charging queue management and SOC monitoring integrated with fleet software systems.'},
      ])
    )+
    sec('Sizing','Right-sized for your fleet',
      'Fleet operations center requirements scale with fleet size. AVNode designs facilities that serve current operations with room to grow — without over-building day one.',
      twoCol(
        checklist([
          '50-vehicle hub: 5,000–8,000 sq ft',
          '200-vehicle hub: 15,000–25,000 sq ft',
          '500+ vehicle hub: 40,000+ sq ft with multi-function zones',
          'Staffing, technology, and workflow design included',
          'Single-market or distributed multi-node configurations',
        ]),
        gridCards([
          {h:'Single Market Hub',p:'One centralized operations facility serving a full city deployment with all functions under one roof.'},
          {h:'Distributed Model',p:'Multiple smaller operations nodes distributed across a market for faster fleet response times.'},
        ])
      )
    )
}},

{ file:'public/services/av-maintenance-facilities.html', p:{
  title:'Autonomous Vehicle Maintenance Facilities | AV Fleet Service Infrastructure — AVNode',
  desc:'AVNode develops maintenance and inspection facilities for autonomous vehicle fleets — sensor calibration, scheduled service zones, and inspection infrastructure built for AV requirements.',
  url:'/services/av-maintenance-facilities', eyebrow:'Maintenance Infrastructure',
  h1:'AV Maintenance Facilities — Engineered for Autonomous Vehicles',
  sub:'Autonomous vehicles have maintenance requirements traditional garages were never built to handle. Sensor calibration targets, lidar alignment zones, and AV-specific inspection infrastructure require purpose-built facilities.',
  body:
    sec('AV-Specific Requirements','What makes AV maintenance different','',
      threeCards([
        {h:'Sensor Calibration Zones',p:'Lidar, camera, and radar calibration requires specific physical infrastructure — target walls, alignment marks, and precise clearances not found in standard garages.'},
        {h:'Software Update Stations',p:'High-bandwidth connectivity for OTA software updates and diagnostic access while vehicles are in-bay.'},
        {h:'EV-Specific Service',p:'High-voltage safety protocols, battery management systems, and EV drivetrain service infrastructure.'},
        {h:'Inspection Lanes',p:'Daily inspection workflows for sensor status, connectivity, tires, brakes, and AV hardware operational status.'},
        {h:'Parts & Inventory',p:'On-site parts storage for high-frequency consumables and common AV hardware components.'},
        {h:'Cleanliness Standards',p:'AV sensors are sensitive to contamination. Maintenance bays require higher cleanliness standards than traditional auto garages.'},
      ])
    )+
    sec('Build vs. Partner','Why fleet operators partner with AVNode instead of building',
      'Building a purpose-built AV maintenance facility from scratch requires 12–18 months and $3–8M depending on market. AVNode activates adapted facilities in 60–90 days by sourcing and qualifying existing commercial properties and retrofitting them for AV requirements.',
      checklist([
        'Existing industrial or commercial building sourcing and qualification',
        'AV-specific retrofitting and equipment installation',
        'Utility upgrades for EV service infrastructure',
        'Staffing and operational workflow design',
        'Ongoing facility management and maintenance included',
      ])
    )
}},

{ file:'public/services/autonomous-delivery-infrastructure.html', p:{
  title:'Autonomous Delivery Infrastructure | Last Mile AV Hub Development — AVNode',
  desc:'AVNode builds and operates distributed infrastructure for autonomous delivery fleets — charging hubs, staging locations, and dispatch facilities for Nuro, Serve Robotics, Coco, Cartken, and last-mile AV operators.',
  url:'/services/autonomous-delivery-infrastructure', eyebrow:'Delivery Infrastructure',
  h1:'Autonomous Delivery Infrastructure — Last Mile at Machine Speed',
  sub:'Autonomous delivery fleets require denser infrastructure than robotaxis. Nuro, Serve Robotics, Coco, and Cartken need charging nodes, staging hubs, and dispatch facilities distributed throughout delivery zones.',
  body:
    sec('Delivery vs. Robotaxi Infrastructure','Why delivery is more infrastructure-intensive',
      'Autonomous delivery vehicles operate across a wider geographic area with more frequent charging needs. Last-mile delivery requires infrastructure density that makes centralized depots completely unworkable at scale.',
      twoCol(
        checklist([
          'Micro-hub model: charging access every 1–3 mile radius',
          'Sidewalk robots need Level 2 and secure indoor staging',
          'AV delivery vans need DCFC and loading/unloading zones',
          'Staging near restaurant and retail partner clusters',
          'Overnight secure parking at qualified sites',
        ]),
        gridCards([
          {h:'Sidewalk Robots',p:'Serve, Coco, Cartken — micro-charging stations and secure indoor staging near merchant clusters.'},
          {h:'AV Delivery Vans',p:'Nuro and van-format operators — Level 2 and DCFC charging plus loading zone infrastructure.'},
        ])
      )
    )+
    sec('Delivery Infrastructure Services','What AVNode provides for delivery operators','',
      threeCards([
        {h:'Micro-Charging Hubs',p:'Level 2 charging nodes inside delivery zones, activated at hotels, retail centers, and commercial properties near merchant clusters.', blue:true},
        {h:'Secure Staging',p:'Indoor overnight and off-peak staging for sidewalk robots and AV delivery vehicles in active delivery zones.'},
        {h:'Loading Infrastructure',p:'Merchant-adjacent loading and unloading zones for AV delivery dispatch and payload management.'},
        {h:'Multi-Market Rollout',p:'AVNode\'s existing property network accelerates delivery infrastructure across multiple markets simultaneously.'},
      ])
    )
}},

{ file:'public/services/commercial-real-estate-av.html', p:{
  title:'Commercial Real Estate for Autonomous Vehicle Fleets — AVNode',
  desc:'AVNode sources and activates commercial real estate — hotels, parking garages, industrial properties — as autonomous vehicle infrastructure nodes. No upfront real estate cost for fleet operators.',
  url:'/services/commercial-real-estate-av', eyebrow:'Real Estate for AV Fleets',
  h1:'Commercial Real Estate for Autonomous Fleets — Without the Real Estate Team',
  sub:'AVNode maintains active relationships with hotel operators, parking companies, and commercial developers across major markets. Fleet operators get infrastructure-ready sites without sourcing, negotiating, or managing real estate themselves.',
  body:
    sec('Property Categories','The four property types that work for AV infrastructure','',
      threeCards([
        {h:'Hotels',p:'Airport and downtown hotels with excess parking, existing utilities, 24/7 staffing, and prime demand-zone locations. The highest-quality AV node category.', blue:true},
        {h:'Parking Garages',p:'Structured parking with available electrical panels, security infrastructure, and proximity to urban demand zones.'},
        {h:'Commercial Buildings',p:'Office parks, retail centers, and mixed-use developments with underutilized surface parking that qualifies for AV activation.'},
        {h:'Industrial Sites',p:'Warehouse and light industrial sites for larger depot operations requiring maintenance bays and high-power charging.'},
      ])
    )+
    sec('For Property Owners','Idle parking becomes productive infrastructure',
      'AVNode partners with property owners to activate underutilized parking and commercial space as AV infrastructure nodes — generating recurring revenue with no upfront infrastructure cost.',
      twoCol(
        checklist([
          'Recurring monthly revenue from idle spaces',
          'Charging equipment funded by AVNode or fleet partner',
          'Long-term contracts with professional fleet operators',
          'AV-ready certification increases asset value',
          '$0 upfront cost to property owner',
          'No operational burden — AVNode manages the node',
        ]),
        gridCards([
          {h:'Application Process',p:'Submit your property. AVNode evaluates against six qualification criteria within 14 business days.'},
          {h:'Activation Timeline',p:'Qualified properties are activated within 30–90 days of lease execution.'},
        ])
      )
    )
}},

// ── INDUSTRIES ───────────────────────────────────────────────────

{ file:'public/industries/robotaxis.html', p:{
  title:'Infrastructure for Robotaxi Fleets | Waymo, Zoox, Uber AV — AVNode',
  desc:'AVNode builds the infrastructure layer for robotaxi operators — charging depots, staging hubs, and fleet operations centers for Waymo, Zoox, Uber AV, Lyft AV, and next-generation robotaxi networks.',
  url:'/industries/robotaxis', eyebrow:'Robotaxi Infrastructure',
  h1:'Infrastructure for Robotaxi Fleets — At Scale, From Day One',
  sub:'Waymo, Zoox, Uber AV, and the next generation of robotaxi operators need distributed charging, staging, and operations infrastructure inside demand zones. AVNode builds and operates this layer.',
  body:
    sec('The Scale Challenge','Robotaxi infrastructure math',
      'A 500-vehicle robotaxi fleet operating 20 hours a day needs infrastructure that scales with deployment — not a single depot that becomes a bottleneck.',
      statRow([
        {n:'2–4',l:'Nodes needed per 100 vehicles in a dense urban market for adequate charging coverage'},
        {n:'$16.1M',l:'Annual operational drag from centralized depot model vs. distributed nodes — 500 vehicles'},
        {n:'30–90 days',l:'AVNode activation timeline vs. 12–24 months building infrastructure from scratch'},
      ])
    )+
    sec('The Full Infrastructure Stack','What robotaxi fleets actually need',
      'Robotaxi operations require more than charging. Every vehicle needs a complete support system that keeps it in service, clean, inspected, and dispatched efficiently.',
      `<div>${listItems([
        {h:'Distributed Fast Charging',p:'DCFC nodes inside demand zones — downtown, airport, entertainment districts. Not at a distant industrial depot.'},
        {h:'Vehicle Staging',p:'Pre-positioned vehicles ready for high-demand windows. Staging near predicted demand reduces response time and deadhead miles.'},
        {h:'Daily Cleaning',p:'Interior cleaning after every few rides. Exterior wash at regular intervals. Passenger experience depends on vehicle condition.'},
        {h:'Inspection Infrastructure',p:'Daily vehicle checks for sensor status, tires, brakes, and connectivity. Requires physical inspection bays or drive-through lanes.'},
        {h:'Remote Assistance Stations',p:'Human operators available for edge cases. Requires connectivity infrastructure and physical workstations at fleet operations centers.'},
        {h:'Maintenance Coordination',p:'Scheduled maintenance, sensor calibration, and hardware service. Requires AV-capable maintenance facilities.'},
      ])}</div>`
    )+
    sec('Operator Compatibility','Built for every robotaxi platform',
      'AVNode infrastructure is hardware-agnostic and operator-agnostic. We deploy charging and operations infrastructure compatible with every autonomous vehicle platform operating today or launching in the next three years.',
      tags(['Waymo','Zoox','Uber AV','Lyft AV','Avride','Moove','May Mobility','Motional','WeRide','Navya'])
    )
}},

{ file:'public/industries/autonomous-delivery.html', p:{
  title:'Autonomous Delivery Infrastructure | Nuro, Serve Robotics, Coco, Cartken — AVNode',
  desc:'AVNode builds distributed infrastructure for autonomous delivery fleets. Charging micro-hubs, staging locations, and dispatch facilities for Nuro, Serve Robotics, Coco, Cartken, and last-mile AV operators.',
  url:'/industries/autonomous-delivery', eyebrow:'Autonomous Delivery',
  h1:'Infrastructure for Autonomous Delivery — Last Mile at Machine Speed',
  sub:'Autonomous delivery operators need infrastructure density that makes centralized depots unworkable. AVNode deploys micro-charging hubs, staging sites, and dispatch facilities distributed throughout delivery zones.',
  body:
    sec('Infrastructure for Every Delivery Format','Sidewalk robots to AV vans','',
      threeCards([
        {h:'Sidewalk Robots',p:'Serve Robotics, Coco, Cartken — secure indoor staging, micro-charging stations, and merchant-adjacent positioning across delivery zones.', blue:true},
        {h:'AV Delivery Vans',p:'Nuro and van-format operators — Level 2 and DCFC charging, loading/unloading zones, and maintenance access.'},
        {h:'Drone Delivery',p:'Ground-level logistics hubs with charging pads, payload management infrastructure, and coverage zone positioning.'},
      ])
    )+
    sec('The Density Problem','Delivery needs 3x more infrastructure than robotaxis',
      'A robotaxi may charge twice per shift from a location within 3 miles. An autonomous delivery vehicle makes 10–30 deliveries per shift across a dense urban area and needs charging access within every half mile. AVNode\'s distributed hotel and commercial property network is the only existing infrastructure that can support this density.',
      twoCol(
        checklist([
          'Micro-hubs at hotels near restaurant districts',
          'Secure overnight staging for fleet asset protection',
          'Loading zones adjacent to merchant partner clusters',
          'Charging managed automatically via software integration',
          'Multi-market rollout under one partnership agreement',
        ]),
        gridCards([
          {h:'Active Markets',p:'Houston, Austin, Dallas, Phoenix, Miami — delivery infrastructure available now.'},
          {h:'Expansion Markets',p:'Los Angeles, Atlanta, Las Vegas — site identification underway.'},
        ])
      )
    )
}},

{ file:'public/industries/autonomous-trucking.html', p:{
  title:'Autonomous Trucking Infrastructure | Transfer Hubs & Highway Depots — AVNode',
  desc:'AVNode develops autonomous trucking infrastructure — transfer hubs, highway charging corridors, and depot facilities for Aurora, Kodiak, Torc, and autonomous freight operators.',
  url:'/industries/autonomous-trucking', eyebrow:'Autonomous Trucking',
  h1:'Autonomous Trucking Infrastructure — Transfer Hubs and Highway Nodes',
  sub:'Autonomous trucks dominate highway miles but hand off to human drivers at urban edges. AVNode develops the transfer hub infrastructure where this handoff happens — and the highway-adjacent charging nodes that support long-haul AV routes.',
  body:
    sec('The Transfer Hub Model','Where AV trucks meet human drivers',
      'In the dominant autonomous trucking model, AV trucks handle the highway segment and transfer freight to short-haul human drivers at urban transfer hubs. These hubs need truck-grade charging, secure drop-zone infrastructure, and 24/7 operational capability.',
      twoCol(
        checklist([
          'Truck-rated power infrastructure (Megawatt Charging System compatible)',
          'Secure freight transfer and staging zones',
          'Highway-adjacent or near-highway locations',
          'Driver rest facilities and dispatch coordination',
          '24/7 access and security staffing',
        ]),
        gridCards([
          {h:'Highway Corridor Strategy',p:'AVNode maps freight corridors and identifies viable transfer hub locations at the urban edge of major Texas and Southeast markets.'},
          {h:'Class 8 Infrastructure',p:'Larger footprint, higher power requirements, and different traffic flow than passenger AV depots.'},
        ])
      )
    )+
    sec('Target Operators','Built for autonomous freight at scale',
      'AVNode\'s trucking infrastructure targets operators running autonomous freight across the major US highway corridors — Texas, I-10, I-35, I-40, and Southeast networks where AV trucking deployments are most active.',
      tags(['Aurora Innovation','Kodiak Robotics','Torc Robotics','Plus.ai','Gatik','Daimler Trucks AV','Volvo Autonomous Solutions','Continental AV'])
    )
}},

{ file:'public/industries/fleet-operators.html', p:{
  title:'Infrastructure for Fleet Operators | EV & AV Fleet Infrastructure — AVNode',
  desc:'AVNode provides infrastructure for autonomous and EV fleet operators — distributed charging, staging hubs, and operations facilities that complement your central hub and maximize fleet utilization.',
  url:'/industries/fleet-operators', eyebrow:'Fleet Operators',
  h1:'Infrastructure for Fleet Operators — Your Hub Extended',
  sub:'Your central hub runs your operation. AVNode\'s distributed nodes keep every vehicle earning — charging inside your demand zone instead of driving back to depot. Additive infrastructure that pays for itself in recovered utilization.',
  body:
    sec('Hub + Nodes = Maximum Fleet Utilization','The AVNode model for fleet managers',
      'AVNode is not a replacement for your central hub. It\'s the distributed layer that makes your hub more effective. Vehicles handle daily charging at AVNode nodes inside their operating zone. Your hub focuses on what it does best — deep maintenance, inspections, and fleet management.',
      twoCol(
        checklist([
          'Vehicles stay in revenue zones longer each shift',
          'Hub charging bays freed for maintenance and deep ops',
          'Fleet scales without scaling the hub footprint',
          'Enter new markets without building from scratch',
          'One contract covers multiple sites across multiple markets',
        ]),
        gridCards([
          {h:'For EV Fleet Managers',p:'Distributed charging infrastructure that eliminates costly deadhead miles and hub bottlenecks for human-operated EV fleets.'},
          {h:'For AV Operators',p:'Pre-qualified sites with established property relationships ready before your vehicles arrive in a new market.'},
        ])
      )
    )+
    sec('Fleet Impact','What distributed nodes return to your operation','',
      statRow([
        {n:'14 mi',l:'Daily deadhead miles recovered per vehicle — miles that become productive service time'},
        {n:'47 min',l:'Productive time returned per vehicle per day currently lost to depot charging queues'},
        {n:'$16.1M',l:'Annual operational cost recovered per 500-vehicle fleet switching to distributed infrastructure'},
      ])
    )
}},

// ── CITY PAGES ───────────────────────────────────────────────────

{ file:'public/markets/houston.html', p:{
  title:'Autonomous Vehicle Infrastructure in Houston, TX — AVNode',
  desc:'AVNode operates 12 active infrastructure nodes in Houston, Texas. Charging depots, staging hubs, and fleet operations infrastructure for AV operators across the Houston market.',
  url:'/markets/houston', eyebrow:'Active Market — Houston, TX',
  h1:'Autonomous Vehicle Infrastructure in Houston, Texas',
  sub:'Houston is AVNode\'s primary launch market with 12 active nodes across the airport corridor, Energy Corridor, Galleria, and Medical Center. Infrastructure is deployed and ready for fleet operators today.',
  body:
    sec('Houston Node Status','Active and available infrastructure','',
      statRow([
        {n:'12 / 20',l:'Nodes filled — 8 slots currently available for new fleet partnerships'},
        {n:'4',l:'Active demand zones: Airport, Galleria, Medical Center, Energy Corridor'},
        {n:'30 days',l:'Typical activation timeline for fleet operators entering the Houston market'},
      ])
    )+
    sec('Market Overview','Why Houston is a premier AV infrastructure market',
      'Houston is the fourth largest US city. Its sprawling geography makes distributed infrastructure critical for fleet efficiency. No state-level AV restrictions, year-round mild climate, and high hotel inventory near major airports make it an ideal AVNode deployment market.',
      twoCol(
        checklist([
          'IAH and Hobby airports with extensive hotel inventory',
          'Flat terrain — ideal conditions for AV operation',
          'Year-round mild climate reduces AV environmental stress',
          'CenterPoint Energy grid with active EV infrastructure programs',
          'No Texas state AV deployment restrictions',
          'Lower commercial real estate costs than coastal markets',
        ]),
        gridCards([
          {h:'Airport Corridor',p:'Highest-density node cluster. Hotel partners near IAH with 24/7 access and existing power infrastructure.'},
          {h:'Medical Center',p:'World\'s largest medical complex with consistent professional transportation demand.'},
          {h:'Energy Corridor',p:'High-income professional workforce with strong corporate AV deployment potential.'},
          {h:'Galleria District',p:'Retail and hotel density with strong daytime and evening demand patterns.'},
        ])
      )
    )+
    sec('Infrastructure Landscape','Power, real estate, and regulatory environment',
      'CenterPoint Energy serves Houston with grid expansion underway. Commercial power upgrades average 90–120 days. Hotel inventory near IAH is among the highest in Texas.',
      checklist([
        'CenterPoint Energy — active EV fleet incentive programs available',
        'ERCOT grid with expanding renewable capacity',
        '200+ hotels within 5 miles of IAH airport',
        'No AV-specific local permitting requirements in Houston',
        'Large commercial property inventory at competitive pricing',
      ])
    )
}},

{ file:'public/markets/austin.html', p:{
  title:'Autonomous Vehicle Infrastructure in Austin, TX — AVNode',
  desc:'AVNode operates 8 active infrastructure nodes in Austin, Texas — charging depots and fleet staging hubs across downtown Austin, the tech corridor, and Austin-Bergstrom Airport.',
  url:'/markets/austin', eyebrow:'Active Market — Austin, TX',
  h1:'Autonomous Vehicle Infrastructure in Austin, Texas',
  sub:'Austin is one of the most AV-forward cities in the US. AVNode operates 8 active nodes across downtown, the airport corridor, and the East Austin tech district — with capacity available for new fleet partnerships.',
  body:
    sec('Austin Node Status','Active infrastructure in place','',
      statRow([
        {n:'8 / 15',l:'Nodes filled — 7 slots available for new fleet partnerships'},
        {n:'3',l:'Active zones: Downtown, Airport Corridor, East Austin'},
        {n:'Q3 2026',l:'Expansion to North Austin and Domain district planned'},
      ])
    )+
    sec('Market Overview','Austin — America\'s AV testbed',
      'Austin combines a tech-forward regulatory environment, a dense downtown, and a rapidly growing population highly receptive to autonomous mobility. The city government is actively AV-friendly and Austin Energy offers strong EV fleet programs.',
      twoCol(
        checklist([
          'Large tech-industry workforce as early AV adopters',
          'Austin-Bergstrom Airport with growing passenger volumes',
          'UT campus creates consistent high-density demand zone',
          'Austin Energy (municipal utility) with active EV fleet programs',
          'SXSW and event calendar creates high surge demand windows',
        ]),
        gridCards([
          {h:'Downtown',p:'Highest AV demand concentration. Hotel partners on 6th Street and Congress Avenue corridors.'},
          {h:'Airport Corridor',p:'AUS hotel cluster with 24/7 access and strong incoming passenger demand.'},
          {h:'East Austin',p:'Growing tech and restaurant district with younger demographics driving AV adoption.'},
          {h:'Domain District',p:'North Austin tech campus corridor — expansion phase Q3 2026.'},
        ])
      )
    )
}},

{ file:'public/markets/dallas.html', p:{
  title:'Autonomous Vehicle Infrastructure in Dallas, TX — AVNode',
  desc:'AVNode operates 15 active infrastructure nodes in Dallas — AVNode\'s largest Texas market. Charging depots and fleet hubs across the DFW corridor, Uptown, Plano, and Irving.',
  url:'/markets/dallas', eyebrow:'Active Market — Dallas, TX',
  h1:'Autonomous Vehicle Infrastructure in Dallas, Texas',
  sub:'Dallas is AVNode\'s largest Texas market with 15 active nodes across the DFW corridor, Uptown, Plano, and Irving. DFW Airport alone represents one of the highest-potential AV infrastructure opportunities in the country.',
  body:
    sec('Dallas Node Status','Infrastructure at scale','',
      statRow([
        {n:'15 / 25',l:'Nodes filled — 10 slots available for new fleet partnerships'},
        {n:'4',l:'Active zones: DFW Corridor, Uptown, Plano, Irving'},
        {n:'#1',l:'Largest AVNode market by node count in Texas'},
      ])
    )+
    sec('Market Overview','Dallas-Fort Worth — logistics and mobility at scale',
      'The DFW metroplex is the fourth-largest US metro and one of the fastest growing. DFW Airport is one of the busiest in the world, creating massive AV passenger demand. Flat geography and extensive highway infrastructure make it ideal for AV fleet operation.',
      twoCol(
        checklist([
          'DFW Airport — 75M+ annual passengers',
          'Flat terrain and grid-based roads across suburban markets',
          'Major highway infrastructure for autonomous trucking routes',
          'High concentration of Fortune 500 corporate campuses',
          'Lower commercial real estate costs than coastal markets',
        ]),
        gridCards([
          {h:'DFW Corridor',p:'Hotel cluster near DFW airport with aviation-adjacent demand and existing infrastructure.'},
          {h:'Uptown / Downtown',p:'Entertainment and business district with strong evening and weekend AV demand.'},
          {h:'Plano',p:'Corporate campus corridor — consistent B2B autonomous transportation demand.'},
          {h:'Irving',p:'Las Colinas business district — adjacent to DFW with strong corporate AV demand.'},
        ])
      )
    )
}},

{ file:'public/markets/phoenix.html', p:{
  title:'Autonomous Vehicle Infrastructure in Phoenix & Tempe, AZ — AVNode',
  desc:'AVNode operates infrastructure nodes in Phoenix and Tempe, Arizona — Waymo\'s primary commercial market and the most AV-mature city in the US.',
  url:'/markets/phoenix', eyebrow:'Active Market — Phoenix / Tempe, AZ',
  h1:'Autonomous Vehicle Infrastructure in Phoenix and Tempe, Arizona',
  sub:'Phoenix and Tempe are the most AV-mature markets in the US. Waymo has operated commercial robotaxis here longer than anywhere else in the world. AVNode infrastructure is active and available for operators entering this market.',
  body:
    sec('Phoenix / Tempe Node Status','Deployment-ready infrastructure','',
      statRow([
        {n:'4 / 10',l:'Tempe nodes filled — limited capacity remaining'},
        {n:'Phase 2',l:'Phoenix expansion — site identification underway'},
        {n:'#1',l:'Most AV-mature US market by commercial deployment volume'},
      ])
    )+
    sec('Market Overview','The global testbed for autonomous vehicles',
      'Waymo\'s commercial Waymo One service has operated in the Phoenix metro area since 2018. The flat terrain, grid-based roads, year-round dry climate, and AV-supportive regulatory environment make this the proving ground for autonomous fleet infrastructure.',
      twoCol(
        checklist([
          'Year-round ideal AV conditions — flat, dry, grid-based roads',
          'Waymo commercial operations active — proven demand exists',
          'APS and SRP utility providers with active EV programs',
          'PHX Sky Harbor Airport with major hotel inventory',
          'ASU campus district — 75,000+ students driving AV demand',
        ]),
        gridCards([
          {h:'Heat Management',p:'At 115°F+ summer temperatures, AVNode sites include thermal management design for EV battery protection.'},
          {h:'APS / SRP Power',p:'Both Arizona utilities have active EV fleet programs. Power upgrades typically 60–90 days.'},
          {h:'Tempe Priority',p:'Current nodes focus on ASU district and Waymo operational zone for maximum utilization.'},
          {h:'Phoenix Expansion',p:'Phase 2 targets Scottsdale, Chandler, and PHX airport corridor.'},
        ])
      )
    )
}},

{ file:'public/markets/miami.html', p:{
  title:'Autonomous Vehicle Infrastructure in Miami, FL — AVNode',
  desc:'AVNode operates 9 active infrastructure nodes in Miami, Florida — charging depots and fleet staging hubs across Brickell, Miami Beach, Wynwood, and the MIA airport corridor.',
  url:'/markets/miami', eyebrow:'Active Market — Miami, FL',
  h1:'Autonomous Vehicle Infrastructure in Miami, Florida',
  sub:'Miami is an active AVNode market with 9 nodes across Brickell, the MIA airport corridor, Miami Beach, and Wynwood. Florida\'s permissive AV legislation and high tourism demand make it one of AVNode\'s highest-potential markets.',
  body:
    sec('Miami Node Status','Active nodes across South Florida','',
      statRow([
        {n:'9 / 20',l:'Nodes filled — 11 slots available for new partnerships'},
        {n:'4',l:'Active zones: Brickell, MIA Corridor, Miami Beach, Wynwood'},
        {n:'28M+',l:'Annual international visitors creating tourism-driven AV demand'},
      ])
    )+
    sec('Market Overview','Tourism, density, and AV-forward regulation',
      'Miami combines a dense urban core, massive international tourism, MIA airport passenger volume, and Florida\'s permissive AV legislation. The city\'s high hotel inventory provides AVNode with prime infrastructure sites across all major demand corridors.',
      twoCol(
        checklist([
          'Florida AV legislation allows statewide autonomous operation',
          'MIA handles 50M+ passengers annually',
          'International tourist base familiar with robotaxi services globally',
          'Dense hotel inventory on Brickell and Miami Beach corridors',
          'FPL (Florida Power & Light) serves the market with EV programs',
        ]),
        gridCards([
          {h:'Flood Resilience',p:'AVNode Miami sites are evaluated for flood risk. Charging infrastructure elevated or waterproofed to Miami-Dade standards.'},
          {h:'Hurricane Planning',p:'Infrastructure includes hardening protocols for seasonal hurricane preparedness.'},
          {h:'Tourism Seasonality',p:'Node capacity sized for peak season demand while remaining efficient year-round.'},
          {h:'MIA Corridor',p:'Airport hotel cluster with 24/7 operations — highest-demand Miami zone.'},
        ])
      )
    )
}},

{ file:'public/markets/los-angeles.html', p:{
  title:'Autonomous Vehicle Infrastructure in Los Angeles, CA — AVNode',
  desc:'AVNode is building AV infrastructure across Los Angeles — charging depots and fleet operations facilities for Waymo, Zoox, and autonomous fleet operators entering the LA market.',
  url:'/markets/los-angeles', eyebrow:'Expansion Market — Los Angeles, CA',
  h1:'Autonomous Vehicle Infrastructure in Los Angeles, California',
  sub:'Los Angeles is AVNode\'s largest expansion market. Waymo, Zoox, and multiple AV operators hold CPUC deployment permits for LA. AVNode is building the infrastructure layer before scale deployment begins.',
  body:
    sec('LA Market Status','Site identification underway','',
      statRow([
        {n:'Phase 3',l:'Market status — site identification and property qualification in progress'},
        {n:'10M+',l:'Los Angeles population — largest potential AV passenger market in the US'},
        {n:'Q4 2026',l:'Target activation timeline for first LA infrastructure nodes'},
      ])
    )+
    sec('Market Overview','The biggest AV infrastructure opportunity in the country',
      'Los Angeles has the largest population density, the worst traffic congestion (the highest AV demand signal), and the most active AV operator permit holders of any US city. AVNode is prioritizing the LAX corridor and Westside demand zones for first-phase node activation.',
      twoCol(
        checklist([
          'Waymo, Zoox, and others hold active CPUC AV deployment permits',
          'LAX handles 90M+ passengers annually — airport infrastructure priority',
          'Entertainment industry creates high-value trip demand',
          'LADWP and SCE both have EV fleet incentive programs',
          'Industrial and commercial real estate available near demand zones',
        ]),
        gridCards([
          {h:'LAX Corridor',p:'Airport hotel cluster is LA priority. Massive passenger demand and extensive hotel inventory with existing infrastructure.'},
          {h:'Permitting',p:'LA permitting is more complex than Texas markets. AVNode\'s qualification process accounts for LADWP and city requirements.'},
        ])
      )
    )
}},

{ file:'public/markets/atlanta.html', p:{
  title:'Autonomous Vehicle Infrastructure in Atlanta, GA — AVNode',
  desc:'AVNode is developing AV infrastructure in Atlanta, Georgia — home to the world\'s busiest airport and a rapidly growing tech sector. Priority AVNode expansion market.',
  url:'/markets/atlanta', eyebrow:'Expansion Market — Atlanta, GA',
  h1:'Autonomous Vehicle Infrastructure in Atlanta, Georgia',
  sub:'Hartsfield-Jackson Atlanta International Airport is the world\'s busiest airport. The AV infrastructure opportunity this creates — combined with Atlanta\'s growing tech sector and Georgia\'s AV-friendly legislation — makes it a priority AVNode expansion market.',
  body:
    sec('Market Overview','The Southeast\'s AV infrastructure hub',
      'Georgia passed autonomous vehicle legislation in 2017, making it one of the earliest AV-enabling states. Atlanta\'s combination of the world\'s busiest airport, a growing tech sector, and lower commercial real estate costs than coastal markets makes it a high-priority AVNode expansion city.',
      twoCol(
        checklist([
          'Hartsfield-Jackson: 110M+ passengers annually',
          'Georgia Power with stable, cost-effective electricity and EV programs',
          'Midtown and Buckhead high-density demand zones',
          'Lower commercial RE costs than coastal markets',
          'Georgia AV legislation enacted 2017 — permissive environment',
        ]),
        gridCards([
          {h:'Airport Priority',p:'Hotel cluster near ATL airport is AVNode\'s Atlanta phase one focus. Massive passenger demand with existing infrastructure.'},
          {h:'Georgia Power',p:'Reliable utility with commercial EV fleet programs and reasonable interconnection timelines.'},
          {h:'Midtown',p:'Growing tech presence with Microsoft, Apple, and Google creating consistent high-value demand.'},
          {h:'Timeline',p:'Phase 2 expansion market. Site identification active. First nodes targeted Q1 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/las-vegas.html', p:{
  title:'Autonomous Vehicle Infrastructure in Las Vegas, NV — AVNode',
  desc:'AVNode is developing AV infrastructure in Las Vegas — casino hotel parking structures, Strip corridor charging nodes, and fleet infrastructure for autonomous vehicle operators in Nevada.',
  url:'/markets/las-vegas', eyebrow:'Expansion Market — Las Vegas, NV',
  h1:'Autonomous Vehicle Infrastructure in Las Vegas, Nevada',
  sub:'Nevada has some of the most permissive AV legislation in the US. 42M+ annual visitors create concentrated, predictable AV demand on the Strip. Casino hotel parking structures are AVNode\'s competitive advantage in this market.',
  body:
    sec('Market Overview','The world\'s most concentrated AV demand zone',
      'The Las Vegas Strip is arguably the highest-concentration AV demand zone in the world — millions of visitors who don\'t have cars, moving between hotels, casinos, restaurants, and the airport in predictable, repeatable patterns. Nevada\'s AV framework was established in 2011.',
      twoCol(
        checklist([
          'Nevada AV legislation established 2011 — longest US track record',
          '42M+ annual visitors with concentrated, predictable demand',
          'Casino hotel parking: 24/7 security, massive power infrastructure',
          'Harry Reid International Airport adjacent to Strip corridor',
          'NV Energy with active EV infrastructure programs',
        ]),
        gridCards([
          {h:'Casino Hotel Strategy',p:'Large casino properties have excess parking capacity, existing electrical infrastructure, 24/7 staffing, and prime Strip positioning — ideal AVNode candidates.'},
          {h:'Strip Corridor',p:'Highest AV demand density in the US. Short trip distances with extremely high trip volume create maximum charging node utilization.'},
        ])
      )
    )
}},

{ file:'public/markets/nashville.html', p:{
  title:'Autonomous Vehicle Infrastructure in Nashville, TN — AVNode',
  desc:'AVNode is building AV infrastructure in Nashville — one of the fastest-growing US cities with no AV restrictions, a booming tourism economy, and significant infrastructure investment underway.',
  url:'/markets/nashville', eyebrow:'Expansion Market — Nashville, TN',
  h1:'Autonomous Vehicle Infrastructure in Nashville, Tennessee',
  sub:'Nashville is one of the fastest-growing major US cities with no state AV restrictions, a booming tourism economy, and commercial real estate costs far below coastal markets. AVNode is building infrastructure ahead of demand.',
  body:
    sec('Market Overview','Building infrastructure ahead of the growth curve',
      'Nashville\'s population has grown 20%+ in the past decade. BNA airport is expanding rapidly. The city\'s hospitality infrastructure — hotels, entertainment venues, and the music district — creates ideal AVNode node candidates. Tennessee has no AV-specific restrictions.',
      twoCol(
        checklist([
          'Fastest-growing major US city by population',
          'BNA Airport expansion driving passenger volume growth',
          'Lower commercial real estate costs than coastal markets',
          'No Tennessee state AV restrictions',
          'Nashville Electric Service and TVA — stable, low-cost power',
          'Major convention and entertainment calendar creates surge demand',
        ]),
        gridCards([
          {h:'Broadway District',p:'Entertainment district with high-density visitor demand. Hotel inventory on Lower Broadway is prime AVNode territory.'},
          {h:'BNA Corridor',p:'Airport hotel cluster expanding with BNA\'s infrastructure growth — priority node location.'},
          {h:'Germantown / Gulch',p:'Upscale residential and hospitality district with consistent high-value demand.'},
          {h:'Timeline',p:'Phase 2 expansion market. Site identification underway. First nodes targeted 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/seattle.html', p:{
  title:'Autonomous Vehicle Infrastructure in Seattle, WA — AVNode',
  desc:'AVNode is developing AV infrastructure in Seattle — home to Amazon, Microsoft, and the world\'s most ambitious autonomous delivery programs. Infrastructure development underway.',
  url:'/markets/seattle', eyebrow:'Expansion Market — Seattle, WA',
  h1:'Autonomous Vehicle Infrastructure in Seattle, Washington',
  sub:'Amazon, Microsoft, and a dense tech workforce make Seattle a unique AV infrastructure market — where the companies building autonomous delivery are headquartered, and where they will deploy first.',
  body:
    sec('Market Overview','Where autonomous delivery starts',
      'Seattle is Amazon\'s home market and the epicenter of autonomous delivery ambition. The combination of a dense urban core, a massive tech workforce as early adopters, and the presence of the world\'s most ambitious AV delivery programs makes Seattle a strategic infrastructure priority.',
      twoCol(
        checklist([
          'Amazon Prime Air and autonomous delivery programs based in Seattle',
          'Microsoft and tech workforce — highest AV adoption demographic',
          'Seattle City Light: clean renewable grid with active EV programs',
          'Dense Capitol Hill, South Lake Union, and Belltown demand zones',
          'Sea-Tac Airport with major hotel inventory and consistent demand',
        ]),
        gridCards([
          {h:'Terrain Consideration',p:'Seattle\'s hilly terrain limits some AV operation zones. AVNode sites focus on the flatter South Lake Union and downtown corridors.'},
          {h:'Delivery Focus',p:'AVNode targets sites compatible with Amazon\'s autonomous delivery zone expansion from their Seattle headquarters.'},
          {h:'Sea-Tac Corridor',p:'Airport hotel cluster with high passenger volume and existing infrastructure — phase one priority.'},
          {h:'Timeline',p:'Phase 3 market. Strategic site identification active. First nodes targeted 2027.'},
        ])
      )
    )
}},

// ── RESOURCES ────────────────────────────────────────────────────

{ file:'public/resources/index.html', p:{
  title:'AV Infrastructure Resource Center — Guides, Reports & Deep Dives | AVNode',
  desc:'The definitive resource library for autonomous vehicle infrastructure. Guides on depot development, fleet charging, site selection, markets, and AV fleet operations.',
  url:'/resources', eyebrow:'Resource Center',
  h1:'The AV Infrastructure Resource Library',
  sub:'The most comprehensive collection of autonomous vehicle infrastructure knowledge available. Written for operators, investors, and infrastructure partners building the future of autonomous mobility.',
  cta: false,
  body:
    sec('Featured Guides','Start here',
      'The foundational documents for understanding AV infrastructure — what it is, what it costs, and how to build it.',
      threeCards([
        {h:'The Complete Guide to AV Infrastructure',p:'Every category of autonomous vehicle infrastructure — what it is, what it costs, and how to build it. The definitive reference.',blue:true},
        {h:'How Robotaxi Depots Work',p:'A 24-hour operational walkthrough of a robotaxi depot — charging, cleaning, inspection, dispatch, and maintenance.'},
        {h:'The Hidden Cost of Deadhead Miles',p:'14 miles per vehicle, per day. The math behind centralized depot drag and how distributed nodes eliminate it.'},
        {h:'AV Site Selection Guide',p:'The six dimensions that determine whether a property qualifies as AV infrastructure — and how to evaluate them.'},
        {h:'Fleet Charging Economics',p:'Build vs. partner analysis. CapEx, OpEx, and the per-vehicle cost of getting charging infrastructure right.'},
        {h:'Power Requirements for AV Fleets',p:'kW, kWh, demand charges, and utility interconnection — everything an AV operator needs to know before signing a lease.'},
      ])
    )+
    sec('Browse by Topic','Every infrastructure topic covered','',
      tags(['Depot Development','Fleet Charging','Site Selection','City Markets','Real Estate','Fleet Operations','Autonomous Delivery','Autonomous Trucking','eVTOL','Regulatory','Economics & Finance','Technology & Hardware'])
    )+
    sec('Coming Soon','In-depth guides publishing monthly',
      'AVNode\'s resource center publishes one long-form infrastructure guide per month. Subscribe to be notified when new guides are available.',
      checklist([
        'How Robotaxi Depots Work — The Complete Operational Guide',
        'The Economics of Fleet Charging Infrastructure',
        'AV Infrastructure by City — Market-by-Market Guide',
        'Why Hotels Are the Secret AV Infrastructure Network',
        'Autonomous Trucking Transfer Hubs — Design and Development',
      ])
    )
}},

];

let count = 0;
pages.forEach(({file, p}) => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(file, shell(p));
  console.log(`✓ ${file}`);
  count++;
});
console.log(`\n✓ Generated ${count} pages.`);
