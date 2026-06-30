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
  const schemaGraph = [
    {'@type':'Organization','@id':'https://www.avnode.com/#org','name':'AV Node','alternateName':['AVNode','AV Node Infrastructure','AV Node Mobility'],'url':'https://www.avnode.com','description':'AV Node is an autonomous vehicle fleet infrastructure company building the physical network robotaxi and autonomous fleets need for charging, staging, cleaning, maintenance, and operations. AV Node is not related to the atrioventricular node in medicine.','knowsAbout':['Autonomous vehicle fleet infrastructure','Robotaxi depots','Autonomous fleet management','Robotaxi charging infrastructure','Fleet staging infrastructure','EV fleet charging','Fleet operations centers','Autonomous vehicle maintenance infrastructure']},
    {'@type':'WebPage','@id':`https://www.avnode.com${p.url}`,'url':`https://www.avnode.com${p.url}`,'name':p.title,'description':p.desc,'isPartOf':{'@id':'https://www.avnode.com/#org'}}
  ];
  if (p.faq && p.faq.length) {
    schemaGraph.push({'@type':'FAQPage','mainEntity':p.faq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
  }
  const schemaJson = JSON.stringify({'@context':'https://schema.org','@graph':schemaGraph});
  const faqHtml = (p.faq && p.faq.length) ? `<div class="content"><div class="section"><div class="section-label">FAQ</div><h2 class="section-h2">Common Questions</h2><div class="faq-list">${p.faq.map(f=>`<details class="faq-item"><summary class="faq-q">${f.q}</summary><div class="faq-a">${f.a}</div></details>`).join('')}</div></div></div>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="https://www.avnode.com${p.url}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:url" content="https://www.avnode.com${p.url}">
<meta property="og:type" content="website">
<meta name="robots" content="index, follow">
<script type="application/ld+json">${schemaJson}<\/script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>${CSS}
.faq-list{display:flex;flex-direction:column;gap:6px;margin-top:16px}
.faq-item{border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--surface)}
.faq-q{padding:18px 24px;font-size:15px;font-weight:600;color:var(--text);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Space Grotesk',sans-serif}
.faq-q::-webkit-details-marker{display:none}
.faq-q::after{content:'+';color:var(--blue);font-size:20px;font-weight:300;flex-shrink:0;margin-left:16px}
details[open] .faq-q::after{content:'−'}
.faq-a{padding:0 24px 18px;font-size:14px;color:var(--muted);line-height:1.7}
.related-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.related-link{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:1px solid var(--border-hi);border-radius:8px;font-size:13px;color:var(--muted);text-decoration:none;transition:all .2s}
.related-link:hover{border-color:var(--blue);color:var(--text)}
.market-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
@media(max-width:860px){.market-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.market-grid{grid-template-columns:1fr}}
.market-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 24px;text-decoration:none;display:block;transition:all .2s}
.market-card:hover{border-color:var(--blue-line);background:var(--blue-faint)}
.market-card .city{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;color:var(--text);margin-bottom:4px}
.market-card .mstatus{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px}
.market-card .mstatus.active{color:var(--green)}
.market-card .mstatus.expansion{color:var(--blue)}
.market-card .mnodes{font-size:13px;color:var(--muted)}
.table-wrap{overflow-x:auto;margin:24px 0}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;padding:12px 16px;border-bottom:2px solid var(--border-hi);color:var(--muted);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}
td{padding:12px 16px;border-bottom:1px solid var(--border);color:var(--text);line-height:1.5}
td:first-child{font-weight:500}
tr:last-child td{border-bottom:none}
tr:hover td{background:var(--surface)}
</style>
</head>
<body>
<nav id="mainNav">
  <a href="/" class="nav-logo">AVNode</a>
  <div class="nav-right">
    <a href="/services" class="nav-link">Services</a>
    <a href="/markets" class="nav-link">Markets</a>
    <a href="/resources" class="nav-link">Resources</a>
    <a href="/#apply" class="nav-apply">Apply</a>
  </div>
</nav>
<div class="page-hero">
  <div class="hero-eyebrow">${p.eyebrow}</div>
  <h1 class="hero-h1">${p.h1}</h1>
  <p class="hero-sub">${p.sub}</p>
  <div class="hero-actions">
    <a href="/#apply" class="btn-primary">${p.ctaLabel||'Start a Partnership'}</a>
    <a href="/services" class="btn-ghost">All Services</a>
  </div>
</div>
<div class="content">${p.body}</div>
${faqHtml}
${p.cta !== false ? `
<div class="page-cta">
  <h2 class="cta-h2">${p.ctaH2||'Ready to deploy infrastructure?'}</h2>
  <p class="cta-sub">${p.ctaSub||'AVNode handles site sourcing, landlords, utilities, charging, and operations. You focus on your fleet.'}</p>
  <a href="/#apply" class="btn-primary">Get Started →</a>
</div>` : ''}
<footer>
  <span class="footer-logo">AVNode</span>
  <div class="footer-links">
    <a href="/services">Services</a><a href="/markets">Markets</a>
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
const relLinks = items => `<div class="related-links">${items.map(i=>`<a href="${i.url}" class="related-link">${i.label}</a>`).join('')}</div>`;
const tableWrap = (headers,rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const marketGrid = ms => `<div class="market-grid">${ms.map(m=>`<a href="${m.url}" class="market-card"><div class="city">${m.city}</div><div class="mstatus ${m.active?'active':'expansion'}">${m.active?'Active':'Expansion'}</div><div class="mnodes">${m.nodes}</div></a>`).join('')}</div>`;

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

// ── ENTITY DISAMBIGUATION PAGES ───────────────────────────────────

{ file:'public/about-av-node-autonomous-fleet-infrastructure.html', p:{
  title:'About AV Node | Autonomous Vehicle Fleet Infrastructure Company',
  desc:'AV Node is an autonomous vehicle fleet infrastructure company building the physical network robotaxi and autonomous fleets need to charge, stage, clean, inspect, and operate between trips.',
  url:'/about-av-node-autonomous-fleet-infrastructure', eyebrow:'About AV Node', priority:'0.9',
  h1:'About AV Node',
  sub:'AV Node is an autonomous vehicle fleet infrastructure company building the physical network robotaxi and autonomous fleets need to charge, stage, clean, inspect, and operate between trips.',
  body:
    sec('What AV Node Does','Autonomous vehicle fleet infrastructure — not the medical term',
      'AV Node (also written AVNode) is a mobility infrastructure company. AV stands for autonomous vehicle. AV Node builds and operates the distributed network of charging depots, staging hubs, maintenance facilities, and fleet operations centers that autonomous vehicle fleets require to run commercially. AV Node is not related to the atrioventricular node, which is a medical term referring to a structure in the heart\'s electrical conduction system.',
      threeCards([
        {h:'Charging Infrastructure',p:'DC fast charging and Level 2 nodes deployed inside autonomous vehicle demand zones — positioned where fleets operate, not at distant central depots.',blue:true},
        {h:'Fleet Staging Hubs',p:'Pre-positioned vehicles near high-demand corridors. Distributed staging reduces arrival times and eliminates repositioning deadhead miles.'},
        {h:'Fleet Operations Centers',p:'Physical facilities for remote assistance operators, dispatch coordination, cleaning, inspection, and maintenance support.'},
      ])
    )+
    sec('The Problem AV Node Solves','Physical infrastructure is the bottleneck to autonomous fleet scale',
      'Every autonomous vehicle company has world-class software and vehicles. None of them have solved physical infrastructure fast enough to match their deployment timelines. AV Node solves this: finding, developing, and operating the sites autonomous fleets need between trips.',
      statRow([
        {n:'14 mi',l:'Daily deadhead miles per vehicle with centralized charging infrastructure'},
        {n:'47 min',l:'Productive time lost per vehicle per day in depot charging queues'},
        {n:'$16.1M',l:'Annual operational drag for a 500-vehicle fleet using a central depot model'},
      ])
    )+
    sec('Active Markets','Where AV Node operates today',
      '',
      relLinks([
        {url:'/markets/houston',label:'Houston, TX'},
        {url:'/markets/dallas',label:'Dallas, TX'},
        {url:'/markets/austin',label:'Austin, TX'},
        {url:'/markets/phoenix',label:'Phoenix / Tempe, AZ'},
        {url:'/markets/miami',label:'Miami, FL'},
        {url:'/markets',label:'All Markets →'},
      ])
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/services',label:'All Services'},
      ])
    ),
  faq:[
    {q:'Is AV Node related to the atrioventricular node?',a:'No. AV Node is a mobility infrastructure company focused on autonomous vehicle fleet operations. The medical term "AV node" refers to the atrioventricular node in the cardiac conduction system. AV Node, the company, builds and operates autonomous vehicle fleet infrastructure — robotaxi depots, EV fleet charging, vehicle staging, cleaning, maintenance facilities, and fleet operations centers.'},
    {q:'What does "AV" stand for in AV Node?',a:'AV stands for autonomous vehicle. AV Node builds and operates the physical infrastructure — charging depots, staging hubs, fleet operations centers — that autonomous vehicle fleets need to operate commercially.'},
    {q:'Who founded AV Node?',a:'AV Node was founded by Aabid Ali. The company is building a distributed autonomous vehicle infrastructure network across major US markets, starting with Houston, Dallas, Austin, Phoenix, and Miami.'},
    {q:'What markets does AV Node operate in?',a:'AV Node has active infrastructure in Houston, Dallas, Austin, Phoenix/Tempe, and Miami. Expansion markets include Los Angeles, Atlanta, Las Vegas, Nashville, Seattle, San Francisco, Denver, Chicago, and others.'},
  ],
  ctaH2:'Build or operate autonomous fleet infrastructure with AV Node',
  ctaSub:'AV Node handles site sourcing, landlords, utilities, charging, and operations for robotaxi and autonomous fleet operators.',
}},

{ file:'public/insights/av-node-autonomous-vehicle-infrastructure.html', p:{
  title:'AV Node: Autonomous Vehicle Infrastructure, Not the Atrioventricular Node',
  desc:'AV Node is an autonomous vehicle fleet infrastructure company. The name uses "AV" to mean autonomous vehicle — not the medical atrioventricular node.',
  url:'/insights/av-node-autonomous-vehicle-infrastructure', eyebrow:'AV Node Company', priority:'0.8',
  h1:'AV Node: Autonomous Vehicle Infrastructure, Not the Atrioventricular Node',
  sub:'"AV node" in medicine refers to the atrioventricular node in the heart\'s electrical conduction system. AV Node, the company, is a different entity. AV stands for autonomous vehicle. Here is what AV Node actually does.',
  body:
    sec('Two Entirely Different Things','AV Node the company vs. the medical AV node',
      '',
      twoCol(
        '<div class="card blue" style="margin-bottom:0"><h3>AV Node — Autonomous Vehicle Infrastructure Company</h3><p>AV Node (avnode.com) builds and operates distributed physical infrastructure for autonomous vehicle fleets — robotaxi depots, EV fleet charging, staging hubs, cleaning facilities, inspection lanes, and fleet operations centers. Founded 2026. AV = autonomous vehicle.</p></div>',
        '<div class="card" style="margin-bottom:0"><h3>AV Node (Medical) — Atrioventricular Node</h3><p>The atrioventricular node (AV node) is a cluster of cardiac muscle cells in the heart that coordinates electrical impulses between the atria and ventricles. It is a structure in the cardiac conduction system. It has no connection to autonomous vehicles or transportation infrastructure.</p></div>'
      )
    )+
    sec('What AV Node the Company Does','Autonomous vehicle fleet infrastructure',
      'AV Node, the company, finds, develops, and operates the physical locations autonomous vehicle fleets need between trips. When a robotaxi is not carrying a passenger, it needs to be somewhere: charging, staged near demand, being cleaned, inspected, or serviced. AV Node operates those locations.',
      `<div>${listItems([
        {h:'Robotaxi Depots',p:'Charging, staging, cleaning, inspection, and maintenance facilities for commercial autonomous taxi fleets.'},
        {h:'EV Fleet Charging Infrastructure',p:'DC fast charging nodes deployed inside autonomous vehicle demand zones — hotels, parking garages, commercial properties near transit and demand corridors.'},
        {h:'Fleet Staging Hubs',p:'Pre-positioned vehicles near high-demand zones reduce passenger wait times and eliminate repositioning deadhead miles.'},
        {h:'Fleet Operations Centers',p:'Physical facilities for remote assistance operators, dispatch coordination, and fleet monitoring staff.'},
        {h:'Autonomous Vehicle Maintenance Facilities',p:'Sensor calibration bays, inspection lanes, and autonomous vehicle-specific service infrastructure for commercial fleets.'},
      ])}</div>`
    )+
    sec('The Name Explained','Why AV Node chose this name',
      'AV Node refers to the concept of a network node — a point in a distributed network — for autonomous vehicles. Just as a network node is a connection point in a communications system, an AV Node is a physical connection point in the infrastructure network that autonomous vehicle fleets depend on. The company builds a distributed network of these nodes across US cities.',
      relLinks([
        {url:'/about-av-node-autonomous-fleet-infrastructure',label:'About AV Node'},
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/markets',label:'Markets'},
      ])
    ),
  ctaH2:'AV Node — Autonomous Vehicle Fleet Infrastructure',
  ctaSub:'AV Node builds and operates distributed physical infrastructure for autonomous vehicle fleets across major US markets.',
}},

// ── MARKETS INDEX ─────────────────────────────────────────────────

{ file:'public/markets/index.html', p:{
  title:'AV Fleet Infrastructure Markets — AVNode',
  desc:'AVNode operates distributed autonomous fleet infrastructure across active and expansion US markets. Find node availability, market status, and AV activity by city.',
  url:'/markets', eyebrow:'Markets', priority:'0.9',
  h1:'AVNode Markets — Active Infrastructure Across the US',
  sub:'AVNode has active nodes in Houston, Dallas, Austin, Phoenix, and Miami, with expansion underway in Los Angeles, Atlanta, Las Vegas, Nashville, and Seattle. New markets added quarterly.',
  cta: false,
  body:
    sec('Active Markets','Infrastructure deployed and ready for fleet operators',
      'These markets have qualified nodes with available capacity. Fleet operators can engage and deploy within 30–90 days.',
      marketGrid([
        {url:'/markets/houston',city:'Houston, TX',active:true,nodes:'12 / 20 nodes filled'},
        {url:'/markets/dallas',city:'Dallas, TX',active:true,nodes:'15 / 25 nodes filled'},
        {url:'/markets/austin',city:'Austin, TX',active:true,nodes:'8 / 15 nodes filled'},
        {url:'/markets/phoenix',city:'Phoenix / Tempe, AZ',active:true,nodes:'14 / 28 nodes filled'},
        {url:'/markets/miami',city:'Miami, FL',active:true,nodes:'9 / 20 nodes filled'},
      ])
    )+
    sec('Expansion Markets','Site identification and qualification underway',
      'Expansion markets have active property qualification pipelines. First nodes targeted within 6–12 months.',
      marketGrid([
        {url:'/markets/los-angeles',city:'Los Angeles, CA',active:false,nodes:'Q4 2026 target'},
        {url:'/markets/atlanta',city:'Atlanta, GA',active:false,nodes:'Q1 2027 target'},
        {url:'/markets/las-vegas',city:'Las Vegas, NV',active:false,nodes:'Q4 2026 target'},
        {url:'/markets/nashville',city:'Nashville, TN',active:false,nodes:'2027 target'},
        {url:'/markets/seattle',city:'Seattle, WA',active:false,nodes:'2027 target'},
        {url:'/markets/san-francisco',city:'San Francisco, CA',active:false,nodes:'Site identification active'},
        {url:'/markets/denver',city:'Denver, CO',active:false,nodes:'Site identification active'},
        {url:'/markets/chicago',city:'Chicago, IL',active:false,nodes:'Site identification active'},
        {url:'/markets/new-york',city:'New York, NY',active:false,nodes:'Strategic planning'},
        {url:'/markets/washington-dc',city:'Washington, DC',active:false,nodes:'Strategic planning'},
        {url:'/markets/charlotte',city:'Charlotte, NC',active:false,nodes:'Strategic planning'},
        {url:'/markets/orlando',city:'Orlando, FL',active:false,nodes:'Strategic planning'},
        {url:'/markets/tampa',city:'Tampa, FL',active:false,nodes:'Strategic planning'},
        {url:'/markets/san-antonio',city:'San Antonio, TX',active:false,nodes:'Strategic planning'},
        {url:'/markets/boston',city:'Boston, MA',active:false,nodes:'Strategic planning'},
      ])
    )+
    sec('Market Selection Criteria','How AVNode chooses expansion cities',
      '',
      threeCards([
        {h:'AV Activity',p:'Priority given to cities with active AV deployment permits or announced robotaxi operations.',blue:true},
        {h:'Airport Volume',p:'Airports generate concentrated, predictable AV demand. Cities with major airports get infrastructure first.'},
        {h:'Hotel Inventory',p:'Hotel parking is AVNode\'s primary node type. Dense hotel markets near airports and downtowns qualify faster.'},
        {h:'Utility Access',p:'Power grid capacity and utility program availability determine how quickly charging infrastructure can be deployed.'},
        {h:'Regulatory Environment',p:'AV-permissive states get priority. Texas, Arizona, Nevada, Florida, and Georgia are leading markets.'},
        {h:'Real Estate Cost',p:'Affordable commercial real estate allows AVNode to qualify more sites per market at better margins for property partners.'},
      ])
    )
}},

// ── CORE MONEY PAGES ─────────────────────────────────────────────

{ file:'public/autonomous-fleet-infrastructure.html', p:{
  title:'Autonomous Fleet Infrastructure — What It Is and Why It Matters | AVNode',
  desc:'Autonomous fleet infrastructure is the physical operating layer that makes AV fleets viable: charging, staging, maintenance, cleaning, inspection, and operations facilities. AVNode builds and operates this layer.',
  url:'/autonomous-fleet-infrastructure', eyebrow:'Autonomous Fleet Infrastructure', priority:'1.0',
  h1:'Autonomous Fleet Infrastructure: The Physical Layer AVs Need to Operate',
  sub:'The vehicle can be autonomous. The infrastructure cannot be an afterthought. Charging, staging, maintenance, cleaning, inspection, and operations facilities — this physical layer determines whether an autonomous fleet makes money or bleeds it.',
  body:
    sec('The Infrastructure Problem','Software companies have solved the hard part. The hard part was not the hard part.',
      'Every major autonomous vehicle company has world-class software and vehicles. None of them have solved physical infrastructure fast enough to match deployment timelines. The result: vehicles that drive themselves to a depot 7 miles away, wait 47 minutes in a charging queue, and drive 7 miles back. For every vehicle. Every shift.',
      statRow([
        {n:'14 mi',l:'Daily deadhead miles per vehicle with centralized infrastructure'},
        {n:'47 min',l:'Productive time lost per vehicle per day in depot charging queues'},
        {n:'$16.1M',l:'Annual operational drag for a 500-vehicle fleet using a central depot model'},
      ])
    )+
    sec('The Six Infrastructure Categories','What autonomous fleet infrastructure actually covers',
      'AV infrastructure is not just charging. A vehicle that charges but cannot be cleaned, inspected, staged, and dispatched efficiently is still losing money.',
      threeCards([
        {h:'Charging Infrastructure',p:'DC fast charging and Level 2 nodes inside demand zones — not at a distant central depot. Right hardware, right location, right power.',blue:true},
        {h:'Fleet Staging',p:'Pre-positioned vehicles near predicted demand zones. The fleet that arrives in 2 minutes wins the ride. Staging is how you get there.'},
        {h:'Maintenance Facilities',p:'Sensor calibration bays, inspection lanes, software update stations, and AV-compatible service infrastructure. Traditional garages cannot handle this.'},
        {h:'Cleaning Operations',p:'Interior cleaning after every few rides. Exterior wash at regular intervals. Passenger experience depends entirely on vehicle condition.'},
        {h:'Inspection Infrastructure',p:'Daily checks for sensor status, tires, brakes, connectivity, and hardware condition. Requires physical inspection bays or drive-through lanes.'},
        {h:'Fleet Operations Centers',p:'Remote assistance stations, dispatch coordination, charging queue management, and staffing — the command layer for a distributed fleet.'},
      ])
    )+
    sec('Centralized vs Distributed','The model determines the unit economics',
      'The centralized depot model made sense for human-driven fleets. Autonomous vehicles operate 20 hours a day and generate deadhead miles every time a vehicle leaves the service zone to charge or stage.',
      twoCol(
        `<div>
          <div class="card" style="margin-bottom:16px"><h3>Centralized Model</h3><p>One large depot per city. Every vehicle drives back to depot to charge, get cleaned, and stage. High infrastructure cost, high deadhead miles, depot becomes bottleneck at scale. Works for small fleets. Fails at 200+ vehicles.</p></div>
          <div class="card blue" style="margin-bottom:0"><h3>Distributed Model (AVNode)</h3><p>Network of smaller nodes inside demand zones. Vehicles charge, stage, and get serviced close to where they operate. Lower deadhead miles, higher utilization, faster response times, scales with fleet growth.</p></div>
        </div>`,
        tableWrap(
          ['Metric','Centralized Depot','AVNode Distributed'],
          [
            ['Daily deadhead miles / vehicle','12–18 miles','2–4 miles'],
            ['Charging wait time','30–60 min queue','5–10 min at node'],
            ['Fleet utilization rate','65–72%','78–85%'],
            ['Infrastructure deployment','12–24 months','30–90 days'],
            ['Scales with fleet growth','Requires new depot builds','Add nodes to network'],
          ]
        )
      )
    )+
    sec('Infrastructure by Fleet Type','Requirements vary by vehicle type and mission',
      '',
      tableWrap(
        ['Fleet Type','Primary Need','Charging','Staging Density','Maintenance Complexity'],
        [
          ['Robotaxi','Distributed charging + staging near demand zones','DCFC 150–350kW','High — 1 node per 2–3 sq miles','High — sensors, cameras, lidar'],
          ['AV Delivery (van)','Loading zones + charging near merchant clusters','DCFC 50–150kW','Medium — near restaurant/retail corridors','Medium — EV drivetrain + sensors'],
          ['Sidewalk Robot','Micro-charging + secure indoor staging','Level 2 / micro','Very high — within every 0.5 miles','Low — simpler hardware'],
          ['AV Truck','Transfer hubs + highway corridor charging','Megawatt charging','Low — hub-and-spoke at urban edges','High — Class 8 requirements'],
        ]
      )
    )+
    sec('Active Infrastructure Markets','Where AVNode operates today',
      '',
      relLinks([
        {url:'/markets/houston',label:'Houston'},
        {url:'/markets/dallas',label:'Dallas'},
        {url:'/markets/austin',label:'Austin'},
        {url:'/markets/phoenix',label:'Phoenix / Tempe'},
        {url:'/markets/miami',label:'Miami'},
        {url:'/markets',label:'All Markets →'},
      ])
    )+
    sec('Related Infrastructure Topics','',
      '',
      relLinks([
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
        {url:'/fleet-staging-infrastructure',label:'Fleet Staging Infrastructure'},
        {url:'/autonomous-vehicle-maintenance',label:'AV Maintenance'},
        {url:'/av-fleet-real-estate',label:'AV Fleet Real Estate'},
        {url:'/services/av-infrastructure',label:'AVNode Services'},
      ])
    ),
  faq:[
    {q:'What is autonomous fleet infrastructure?',a:'Autonomous fleet infrastructure is the physical layer that supports AV fleet operations — including charging depots, staging hubs, maintenance facilities, cleaning operations, inspection lanes, and fleet operations centers. It is the difference between a fleet that operates at 65% utilization and one that operates at 85%.'},
    {q:'Why can\'t robotaxis just use public EV chargers?',a:'Public EV charging is designed for individual consumers with flexible schedules. Fleet operators need guaranteed availability, fast turnaround, co-located staging, and managed charging queues. A Waymo vehicle cannot wait in line at an Electrify America station while a passenger trip goes unfulfilled.'},
    {q:'How much does autonomous fleet infrastructure cost to deploy?',a:'Costs vary significantly by fleet size and infrastructure type. A distributed node (Level 2 staging + DCFC) at a qualified hotel property can be deployed for $150K–$400K. A full robotaxi depot handling 100+ vehicles runs $3M–$8M depending on market and scope. AVNode\'s distributed model spreads this cost across multiple smaller sites rather than one large build.'},
    {q:'How long does it take to deploy AV fleet infrastructure?',a:'A central depot built from scratch takes 12–24 months due to permitting, utility interconnection, and construction timelines. AVNode activates distributed nodes in 30–90 days by working with pre-qualified property partners and managing utility coordination in advance.'},
    {q:'Can property owners participate in autonomous fleet infrastructure?',a:'Yes. Hotels, parking garages, industrial sites, and commercial properties that meet AVNode\'s six qualification criteria can generate recurring revenue as AV infrastructure nodes. AVNode funds the charging equipment and manages the node — the property owner provides the space.'},
  ]
}},

{ file:'public/robotaxi-fleet-management.html', p:{
  title:'Robotaxi Fleet Management: The Physical Operations Guide | AVNode',
  desc:'Robotaxi fleet management is not software. It is the physical problem of keeping autonomous vehicles charged, clean, inspected, staged, and dispatched efficiently. This guide covers what it actually involves.',
  url:'/robotaxi-fleet-management', eyebrow:'Robotaxi Fleet Management', priority:'1.0',
  h1:'Robotaxi Fleet Management: The Physical Operations Problem',
  sub:'Software companies talk about robotaxi fleet management like it is a dashboard problem. It is a logistics problem. Where does the vehicle charge? Who cleans it? Who inspects it? Where does it stage before peak demand? That is the part that determines whether the economics work.',
  body:
    sec('What Robotaxi Fleet Management Actually Involves','Beyond the dispatch algorithm',
      'The vehicle handles the trip autonomously. Everything between trips — charging, cleaning, inspection, staging, and maintenance — requires physical infrastructure and operational workflows that have nothing to do with the autonomous driving stack.',
      `<div>${listItems([
        {h:'Charging Management',p:'SOC monitoring across a distributed fleet, routing vehicles to available fast chargers, managing demand charges, and ensuring no vehicle goes below operational threshold during a shift.'},
        {h:'Cleaning and Sanitation',p:'Interior cleaning after every 4–8 rides. Exterior wash every 24–48 hours. Window cleaning when sensor visibility is degraded. None of this happens autonomously.'},
        {h:'Daily Inspection',p:'Visual inspection of sensors, cameras, lidar units, tires, brakes, and exterior condition. AV operators typically inspect every vehicle every 24 hours of operation.'},
        {h:'Vehicle Staging',p:'Pre-positioning vehicles near predicted demand zones before peak periods. A vehicle already in Midtown at 5pm earns rides a vehicle driving from the depot will miss.'},
        {h:'Maintenance Scheduling',p:'Tire rotation, brake service, sensor calibration, OTA software updates, and hardware replacement — all requiring physical facilities and scheduled downtime.'},
        {h:'Incident Management',p:'Vehicle recovery after minor collisions, sensor damage, or mechanical issues. Requires tow capability, inspection facilities, and a clear return-to-service protocol.'},
      ])}</div>`
    )+
    sec('Fleet Size and Infrastructure Requirements','The math changes fast',
      '',
      tableWrap(
        ['Fleet Size','DCFC Stalls Needed','Cleaning Capacity','Inspection Bays','Staging Locations'],
        [
          ['25 vehicles','4–6 stalls','2 lanes / 1 shift','1 bay','2–3 nodes'],
          ['100 vehicles','15–20 stalls','6–8 lanes / 2 shifts','3–4 bays','6–8 nodes'],
          ['500 vehicles','75–100 stalls','25–30 lanes / 3 shifts','12–16 bays','20–30 nodes'],
          ['2,000 vehicles','300–400 stalls','100+ lanes / continuous','50+ bays','60–80 nodes'],
        ]
      )
    )+
    sec('The 24-Hour Operational Cycle','What a robotaxi fleet does in a day',
      '',
      threeCards([
        {h:'12am – 6am (Off-Peak)',p:'Bulk charging overnight at Level 2 nodes. Deep cleaning and interior sanitation. Scheduled maintenance for vehicles flagged the prior day. Software updates pushed fleet-wide.',blue:true},
        {h:'6am – 10am (Morning Ramp)',p:'Vehicles staged near transit hubs, office corridors, and hotels. Fast charging for vehicles that need a top-up before the morning rush. Inspection for any overnight issues.'},
        {h:'10am – 3pm (Midday)',p:'Dynamic repositioning based on real-time demand. Quick top-up charging at distributed nodes within demand zones. Minor cleaning at staging sites.'},
        {h:'3pm – 8pm (Peak)',p:'Maximum fleet utilization. Vehicles stay in revenue zones. DCFC nodes inside demand zones handle in-shift charging so vehicles avoid leaving the service area.'},
        {h:'8pm – 12am (Evening)',p:'Gradual shift back to depot or overnight staging locations. End-of-shift cleaning cycle begins. Vehicles flagged for maintenance routed to service facilities.'},
        {h:'Continuous',p:'Remote monitoring, incident response, lost item management, and customer support require staffed operations centers operating around the clock.'},
      ])
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
        {url:'/fleet-staging-infrastructure',label:'Fleet Staging'},
        {url:'/robotaxi-cleaning-and-inspection',label:'Cleaning and Inspection'},
        {url:'/services/fleet-operations-centers',label:'AVNode Fleet Operations Centers'},
      ])
    ),
  faq:[
    {q:'What is the difference between robotaxi fleet management software and physical fleet management?',a:'Fleet management software tracks vehicle location, monitors SOC, optimizes routing, and dispatches trips. Physical fleet management is the operational infrastructure that supports the vehicles between trips — charging hardware, cleaning facilities, inspection bays, maintenance shops, and staging locations. Both are required. Software cannot charge a battery or clean a vehicle.'},
    {q:'How many employees does a robotaxi fleet require?',a:'Even fully autonomous fleets require significant human support. A 100-vehicle commercial deployment typically requires 15–30 operations staff for cleaning, inspection, maintenance, remote assistance, and incident response. The vehicles drive themselves. Everything else is staffed.'},
    {q:'What is the biggest operational challenge in robotaxi fleet management?',a:'Infrastructure proximity. When charging, cleaning, inspection, and staging locations are too far from the service area, vehicles spend a disproportionate amount of time driving to and from support locations rather than generating revenue. Distributed infrastructure inside demand zones is the solution.'},
  ]
}},

{ file:'public/av-fleet-management.html', p:{
  title:'AV Fleet Management: Physical Infrastructure Requirements | AVNode',
  desc:'AV fleet management covers the full physical operations layer for autonomous vehicle fleets — not just software. Charging, maintenance, staging, and operations infrastructure for robotaxis, delivery AVs, and autonomous trucks.',
  url:'/av-fleet-management', eyebrow:'AV Fleet Management', priority:'0.9',
  h1:'AV Fleet Management: Beyond the Software Dashboard',
  sub:'AV fleet management software tells you where your vehicles are. AV fleet management infrastructure is where your vehicles live, charge, get serviced, and stage between trips. The software companies have the first part handled. The second part is the operational problem.',
  body:
    sec('The Physical Operations Layer','What the dashboard does not manage',
      'Every major autonomous vehicle company has a fleet management software platform. What they do not have — and what no software platform can provide — is the physical operating layer: the locations, facilities, utilities, and workflows that keep vehicles in service.',
      threeCards([
        {h:'Robotaxi Fleets',p:'Highest infrastructure density required. Distributed charging inside demand zones, daily cleaning, sensor inspection, staging near high-demand corridors.',blue:true},
        {h:'AV Delivery Fleets',p:'Micro-charging hubs near merchant clusters, loading/unloading infrastructure, overnight secure staging, faster cleaning cycles than robotaxis.'},
        {h:'Autonomous Trucks',p:'Transfer hubs at urban edges, highway-adjacent charging with megawatt-level infrastructure, driver handoff zones, and freight staging areas.'},
      ])
    )+
    sec('What AVNode Manages','The physical layer fleet operators should not build themselves',
      'Fleet operators should focus on vehicles, software, and customer experience. AVNode handles the property relationships, utility coordination, charging hardware, and ongoing operations that constitute the physical management layer.',
      twoCol(
        checklist([
          'Site sourcing and qualification across active markets',
          'Utility interconnection and power upgrade coordination',
          'Charging hardware procurement, installation, and maintenance',
          'Landlord relationships and lease management',
          'Uptime SLA and ongoing node operations',
          'Market expansion as fleet grows',
        ]),
        relLinks([
          {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
          {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
          {url:'/services/av-infrastructure',label:'AVNode Services'},
          {url:'/markets',label:'Active Markets'},
        ])
      )
    )
}},

{ file:'public/robotaxi-depots.html', p:{
  title:'Robotaxi Depots: Design, Cost, Location, and Operations | AVNode',
  desc:'A complete guide to robotaxi depots — what they are, what happens inside, how much space and power they need, how long they take to build, and why distributed depot networks outperform single central facilities.',
  url:'/robotaxi-depots', eyebrow:'Robotaxi Depots', priority:'1.0',
  h1:'Robotaxi Depots: What They Are, What They Cost, and Where to Build Them',
  sub:'A robotaxi depot is not a parking lot with a charging station. It is a purpose-designed facility for charging, staging, cleaning, inspection, maintenance, and dispatch — and building one correctly takes longer than most fleet operators expect.',
  body:
    sec('What Happens Inside a Robotaxi Depot','The six operational functions',
      '',
      `<div>${listItems([
        {h:'Fast Charging',p:'DCFC stalls at 150–350kW per vehicle. Most commercial robotaxi depots target full charge in under 45 minutes. Demand charge management is critical — charging 50 vehicles simultaneously creates enormous peak load.'},
        {h:'Vehicle Staging',p:'Dedicated spaces where vehicles wait for dispatch. Proximity to the demand zone is more important than the depot itself. Staging locations should be inside the service area, not at a distant industrial depot.'},
        {h:'Interior Cleaning',p:'Cleaning bays or drive-through lanes for interior sanitation. Commercial robotaxi operators target cleaning after every 4–8 rides. A 100-vehicle fleet needs 6–8 cleaning lanes running two shifts to maintain cadence.'},
        {h:'Exterior Wash',p:'Vehicle wash facility or third-party wash agreement. Lidar and camera sensors require clean optics to perform reliably — exterior cleaning is a sensor maintenance function, not cosmetic.'},
        {h:'Inspection Lanes',p:'Drive-through or static inspection bays for daily checks: sensor status, tire condition, brake check, exterior damage, and connectivity verification. Takes 10–20 minutes per vehicle.'},
        {h:'Maintenance Bays',p:'For scheduled service, sensor calibration, tire rotation, and minor repairs. AV-specific maintenance requires calibration equipment not found in standard auto service facilities.'},
      ])}</div>`
    )+
    sec('Space and Power Requirements','The math for planning a robotaxi depot',
      '',
      tableWrap(
        ['Fleet Size','Depot Footprint','DCFC Stalls','Cleaning Lanes','Power Demand'],
        [
          ['25 vehicles','5,000–8,000 sq ft','4–6','2','150–300 kW peak'],
          ['50 vehicles','8,000–15,000 sq ft','8–12','4–5','300–600 kW peak'],
          ['100 vehicles','15,000–25,000 sq ft','15–20','6–8','600 kW – 1.2 MW peak'],
          ['250 vehicles','30,000–50,000 sq ft','35–50','14–18','1.5–3 MW peak'],
          ['500 vehicles','50,000–80,000 sq ft','75–100','25–30','3–5 MW peak'],
        ]
      )
    )+
    sec('Centralized vs Distributed','One large depot vs a network of smaller nodes',
      'The traditional answer is one large depot per city. The operational answer is a network of smaller nodes distributed inside demand zones, with one central hub for heavy operations.',
      twoCol(
        `<div class="card" style="margin-bottom:16px"><h3>Single Central Depot</h3><p>Lower management complexity. Higher deadhead miles. Depot becomes a bottleneck at scale. Charging queues build during shift changes. All vehicles must leave the service zone to charge. Works at 25–50 vehicles, fails at 200+.</p></div>
         <div class="card blue" style="margin-bottom:0"><h3>Distributed Network (AVNode Model)</h3><p>Multiple smaller nodes inside demand zones. Vehicles charge, stage, and receive light service close to where they operate. Central hub handles heavy maintenance and deep ops. Higher network management complexity, lower operational drag.</p></div>`,
        checklist([
          'Distributed nodes reduce daily deadhead from 14 miles to 2–4 miles',
          'In-zone charging eliminates shift-change depot bottlenecks',
          'Network scales by adding nodes — no depot expansion required',
          'AVNode activates nodes in 30–90 days vs 12–24 months for depot builds',
          'Property owner partners absorb real estate cost',
          'Hub handles maintenance; nodes handle daily ops',
        ])
      )
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/autonomous-vehicle-depots',label:'AV Depots (All Types)'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging'},
        {url:'/services/robotaxi-depot-development',label:'AVNode Depot Development'},
        {url:'/ev-fleet-depot-development',label:'Depot Development Process'},
      ])
    ),
  faq:[
    {q:'How much does a robotaxi depot cost to build?',a:'A small depot serving 25–50 vehicles costs $500K–$2M depending on real estate, utility work required, and charging hardware. A large depot for 250–500 vehicles runs $5M–$15M. These figures exclude real estate acquisition costs, which vary significantly by market. AVNode\'s distributed model typically costs less per vehicle served than a single large depot build.'},
    {q:'How long does it take to build a robotaxi depot?',a:'Building a depot from scratch takes 12–24 months when utility interconnection, permitting, and construction timelines are accounted for. Utility interconnection alone can take 6–18 months in constrained grid markets. AVNode activates distributed nodes in 30–90 days by working with pre-qualified property partners and managing utility coordination ahead of fleet operator demand.'},
    {q:'What is the biggest mistake operators make with robotaxi depots?',a:'Building one large centralized depot without planning for distributed charging. At 50 vehicles, a central depot is manageable. At 200+ vehicles, the deadhead miles, charging queues, and morning dispatch delays become serious operational drag — often worth $3M–$8M in annual costs for a mid-size fleet.'},
  ]
}},

{ file:'public/autonomous-vehicle-depots.html', p:{
  title:'Autonomous Vehicle Depots: Design, Types, and Requirements | AVNode',
  desc:'Autonomous vehicle depots serve robotaxis, AV delivery vehicles, and autonomous trucks. This guide covers depot types, design requirements, power needs, and how AV depots differ from traditional fleet yards.',
  url:'/autonomous-vehicle-depots', eyebrow:'Autonomous Vehicle Depots', priority:'0.9',
  h1:'Autonomous Vehicle Depots: Design, Types, and Requirements',
  sub:'Not all AV depots are the same. A robotaxi depot, an autonomous delivery hub, and an autonomous truck transfer facility each have different space, power, and operational requirements. Here is what distinguishes them — and what all of them need.',
  body:
    sec('AV Depot Types','Three distinct depot categories',
      '',
      threeCards([
        {h:'Robotaxi Depots',p:'Passenger vehicle depots with DCFC charging, cleaning bays, inspection lanes, and staging areas. Focus on high turnover — vehicles in and out quickly, back into service.',blue:true},
        {h:'Autonomous Delivery Hubs',p:'Smaller footprint, higher density. Micro-charging stations, secure indoor staging, loading/unloading zones near merchant clusters. Designed for sidewalk robots to Class 3 AV vans.'},
        {h:'AV Truck Transfer Hubs',p:'Large footprint at urban edges. Megawatt-level charging for Class 8 vehicles, freight staging, driver handoff zones, and 24/7 dispatch capability.'},
      ])
    )+
    sec('What Every AV Depot Needs','Regardless of vehicle type',
      '',
      twoCol(
        checklist([
          'Dedicated EV charging matched to vehicle class and power needs',
          '24/7 staffed access and security infrastructure',
          'Vehicle inspection and condition monitoring capability',
          'Software/OTA update connectivity infrastructure',
          'Cleaning or sanitization facilities',
          'Incident recovery and maintenance access',
        ]),
        gridCards([
          {h:'Power First',p:'Utility interconnection is the long pole in the tent for any depot. Determine power needs before signing a lease.'},
          {h:'AV-Specific Design',p:'Standard fleet yards were designed for ICE vehicles. AV depots need sensor calibration space, OTA infrastructure, and cleanliness standards traditional garages don\'t meet.'},
        ])
      )
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/ev-fleet-depot-development',label:'Depot Development Process'},
        {url:'/services/robotaxi-depot-development',label:'AVNode Depot Development'},
      ])
    )
}},

{ file:'public/robotaxi-charging-infrastructure.html', p:{
  title:'Robotaxi Charging Infrastructure: Fleet-Scale EV Charging Guide | AVNode',
  desc:'Robotaxi charging infrastructure is not public EV charging. Fleet-scale charging requires dedicated hardware, demand zone positioning, managed queues, and utility coordination. This guide explains what it takes.',
  url:'/robotaxi-charging-infrastructure', eyebrow:'Robotaxi Charging Infrastructure', priority:'1.0',
  h1:'Robotaxi Charging Infrastructure: Why Public Chargers Do Not Work at Fleet Scale',
  sub:'A robotaxi fleet does not charge at Electrify America. Fleet-scale charging is a private infrastructure problem — dedicated hardware, demand zone positioning, managed queues, and a utility strategy. The companies that get this right will run the most efficient fleets.',
  body:
    sec('Why Public Charging Fails for Fleets','Three fundamental incompatibilities',
      '',
      threeCards([
        {h:'No Guaranteed Availability',p:'A robotaxi cannot wait in line behind a consumer EV. Fleet operations require guaranteed charger availability at known locations during specific windows.',blue:true},
        {h:'Wrong Location',p:'Public charging networks are placed where consumers park, not where fleets need to charge. Fleet charging must be inside the service zone, not at a retail center 8 miles away.'},
        {h:'No Fleet Integration',p:'Fleet charging requires software integration — SOC monitoring, automated routing, queue management, and demand charge optimization. Public chargers provide none of this.'},
      ])
    )+
    sec('Fleet Charging Hardware','Matching hardware to operational requirements',
      '',
      tableWrap(
        ['Hardware Type','Power Level','Charge Time (75 kWh battery)','Best Use'],
        [
          ['Level 2 (J1772)','7–22 kW','3.5–11 hours','Overnight / long dwell staging'],
          ['DC Fast Charger (CCS)','50–150 kW','30–90 minutes','In-shift between trips, daytime top-up'],
          ['High-Power DCFC','150–350 kW','13–30 minutes','Rapid turnaround at high-volume nodes'],
          ['Megawatt Charging (MCS)','350 kW–1 MW+','5–15 minutes','AV trucks and future passenger AVs'],
        ]
      )
    )+
    sec('Distributed Charging Strategy','Position chargers where vehicles operate',
      'The most expensive charging infrastructure mistake is placing all capacity at a central depot. When charging is distributed inside demand zones, vehicles top up between trips without leaving the service area.',
      twoCol(
        checklist([
          'Target 1 DCFC node per 15–25 vehicles in a demand zone',
          'Level 2 at overnight staging locations (hotels, parking garages)',
          'DCFC inside high-demand corridors (airports, downtown, medical)',
          'Software integration for automated charging routing',
          'Demand charge management to control peak utility costs',
          'Uptime SLA of 99%+ — a fleet cannot afford charger downtime',
        ]),
        statRow([
          {n:'80%',l:'Reduction in deadhead miles when charging is inside the demand zone vs central depot'},
          {n:'47 min',l:'Productive time recovered per vehicle per day by eliminating depot charging queues'},
          {n:'30–90',l:'Days to activate a distributed AVNode charging node vs 12–24 months for depot buildout'},
        ])
      )
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/av-charging-hubs',label:'AV Charging Hubs'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
        {url:'/services/fleet-charging-infrastructure',label:'AVNode Fleet Charging'},
        {url:'/terms/charge-dwell-time',label:'Charge Dwell Time'},
        {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
      ])
    ),
  faq:[
    {q:'How many chargers does a robotaxi fleet need?',a:'A general rule is 1 DCFC stall per 4–6 vehicles for a fleet operating 18–20 hours per day. A 100-vehicle fleet needs 15–25 DCFC stalls across its node network, plus Level 2 capacity at overnight staging locations. The exact number depends on battery size, charging speed, and how many hours per day vehicles are in active service.'},
    {q:'How much does fleet charging infrastructure cost?',a:'DCFC hardware costs $25,000–$75,000 per stall depending on power level and manufacturer. Installation, utility work, and site preparation add $15,000–$60,000 per stall. A 10-stall node runs $400K–$1.35M fully installed. Ongoing electricity costs depend on utility rate and demand charge structure — demand charge management is often as important as the capital cost.'},
    {q:'Who pays for fleet charging infrastructure?',a:'In the AVNode model, charging hardware is funded by AVNode or the fleet operator, not the property owner. The property owner provides the space and electrical service access; AVNode handles equipment, installation, and management. For fleet operators building their own infrastructure, costs are typically capitalized and depreciated over the hardware lifecycle.'},
  ]
}},

{ file:'public/av-charging-hubs.html', p:{
  title:'AV Charging Hubs: Distributed Fleet Charging Infrastructure | AVNode',
  desc:'AV charging hubs are dedicated EV charging facilities inside autonomous vehicle demand zones — not public chargers, not central depots. AVNode builds and operates AV charging hubs across major US markets.',
  url:'/av-charging-hubs', eyebrow:'AV Charging Hubs', priority:'0.9',
  h1:'AV Charging Hubs: Distributed Infrastructure That Keeps Fleets Earning',
  sub:'An AV charging hub is a dedicated charging facility positioned inside an autonomous vehicle demand zone. Not a public charger. Not a central depot. A managed facility where fleet vehicles charge quickly and return to service without leaving the area where they make money.',
  body:
    sec('What Makes an AV Charging Hub Different',
      'Three things set fleet charging hubs apart from consumer EV infrastructure',
      '',
      threeCards([
        {h:'Demand Zone Location',p:'Positioned inside the area where vehicles operate — downtown cores, airport corridors, medical districts — not at an industrial park 8 miles away.',blue:true},
        {h:'Fleet Management Integration',p:'Connected to fleet management software for automated charging routing, SOC monitoring, and queue optimization. A vehicle arrives when its charge drops to the threshold, not whenever the driver decides.'},
        {h:'Managed Operations',p:'AVNode manages uptime, billing, hardware maintenance, and utility coordination. The fleet operator does not manage the physical facility.'},
      ])
    )+
    sec('Hub Types','From micro-nodes to primary charging facilities',
      '',
      twoCol(
        gridCards([
          {h:'Micro-Hub (Level 2)',p:'4–10 Level 2 stalls at a hotel or parking facility. Best for overnight charging and long-dwell staging. Lower cost, longer charge time.'},
          {h:'Fast-Charge Hub (DCFC)',p:'4–20 DCFC stalls at a qualified demand-zone property. In-shift charging in 20–45 minutes. Primary hub for daytime fleet operations.'},
          {h:'Primary Operations Hub',p:'20+ DCFC stalls plus Level 2 overnight capacity. Combined with light inspection and cleaning. Serves as the primary daily facility for a 50–150 vehicle cluster.'},
          {h:'Transfer Hub (Trucking)',p:'Megawatt charging for Class 8 vehicles. Highway-adjacent. Combines charging with freight staging and driver handoff infrastructure.'},
        ]),
        relLinks([
          {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
          {url:'/services/fleet-charging-infrastructure',label:'AVNode Fleet Charging Services'},
          {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure Overview'},
          {url:'/markets',label:'Active Markets'},
        ])
      )
    )
}},

{ file:'public/autonomous-vehicle-maintenance.html', p:{
  title:'Autonomous Vehicle Maintenance: What AV Fleets Require | AVNode',
  desc:'Autonomous vehicle maintenance goes beyond traditional fleet service. Sensor calibration, OTA software updates, lidar cleaning, and AV-specific inspection requirements demand purpose-built facilities.',
  url:'/autonomous-vehicle-maintenance', eyebrow:'Autonomous Vehicle Maintenance', priority:'0.9',
  h1:'Autonomous Vehicle Maintenance: Why AVs Need Purpose-Built Service Infrastructure',
  sub:'An autonomous vehicle is not a car with extra sensors. The maintenance requirements — sensor calibration, lidar cleaning, OTA software updates, high-voltage battery service — require facilities and workflows that the traditional auto service market was never built to handle.',
  body:
    sec('How AV Maintenance Differs','From standard fleet service',
      '',
      tableWrap(
        ['Maintenance Category','Traditional Fleet','AV Fleet'],
        [
          ['Sensor system','N/A','Lidar calibration, camera cleaning, radar alignment — specialized equipment required'],
          ['Software updates','Infrequent, dealership','OTA updates requiring high-bandwidth connectivity at service bays'],
          ['Cleanliness standard','Standard','Sensors degrade with contamination — higher cleanliness requirement throughout facility'],
          ['Inspection scope','Mechanical','Mechanical + sensor array + software status + connectivity + electrical systems'],
          ['Battery service','N/A (ICE) or basic (EV)','High-voltage protocols, BMS diagnostics, thermal management system checks'],
          ['Facility requirement','Standard garage','Calibration targets, alignment marks, software access infrastructure, EV-rated equipment'],
        ]
      )
    )+
    sec('AV-Specific Maintenance Requirements','What the facility must support',
      '',
      threeCards([
        {h:'Sensor Calibration',p:'Lidar, camera, and radar calibration requires specific physical infrastructure: target walls at precise distances, alignment marks on floors, controlled lighting. Cannot be done in a standard garage.',blue:true},
        {h:'OTA Update Stations',p:'High-bandwidth connectivity at each bay for software updates. Updates can take 20–90 minutes — bays must be designed around this dwell time.'},
        {h:'EV High-Voltage Service',p:'High-voltage safety protocols, insulated tools, interlock systems, and technician certification requirements for any battery or drivetrain work.'},
        {h:'Cleanliness Protocols',p:'Sensor lenses are sensitive to contamination. Facilities require higher cleanliness standards than ICE service — controlled air quality in calibration zones.'},
        {h:'Inspection Software Access',p:'Diagnostic software integration at inspection bays to assess vehicle health, flag maintenance requirements, and log service history.'},
        {h:'Part Staging',p:'On-site inventory for high-frequency consumables — sensor covers, wiper blades — and common hardware components to minimize return-to-service time.'},
      ])
    )+
    sec('Build vs Partner','Why operators use AVNode instead of building',
      'A purpose-built AV maintenance facility built from scratch costs $2M–$8M and 12–18 months to develop. AVNode activates adapted commercial facilities in 60–90 days by qualifying existing properties and retrofitting them for AV service requirements.',
      relLinks([
        {url:'/robotaxi-cleaning-and-inspection',label:'Cleaning and Inspection'},
        {url:'/services/av-maintenance-facilities',label:'AVNode Maintenance Facilities'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
        {url:'/terms/autonomous-vehicle-maintenance',label:'AV Maintenance Definition'},
      ])
    )
}},

{ file:'public/robotaxi-cleaning-and-inspection.html', p:{
  title:'Robotaxi Cleaning and Inspection: Daily Operations Infrastructure | AVNode',
  desc:'Robotaxi cleaning and inspection are daily operations that require physical infrastructure and operational workflows. This guide covers frequency, facility requirements, and what every robotaxi fleet needs to maintain passenger experience and sensor reliability.',
  url:'/robotaxi-cleaning-and-inspection', eyebrow:'Cleaning and Inspection', priority:'0.9',
  h1:'Robotaxi Cleaning and Inspection: The Daily Operations Nobody Talks About',
  sub:'A robotaxi without a driver has no one to notice the spilled coffee, the cracked headrest, or the sensor smeared with road film. Cleaning and inspection are daily physical operations with real infrastructure requirements — and fleets that underinvest in them show it fast.',
  body:
    sec('Why Cleaning Is a Sensor Maintenance Function','Not just cosmetic',
      'Lidar units, cameras, and radar sensors are the eyes of an autonomous vehicle. Road film, dust, bird droppings, and rain residue degrade sensor performance. Exterior cleaning on a commercial robotaxi fleet is a safety and reliability function as much as a passenger experience function.',
      twoCol(
        checklist([
          'Camera lenses require cleaning after rain events and heavy dust',
          'Lidar returns degrade with particulate accumulation on sensor housings',
          'Interior cleaning affects passenger experience and rebooking rates',
          'Seat fabric, door handles, and surfaces require sanitization between rides',
          'Window cleaning affects both passenger experience and front-camera clarity',
        ]),
        statRow([
          {n:'4–8',l:'Rides between interior cleaning cycles for commercial robotaxi operations'},
          {n:'24–48 hr',l:'Exterior wash cycle frequency for active commercial deployments'},
          {n:'15 min',l:'Average interior cleaning time per vehicle per cycle'},
        ])
      )
    )+
    sec('Inspection Requirements','What every vehicle check covers',
      '',
      `<div>${listItems([
        {h:'Sensor Array Status',p:'Visual inspection and software-reported status of all cameras, lidar units, radar sensors, and ultrasonic sensors. Any degraded sensor flags the vehicle for maintenance.'},
        {h:'Tire Condition',p:'Tread depth check and visual inspection for damage. Robotaxis operate 18–20 hours per day — tire wear rates are 3–4x higher than personal vehicles.'},
        {h:'Brake System',p:'Brake performance check and visual inspection of pads, rotors, and brake lines. Automated fleet monitoring flags vehicles when brake response falls below threshold.'},
        {h:'Exterior Condition',p:'Visual scan for collision damage, scratched sensor covers, and body damage that could affect aerodynamics or sensor field of view.'},
        {h:'Connectivity Check',p:'4G/5G connectivity, GPS lock, and V2X communication verification before the vehicle returns to active service.'},
        {h:'Interior Condition',p:'Seat condition, handle function, window integrity, climate control operation, and passenger display function check.'},
      ])}</div>`
    )+
    sec('Facility Requirements','What cleaning and inspection infrastructure looks like',
      '',
      threeCards([
        {h:'Cleaning Bays',p:'Drive-through or dedicated stall configuration. Minimum 2 lanes per 25–30 active vehicles. Interior cleaning requires dedicated team and supplies staging.',blue:true},
        {h:'Wash Facility',p:'Automated or manual exterior wash capability. Sensor-safe wash protocols — high-pressure water near sensor housings requires care.'},
        {h:'Inspection Lanes',p:'Drive-through inspection lanes or static inspection bays. Connected to fleet management system for automated logging and return-to-service approval.'},
      ])
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/autonomous-vehicle-maintenance',label:'AV Maintenance'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/services/fleet-operations-centers',label:'AVNode Fleet Operations Centers'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
      ])
    )
}},

{ file:'public/fleet-staging-infrastructure.html', p:{
  title:'Fleet Staging Infrastructure: Pre-Positioning Autonomous Vehicles | AVNode',
  desc:'Fleet staging infrastructure is how autonomous vehicle fleets pre-position vehicles near predicted demand before peak periods. Staging location, timing, and density determine arrival times and utilization rates.',
  url:'/fleet-staging-infrastructure', eyebrow:'Fleet Staging Infrastructure', priority:'0.9',
  h1:'Fleet Staging Infrastructure: How Robotaxis Get Positioned Before You Call One',
  sub:'A robotaxi that needs 8 minutes to arrive is losing rides to a competitor arriving in 2 minutes. Staging — pre-positioning vehicles near predicted demand — is how the best fleets win. And it requires physical infrastructure in the right locations.',
  body:
    sec('What Staging Is','And why it matters more than most operators expect',
      'Staging is not parking. Staging is the operational practice of positioning available vehicles near where trip demand is predicted to occur — before that demand materializes. A vehicle staged outside a concert venue at 9:45pm is earning rides at 10:15pm that a vehicle at the depot 4 miles away will never see.',
      twoCol(
        checklist([
          'Vehicles staged in demand zones have 40–60% lower wait times',
          'Lower wait times directly correlate with higher ride completion rates',
          'Staging reduces wasted positioning miles after each accepted trip',
          'Pre-shift staging ensures vehicles are in revenue position when demand peaks',
          'Staging nodes can combine with charging for maximum efficiency',
        ]),
        statRow([
          {n:'2 min',l:'Typical arrival time from staged vehicle in demand zone'},
          {n:'8+ min',l:'Typical arrival time from depot when no vehicles are staged nearby'},
          {n:'35%',l:'Estimated ride conversion rate improvement with sub-3-minute arrival times'},
        ])
      )
    )+
    sec('Staging Location Types','Where autonomous vehicles can stage',
      '',
      threeCards([
        {h:'Hotel Parking',p:'The highest-quality staging location. 24/7 access, existing security, prime downtown and airport positioning, and property owner incentive to participate. AVNode\'s primary node type.',blue:true},
        {h:'Commercial Parking Garages',p:'Large capacity, existing infrastructure, near demand zones. Work well for pre-shift staging and overnight positioning near transit and entertainment districts.'},
        {h:'Retail Center Surface Lots',p:'High proximity to consumer demand zones. Lower cost per space than structured parking. Require adequate security and lighting for overnight staging.'},
        {h:'Transit-Adjacent Lots',p:'Near rail stations, bus terminals, and transit hubs — high-demand origin points for robotaxi trips. AVNode targets transit-adjacent staging in every market.'},
        {h:'Corporate Campus Parking',p:'B2B staging for shuttle and corporate AV deployment. Consistent demand patterns make these predictable staging opportunities.'},
        {h:'Combined Staging + Charging Nodes',p:'AVNode\'s preferred configuration: Level 2 charging at staging locations so vehicles maintain SOC while waiting for demand.'},
      ])
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/services/av-site-selection',label:'AVNode Site Selection'},
        {url:'/terms/fleet-staging',label:'Fleet Staging Definition'},
        {url:'/terms/deadhead-miles',label:'Deadhead Miles Definition'},
      ])
    )
}},

{ file:'public/av-fleet-real-estate.html', p:{
  title:'AV Fleet Real Estate: Property for Autonomous Vehicle Infrastructure | AVNode',
  desc:'AV fleet real estate is the physical property that supports autonomous vehicle operations — hotels, parking garages, industrial sites, and commercial properties adapted for charging, staging, and maintenance.',
  url:'/av-fleet-real-estate', eyebrow:'AV Fleet Real Estate', priority:'0.9',
  h1:'AV Fleet Real Estate: The Property Side of Autonomous Vehicle Infrastructure',
  sub:'Autonomous fleets do not need software licenses for their depots. They need property — and the right property is harder to find than the vehicles themselves. Hotels, parking garages, and industrial sites near demand zones are becoming infrastructure assets.',
  body:
    sec('The Four Property Types','What qualifies for AV fleet infrastructure',
      '',
      threeCards([
        {h:'Hotels',p:'The highest-quality AV node category. Airport and downtown hotels have 24/7 staffing, excess parking near demand zones, existing utilities, and property owners motivated to generate revenue from idle assets.',blue:true},
        {h:'Parking Garages',p:'Structured parking with electrical panels, security infrastructure, and prime urban positioning. Work well for charging nodes and staging hubs near transit and entertainment corridors.'},
        {h:'Industrial / Warehouse',p:'For larger depot operations requiring maintenance bays, wash facilities, and high-power charging. More space per dollar, but typically farther from demand zones.'},
        {h:'Commercial Properties',p:'Office parks, retail centers, and mixed-use developments with underutilized surface parking. Strong candidates when located near employment or entertainment demand zones.'},
      ])
    )+
    sec('For Property Owners','Idle parking becomes productive infrastructure',
      'Property owners with underutilized parking near airports, downtown corridors, or high-density demand zones may qualify as AVNode partners. AVNode funds the charging equipment, manages the node, and pays a monthly revenue share to the property owner.',
      twoCol(
        checklist([
          'Recurring monthly revenue from idle parking spaces',
          'No upfront infrastructure cost — AVNode funds the equipment',
          'Long-term contracts with commercial fleet operators',
          'AV-ready certification increases long-term asset value',
          'AVNode manages all node operations — no burden on property staff',
          'First access to future fleet deployment relationships',
        ]),
        gridCards([
          {h:'Qualification Process',p:'AVNode evaluates each property against six criteria within 14 business days of submission.'},
          {h:'Activation Timeline',p:'Qualified properties are activated as AV nodes within 30–90 days of lease execution.'},
        ])
      )
    )+
    sec('Site Qualification Criteria','The six factors that determine eligibility',
      '',
      `<div>${listItems([
        {h:'24/7 Staffed Access',p:'AV fleets operate around the clock. Sites must provide reliable vehicle access and security monitoring at all hours.'},
        {h:'Minimum Space Capacity',p:'At least 5 dedicated vehicle spaces with clear ingress/egress for AV traffic and charging equipment placement.'},
        {h:'Existing Electrical Infrastructure',p:'Panel capacity that can support charging upgrades within a reasonable cost and timeline.'},
        {h:'Security Infrastructure',p:'Camera coverage and controlled access. AV vehicles are high-value assets.'},
        {h:'Demand Zone Proximity',p:'Within viable range of high-density ride or delivery demand — downtown, airports, medical centers.'},
        {h:'Lease Stability',p:'Minimum 3-year commitment horizon for AV infrastructure investment to be viable.'},
      ])}</div>`
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/services/commercial-real-estate-av',label:'AVNode Real Estate Services'},
        {url:'/services/av-site-selection',label:'Site Selection Process'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
        {url:'/fleet-staging-infrastructure',label:'Fleet Staging Infrastructure'},
      ])
    ),
  ctaH2:'Own property near a demand zone?',
  ctaSub:'Hotels, parking garages, and commercial properties near airports and downtown corridors may qualify as AVNode infrastructure nodes. Submit your property and we will evaluate it within 14 business days.',
  ctaLabel:'Submit a Property'
}},

{ file:'public/ev-fleet-depot-development.html', p:{
  title:'EV Fleet Depot Development: Timeline, Cost, and Process | AVNode',
  desc:'Developing an EV fleet depot takes longer than most operators expect. Utility interconnection alone can run 6–18 months. This guide covers the full development process, timeline, costs, and how AVNode compresses the timeline.',
  url:'/ev-fleet-depot-development', eyebrow:'EV Fleet Depot Development', priority:'0.9',
  h1:'EV Fleet Depot Development: Build Timeline, Cost, and What to Expect',
  sub:'Developing an EV fleet depot from scratch takes longer than most fleet operators expect. Utility interconnection alone can run 6–18 months. Here is what the development process actually looks like — and where AVNode compresses the timeline.',
  body:
    sec('The Development Phases','In order',
      '',
      `<div>${listItems([
        {h:'Phase 1: Site Identification (Weeks 1–4)',p:'Demand zone mapping, property search, and preliminary assessment against power and access criteria. End state: shortlist of 3–5 candidate properties.'},
        {h:'Phase 2: Due Diligence (Weeks 4–8)',p:'Power capacity assessment, utility coordination preliminary conversations, environmental review, zoning check, and lease term negotiation. End state: selected site, terms understood.'},
        {h:'Phase 3: Utility Interconnection (Months 2–18)',p:'The longest and most unpredictable phase. Interconnection application, load study, equipment specification, utility approval, transformer procurement, and grid connection. Ranges from 60 days in cooperative markets to 18+ months in constrained urban grids.'},
        {h:'Phase 4: Permitting (Months 3–10)',p:'Building permits, electrical permits, EV charging permits, and in some jurisdictions, environmental permits. Timeline varies widely by municipality.'},
        {h:'Phase 5: Construction and Buildout (Months 6–18)',p:'Site prep, electrical infrastructure, charging hardware installation, traffic flow design, cleaning and inspection bay construction, and security infrastructure.'},
        {h:'Phase 6: Commissioning (Weeks 1–4)',p:'Hardware testing, software integration, utility commissioning, and staff training. End state: live depot ready for fleet operations.'},
      ])}</div>`
    )+
    sec('Timeline Comparison','Traditional build vs AVNode distributed model',
      '',
      tableWrap(
        ['Approach','Total Timeline','CapEx Range','Key Risk'],
        [
          ['Depot build from scratch','18–36 months','$3M–$15M+','Utility interconnection delays'],
          ['Leased industrial buildout','12–24 months','$1.5M–$8M','Permitting and landlord alignment'],
          ['AVNode distributed activation','30–90 days','$150K–$1.2M per node','Limited control of physical design'],
        ]
      )
    )+
    sec('Where AVNode Compresses the Timeline','Three advantages',
      '',
      threeCards([
        {h:'Pre-Qualified Properties',p:'AVNode maintains active relationships with property partners across launch markets. Weeks 1–8 of the traditional process happen before you call us.',blue:true},
        {h:'Utility Pre-Work',p:'AVNode coordinates utility upgrades proactively on partner properties. When a fleet operator needs a node, the power work is often already underway.'},
        {h:'Established Contractor Network',p:'Preferred EV charging contractors in each market reduce hardware procurement and installation time from months to weeks.'},
      ])
    )+
    sec('Related Topics','',
      '',
      relLinks([
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
        {url:'/services/robotaxi-depot-development',label:'AVNode Depot Development'},
        {url:'/av-fleet-real-estate',label:'AV Fleet Real Estate'},
      ])
    )
}},

// ── GLOSSARY PAGES ────────────────────────────────────────────────

{ file:'public/terms/robotaxi-depot.html', p:{
  title:'Robotaxi Depot Definition | AV Infrastructure Glossary | AVNode',
  desc:'A robotaxi depot is a dedicated facility where autonomous taxis charge, stage, get cleaned, get inspected, and receive maintenance between revenue trips.',
  url:'/terms/robotaxi-depot', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is a Robotaxi Depot?',
  sub:'A dedicated facility where autonomous taxis charge, stage, get cleaned, get inspected, and receive maintenance support between revenue trips. The physical anchor of commercial robotaxi operations.',
  body:
    sec('Definition','',
      'A robotaxi depot is the physical facility — or network of facilities — that supports a commercial autonomous taxi fleet between trips. At minimum, a depot provides EV charging. In practice, commercial robotaxi depots handle charging, vehicle staging, interior and exterior cleaning, daily inspection, and scheduled maintenance.',
      threeCards([
        {h:'Charging',p:'DCFC and Level 2 stations for routine between-trip and overnight charging.',blue:true},
        {h:'Staging',p:'Dedicated spaces where vehicles wait for dispatch, ideally inside the demand zone.'},
        {h:'Operations',p:'Cleaning, inspection, minor maintenance, and remote assistance staffing.'},
      ])
    )+
    sec('Why It Matters','',
      'The location and design of a robotaxi depot determines fleet efficiency more than almost any other operational decision. A depot 10 miles from the demand zone costs a 500-vehicle fleet an estimated $16.1M annually in lost time and empty miles. A distributed depot network inside the demand zone recovers that cost.',
      relLinks([
        {url:'/robotaxi-depots',label:'Full Guide: Robotaxi Depots'},
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
        {url:'/terms/fleet-staging',label:'Fleet Staging'},
        {url:'/services/robotaxi-depot-development',label:'AVNode Depot Development'},
      ])
    ),
  ctaH2:'Building or evaluating robotaxi depot infrastructure?',
  ctaSub:'AVNode develops and operates distributed depot infrastructure across major US markets.',
  faq:[
    {q:'What is the difference between a robotaxi depot and a regular EV charging station?',a:'A robotaxi depot is a private, dedicated facility managing multiple fleet operations: charging, staging, cleaning, inspection, and maintenance. A public EV charging station is consumer-facing with no fleet management integration, no guaranteed availability, and no co-located operations support.'},
  ]
}},

{ file:'public/terms/deadhead-miles.html', p:{
  title:'Deadhead Miles Definition | AV Fleet Glossary | AVNode',
  desc:'Deadhead miles are miles driven by an autonomous vehicle without a passenger or payload — including trips to and from charging depots, maintenance facilities, and staging locations.',
  url:'/terms/deadhead-miles', eyebrow:'Glossary', priority:'0.7',
  h1:'What Are Deadhead Miles?',
  sub:'Miles driven without a passenger or payload. In autonomous fleet operations, deadhead miles are primarily generated by vehicles traveling to and from charging depots, maintenance facilities, and staging locations outside the demand zone.',
  body:
    sec('Definition','',
      'Deadhead miles — also called empty miles — are vehicle miles traveled without generating revenue. For a robotaxi, a deadhead mile is any mile driven without a passenger. For an AV delivery vehicle, a deadhead mile is any mile driven without a payload. The most common source of deadhead in autonomous fleet operations is the round trip to a centralized charging depot.',
      statRow([
        {n:'14 mi',l:'Average daily deadhead miles per vehicle with centralized charging infrastructure'},
        {n:'$16.1M',l:'Annual cost of deadhead miles for a 500-vehicle fleet at a conservative operational cost basis'},
        {n:'~80%',l:'Reduction in charging-related deadhead when nodes are positioned inside the demand zone'},
      ])
    )+
    sec('Sources of Deadhead in AV Fleet Operations','',
      '',
      `<div>${listItems([
        {h:'Depot Charging Trips',p:'Vehicles leaving the service zone to charge at a centralized depot. The most expensive source of deadhead in most commercial AV deployments.'},
        {h:'Repositioning',p:'Moving vehicles from low-demand areas to high-demand zones between trips. Unavoidable but minimized through good staging strategy.'},
        {h:'Maintenance Trips',p:'Vehicles traveling to maintenance facilities, inspection lanes, or cleaning bays outside the service zone.'},
        {h:'Recovery Trips',p:'Vehicles dispatched to recover disabled vehicles or handle incidents. Necessary but typically a small share of total deadhead.'},
      ])}</div>`
    )+
    sec('','',
      '',
      relLinks([
        {url:'/autonomous-fleet-infrastructure',label:'Autonomous Fleet Infrastructure'},
        {url:'/fleet-staging-infrastructure',label:'Fleet Staging Infrastructure'},
        {url:'/robotaxi-depots',label:'Robotaxi Depots'},
        {url:'/terms/fleet-staging',label:'Fleet Staging Definition'},
        {url:'/terms/vehicle-utilization',label:'Vehicle Utilization'},
      ])
    )
}},

{ file:'public/terms/fleet-staging.html', p:{
  title:'Fleet Staging Definition | AV Infrastructure Glossary | AVNode',
  desc:'Fleet staging is the practice of pre-positioning autonomous vehicles near predicted demand zones before peak demand periods — reducing wait times, increasing utilization, and minimizing repositioning deadhead.',
  url:'/terms/fleet-staging', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Fleet Staging?',
  sub:'Pre-positioning available vehicles near predicted demand zones before peak demand occurs. Staging reduces passenger wait times, improves trip completion rates, and reduces repositioning deadhead miles.',
  body:
    sec('Definition','',
      'Fleet staging is the operational practice of moving available vehicles to locations where demand is predicted to materialize — before the demand arrives. A vehicle staged outside a stadium before the game ends will pick up rides that a vehicle dispatched from the depot after the game ends will miss entirely.',
      twoCol(
        checklist([
          'Vehicles in position when demand spikes = faster arrival times',
          'Faster arrival times = higher trip completion rates',
          'Lower repositioning miles from staging vs. depot dispatch',
          'Predictive staging uses historical demand data to pre-position fleets',
          'Combined staging + charging nodes keep vehicles ready without deadhead',
        ]),
        relLinks([
          {url:'/fleet-staging-infrastructure',label:'Full Guide: Fleet Staging'},
          {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
          {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
          {url:'/terms/vehicle-utilization',label:'Vehicle Utilization'},
          {url:'/services/av-site-selection',label:'AVNode Site Selection'},
        ])
      )
    )
}},

{ file:'public/terms/depot-throughput.html', p:{
  title:'Depot Throughput Definition | AV Fleet Glossary | AVNode',
  desc:'Depot throughput is the number of vehicles a depot can process — charge, clean, inspect, and return to service — per hour or per shift. It is the key operational metric for depot sizing.',
  url:'/terms/depot-throughput', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Depot Throughput?',
  sub:'The number of vehicles a depot can process — charge, clean, inspect, and return to service — per unit time. The primary metric for evaluating whether a depot is adequately sized for a fleet.',
  body:
    sec('Definition','',
      'Depot throughput measures how many vehicles a facility can fully service within a given time window. A depot with 20 DCFC stalls and 8 cleaning lanes might achieve throughput of 30–40 vehicles per hour when staggered efficiently — meaning a 200-vehicle fleet can be fully cycled through in 5–7 hours.',
      twoCol(
        `<p class="section-body">Throughput bottlenecks occur when one function (typically charging, but sometimes cleaning) becomes the constraint. A depot with 30 DCFC stalls but only 4 cleaning lanes will queue at the cleaning bay long before it queues at chargers. Balanced depot design matches throughput capacity across all functions.</p>`,
        relLinks([
          {url:'/robotaxi-depots',label:'Robotaxi Depots'},
          {url:'/terms/charge-dwell-time',label:'Charge Dwell Time'},
          {url:'/terms/fleet-readiness',label:'Fleet Readiness'},
          {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
        ])
      )
    )
}},

{ file:'public/terms/charge-dwell-time.html', p:{
  title:'Charge Dwell Time Definition | AV Fleet Glossary | AVNode',
  desc:'Charge dwell time is the total time a vehicle spends at a charging location from arrival to departure — including wait time, active charging, and any delays before the vehicle returns to service.',
  url:'/terms/charge-dwell-time', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Charge Dwell Time?',
  sub:'The total time a vehicle spends at a charging location from arrival to departure — including queue wait, active charging, and any pre/post-charging delays. Dwell time is a key efficiency metric for fleet charging infrastructure.',
  body:
    sec('Definition','',
      'Charge dwell time is the full time budget consumed by a single charging event. It includes: time waiting for an available stall, time actively charging, and any post-charge delays before the vehicle re-enters active dispatch. For a commercial robotaxi fleet, minimizing dwell time at charging locations is a direct revenue driver — every minute at a charger is a minute not earning a ride.',
      statRow([
        {n:'20–45 min',l:'Active DCFC charge time for a 75 kWh battery at 150–350 kW (typical robotaxi)'},
        {n:'5–15 min',l:'Queue wait time at congested central depot chargers during peak shift transitions'},
        {n:'2–4 min',l:'Average queue wait time at a properly-sized distributed AVNode node'},
      ])
    )+
    sec('','',
      '',
      relLinks([
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
        {url:'/terms/depot-throughput',label:'Depot Throughput'},
        {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
        {url:'/services/fleet-charging-infrastructure',label:'AVNode Fleet Charging'},
      ])
    )
}},

{ file:'public/terms/fleet-readiness.html', p:{
  title:'Fleet Readiness Definition | AV Infrastructure Glossary | AVNode',
  desc:'Fleet readiness is the percentage of a fleet\'s vehicles that are charged, cleaned, inspected, and available for dispatch at any given time. It is the primary metric of AV fleet infrastructure effectiveness.',
  url:'/terms/fleet-readiness', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Fleet Readiness?',
  sub:'The percentage of a fleet\'s vehicles that are charged, cleaned, inspected, and available for revenue dispatch at any given time. Fleet readiness is the primary output metric of autonomous fleet infrastructure.',
  body:
    sec('Definition','',
      'Fleet readiness measures what fraction of your vehicles can take a trip right now. A 100-vehicle fleet with 78% readiness has 78 vehicles available for dispatch at that moment. The other 22 are charging, being cleaned, under inspection, in maintenance, or being repositioned. Infrastructure quality is the biggest determinant of fleet readiness outside of vehicle reliability.',
      twoCol(
        tableWrap(
          ['Readiness Level','Likely Cause','Business Impact'],
          [
            ['90%+','Distributed infrastructure, short dwell times','Excellent service levels'],
            ['80–90%','Adequate infrastructure, minor bottlenecks','Good service levels'],
            ['70–80%','Undersized charging or cleaning capacity','Longer wait times, missed rides'],
            ['Below 70%','Infrastructure bottleneck or high vehicle downtime','Significant revenue loss'],
          ]
        ),
        relLinks([
          {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
          {url:'/terms/depot-throughput',label:'Depot Throughput'},
          {url:'/terms/vehicle-utilization',label:'Vehicle Utilization'},
          {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        ])
      )
    )
}},

{ file:'public/terms/distributed-depot-network.html', p:{
  title:'Distributed Depot Network Definition | AV Fleet Glossary | AVNode',
  desc:'A distributed depot network is a system of multiple smaller charging and operations facilities spread across a fleet\'s service zone, rather than one centralized depot outside the demand area.',
  url:'/terms/distributed-depot-network', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is a Distributed Depot Network?',
  sub:'A system of multiple smaller charging and operations facilities positioned inside a fleet\'s service area — rather than one centralized depot at the edge of or outside the demand zone.',
  body:
    sec('Definition','',
      'A distributed depot network replaces the traditional single-depot model with a network of smaller nodes positioned where vehicles actually operate. Instead of driving 7 miles to charge at the central depot, a vehicle at a distributed node stops at a charging hub 0.5 miles away, charges for 25 minutes, and returns to active service inside the demand zone.',
      twoCol(
        checklist([
          'Nodes positioned inside demand zones, not at industrial periphery',
          'Multiple smaller facilities vs one large central depot',
          'Reduces deadhead miles from 14/day to 2–4/day per vehicle',
          'Scales by adding nodes — no depot expansion required',
          'AVNode activates nodes in 30–90 days using partner properties',
        ]),
        relLinks([
          {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
          {url:'/robotaxi-depots',label:'Robotaxi Depots'},
          {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
          {url:'/services/av-infrastructure',label:'AVNode Services'},
        ])
      )
    )
}},

{ file:'public/terms/fleet-operations-center.html', p:{
  title:'Fleet Operations Center Definition | AV Fleet Glossary | AVNode',
  desc:'A fleet operations center (FOC) is the physical command facility for an autonomous vehicle fleet — housing remote assistance operators, dispatch coordination, charging monitoring, and real-time fleet management.',
  url:'/terms/fleet-operations-center', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is a Fleet Operations Center?',
  sub:'The physical command facility for an autonomous vehicle fleet. A fleet operations center houses remote assistance operators, dispatch coordination, charging queue monitoring, incident response, and fleet management staff.',
  body:
    sec('Definition','',
      'A fleet operations center (FOC) is the physical facility from which human operators monitor and support an autonomous vehicle fleet. Even fully autonomous vehicles require human oversight for edge cases, incident response, and remote assistance calls. The FOC is where that human layer operates.',
      threeCards([
        {h:'Remote Assistance Stations',p:'Workstations where operators field remote assistance calls from vehicles that encounter situations outside the autonomous driving envelope.',blue:true},
        {h:'Dispatch Coordination',p:'Staffing that manages staging, repositioning, and charging queue coordination to maximize fleet efficiency.'},
        {h:'Monitoring Infrastructure',p:'Screens, connectivity hardware, and software systems for real-time fleet visibility across all active vehicles.'},
      ])
    )+
    sec('','',
      '',
      relLinks([
        {url:'/services/fleet-operations-centers',label:'AVNode Fleet Operations Centers'},
        {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Infrastructure Overview'},
      ])
    )
}},

{ file:'public/terms/vehicle-utilization.html', p:{
  title:'Vehicle Utilization Definition | AV Fleet Glossary | AVNode',
  desc:'Vehicle utilization is the percentage of time an autonomous vehicle is actively generating revenue — carrying passengers or delivering payloads — relative to total operating hours.',
  url:'/terms/vehicle-utilization', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Vehicle Utilization?',
  sub:'The percentage of total operating hours that a vehicle spends actively generating revenue — carrying a passenger or delivering a payload. The primary efficiency metric for autonomous fleet economics.',
  body:
    sec('Definition','',
      'Vehicle utilization measures productive time as a share of total available time. A robotaxi operating 20 hours per day with 14 hours of paid trips has 70% utilization. The remaining 30% is spent charging, staging, being cleaned, under inspection, driving deadhead, or waiting for dispatch. Infrastructure quality directly determines utilization — better infrastructure means less time in the support loop and more time earning.',
      twoCol(
        tableWrap(
          ['Utilization Level','Annual Revenue Impact (per vehicle at $25/hr)','Typical Infrastructure State'],
          [
            ['85%+','$153,000','Distributed infrastructure, short dwell times'],
            ['75%','$135,000','Adequate infrastructure with some bottlenecks'],
            ['65%','$117,000','Centralized depot, long deadhead and dwell times'],
            ['55%','$99,000','Infrastructure constraint — depot or charging bottleneck'],
          ]
        ),
        relLinks([
          {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
          {url:'/terms/fleet-readiness',label:'Fleet Readiness'},
          {url:'/terms/deadhead-miles',label:'Deadhead Miles'},
          {url:'/robotaxi-fleet-management',label:'Robotaxi Fleet Management'},
        ])
      )
    )
}},

{ file:'public/terms/empty-miles.html', p:{
  title:'Empty Miles Definition | AV Fleet Glossary | AVNode',
  desc:'Empty miles are vehicle miles driven without a passenger or revenue payload — synonymous with deadhead miles in autonomous fleet operations. The primary efficiency drain on AV fleet economics.',
  url:'/terms/empty-miles', eyebrow:'Glossary', priority:'0.6',
  h1:'What Are Empty Miles?',
  sub:'Vehicle miles driven without a revenue passenger or payload. In autonomous fleet operations, empty miles and deadhead miles are used interchangeably — and eliminating them through distributed infrastructure is one of the highest-return investments in AV fleet operations.',
  body:
    sec('Definition','',
      'Empty miles refer to any vehicle mile that does not generate revenue. For a robotaxi, an empty mile is any mile without a paying passenger. The biggest source of empty miles in commercial AV deployments is the round trip to a centralized charging depot. A vehicle that drives 7 miles to charge and 7 miles back generates 14 empty miles before it earns the next fare.',
      relLinks([
        {url:'/terms/deadhead-miles',label:'Deadhead Miles (full definition)'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
        {url:'/fleet-staging-infrastructure',label:'Fleet Staging'},
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
      ])
    )
}},

{ file:'public/terms/av-service-hub.html', p:{
  title:'AV Service Hub Definition | Autonomous Vehicle Glossary | AVNode',
  desc:'An AV service hub is a physical facility providing a subset of depot services — typically charging, staging, and light inspection — at a distributed location inside a fleet\'s demand zone.',
  url:'/terms/av-service-hub', eyebrow:'Glossary', priority:'0.6',
  h1:'What Is an AV Service Hub?',
  sub:'A physical facility providing a subset of depot services — typically fast charging, staging, and light inspection — at a location inside the fleet\'s active service zone rather than at a central depot.',
  body:
    sec('Definition','',
      'An AV service hub is a smaller, distributed facility that handles the daily operational needs of an autonomous vehicle fleet without the full footprint of a central depot. It typically includes DCFC charging, dedicated staging spaces, and basic inspection capability. Maintenance and deep cleaning are handled at the central hub; the service hub handles between-trip operations.',
      twoCol(
        checklist([
          'Positioned inside the demand zone, not at the periphery',
          'Handles daily charging — not overnight maintenance',
          'Light inspection only — flags issues for the main depot',
          'Staging capability to pre-position vehicles',
          'Managed by AVNode under an operations agreement',
        ]),
        relLinks([
          {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
          {url:'/av-charging-hubs',label:'AV Charging Hubs'},
          {url:'/robotaxi-depots',label:'Robotaxi Depots'},
          {url:'/terms/distributed-depot-network',label:'Distributed Depot Network'},
        ])
      )
    )
}},

{ file:'public/terms/fleet-charging-infrastructure.html', p:{
  title:'Fleet Charging Infrastructure Definition | AV Glossary | AVNode',
  desc:'Fleet charging infrastructure is the network of EV charging hardware, site locations, utility connections, and management systems that keeps an autonomous or electric vehicle fleet charged and operational.',
  url:'/terms/fleet-charging-infrastructure', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Fleet Charging Infrastructure?',
  sub:'The complete system of charging hardware, site locations, utility connections, and software management that keeps an electric or autonomous vehicle fleet adequately charged and ready for service.',
  body:
    sec('Definition','',
      'Fleet charging infrastructure is not individual chargers — it is the full system: site locations chosen for demand-zone proximity, utility interconnections large enough for fleet-scale load, hardware sized for fleet turnaround requirements, and software that manages SOC, queue, and demand charges across all vehicles and locations simultaneously.',
      threeCards([
        {h:'Hardware Layer',p:'DCFC and Level 2 charging equipment sized for fleet vehicle batteries and required turnaround times.',blue:true},
        {h:'Site Network',p:'Charging locations positioned inside demand zones — hotels, parking garages, commercial properties — rather than at distant industrial sites.'},
        {h:'Software Layer',p:'Fleet management integration for automated routing, SOC monitoring, queue optimization, and utility demand charge management.'},
      ])
    )+
    sec('','',
      '',
      relLinks([
        {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
        {url:'/av-charging-hubs',label:'AV Charging Hubs'},
        {url:'/services/fleet-charging-infrastructure',label:'AVNode Fleet Charging'},
        {url:'/terms/charge-dwell-time',label:'Charge Dwell Time'},
      ])
    )
}},

{ file:'public/terms/robotaxi-charging-hub.html', p:{
  title:'Robotaxi Charging Hub Definition | AV Fleet Glossary | AVNode',
  desc:'A robotaxi charging hub is a dedicated fast-charging facility positioned inside a robotaxi fleet\'s demand zone — providing between-trip charging without vehicles leaving the service area.',
  url:'/terms/robotaxi-charging-hub', eyebrow:'Glossary', priority:'0.6',
  h1:'What Is a Robotaxi Charging Hub?',
  sub:'A dedicated fast-charging facility positioned inside a robotaxi fleet\'s demand zone — enabling vehicles to charge between trips without leaving the area where they generate revenue.',
  body:
    sec('Definition','',
      'A robotaxi charging hub is a private charging facility, typically with 4–20 DCFC stalls, positioned inside the robotaxi service area at a qualified property. Unlike public EV chargers, robotaxi charging hubs are fleet-dedicated, software-integrated, managed for guaranteed availability, and co-located with vehicle staging capability.',
      twoCol(
        checklist([
          'Fleet-dedicated — not shared with consumer EVs',
          'Software-integrated for automated routing and SOC monitoring',
          'Managed uptime SLA — guaranteed availability for fleet',
          'Co-located staging so vehicles remain dispatch-ready while charging',
          'Positioned inside demand zones, not at peripheral depots',
        ]),
        relLinks([
          {url:'/robotaxi-charging-infrastructure',label:'Robotaxi Charging Infrastructure'},
          {url:'/av-charging-hubs',label:'AV Charging Hubs'},
          {url:'/terms/fleet-charging-infrastructure',label:'Fleet Charging Infrastructure'},
          {url:'/services/fleet-charging-infrastructure',label:'AVNode Fleet Charging'},
        ])
      )
    )
}},

{ file:'public/terms/autonomous-vehicle-maintenance.html', p:{
  title:'Autonomous Vehicle Maintenance Definition | AV Glossary | AVNode',
  desc:'Autonomous vehicle maintenance encompasses all scheduled and unscheduled service activities for AV fleets — including sensor calibration, OTA software updates, EV battery service, and AV-specific inspection protocols.',
  url:'/terms/autonomous-vehicle-maintenance', eyebrow:'Glossary', priority:'0.7',
  h1:'What Is Autonomous Vehicle Maintenance?',
  sub:'All scheduled and unscheduled service activities for autonomous vehicles — including sensor calibration, OTA software updates, EV drivetrain service, daily inspection, and AV-specific facility requirements that differ significantly from traditional fleet maintenance.',
  body:
    sec('Definition','',
      'Autonomous vehicle maintenance extends beyond traditional fleet service in two critical ways. First, AV vehicles have sensor arrays — lidar, cameras, radar — that require specialized calibration equipment and protocols not available in standard garages. Second, AV vehicles are typically EVs with high-voltage systems requiring trained technicians and safety infrastructure.',
      threeCards([
        {h:'Sensor Maintenance',p:'Lidar calibration, camera cleaning and alignment, radar calibration. Requires purpose-built calibration infrastructure.',blue:true},
        {h:'Software Service',p:'OTA update management, diagnostic access, system health monitoring. Requires high-bandwidth connectivity at service bays.'},
        {h:'EV Drivetrain',p:'Battery management system diagnostics, thermal management, high-voltage safety protocols, and EV-specific component service.'},
      ])
    )+
    sec('','',
      '',
      relLinks([
        {url:'/autonomous-vehicle-maintenance',label:'Full Guide: AV Maintenance'},
        {url:'/services/av-maintenance-facilities',label:'AVNode Maintenance Facilities'},
        {url:'/robotaxi-cleaning-and-inspection',label:'Cleaning and Inspection'},
        {url:'/autonomous-fleet-infrastructure',label:'AV Fleet Infrastructure'},
      ])
    )
}},

// ── ADDITIONAL CITY PAGES ─────────────────────────────────────────

{ file:'public/markets/san-francisco.html', p:{
  title:'Autonomous Vehicle Infrastructure in San Francisco, CA — AVNode',
  desc:'AVNode is developing AV infrastructure in San Francisco and the Bay Area — home to Waymo\'s commercial operations, the world\'s most advanced robotaxi market, and the highest concentration of AV operators in the US.',
  url:'/markets/san-francisco', eyebrow:'Expansion Market — San Francisco, CA',
  h1:'Autonomous Vehicle Infrastructure in San Francisco and the Bay Area',
  sub:'San Francisco is the most important AV market in the world. Waymo operates commercial robotaxi service here, more AV companies are headquartered here than anywhere else, and the regulatory environment has gone from hostile to permissive. AVNode is building infrastructure to match what\'s coming.',
  body:
    sec('Market Overview','The global capital of autonomous mobility',
      'San Francisco has been Waymo\'s proving ground for years. The Bay Area is also home to Zoox, Nuro, Serve Robotics, and dozens of AV development teams. When the SF market scales commercially, the infrastructure demand will be unlike any other city.',
      twoCol(
        checklist([
          'Waymo commercial robotaxi service active in SF since 2023',
          'Highest concentration of AV operators in the US',
          'Dense urban core with extremely high trip demand density',
          'SFO handles 55M+ passengers annually',
          'PG&E grid with EV fleet incentive programs',
          'CPUC permitting framework established for AV commercial ops',
        ]),
        gridCards([
          {h:'Terrain Challenge',p:'San Francisco\'s hills are operationally complex for AV systems. Flat corridors — SoMa, Mission, Marina, Financial District — are AVNode\'s initial target zones.'},
          {h:'Real Estate Cost',p:'SF commercial real estate is expensive. AVNode prioritizes hotel and parking structures where the value-add to the property owner justifies AVNode as the highest-use tenant.'},
          {h:'SFO Corridor',p:'Airport hotel cluster with Millbrae and South SF targeting for first Bay Area nodes.'},
          {h:'Timeline',p:'Expansion market. Site identification active. First nodes targeted Q2–Q3 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/denver.html', p:{
  title:'Autonomous Vehicle Infrastructure in Denver, CO — AVNode',
  desc:'AVNode is developing autonomous fleet infrastructure in Denver — a growing AV market with AV-permissive Colorado legislation, a major airport, and significant real estate development activity.',
  url:'/markets/denver', eyebrow:'Expansion Market — Denver, CO',
  h1:'Autonomous Vehicle Infrastructure in Denver, Colorado',
  sub:'Denver is an emerging AV market with Colorado\'s permissive AV legislation, a major international airport, and a fast-growing urban core. AVNode is developing infrastructure ahead of commercial AV deployment.',
  body:
    sec('Market Overview','Colorado AV infrastructure emerging',
      'Colorado enacted AV-permissive legislation that allows deployment without special permitting. Denver International Airport is the fifth-busiest in the US. The city\'s growth trajectory — 1M+ metro population growing faster than most comparable markets — makes it a high-priority expansion target.',
      twoCol(
        checklist([
          'Colorado AV legislation: permissive, no local approval required',
          'DEN Airport: 77M+ passengers annually, major hotel cluster',
          'Xcel Energy with active EV fleet programs and competitive rates',
          'RiNo, LoDo, and Cherry Creek as primary demand zones',
          'Lower real estate costs than coastal AV markets',
          'Growing tech and professional population as AV early adopters',
        ]),
        gridCards([
          {h:'Airport Priority',p:'DEN airport hotel cluster is the Denver phase one target. Massive passenger volume and extensive hotel inventory.'},
          {h:'Altitude Consideration',p:'High altitude affects battery performance marginally. AVNode site design accounts for Denver\'s elevation in thermal management planning.'},
          {h:'Timeline',p:'Expansion market. Site identification active. First nodes targeted 2027.'},
          {h:'Xcel Energy',p:'Xcel has one of the most aggressive EV fleet incentive programs in the US — utility coordination timelines are competitive.'},
        ])
      )
    )
}},

{ file:'public/markets/chicago.html', p:{
  title:'Autonomous Vehicle Infrastructure in Chicago, IL — AVNode',
  desc:'AVNode is developing AV infrastructure in Chicago — one of the largest US cities, with O\'Hare Airport, a dense downtown, and Illinois\' AV-permissive legislation enabling commercial deployment.',
  url:'/markets/chicago', eyebrow:'Expansion Market — Chicago, IL',
  h1:'Autonomous Vehicle Infrastructure in Chicago, Illinois',
  sub:'Chicago is the third-largest US city with a dense urban core, O\'Hare International Airport, and Illinois AV legislation that allows commercial deployment. AVNode is building infrastructure ahead of commercial robotaxi arrival.',
  body:
    sec('Market Overview','Midwest AV infrastructure hub',
      'Illinois enacted AV legislation in 2018. Chicago\'s density, major airport, and hotel inventory make it a viable AVNode market despite climate considerations. O\'Hare handles 80M+ passengers annually — one of the largest airport-adjacent AV demand opportunities in the US.',
      twoCol(
        checklist([
          'Illinois AV legislation (Public Act 100-0717) enables commercial AV',
          'O\'Hare International: 80M+ annual passengers',
          'Dense downtown core — Loop, River North, Magnificent Mile',
          'ComEd utility with EV fleet programs and urban grid capacity',
          'Major hotel inventory throughout downtown and O\'Hare corridors',
          'High transit ridership base familiar with mobility services',
        ]),
        gridCards([
          {h:'Weather Planning',p:'Chicago winters require AV infrastructure designed for extreme cold: battery thermal management, covered charging preferred, de-icing protocols at inspection lanes.'},
          {h:'O\'Hare Corridor',p:'Hotel cluster near O\'Hare is the Chicago phase one priority. Massive demand and existing infrastructure.'},
          {h:'Loop District',p:'High-density downtown demand zone with significant hotel and parking inventory.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification to begin Q1 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/new-york.html', p:{
  title:'Autonomous Vehicle Infrastructure in New York, NY — AVNode',
  desc:'AVNode is planning AV infrastructure development in New York City — the largest US market by population density, with unique regulatory complexity and enormous long-term AV infrastructure opportunity.',
  url:'/markets/new-york', eyebrow:'Strategic Market — New York, NY',
  h1:'Autonomous Vehicle Infrastructure in New York City',
  sub:'New York is the largest urban market in the US and the most complex for AV deployment. Regulatory requirements, real estate costs, and grid constraints are all higher than other markets. The long-term opportunity is enormous. AVNode is in strategic planning for NYC.',
  body:
    sec('Market Overview','The most complex and most valuable AV infrastructure opportunity',
      'New York City has unique AV challenges: dense traffic, complex regulation, high real estate costs, and a grid that is under pressure. But it also has 8.3 million residents, 60M+ annual tourists, three major airports, and demand density unlike any other US city. The AV operator that cracks NYC infrastructure wins the most important market.',
      twoCol(
        checklist([
          'JFK, LaGuardia, and Newark airports combined handle 130M+ passengers annually',
          'Extremely high trip demand density — no other market comparable',
          'NYC utility programs (Con Edison) have EV fleet pathways',
          'Hotel inventory throughout Manhattan and outer boroughs',
          'Regulatory pathway developing under NY AV task force',
        ]),
        gridCards([
          {h:'Regulatory Timeline',p:'NYC AV deployment requires state and city-level approval. AVNode tracks regulatory development closely; infrastructure planning leads deployment by 12–18 months.'},
          {h:'Airport Priority',p:'JFK and LGA hotel clusters are the first targets — high demand, existing infrastructure, and less regulatory complexity than Manhattan proper.'},
          {h:'Real Estate',p:'NYC commercial RE requires higher ROI thresholds. AVNode\'s hotel model is the most viable approach given cost per square foot.'},
          {h:'Timeline',p:'Long-term strategic market. Infrastructure planning underway. First nodes not before 2028.'},
        ])
      )
    )
}},

{ file:'public/markets/washington-dc.html', p:{
  title:'Autonomous Vehicle Infrastructure in Washington, DC — AVNode',
  desc:'AVNode is planning AV infrastructure development in Washington DC — a high-density federal and professional market with IAD and DCA airports, permissive Virginia AV laws, and strong tech sector demand.',
  url:'/markets/washington-dc', eyebrow:'Strategic Market — Washington, DC',
  h1:'Autonomous Vehicle Infrastructure in Washington, DC',
  sub:'The DC metro area includes Virginia — one of the most AV-permissive states in the US — and Maryland. Dulles and Reagan National airports, a dense professional workforce, and strong tech sector presence in Northern Virginia make this a strategic AVNode market.',
  body:
    sec('Market Overview','DMV AV infrastructure opportunity',
      'Virginia has some of the most permissive AV legislation in the US. The DC metro area\'s professional workforce, major airports, and Northern Virginia tech corridor create strong AV demand. Amazon HQ2 in Arlington is a particular driver of autonomous delivery demand.',
      twoCol(
        checklist([
          'Virginia AV legislation: permissive deployment across the state',
          'IAD (Dulles): 25M passengers annually — large hotel cluster',
          'DCA (Reagan National): 24M passengers annually — prime AV demand',
          'Amazon HQ2 in Arlington — delivery AV demand anchor',
          'Dominion Energy with active EV fleet programs in Virginia',
          'Bethesda, Tysons, and Crystal City as secondary demand zones',
        ]),
        gridCards([
          {h:'Northern Virginia Priority',p:'AVNode targets Northern Virginia first — permissive legislation, Amazon delivery demand, and lower real estate costs than DC proper.'},
          {h:'IAD Corridor',p:'Dulles hotel cluster is the DC area\'s phase one infrastructure focus.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification targeting 2027.'},
          {h:'Jurisdiction Complexity',p:'Operating across DC, Maryland, and Virginia requires navigating three regulatory environments — AVNode\'s Virginia-first approach simplifies this.'},
        ])
      )
    )
}},

{ file:'public/markets/charlotte.html', p:{
  title:'Autonomous Vehicle Infrastructure in Charlotte, NC — AVNode',
  desc:'AVNode is developing AV infrastructure in Charlotte — a fast-growing Southeast financial hub with Charlotte Douglas International Airport, permissive North Carolina AV laws, and significant real estate development.',
  url:'/markets/charlotte', eyebrow:'Expansion Market — Charlotte, NC',
  h1:'Autonomous Vehicle Infrastructure in Charlotte, North Carolina',
  sub:'Charlotte is one of the fastest-growing large cities in the US. A major financial center, Charlotte Douglas International Airport, and North Carolina\'s AV-permissive environment make it a strong AVNode expansion target.',
  body:
    sec('Market Overview','Southeast financial hub with AV-permissive regulation',
      'North Carolina enacted AV legislation in 2017. Charlotte\'s rapid growth, financial sector concentration, and major airport create strong AV demand fundamentals. Lower commercial real estate costs than coastal markets make infrastructure economics more favorable.',
      twoCol(
        checklist([
          'North Carolina AV legislation enacted 2017 — permissive',
          'Charlotte Douglas: 50M+ passengers annually, major hotel cluster',
          'Financial sector concentration — Bank of America, Wells Fargo HQ',
          'Duke Energy with active EV fleet programs and competitive rates',
          'Rapidly growing Uptown and South End demand zones',
          'Lower commercial RE costs than coastal Southeast markets',
        ]),
        gridCards([
          {h:'CLT Corridor',p:'Charlotte Douglas airport hotel cluster is the phase one target. Major passenger volume with existing hotel infrastructure.'},
          {h:'Uptown',p:'Financial district demand zone with consistent B2B and evening hospitality demand.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification targeting 2027.'},
          {h:'Duke Energy',p:'Among the most cooperative large utilities for EV fleet programs in the Southeast.'},
        ])
      )
    )
}},

{ file:'public/markets/orlando.html', p:{
  title:'Autonomous Vehicle Infrastructure in Orlando, FL — AVNode',
  desc:'AVNode is developing AV infrastructure in Orlando — home to 75M+ annual visitors, MCO airport, and major theme park and hospitality infrastructure that creates concentrated, predictable AV demand.',
  url:'/markets/orlando', eyebrow:'Expansion Market — Orlando, FL',
  h1:'Autonomous Vehicle Infrastructure in Orlando, Florida',
  sub:'Orlando receives 75 million visitors annually. A city built around tourism has concentrated, predictable transportation demand patterns — the ideal environment for autonomous mobility. Florida\'s permissive AV legislation makes deployment straightforward.',
  body:
    sec('Market Overview','Tourism demand makes Orlando an AV infrastructure opportunity',
      'Florida AV legislation allows statewide autonomous deployment. Orlando\'s tourism economy creates a unique AV demand profile — extremely high volume, highly concentrated geographically, and driven by visitors who actively seek transportation services. Hotel infrastructure near MCO and the resort corridor creates prime AVNode site candidates.',
      twoCol(
        checklist([
          'Florida AV legislation: statewide deployment permitted',
          'MCO Airport: 50M+ annual passengers',
          '75M+ annual visitors — highest-density tourism demand in the US',
          'FPL (Florida Power & Light) with EV fleet programs',
          'Dense hotel inventory around International Drive and Disney/Universal',
          'Year-round demand without seasonal shutdowns',
        ]),
        gridCards([
          {h:'Resort Corridor',p:'International Drive hotel cluster is AVNode\'s Orlando priority — massive visitor concentration with existing hotel infrastructure.'},
          {h:'MCO Corridor',p:'Airport hotel cluster with consistent passenger demand.'},
          {h:'Tourism Pattern',p:'AV demand in Orlando is highly concentrated in specific corridors — resort to airport, resort to convention center — making staging prediction straightforward.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification targeting 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/tampa.html', p:{
  title:'Autonomous Vehicle Infrastructure in Tampa, FL — AVNode',
  desc:'AVNode is developing AV infrastructure in Tampa — a rapidly growing Florida market with TPA airport, Florida\'s permissive AV legislation, and significant hospitality and real estate development.',
  url:'/markets/tampa', eyebrow:'Expansion Market — Tampa, FL',
  h1:'Autonomous Vehicle Infrastructure in Tampa, Florida',
  sub:'Tampa is one of the fastest-growing large metros in the US. Florida\'s permissive AV legislation, TPA International Airport, and a booming downtown waterfront corridor make it a strong AVNode expansion target.',
  body:
    sec('Market Overview','Florida growth market with AV-ready legislation',
      'Florida allows statewide autonomous vehicle deployment. Tampa\'s rapid population growth, major airport, and expanding downtown create strong AV demand fundamentals. The city\'s hotel inventory near TPA and the Riverwalk corridor provides prime AVNode site candidates.',
      twoCol(
        checklist([
          'Florida AV legislation: statewide deployment permitted',
          'TPA Airport: 23M+ annual passengers',
          'One of the fastest-growing large metros in the US',
          'TECO (Tampa Electric) with EV commercial programs',
          'Major waterfront hotel development near downtown Riverwalk',
          'Super Bowl and major events create surge demand windows',
        ]),
        gridCards([
          {h:'TPA Corridor',p:'Airport hotel cluster is the Tampa phase one target. Strong passenger volume and existing infrastructure.'},
          {h:'Downtown Riverwalk',p:'Growing hospitality and entertainment district with new hotel inventory coming online.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification targeting 2027.'},
          {h:'Florida Pair',p:'Tampa pairs well with Orlando for a dual-market Florida deployment covering both business and tourism demand.'},
        ])
      )
    )
}},

{ file:'public/markets/san-antonio.html', p:{
  title:'Autonomous Vehicle Infrastructure in San Antonio, TX — AVNode',
  desc:'AVNode is developing AV infrastructure in San Antonio — a fast-growing Texas market with SAT Airport, no AV restrictions, major military and healthcare demand anchors, and strong hotel inventory.',
  url:'/markets/san-antonio', eyebrow:'Expansion Market — San Antonio, TX',
  h1:'Autonomous Vehicle Infrastructure in San Antonio, Texas',
  sub:'San Antonio is the second-largest Texas city and one of the fastest-growing in the US. No AV restrictions, CPS Energy\'s EV programs, and strong healthcare and tourism demand make it a natural AVNode expansion from the Dallas-Houston-Austin corridor.',
  body:
    sec('Market Overview','Texas expansion — San Antonio completes the corridor',
      'With active infrastructure in Houston, Dallas, and Austin, San Antonio is the natural fourth Texas market. Texas\'s AV-permissive environment extends across all four cities. San Antonio adds unique demand anchors: the River Walk tourism corridor, the South Texas Medical Center, and multiple major military installations.',
      twoCol(
        checklist([
          'No Texas state AV restrictions — same regulatory environment as Houston and Dallas',
          'SAT Airport: 10M+ annual passengers — hotel cluster active',
          'South Texas Medical Center: one of the largest healthcare complexes in the US',
          'River Walk corridor: 12M+ annual visitors',
          'CPS Energy with EV fleet commercial programs',
          'Lower commercial real estate costs than Austin and Dallas',
        ]),
        gridCards([
          {h:'SAT Corridor',p:'Airport hotel cluster is the phase one target, consistent with AVNode\'s Texas market approach.'},
          {h:'Medical Center',p:'South Texas Medical Center employs 45,000+ and sees millions of patient visits annually — consistent, predictable AV demand.'},
          {h:'Texas Network',p:'San Antonio nodes integrate into the AVNode Texas network, allowing fleet operators to cover Houston, Dallas, Austin, and San Antonio under one agreement.'},
          {h:'Timeline',p:'Expansion market. Site identification active. First nodes targeted 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/boston.html', p:{
  title:'Autonomous Vehicle Infrastructure in Boston, MA — AVNode',
  desc:'AVNode is planning AV infrastructure in Boston — a dense Northeast market with Logan Airport, major university and healthcare demand, Massachusetts AV pilot programs, and a high-income tech workforce.',
  url:'/markets/boston', eyebrow:'Strategic Market — Boston, MA',
  h1:'Autonomous Vehicle Infrastructure in Boston, Massachusetts',
  sub:'Boston has the highest concentration of universities, hospitals, and biotech companies of any US metro. Massachusetts has active AV pilot programs. Logan Airport and the Route 128 tech corridor create strong demand anchors. AVNode is in strategic planning for the Boston market.',
  body:
    sec('Market Overview','Northeast AV infrastructure: universities, hospitals, tech',
      'Massachusetts has conducted AV pilot programs and is developing a commercial deployment framework. Boston\'s unique demand profile — dominated by universities, hospitals, and biotech companies — creates consistent, professional-grade AV trip demand. Kendall Square and the Longwood Medical Area are the highest-density demand zones.',
      twoCol(
        checklist([
          'Massachusetts AV pilot program underway; commercial framework developing',
          'Logan Airport: 42M+ annual passengers',
          'Kendall Square: MIT, Harvard, and biotech concentration',
          'Longwood Medical Area: largest healthcare/research complex in New England',
          'Eversource and National Grid with EV commercial programs',
          'High-income tech and academic workforce as early AV adopters',
        ]),
        gridCards([
          {h:'Logan Corridor',p:'Airport hotel cluster is the Boston phase one target — consistent with AVNode\'s airport-first approach across all markets.'},
          {h:'Kendall Square',p:'Cambridge biotech and tech corridor — extremely high trip demand density in a small geographic area.'},
          {h:'Winter Planning',p:'Boston\'s winters require covered or weatherized charging infrastructure and cold-weather battery management design.'},
          {h:'Timeline',p:'Strategic planning phase. Infrastructure development not before 2028.'},
        ])
      )
    )
}},

{ file:'public/markets/sacramento.html', p:{
  title:'Autonomous Vehicle Infrastructure in Sacramento, CA — AVNode',
  desc:'AVNode is developing AV infrastructure in Sacramento — California\'s capital, home to Waymo and AV regulatory activity, with SMF Airport and state government demand creating a unique AV market profile.',
  url:'/markets/sacramento', eyebrow:'Expansion Market — Sacramento, CA',
  h1:'Autonomous Vehicle Infrastructure in Sacramento, California',
  sub:'Sacramento is California\'s capital city and part of the same CPUC regulatory environment as San Francisco. Waymo and other AV operators active in the Bay Area have deployment path toward Sacramento. AVNode is building infrastructure ahead of that expansion.',
  body:
    sec('Market Overview','California capital city AV infrastructure',
      'Sacramento operates under California\'s AV regulatory framework — the same CPUC environment that enabled commercial Waymo operations in San Francisco. The city\'s proximity to the Bay Area, state government demand concentration, and significantly lower real estate costs make it a viable secondary California market.',
      twoCol(
        checklist([
          'California CPUC AV framework applies — same as Bay Area',
          'SMF Airport: 12M+ annual passengers',
          'State government workforce creates consistent professional demand',
          'SMUD (Sacramento Muni Utility) with strong EV fleet programs',
          'Lower commercial RE costs than Bay Area — better infrastructure economics',
          'UC Davis nearby creates additional academic/research demand',
        ]),
        gridCards([
          {h:'SMUD Advantage',p:'Sacramento Municipal Utility District has among the best EV fleet programs in California — competitive rates and streamlined interconnection.'},
          {h:'SMF Corridor',p:'Airport hotel cluster is the Sacramento phase one target.'},
          {h:'Bay Area Pair',p:'Sacramento is a natural complement to Bay Area infrastructure for operators expanding from the SF market northward.'},
          {h:'Timeline',p:'Expansion market. Site identification active. First nodes targeted Q3–Q4 2027.'},
        ])
      )
    )
}},

{ file:'public/markets/pittsburgh.html', p:{
  title:'Autonomous Vehicle Infrastructure in Pittsburgh, PA — AVNode',
  desc:'AVNode is planning AV infrastructure in Pittsburgh — the city where autonomous vehicle testing began, home to Carnegie Mellon University, Uber ATG alumni, and Aurora Innovation.',
  url:'/markets/pittsburgh', eyebrow:'Strategic Market — Pittsburgh, PA',
  h1:'Autonomous Vehicle Infrastructure in Pittsburgh, Pennsylvania',
  sub:'Pittsburgh is where autonomous vehicle testing began in the US, home to Carnegie Mellon\'s robotics program and Aurora Innovation. The city has more AV engineering talent per capita than anywhere outside San Francisco. Commercial AV deployment is coming here.',
  body:
    sec('Market Overview','The birthplace of autonomous vehicle technology',
      'Uber\'s autonomous vehicle program started in Pittsburgh. Aurora Innovation is headquartered here. Carnegie Mellon\'s robotics program has produced more AV engineers than any university in the world. Pittsburgh\'s AV heritage, combined with Pennsylvania\'s AV-permissive legislation, makes it a strategic infrastructure planning market.',
      twoCol(
        checklist([
          'Pennsylvania AV legislation (Act 2018-106): permissive commercial deployment',
          'PIT Airport: 9M+ annual passengers — hotel cluster established',
          'Aurora Innovation headquarters — in-city AV operator',
          'CMU and University of Pittsburgh combined 50,000+ enrollment',
          'Duquesne Light Company with EV commercial incentive programs',
          'Dense Downtown and Oakland neighborhoods with consistent demand',
        ]),
        gridCards([
          {h:'Aurora Opportunity',p:'Aurora Innovation is headquartered in Pittsburgh and operates trucking routes in Pennsylvania. Aurora infrastructure needs are a near-term AVNode opportunity.'},
          {h:'CMU / Oakland',p:'University of Pittsburgh and CMU create a high-density demand zone in Oakland — one of Pittsburgh\'s highest trip demand corridors.'},
          {h:'Terrain',p:'Pittsburgh\'s hilly terrain and bridges limit some AV operating zones. Flat corridors in Downtown, the Strip District, and North Shore are AVNode\'s focus.'},
          {h:'Timeline',p:'Strategic planning phase. Site identification targeting 2028.'},
        ])
      )
    )
}},

];

let count = 0;
const allUrls = [];
pages.forEach(({file, p}) => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(file, shell(p));
  allUrls.push({url: p.url, priority: p.priority || '0.8'});
  console.log(`✓ ${file}`);
  count++;
});

// sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapEntries = [{url:'/',priority:'1.0'}, ...allUrls];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(u=>`  <url>
    <loc>https://www.avnode.com${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.priority==='1.0'?'weekly':'monthly'}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('✓ public/sitemap.xml');

// robots.txt
fs.writeFileSync('public/robots.txt',
  'User-agent: *\nAllow: /\nSitemap: https://www.avnode.com/sitemap.xml');
console.log('✓ public/robots.txt');

console.log(`\n✓ Generated ${count} pages + sitemap.xml + robots.txt`);
