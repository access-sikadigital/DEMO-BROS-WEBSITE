// Service & project imagery: real Demo Bros job photos served from /public/images/<service>/
// Copy & SEO aligned to the "Demo Bros — Website Copy & SEO Rebuild" pack (SIKA Digital, Jul 2026).
// Unverified claims (15+ yrs / thousands of projects / 98% recycled / zero LTI) intentionally
// replaced with confirmed, safe wording. Reinstate any exact figure only once the CEO confirms it.

export const SITE = {
  name: "Demo Bros",
  tagline: "Precision demolition. Zero compromise.",
  phone: "1800 960 625",
  phoneHref: "tel:1800960625",
  email: "info@demobros.com.au",
  // TODO: Replace placeholder ABN with the real registered ABN before publish (flagged in the SEO pack).
  abn: "12 345 678 901",
  address: "103/181 Rosamond Rd, Maribyrnong VIC 3032",
};

// Google Business Profile aggregate for the review widget. The CID is derived from the
// listing's feature id (0x4eb7d8b76f40b833:0xe5f6986c984223ff) — click-test before publish.
// NOTE: the other '54 Google reviews' mentions across the site are still hardcoded.
export const GOOGLE_RATING = {
  value: 4.9,
  count: 54,
  url: "https://www.google.com/maps?cid=16570599471134680063",
};

export interface Service {
  slug: string;
  title: string;
  short: string;
  image: string;
  featured: boolean;
  kicker?: string;
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro: string;
  body?: string[];
  bullets: string[];
  faqs: { q: string; a: string }[];
  gallery?: string[];
  videos?: string[];
}

export const services: Service[] = [
  {
    // Slug deliberately left as kitchen-demolition: the page is indexed at that
    // URL and only the display label changed.
    slug: "kitchen-demolition",
    title: "Kitchen Strip Outs",
    short: "Complete kitchen strip outs — cabinetry, benchtops, tiles, appliances. Reno-ready in a day.",
    image: "/images/kitchen-demolition/hero.jpg",
    featured: true,
    kicker: "Kitchen strip out",
    h1: "Kitchen demolition & strip outs in Melbourne",
    metaTitle: "Kitchen Demolition Melbourne | Kitchen Strip Out — Demo Bros",
    metaDescription:
      "Kitchen demolition and strip outs in Melbourne — cabinetry, benchtops, tiles and appliances removed clean and reno-ready, often in a day. Fixed price, clean handover.",
    intro:
      "Old kitchen out, clean slate in — often in a single day. We remove cabinetry, benchtops, splashbacks, tiling and appliances, protect your floors and adjoining rooms, and hand back a space that's ready for your renovation.",
    body: [
      "A kitchen strip out is the first job of any kitchen renovation — and the one that decides how smoothly the rest goes. Rip it out carelessly and you damage floors, walls and plumbing you meant to keep. Demo Bros removes a kitchen methodically: cabinets, benchtops, splashbacks, wall and floor tiles, range hoods, and appliances, with services safely isolated and surrounding surfaces protected.",
      "We work across Melbourne homes and apartments, coordinate around tight access and body-corporate rules, and leave the space broom-swept and ready for your cabinetmaker, tiler or builder. Fixed price, VBA compliant, insured to $20 million.",
    ],
    bullets: [
      "Cabinetry & joinery — base and overhead cabinets, pantry and island units removed and cleared",
      "Benchtops & splashbacks — stone, laminate or timber tops and tiled or glass splashbacks taken out clean",
      "Tiling & flooring — wall and floor tiles removed; substrate left ready for the new finish",
      "Appliances & fixtures — ovens, cooktops, rangehoods and sinks disconnected by licensed trades and removed",
      "Make-safe & protection — water, gas and power isolated by licensed trades; floors and adjoining rooms protected",
    ],
    faqs: [
      { q: "How long does a kitchen demolition take?", a: "Most kitchen strip outs are completed in a day, depending on size, tiling and access. We confirm the timing in your fixed quote." },
      { q: "Do you disconnect the plumbing and gas?", a: "We coordinate licensed plumbers and electricians to safely isolate water, gas and power before removal — it's part of the job." },
      { q: "Will you protect the rest of my home?", a: "Yes. We protect floors, doorways and adjoining rooms, and seal against dust before we start." },
      { q: "Do you take the old kitchen away?", a: "Yes — all cabinetry, tiles and debris are removed and responsibly disposed of, and the space is left broom-swept." },
    ],
    gallery: ["/images/kitchen-demolition/gallery-01.jpg"],
  },
  {
    slug: "bathroom-strip-outs",
    title: "Bathroom Strip Outs",
    short: "Tiles, fixtures, screens and waterproofing removed clean — down to the frame if needed.",
    image: "/images/bathroom-strip-outs/hero.jpg",
    featured: true,
    kicker: "Bathroom strip out",
    h1: "Bathroom strip outs in Melbourne",
    metaTitle: "Bathroom Strip Out Melbourne | Bathroom Demolition — Demo Bros",
    metaDescription:
      "Bathroom strip outs in Melbourne — tiles, fixtures, screens and waterproofing removed clean, down to the frame if needed. Fixed price, dust-controlled, reno-ready.",
    intro:
      "Tiles, vanities, screens, baths and old waterproofing removed clean — down to the frame if your renovation needs it. Dust controlled, floors protected, and the room handed back ready to waterproof and tile.",
    body: [
      "Bathrooms are the fiddliest room to strip out well. Behind the tiles are waterproofing membranes, plumbing and often timber or concrete substrates that all need the right approach. Demo Bros removes wall and floor tiles, vanities, toilets, baths, shower screens and old waterproofing, and can take the room back to studs and slab where the renovation calls for it.",
      "We control dust, protect the rest of the home, and coordinate licensed disconnection of plumbing. Across Melbourne houses and apartments, we hand back a clean, sound substrate ready for your waterproofer and tiler — on a fixed price.",
    ],
    bullets: [
      "Tiling & waterproofing — wall and floor tiles and old membrane removed, substrate assessed and cleared",
      "Fixtures & fittings — vanity, toilet, bath, basin, tapware and shower screen removed",
      "Back to frame if needed — linings taken back to studs and slab where the reno requires a full rebuild",
      "Dust & moisture control — barriers and extraction to keep dust and debris out of the rest of the home",
      "Make-safe — water and power isolated by licensed trades before removal",
    ],
    faqs: [
      { q: "Can you strip the bathroom back to the frame?", a: "Yes — we can remove everything down to studs and slab, or stop at a partial strip out, depending on your renovation plans." },
      { q: "How do you control dust in a bathroom strip out?", a: "We seal the room, use dust barriers and extraction, and protect access paths, so the rest of your home stays clean." },
      { q: "Do you remove the old waterproofing?", a: "Yes, where required. We remove failed or old membrane so your waterproofer can start on a sound substrate." },
      { q: "How long does a bathroom strip out take?", a: "Usually one day for a standard bathroom; we confirm in your fixed quote." },
    ],
    gallery: [
      "/images/bathroom-strip-outs/gallery-01.jpg",
      "/images/bathroom-strip-outs/gallery-02.jpg",
      "/images/bathroom-strip-outs/gallery-03.jpg",
    ],
    // Reusing the Maribyrnong interior strip-out clip until a bathroom-specific video is supplied.
    videos: ["/images/maribyrnong-strip-out/maribyrnong-strip-out-video-02.mp4"],
  },
  {
    slug: "internal-demolition",
    title: "Internal Demolition",
    short: "Walls, ceilings, floors and linings removed with structural integrity fully preserved.",
    image: "/images/internal-demolition/hero.jpg",
    featured: true,
    kicker: "Internal demolition",
    h1: "Internal demolition & wall removal in Melbourne",
    metaTitle: "Internal Demolition & Wall Removal Melbourne — Demo Bros",
    metaDescription:
      "Internal demolition and wall removal in Melbourne. Walls, ceilings, floors and linings removed with the structure protected. Load-bearing checks, fixed price.",
    intro:
      "Open up a floor plan, remove a wall, or strip an interior back to shell — with the structure fully protected. We handle load-bearing checks and engineer coordination so nothing comes down that shouldn't.",
    body: [
      "Internal demolition is how a dated, boxed-in home becomes an open, light-filled one — but it's also where things go wrong if a load-bearing wall is misread. Demo Bros removes internal walls, ceilings, floors, linings and built-in structures, and coordinates the structural checks and temporary propping that keep the rest of the building safe.",
      "If a wall is load-bearing, we work with your engineer or builder on propping and the beam install sequence. If it isn't, we take it out cleanly and cart it away. Either way you get a fixed price, dust control, and a tidy, ready-to-build space — anywhere across Melbourne.",
    ],
    bullets: [
      "Wall removal — non-structural and (with engineering) load-bearing walls removed to open up the plan",
      "Ceilings & floors — ceilings, bulkheads, floor coverings and substrates taken out",
      "Linings & built-ins — plaster, cladding, joinery and built-in structures removed",
      "Structural coordination — load-bearing checks, temporary propping and engineer/builder coordination",
      "Protection & clean-up — dust barriers, service isolation and full rubbish removal",
    ],
    faqs: [
      { q: "Can you remove a load-bearing wall?", a: "Yes — with the right engineering. We coordinate load-bearing checks, temporary propping and the beam sequence with your engineer or builder before removal." },
      { q: "How do I know if a wall is load-bearing?", a: "We assess it on site as part of the quote. If there's any doubt, we involve a structural engineer before anything is removed." },
      { q: "Do you remove ceilings and floors too?", a: "Yes — ceilings, bulkheads, floor coverings, substrates and linings are all within internal demolition." },
      { q: "Is it messy?", a: "We control it. Dust barriers, protected access and full clean-up keep the disruption to a minimum." },
    ],
    gallery: [
      "/images/internal-demolition/gallery-01.jpg",
      "/images/internal-demolition/gallery-02.jpg",
      "/images/internal-demolition/gallery-03.jpg",
    ],
  },
  {
    slug: "partial-demolition",
    title: "Partial Demolition",
    short: "Precise removal of extensions, garages and structures — the rest stays untouched.",
    image: "/images/partial-demolition/hero.jpg",
    featured: false,
    kicker: "Partial demolition",
    h1: "Partial demolition in Melbourne",
    metaTitle: "Partial Demolition Melbourne | Extensions & Garages — Demo Bros",
    metaDescription:
      "Partial demolition in Melbourne — remove extensions, garages, lean-tos and single structures precisely, while the rest of the home stays untouched. Fixed price.",
    intro:
      "Remove an extension, garage, lean-to or single structure with surgical precision — while the part of the home you're keeping stays completely untouched. The delicate demolition that protects what remains.",
    body: [
      "Partial demolition is the art of taking away one part of a building without disturbing the rest. It's what makes a knock-down-and-extend, a second storey, or a targeted renovation possible. Demo Bros removes rear extensions, garages, carports, lean-tos, chimneys, decks and single rooms — cleanly separating the demolition zone from the retained structure and protecting the join.",
      "We manage the make-safe, weather-proofing of exposed edges, service isolation and waste removal, and coordinate with your builder so the new work starts on a sound, protected face. Fixed price, VBA compliant, across Melbourne.",
    ],
    bullets: [
      "Extensions & additions — rear and side extensions removed back to a clean, retained structure",
      "Garages, carports & sheds — freestanding and attached structures demolished and cleared",
      "Single structures — chimneys, decks, pergolas, lean-tos and individual rooms",
      "Protect the retained build — careful separation, temporary weather protection and propping where needed",
      "Make-safe & clear — service isolation, edge make-safe and full site clean-up",
    ],
    faqs: [
      { q: "What is partial demolition?", a: "Removing part of a building — an extension, garage or single structure — while the rest is protected and retained. It's common before extensions and renovations." },
      { q: "Can you protect the part of the house we're keeping?", a: "Yes — protecting the retained structure and the join is the core of partial demolition. We separate the zones carefully and weather-protect exposed edges." },
      { q: "Do I need a permit for partial demolition?", a: "Some partial demolition needs a permit or consent depending on scope and location. We can advise and work in with your building surveyor." },
      { q: "Do you remove garages and chimneys?", a: "Yes — garages, carports, chimneys, decks and similar structures are all within partial demolition." },
    ],
    gallery: [
      "/images/partial-demolition/gallery-01.jpg",
      "/images/partial-demolition/gallery-02.jpg",
      "/images/partial-demolition/gallery-03.jpg",
    ],
  },
  {
    slug: "commercial-strip-outs",
    title: "Commercial Strip Outs",
    short: "Offices, retail and hospitality stripped to base building — fast, compliant, after-hours.",
    image: "/images/commercial-strip-outs/hero.jpg",
    featured: true,
    kicker: "Commercial strip out",
    h1: "Commercial strip outs in Melbourne",
    metaTitle: "Commercial Strip Outs Melbourne | Retail & Office — Demo Bros",
    metaDescription:
      "Commercial strip outs in Melbourne — offices, retail and hospitality stripped to base building. Fast, compliant, after-hours, fully documented. Fixed price.",
    intro:
      "Offices, retail and hospitality stripped back to base building — fast, compliant, and after-hours when you need trading to continue. Program locked, SWMS spotless, handover documented.",
    body: [
      "A commercial strip out has to hit a program and a compliance standard that a home reno never does — building management rules, after-hours access, dust and noise limits, and a make-good spec to meet. Demo Bros strips offices, shops, restaurants, cafés and hospitality venues back to base building or to a defined scope, working after-hours and around live tenancies where required.",
      "We manage building-management liaison, protection of common areas and lifts, service isolation, and full documentation for your make-good or handover. You get a fixed price, a program that holds, and a base building your fit-out team or landlord can sign off — anywhere across Melbourne.",
    ],
    bullets: [
      "Partitions & ceilings — office partitions, suspended ceilings, bulkheads and glazing removed",
      "Floor coverings — carpet, vinyl, tiles and adhesives removed; slab left ready",
      "Services & fit-out — redundant data, power, HVAC and joinery stripped (isolated by licensed trades)",
      "Retail & hospitality — shopfronts, counters, kitchens and fit-out removed to base building",
      "Compliance & documentation — SWMS, building-management liaison, after-hours access and a documented handover",
    ],
    faqs: [
      { q: "Can you work after-hours or around a live tenancy?", a: "Yes. We regularly work after-hours and around trading tenancies, with building-management liaison and common-area protection." },
      { q: "Do you strip back to base building?", a: "Yes — to base building or to a defined scope. We deliver to the make-good or handover spec you provide." },
      { q: "Do you provide SWMS and documentation?", a: "Yes — SWMS on every job, plus documented handover for make-good sign-off." },
      { q: "What types of commercial spaces do you strip out?", a: "Offices, retail shops, restaurants, cafés, hospitality venues, medical and more across Melbourne." },
    ],
    gallery: [
      "/images/commercial-strip-outs/gallery-01.jpg",
      "/images/commercial-strip-outs/gallery-02.jpg",
      "/images/commercial-strip-outs/gallery-03.jpg",
    ],
  },
  {
    slug: "office-defits",
    title: "Office Defits",
    short: "End-of-lease defits delivered to make-good spec — on program, fully documented.",
    image: "/images/office-defits/hero.jpg",
    featured: true,
    kicker: "Office defit & make good",
    h1: "Office defits & end-of-lease make good in Melbourne",
    metaTitle: "Office Defits & Make Good Melbourne | End of Lease — Demo Bros",
    metaDescription:
      "Office defits and end-of-lease make good in Melbourne. Delivered to make-good spec, after-hours, fully documented for sign-off. Fixed price, on program.",
    intro:
      "End-of-lease defits delivered to make-good spec — after-hours, on program, and fully documented so your make-good sign-off is effortless. We hand the space back the way the lease requires.",
    body: [
      "An office defit is a deadline with a demolition attached. Your make-good clause sets the standard, your lease sets the date, and building management sets the rules — miss any of them and it costs you. Demo Bros delivers office defits and end-of-lease make-goods across Melbourne: partitions, ceilings, flooring, joinery, signage and services removed, and the tenancy returned to the condition the lease specifies.",
      "We read the make-good spec, liaise with building management, work after-hours to protect neighbouring tenants, and document everything for a clean sign-off. Fixed price, locked program, no last-minute surprises — so you hand back the keys on time.",
    ],
    bullets: [
      "Partitions & ceilings — office partitions, suspended ceilings and bulkheads removed to base building",
      "Flooring & finishes — carpet, vinyl and floor finishes lifted; walls patched to make-good spec where required",
      "Joinery & signage — reception joinery, kitchenettes, workstations and branding removed",
      "Services — redundant data, power and mechanical services made safe and removed by licensed trades",
      "Make-good documentation — delivered to the lease spec with photographic handover for sign-off",
    ],
    faqs: [
      { q: "What is an office defit / make good?", a: "It's returning a leased office to the condition your lease requires at end of term — removing your fit-out (partitions, ceilings, flooring, joinery and services) and making good the space." },
      { q: "Can you work to our make-good clause?", a: "Yes — we read the make-good spec and deliver to it, with documented handover for landlord or agent sign-off." },
      { q: "Do you work after-hours to avoid disrupting other tenants?", a: "Yes. After-hours and weekend access with building-management liaison is standard for defits." },
      { q: "How far ahead should we book?", a: "As early as possible before your lease end date — it gives time to confirm the make-good scope and lock the program." },
    ],
    gallery: [
      "/images/office-defits/gallery-01.jpg",
      "/images/office-defits/gallery-02.jpg",
      "/images/office-defits/gallery-03.jpg",
    ],
  },
  {
    slug: "house-demolition",
    title: "House Demolition",
    short: "Complete residential demolition, managed end to end — approvals to clear block.",
    image: "/images/house-demolition/hero.jpg",
    featured: false,
    kicker: "House demolition",
    h1: "House demolition in Melbourne",
    metaTitle: "House Demolition Melbourne | Knock Down Rebuild — Demo Bros",
    metaDescription:
      "House demolition in Melbourne for knock-down rebuilds. Managed end to end — approvals, disconnections, asbestos coordination and a clear, level block. Fixed price.",
    intro:
      "Complete residential demolition, managed end to end — from approvals and service disconnections to a clear, level block ready for your builder. The clean start your knock-down rebuild depends on.",
    body: [
      "A house demolition looks simple from the street and is anything but behind the scenes: permits and asset-protection permits, service disconnections, asbestos assessment and removal, neighbour notifications, and a demolition sequence that keeps everyone safe. Demo Bros manages the whole process for Melbourne knock-down rebuilds, so you hand your builder a clean, level, ready-to-go block.",
      "We coordinate the demolition permit and service disconnections (power, gas, water, telecommunications), arrange licensed asbestos removal where needed, protect neighbouring properties, and separate materials for recycling. Fixed price, clear program, and a site left clean and level. House demolition is a supporting service alongside our lead strip-out and partial-demolition work — but it's delivered with the same discipline.",
    ],
    bullets: [
      "Approvals & disconnections — demolition permit coordination and disconnection of power, gas, water and telecommunications",
      "Asbestos & hazmat — assessment and licensed removal of asbestos and hazardous materials before demolition",
      "Protection & safety — asset-protection, neighbour notification, fencing and a documented safety system",
      "Demolition & clearance — full structural demolition, slab and footings removal where required",
      "Clean, level block — site cleared, levelled and left ready for your builder; materials recycled where possible",
    ],
    faqs: [
      { q: "How much does house demolition cost in Melbourne?", a: "Cost depends on size, access, asbestos and slab removal — we provide a fixed quote after a site inspection so there are no surprises." },
      { q: "How long does a house demolition take?", a: "On site, a standard home is typically a few days once permits and disconnections are done. The lead time for approvals is usually the longer part — we manage both." },
      { q: "Do you handle permits and disconnections?", a: "Yes — we coordinate the demolition permit and the disconnection of power, gas, water and telecommunications." },
      { q: "Do you remove asbestos?", a: "We arrange licensed asbestos assessment and removal before demolition where it's present." },
    ],
    gallery: [
      "/images/house-demolition/gallery-01.jpg",
      "/images/house-demolition/gallery-02.jpg",
      "/images/house-demolition/gallery-03.jpg",
    ],
  },
  {
    slug: "renovation-preparation",
    title: "Renovation Preparation",
    short: "The strip out stage of your renovation, done once, done right — builder-ready handover.",
    image: "/images/renovation-preparation/hero.jpg",
    featured: false,
    kicker: "Renovation preparation",
    h1: "Renovation preparation & strip outs in Melbourne",
    metaTitle: "Renovation Demolition & Strip Out Melbourne — Demo Bros",
    metaDescription:
      "The strip-out stage of your renovation, done once and done right. Melbourne renovation demolition — protected structure, clean handover, builder-ready. Fixed price.",
    intro:
      "The strip-out stage of your renovation, done once and done right. We clear the old interior, protect the structure, and hand your builder a clean, ready-to-start site — so the renovation begins on schedule, not behind it.",
    body: [
      "Every renovation starts with demolition — and a messy, half-finished strip out is the fastest way to blow the budget before the build even begins. Renovation preparation is Demo Bros' single-scope service for renovators and builders: we take the space from \"old and in the way\" to \"clean and ready\", whether that's one room or a whole-home gut.",
      "We coordinate with your builder's program, sequence the strip out around trades, isolate services, protect what stays, and remove all waste. The result is a builder-ready site — sound substrates, clear access and a documented handover — so your renovation starts on day one, not day five.",
    ],
    bullets: [
      "Whole-home or single-room — strip one room or gut an entire interior back to shell",
      "Sequenced to your build — we work in with your builder's program and trade sequence",
      "Structure protected — load-bearing checks, propping and service isolation as needed",
      "Clean substrates — floors, walls and ceilings left sound and ready for new finishes",
      "Documented handover — broom-swept, photographed and cleared of all waste",
    ],
    faqs: [
      { q: "What's the difference between a strip out and renovation preparation?", a: "They're the same core work — renovation preparation is the whole strip-out stage of a reno, coordinated around your builder's program so the site is ready to build." },
      { q: "Do you work in with my builder?", a: "Yes. We sequence the strip out around your builder's program and trades, and hand over a documented, ready-to-start site." },
      { q: "Can you do a whole-home strip out?", a: "Yes — from a single room to a complete interior gut back to shell." },
      { q: "Do you remove all the rubbish?", a: "Yes, all demolition waste is removed and responsibly disposed of, and the site is left broom-swept." },
    ],
    gallery: [
      "/images/renovation-preparation/gallery-01.jpg",
      "/images/renovation-preparation/gallery-02.jpg",
      "/images/renovation-preparation/gallery-03.jpg",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // REMOVAL SERVICES — added Jul 2026 for the grouped header menu.
  //
  // TODO (before publish):
  //  1. Copy below is a first draft written to match the existing page
  //     structure. It has NOT been reviewed by Demo Bros. Verify every claim.
  //  2. No job photography exists for these four — each reuses an image from a
  //     related service. Replace with real photos.
  //  3. ASBESTOS especially: removal is licensed work in Victoria (WorkSafe A
  //     and B class licences). The copy below deliberately does not state which
  //     licence Demo Bros holds, or that it self-performs removal. Confirm the
  //     licence position with the CEO and rewrite accordingly before publish.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "rubbish-removal",
    title: "Rubbish Removal",
    short: "Builders' waste, demolition debris and site clean-ups cleared and responsibly disposed of.",
    image: "/images/internal-demolition/hero.jpg",
    featured: false,
    kicker: "Rubbish removal",
    h1: "Rubbish removal in Melbourne",
    metaTitle: "Rubbish Removal Melbourne | Builders' Waste Clearance — Demo Bros",
    metaDescription:
      "Rubbish removal across Melbourne — builders' waste, demolition debris and site clean-ups cleared on a fixed price, sorted for recycling where possible.",
    intro:
      "Builders' waste, demolition debris and general site rubbish loaded out and disposed of properly. Fixed price, no skip permits to chase, and the site left broom-swept.",
    body: [
      "Rubbish is the part of a job that quietly eats a program. Skips fill faster than expected, permits take time on narrow streets, and a cluttered site slows every trade that follows. Demo Bros clears builders' waste, demolition debris, packaging, offcuts and general site rubbish in one coordinated visit.",
      "We sort material for recycling where it is practical to do so, dispose of the rest through licensed facilities, and hand the site back clean and ready for the next trade. Fixed price, quoted up front.",
    ],
    bullets: [
      "Builders' waste — timber, plasterboard, offcuts, packaging and general construction rubbish",
      "Demolition debris — brick, concrete, tile and rubble loaded out and cleared",
      "Site clean-ups — end-of-job clears so the space is ready for handover or the next trade",
      "Sorted for recycling where practical, with the balance disposed of through licensed facilities",
      "No skip hire or permits to arrange — we bring the labour and the trucks",
    ],
    faqs: [
      { q: "Do I need a skip permit?", a: "No. We load directly to our own trucks, so there's no skip sitting on the street and no council permit to arrange." },
      { q: "What can't you take?", a: "Asbestos and hazardous material are handled separately under the correct controls — tell us if you suspect any and we'll scope it properly rather than mixing it with general waste." },
      { q: "Do you recycle?", a: "We separate material for recycling wherever it's practical on the job, and dispose of the remainder through licensed facilities." },
      { q: "How is it priced?", a: "On volume and access, confirmed as a fixed price before we start. Send photos and we can usually quote without a site visit." },
    ],
    gallery: ["/images/internal-demolition/gallery-01.jpg"],
  },
  {
    slug: "junk-removal",
    title: "Junk Removal",
    short: "Furniture, whitegoods and accumulated household or office junk cleared in a single visit.",
    image: "/images/internal-demolition/gallery-02.jpg",
    featured: false,
    kicker: "Junk removal",
    h1: "Junk removal in Melbourne",
    metaTitle: "Junk Removal Melbourne | Furniture & Whitegoods Clearance — Demo Bros",
    metaDescription:
      "Junk removal across Melbourne — furniture, whitegoods, office fitout and accumulated household clutter cleared in one visit. Fixed price, clean handover.",
    intro:
      "Old furniture, whitegoods, office equipment and accumulated clutter cleared out in a single visit. We do the lifting and the loading, and leave the space clean.",
    body: [
      "Junk removal is the job people put off because it means carrying heavy, awkward things down stairs. Demo Bros handles the lot — lounges, mattresses, wardrobes, fridges, washing machines, desks, filing cabinets and the boxes that have been in the garage for a decade.",
      "We work through houses, apartments, offices and storage units across Melbourne, manage tight access and stairs, and dispose of everything responsibly. Reusable items are diverted where we can. Fixed price, quoted before we start.",
    ],
    bullets: [
      "Furniture — lounges, beds, mattresses, wardrobes, tables and outdoor furniture",
      "Whitegoods & appliances — fridges, washers, dryers, dishwashers and ovens removed",
      "Office clear-outs — desks, chairs, filing cabinets, partitions and old IT equipment",
      "Full house or garage clears, including stairs and tight apartment access",
      "Reusable items diverted where possible; the rest disposed of responsibly",
    ],
    faqs: [
      { q: "Do I need to move anything to the kerb?", a: "No. We remove items from wherever they sit — upstairs, in the garage, out the back. The lifting is our job." },
      { q: "Can you handle apartment access?", a: "Yes. We work around lift bookings, loading docks and body-corporate requirements regularly across Melbourne." },
      { q: "What happens to it all?", a: "Anything still usable is diverted where we can, and the balance goes through licensed disposal facilities." },
      { q: "How quickly can you come?", a: "Most junk removals can be booked within a few days. Tell us the volume and access and we'll confirm the earliest slot." },
    ],
    gallery: ["/images/internal-demolition/gallery-03.jpg"],
  },
  {
    slug: "asbestos-removal",
    title: "Asbestos Removal",
    short: "Suspected asbestos identified, contained and removed under licensed controls before works begin.",
    image: "/images/partial-demolition/hero.jpg",
    featured: false,
    kicker: "Asbestos removal",
    h1: "Asbestos removal in Melbourne",
    metaTitle: "Asbestos Removal Melbourne | Licensed Removal & Clearance — Demo Bros",
    metaDescription:
      "Asbestos identification, containment and licensed removal across Melbourne, with independent clearance before demolition or strip-out works continue.",
    intro:
      "If asbestos is found — or suspected — it gets handled properly before anything else happens. Identification, containment, licensed removal and independent clearance, with the paperwork to prove it.",
    body: [
      "Any Melbourne building from before the late 1980s can contain asbestos: eaves, wall sheeting, vinyl backing, fencing, roof sheets and pipe lagging. It is not something to discover halfway through a strip-out. Where a property is likely to contain it, we arrange sampling and testing before works begin.",
      "Removal is licensed work in Victoria and is carried out under WorkSafe requirements — the area is contained and signed, material is removed and wrapped under controlled conditions, and waste goes to a facility licensed to receive it. Independent clearance is obtained before other trades return to the area, and you receive the documentation for your records.",
    ],
    bullets: [
      "Identification — sampling and NATA-accredited testing where asbestos is suspected",
      "Containment — the work area sealed and signed before removal begins",
      "Licensed removal — carried out under WorkSafe Victoria requirements and controls",
      "Licensed disposal — waste transported to a facility licensed to receive asbestos",
      "Independent clearance — obtained before other trades return, with documentation supplied",
    ],
    faqs: [
      { q: "How do I know if my property has asbestos?", a: "Any Melbourne building constructed or renovated before the late 1980s may contain it. The only way to be certain is sampling and laboratory testing, which we arrange before works start." },
      { q: "Can you just work around it?", a: "No. Disturbing asbestos is what makes it dangerous, so it's identified and dealt with before demolition or strip-out work begins in that area." },
      { q: "Do I get documentation?", a: "Yes. You receive the test results, disposal records and the independent clearance certificate for your records." },
      { q: "Will it delay my project?", a: "It adds time, but far less than discovering it mid-job and stopping work. Scoping it up front is what keeps the program predictable." },
    ],
    gallery: ["/images/partial-demolition/gallery-01.jpg"],
  },
  {
    slug: "hoarding-removal",
    title: "Hoarding Removal",
    short: "Sensitive, discreet clearing of heavily cluttered properties, restoring the space safely.",
    image: "/images/house-demolition/gallery-01.jpg",
    featured: false,
    kicker: "Hoarding removal",
    h1: "Hoarding clean-up & removal in Melbourne",
    metaTitle: "Hoarding Removal Melbourne | Discreet Property Clean-Up — Demo Bros",
    metaDescription:
      "Discreet hoarding clean-up and removal across Melbourne. Heavily cluttered properties cleared safely and respectfully, with unmarked vehicles on request.",
    intro:
      "Heavily cluttered properties cleared safely, respectfully and without judgement. We work at a pace that suits the household, and can attend in unmarked vehicles.",
    body: [
      "Hoarding clean-ups are as much about people as property. There is often a family member, landlord or support worker involved, and the household may need items sorted rather than simply thrown out. Demo Bros works to whatever pace and boundaries are agreed before we arrive.",
      "Practically, these properties can carry real hazards — blocked exits, unstable stacks, pests, spoiled food and biological contamination. Our crews use appropriate protective equipment, clear methodically so exits stay usable, and can arrange specialist cleaning or pest treatment once the space is emptied. Unmarked vehicles are available on request.",
    ],
    bullets: [
      "Discreet attendance — unmarked vehicles available on request",
      "Agreed sorting — items set aside for keeping, donation or disposal as directed",
      "Safe methodical clearing — exits and walkways kept usable throughout",
      "Hazard-aware — appropriate PPE for pests, spoiled material and biological contamination",
      "Specialist deep cleaning and pest treatment coordinated once the property is cleared",
    ],
    faqs: [
      { q: "Will the neighbours know?", a: "Not from us. We can attend in unmarked vehicles and work discreetly — it's a common request and we're used to it." },
      { q: "Can we keep some things?", a: "Yes. We agree beforehand what's kept, donated or disposed of, and can sort as we go rather than clearing indiscriminately." },
      { q: "Do you clean afterwards?", a: "We clear the property and can coordinate specialist deep cleaning and pest treatment once it's empty, if that's needed." },
      { q: "How is it quoted?", a: "On volume, access and condition. Given the sensitivity, we're happy to quote from photos or a short private walkthrough — whichever is easier." },
    ],
    gallery: ["/images/house-demolition/gallery-02.jpg"],
  },
];

/**
 * Header navigation grouping. Items point either at a /services/$slug page or at
 * a standalone route (Commercial Demolition has its own landing page), so each
 * carries its own `to` rather than being derived from the slug.
 */
export type ServiceNavItem = { label: string; to: string; params?: { slug: string } };
export type ServiceNavGroup = { label: string; items: ServiceNavItem[] };

const svc = (slug: string, label: string): ServiceNavItem => ({
  label,
  to: "/services/$slug",
  params: { slug },
});

export const serviceGroups: ServiceNavGroup[] = [
  {
    label: "Demolitions",
    items: [
      svc("house-demolition", "House Demolition"),
      svc("partial-demolition", "Partial Demolition"),
      svc("internal-demolition", "Internal Demolition"),
      { label: "Commercial Demolition", to: "/commercial-demolition" },
    ],
  },
  {
    label: "Strip-outs",
    items: [
      svc("bathroom-strip-outs", "Bathroom Strip Outs"),
      svc("kitchen-demolition", "Kitchen Strip Outs"),
      svc("commercial-strip-outs", "Commercial Strip Outs"),
      svc("office-defits", "Office Defits"),
      svc("renovation-preparation", "Renovation Preparation"),
    ],
  },
  {
    label: "Removal",
    items: [
      svc("rubbish-removal", "Rubbish Removal"),
      svc("junk-removal", "Junk Removal"),
      svc("asbestos-removal", "Asbestos Removal"),
      svc("hoarding-removal", "Hoarding Removal"),
    ],
  },
];

export const projects = [
  {
    slug: "acmi-cbd-strip-out",
    title: "ACMI Strip-Out — Melbourne CBD",
    category: "Commercial Strip Out",
    location: "Melbourne CBD",
    image: "/images/commercial-strip-outs/hero.jpg",
    stat: "National museum · Federation Square",
    description:
      "A commercial strip-out inside ACMI at Federation Square — one of Melbourne's landmark cultural institutions. Gallery spaces returned to base building with full protection, documentation and after-hours staging.",
  },
  {
    slug: "dandenong-warehouse-demolition",
    title: "Dandenong Warehouse Demolition",
    category: "Commercial Demolition",
    location: "Dandenong",
    image: "/images/projects/warehouse-conversion.jpg",
    stat: "Industrial · structural steel & mezzanine",
    description:
      "Full internal demolition of an industrial warehouse in Dandenong — structural steel cutting, mezzanine removal and mechanical clearance delivered by a machine-and-labour crew.",
  },
  {
    slug: "seddon-internal-strip-out",
    title: "Seddon Internal Strip-Out",
    category: "Internal Demolition",
    location: "Seddon",
    image: "/images/projects/federation-home-internal.jpeg",
    stat: "Before & after · inner-west",
    description:
      "A tight-access residential strip-out in Seddon — internal and partial demolition by hand and mini-excavator, handed over clean, protected and builder-ready.",
  },
  {
    slug: "south-yarra-partial-demolition",
    title: "South Yarra Partial Demolition",
    category: "Partial Demolition",
    location: "South Yarra",
    image: "/images/projects/heritage-terrace-partial.jpg",
    stat: "Multi-stage · scaffolded facade",
    description:
      "A staged partial demolition and strip-out in South Yarra with full scaffold, facade protection and dust encapsulation — controlled removal while the retained structure stayed protected throughout.",
  },
  {
    slug: "deanside-knock-down",
    title: "Richmond Full Home",
    category: "House Demolition",
    location: "Deanside",
    image: "/images/house-demolition/hero.jpg",
    stat: "Before & after · drone-documented",
    description:
      "A full-home demolition in Deanside captured before-and-after by drone — services disconnected, structure removed and the block handed over clean, level and build-ready.",
  },
  {
    slug: "maribyrnong-strip-out",
    title: "Maribyrnong Strip-Out",
    category: "Residential Strip Out",
    location: "Maribyrnong",
    image: "/images/maribyrnong-strip-out/maribyrnong-strip-out-01.jpg",
    stat: "Interior strip · Forefront build",
    description:
      "An interior strip-out in Maribyrnong for builder client Forefront — plasterboard, linings and fittings removed and the shell prepared for the next stage of the renovation.",
  },
  {
    slug: "kew-full-house-strip-out",
    title: "Kew Full-House Strip-Out",
    category: "Residential Strip Out",
    location: "Kew",
    image: "/images/kew-full-house-strip-out/kew-full-house-strip-out-01.jpg",
    stat: "Whole home · kitchen, bath, ensuite, laundry & floorboards",
    description:
      "A whole-home strip-out in Kew — kitchen, bathroom, ensuite and laundry stripped back, floorboards lifted and rooms taken to frame where the renovation required. Dust controlled, retained structure protected and the house handed over builder-ready.",
  },
  {
    slug: "diggers-rest-shop-merging",
    title: "Diggers Rest Shop Merge",
    category: "Commercial Demolition",
    location: "Diggers Rest",
    image: "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-01.jpg",
    stat: "Two tenancies · dividing wall removed",
    description:
      "Two adjoining shop tenancies at Diggers Rest opened up into one — the dividing wall removed and the space cleared back to a single open retail floor. Dust controlled, structure managed and handed over ready for fitout.",
  },
  {
    slug: "st-kilda-west-heritage-strip-out",
    title: "St Kilda West Heritage Strip-Out",
    category: "Partial Demolition",
    location: "St Kilda West",
    image: "/images/longmore-st/longmore-st-01.jpg",
    stat: "17 Longmore St · heritage retained · before & after",
    description:
      "A heritage home at 17 Longmore St, St Kilda West stripped back for a major renovation — roof and rear structure removed and the interior taken to frame, while the period facade was retained and protected. Careful, staged demolition that made way for the rebuild.",
  },
  {
    slug: "deanside-fire-damage-roof-removal",
    title: "Deanside Fire-Damage Roof & Timber Removal",
    category: "Partial Demolition",
    location: "Deanside",
    image: "/images/deanside-burnt-down-timbers-roof-removal-media/deanside-fire-damage-01.jpg",
    stat: "Fire damage · burnt timbers & roof removed",
    description:
      "Fire-damage make-safe and removal at a Deanside property — the burnt roof structure and charred timbers stripped out and the building taken back to a safe, sound frame. Methodical removal and debris clearance after significant fire damage.",
  },
];

// Per-project case-study content, keyed by project slug. Paraphrased from each
// project's description — accurate and generic. Safe to edit/expand with real
// job specifics (dates, crew size, verified figures) before go-live.
export const projectDetails: Record<
  string,
  {
    services: string[];
    scope: string[];
    outcome: string;
    gallery: string[];
    video?: string;
    videos?: string[];
  }
> = {
  "acmi-cbd-strip-out": {
    services: ["Commercial Strip Out", "Internal Demolition"],
    scope: [
      "Gallery and exhibition spaces returned to base building",
      "Full protection to retained floors, walls and services",
      "After-hours staging to keep the institution operating",
      "Separated waste streams with documented recycling",
    ],
    outcome: "Handed back on program and broom-swept, ready for the incoming fitout.",
    video:
      "https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783693988/Demo_Bros_video_1_ACMI_horizontal_V1_xjirhk.mp4",
    gallery: [
      "/images/projects/trend-demobros-acmi-stage3-apr26-8.jpg",
      "/images/commercial-strip-outs/gallery-01.jpg",
      "/images/commercial-strip-outs/gallery-02.jpg",
      "/images/commercial-strip-outs/gallery-03.jpg",
    ],
  },
  "dandenong-warehouse-demolition": {
    services: ["Commercial Demolition", "Structural Removal"],
    scope: [
      "Full internal demolition of an industrial warehouse",
      "Structural steel cutting and removal",
      "Mezzanine dismantle and mechanical clearance",
      "Machine-and-labour crew with staged load-outs",
    ],
    outcome: "Cleared and level, ready for the next stage of works.",
    gallery: [
      "/images/projects/warehouse-conversion.jpg",
      "/images/commercial-strip-outs/gallery-02.jpg",
      "/images/commercial-strip-outs/gallery-03.jpg",
    ],
  },
  "seddon-internal-strip-out": {
    services: ["Internal Demolition", "Partial Demolition"],
    scope: [
      "Tight-access residential strip-out by hand and mini-excavator",
      "Internal linings, fixtures and finishes removed",
      "Retained structure protected throughout",
      "Clean, builder-ready handover",
    ],
    outcome: "Handed over clean, protected and ready for the builder.",
    gallery: [
      "/images/seddon-partial-strip-out/seddon-internal-strip-out.jpeg",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-01.jpg",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-02.jpg",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-03.jpg",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-04.jpg",
    ],
    videos: [
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-video-01.mp4",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-video-02.mp4",
      "/images/seddon-partial-strip-out/seddon-partial-strip-out-video-03.mp4",
    ],
  },
  "south-yarra-partial-demolition": {
    services: ["Partial Demolition", "Strip Out"],
    scope: [
      "Staged partial demolition with full scaffold",
      "Facade protection and dust encapsulation",
      "Controlled removal around the retained structure",
      "Sequenced to keep the site safe and stable",
    ],
    outcome: "Retained structure protected throughout a controlled, staged removal.",
    gallery: [
      "/images/partial-demolition/hero.jpg",
      "/images/partial-demolition/gallery-01.jpg",
      "/images/partial-demolition/gallery-02.jpg",
    ],
  },
  "deanside-knock-down": {
    services: ["House Demolition", "Site Clearance"],
    scope: [
      "Full-home demolition, drone-documented before and after",
      "Services located and safely disconnected",
      "Structure removed and the block cleared",
      "Site handed over clean and level",
    ],
    outcome: "Block left clean, level and ready for the new build.",
    gallery: [
      "/images/house-demolition/gallery-01.jpg",
      "/images/house-demolition/gallery-02.jpg",
      "/images/house-demolition/gallery-03.jpg",
    ],
    videos: [
      "/images/deanside-knock-down-rebuild/deanside-knock-down-rebuild-video-01.mp4",
      "/images/deanside-knock-down-rebuild/deanside-knock-down-rebuild-video-02.mp4",
      "/images/deanside-knock-down-rebuild/deanside-knock-down-rebuild-video-03.mp4",
      "/images/deanside-knock-down-rebuild/deanside-knock-down-rebuild-video-04.mp4",
    ],
  },
  "maribyrnong-strip-out": {
    services: ["Residential Strip Out", "Internal Demolition"],
    scope: [
      "Interior strip-out for builder client Forefront",
      "Plasterboard, linings and fittings removed",
      "Shell prepared for the next renovation stage",
      "Clean handover, delivered to program",
    ],
    outcome: "Shell prepared and handed over ready for the renovation to continue.",
    gallery: [
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-02.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-03.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-04.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-05.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-06.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-07.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-08.jpg",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-09.jpg",
    ],
    videos: [
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-video-01.mp4",
      "/images/maribyrnong-strip-out/maribyrnong-strip-out-video-02.mp4",
    ],
  },
  "kew-full-house-strip-out": {
    services: ["Residential Strip Out", "Internal Demolition", "Bathroom Strip Out"],
    scope: [
      "Kitchen, bathroom, ensuite and laundry stripped out",
      "Floorboards lifted and subfloor exposed",
      "Rooms taken back to frame where the renovation required",
      "Dust controlled and retained structure protected throughout",
    ],
    outcome: "Whole home stripped and handed over clean, protected and builder-ready.",
    gallery: [
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-02.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-03.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-04.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-05.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-06.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-07.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-08.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-09.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-10.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-11.jpg",
      "/images/kew-full-house-strip-out/kew-full-house-strip-out-12.jpg",
    ],
  },
  "diggers-rest-shop-merging": {
    services: ["Commercial Demolition", "Internal Demolition", "Structural Removal"],
    scope: [
      "Dividing wall between two shop tenancies removed",
      "Two tenancies opened into a single retail floor",
      "Services and finishes cleared back to base",
      "Dust controlled and structure managed throughout",
    ],
    outcome: "Two shops merged into one open floor, ready for the new fitout.",
    gallery: [
      "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-02.jpg",
      "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-03.jpg",
      "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-04.jpg",
    ],
    videos: [
      "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-video-01.mp4",
      "/images/diggers-rest-shop-merging/diggers-rest-shop-merging-video-02.mp4",
    ],
  },
  "st-kilda-west-heritage-strip-out": {
    services: ["Partial Demolition", "Internal Demolition", "Strip Out"],
    scope: [
      "Roof and rear structure removed for the renovation",
      "Interior stripped back to frame",
      "Period facade retained and protected throughout",
      "Staged, dust-controlled demolition and a clean handover",
    ],
    outcome: "Period facade preserved and the home opened up, ready for its rebuild.",
    gallery: [
      "/images/longmore-st/longmore-st-02.jpg",
      "/images/longmore-st/longmore-st-03.jpg",
      "/images/longmore-st/longmore-st-04.jpg",
      "/images/longmore-st/longmore-st-05.jpg",
      "/images/longmore-st/longmore-st-06.jpg",
    ],
  },
  "deanside-fire-damage-roof-removal": {
    services: ["Partial Demolition", "House Demolition", "Structural Removal"],
    scope: [
      "Fire-damaged roof structure removed",
      "Charred and unsound timbers stripped out",
      "Building made safe and taken back to a sound frame",
      "Debris cleared and the site left safe and ready",
    ],
    outcome: "Fire-damaged structure made safe and cleared, ready for the rebuild.",
    gallery: [
      "/images/deanside-burnt-down-timbers-roof-removal-media/deanside-fire-damage-02.jpg",
      "/images/deanside-burnt-down-timbers-roof-removal-media/deanside-fire-damage-03.jpg",
      "/images/deanside-burnt-down-timbers-roof-removal-media/deanside-fire-damage-04.jpg",
      "/images/deanside-burnt-down-timbers-roof-removal-media/deanside-fire-damage-05.jpg",
    ],
  },
};

// Real reviews from the Demo Bros Google Business Profile (4.9★), captured 30 Aug 2026.
// Names and wording are verbatim — a few long reviews are excerpted for card length, but
// nothing is reworded. Never add a testimonial that is not on the live profile.
//
// `postedAt` is an approximate month derived from Google's own relative label at capture
// ("7 months ago" -> 2026-01); the UI recomputes the label so it never goes stale.
export type Testimonial = {
  name: string;
  /** Project descriptor drawn from the review itself — not a job title we invented. */
  role: string;
  quote: string;
  rating: number;
  /** Approximate month posted, YYYY-MM. */
  postedAt: string;
  /** Reviews on that reviewer's own Google profile, as shown on the listing. */
  profileReviews: number;
  localGuide: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Michael Tsalkos",
    role: "Rear garage demolition",
    quote:
      "Demo bros did a great job in demolishing the rear garage in a safe and timely manner, delivering on time. Would highly recommend the team for any job larger or small",
    rating: 5,
    postedAt: "2026-01",
    profileReviews: 5,
    localGuide: false,
  },
  {
    name: "Callie & James MacIntosh",
    role: "Partial demolition · Heritage home",
    quote:
      "Demo Bros have just completed the partial demolition of our heritage home. Very competitively priced and really great people to deal with. Easy communication, very helpful and nothing was too difficult. Would highly recommend.",
    rating: 5,
    postedAt: "2025-08",
    profileReviews: 7,
    localGuide: false,
  },
  {
    name: "Andrew Ma'a",
    role: "Residential demolition",
    quote:
      "Absolutely incredible service, fast, left our home very tidy. Highly recommended",
    rating: 5,
    postedAt: "2026-03",
    profileReviews: 2,
    localGuide: false,
  },
  {
    name: "Kristin W",
    role: "Commercial project · Melbourne",
    quote:
      "I recently used Demo Bros for a project in Melbourne. The full team from ops, planning and delivery were great and I would recommend them moving forward.",
    rating: 5,
    postedAt: "2026-04",
    profileReviews: 16,
    localGuide: true,
  },
  {
    name: "Andrew Mammarella",
    role: "Repeat client · Small and large jobs",
    quote:
      "Used them a few times for small and large jobs. Great work and people to deal with.",
    rating: 5,
    postedAt: "2025-11",
    profileReviews: 4,
    localGuide: false,
  },
  {
    name: "Tamara May",
    role: "Repeat client",
    quote:
      "Second time I’ve used demo bros. Great guys, great job! Good tidy up too.",
    rating: 5,
    postedAt: "2025-08",
    profileReviews: 10,
    localGuide: false,
  },
  {
    name: "Cale Dudderidge",
    role: "Commercial project · Melbourne CBD",
    quote:
      "Demo Bros did a great job on our commercial project in the city. With a tight program and access challenges, Henry and the team smashed it within the time frame, leaving the job tidy ready for the next trade.",
    rating: 5,
    postedAt: "2026-04",
    profileReviews: 3,
    localGuide: false,
  },
  {
    name: "Shane Rieniets",
    role: "Commercial strip-out",
    quote:
      "Henry and the team at Demo Bros were responsive, professional and easy to deal with. Our commercial strip-out was completed on time and at a high quality. I will use them for all of my future demolition projects.",
    rating: 5,
    postedAt: "2025-08",
    profileReviews: 4,
    localGuide: false,
  },
  {
    name: "Tom Peyton",
    role: "Demolition & permit",
    quote:
      "Demo Bros were great to deal with for our recent demolition. They were very responsive and easy to communicate with. Our permit and demolition were organised promptly and they did a great job. Highly recommended!",
    rating: 5,
    postedAt: "2026-04",
    profileReviews: 3,
    localGuide: false,
  },
  {
    name: "Drew Tuulakitau",
    role: "Backyard clean-up & soil levelling",
    quote:
      "DEMO BROS did an amazing job with our backyard clean-up and soil levelling. Super professional, on time, and easy to deal with. Price was very reasonable. The site was left spotless and perfectly levelled for the next stage. Highly recommend!",
    rating: 5,
    postedAt: "2026-04",
    profileReviews: 42,
    localGuide: true,
  },
  {
    name: "Carmen Teoh Jia Wen",
    role: "Site clean-up · Kew",
    quote:
      "The boys did a good job for our project at Kew! They tidied up our site and also helped me to remove an extra tree trunk at the back",
    rating: 5,
    postedAt: "2026-03",
    profileReviews: 6,
    localGuide: false,
  },
  {
    name: "Toko T",
    role: "Half house demolition · Brighton",
    quote:
      "We recently had a half house demolition completed in Brighton the team at Demo Bros did an absolutely fantastic job. The workmanship was outstanding we’re ecstatic with the results. Everything was handled professionally, safely, and efficiently from start to finish. The crew was reliable, well-organised, and left the site clean and ready for the next stage.",
    rating: 5,
    postedAt: "2026-02",
    profileReviews: 2,
    localGuide: false,
  },
  {
    name: "John Biffaro",
    role: "Residential demolition",
    quote:
      "Nothing but praise for the boys at DemoBros. Henry was responsive, prompt and to his word at the start of the process. Isabel was great from an admin point of view! Don did the job in the required time, was quick & clean. Could not be happier with the job and anything you ask is never a problem. Highly recommend them! Honest, hard working and prompt!",
    rating: 5,
    postedAt: "2026-05",
    profileReviews: 3,
    localGuide: false,
  },
  {
    name: "Sharleen Kiely",
    role: "Brick wall & fence demolition",
    quote:
      "I hired Demo Bros to demolish a brick wall/fence that was attached to my house and I couldn’t be happier with the result. The team was extremely professional, efficient and helpful from start to finish. The job was completed to perfection and it’s clear they take real pride in their work and in delivering the best possible outcome for their clients. A big thank you to Henry, Jacob and Dom - Fantastic job guys",
    rating: 5,
    postedAt: "2026-01",
    profileReviews: 2,
    localGuide: false,
  },
  {
    name: "Joseph Uccellini",
    role: "Property developer · Repeat client",
    quote:
      "I have used a few demo companies over the past 15 years in development and Demo Bros continue to impress, leaving my site in excellent condition. Their level of communication was fantastic. They arrived on their scheduled commencement date (a rarity with demo companies) and completed the work within 7 business days. They worked quickly and efficiently and are very reasonably priced.",
    rating: 5,
    postedAt: "2025-12",
    profileReviews: 6,
    localGuide: false,
  },
  {
    name: "Martin Nguyen",
    role: "Bay & Sons Building Group · Bathroom demolition",
    quote:
      "We recently hired Demo Bros for our bathroom demolition project, and we couldn’t be happier with the results! From start to finish, they exceeded our expectations. The team showed up on time, which is always a great start, and they were highly professional throughout the entire process. One thing that really stood out was their attention to detail when it came to cleanliness. They made sure to clean up thoroughly after the job was done, leaving our home spotless.",
    rating: 5,
    postedAt: "2024-08",
    profileReviews: 2,
    localGuide: false,
  },
];

// The homepage marquee animates on a fixed 36s loop, so extra cards make it scroll faster
// rather than run longer. Keep that strip to a short subset; /reviews renders them all.
export const featuredTestimonials = testimonials.slice(0, 6);

// Verified, confirmed figures only (per the SEO pack). Unverified counters removed.
export const stats = [
  { value: 24, suffix: "hr", label: "Fixed-quote turnaround" },
  { value: 20, suffix: "M", label: "Public liability cover (AUD)" },
  { value: 54, suffix: "", label: "Google reviews · 4.9★ average" },
  { value: 10, suffix: "+", label: "Years family-owned, since 2013" },
];

export const serviceAreas = [
  { name: "Richmond", slug: "richmond", detail: "Inner-city strip outs, terrace partial demolition and tight-access residential work east of the CBD." },
  { name: "Fitzroy & Collingwood", slug: "fitzroy", detail: "Heritage-sensitive internal and partial demolition for warehouse conversions and period homes." },
  { name: "Brunswick & Northcote", slug: "brunswick", detail: "Inner-north renovation strip outs, kitchen and bathroom demolition and rear-extension removals." },
  { name: "Carlton", slug: "carlton", detail: "Hospitality, student-housing and heritage terrace strip outs with careful neighbour management." },
  { name: "South Yarra & Prahran", slug: "south-yarra", detail: "High-end residential strip outs and staged partial demolition with full scaffold and protection." },
  { name: "St Kilda & Bayside", slug: "st-kilda", detail: "Coastal renovations, apartment strip outs and kitchen and bathroom demolition across the bayside." },
  { name: "Hawthorn & Camberwell", slug: "hawthorn", detail: "Whole-home renovation preparation and internal demolition across the leafy inner-east." },
  { name: "Kew & Malvern", slug: "kew", detail: "Premium residential demolition, knock-down rebuild clearances and heritage-aware strip outs." },
  { name: "Footscray & Maribyrnong", slug: "footscray", detail: "Inner-west residential and commercial strip outs, warehouse clearances and site demolition." },
  { name: "Essendon & Preston", slug: "essendon", detail: "Northern-suburbs knock-down rebuilds, full-home demolition and large-block clearances." },
];

export const industries = [
  { name: "Residential Renovation", detail: "Kitchens, bathrooms and whole-home strip outs for renovating homeowners and builders." },
  { name: "Commercial Real Estate", detail: "Make-goods, defits and base-building strip outs for landlords, agents and tenants." },
  { name: "Retail & Hospitality", detail: "After-hours strip outs for shopping centres, restaurants and flagship stores." },
  { name: "Construction & Fitout", detail: "Demolition packages for builders and fitout contractors on program-critical projects." },
  { name: "Government & Education", detail: "Compliant, documented demolition for schools, councils and public facilities." },
  { name: "Strata & Property Management", detail: "Responsive strip outs and make-safes across managed portfolios." },
];

export const generalFaqs = [
  { q: "Are you licensed and insured?", a: "Yes. Demo Bros is registered with the Victorian Building Authority (VBA), carries $20M public liability insurance and full workers compensation coverage. Certificates are supplied with every quote." },
  { q: "How quickly can you provide a quote?", a: "Most quotes are delivered within 24 hours of a site inspection. For straightforward strip outs, we can often quote from photos and plans the same day." },
  { q: "Do you handle asbestos?", a: "We arrange licensed asbestos testing on every pre-1990 property and coordinate licensed removal where required, before any demolition begins." },
  { q: "What happens to the waste?", a: "We run recycling-first waste streams — concrete, brick, metal and timber are separated and diverted. We recycle and divert as much material as possible on every project." },
  { q: "Will you protect the parts of my property that stay?", a: "Always. Floor protection, dust barriers, service location and daily clean-ups are standard on every project, not optional extras." },
  { q: "Do you work after hours?", a: "Yes. Most commercial strip outs and defits run after-hours or over weekends. Residential work is scheduled to suit your household." },
  { q: "Which areas do you service?", a: "We service Melbourne and surrounds — from the CBD out to roughly a 30km radius across the inner north, inner east, bayside and west. If you're nearby, ask; we travel for the right project." },
  { q: "Do you provide fixed-price quotes?", a: "Yes. After inspection, our quotes are fixed — no day-rate creep, no surprise variations for anything within the agreed scope." },
  { q: "Do I need a permit for demolition?", a: "Full demolition and some partial demolition require a permit, and often an asset-protection permit from council. Interior strip outs usually don't — though removing a load-bearing wall needs engineering. We advise on your job and coordinate the demolition permit as part of the service." },
  { q: "How much does demolition cost in Melbourne?", a: "It depends on the job — a kitchen strip out, an office defit and a full house demolition are very different scopes. We provide a fixed quote after a site inspection so you know the exact price up front, with no day-rate surprises." },
  { q: "How long does a strip out or house demolition take?", a: "Most single-room strip outs are a one-day job; a whole-home or commercial interior typically runs a few days. On site, a standard house demolition is usually a few days once permits and disconnections are done — we confirm the program in your quote." },
];

export const processSteps = [
  { n: "01", title: "Site Inspection", detail: "We walk the site, identify hazards and services, and understand exactly what stays and what goes." },
  { n: "02", title: "Fixed Quote", detail: "A fixed price and a locked program within 24 hours — with licences and insurances attached." },
  { n: "03", title: "Protection & Setup", detail: "Floors covered, dust barriers sealed, services isolated, neighbours notified. Before a single tool starts." },
  { n: "04", title: "Controlled Demolition", detail: "Methodical, staged removal by a trained crew — precision over brute force, every time." },
  { n: "05", title: "Clean Handover", detail: "Waste gone, site broom-swept, handover documented and photographed. Builder-ready." },
];
