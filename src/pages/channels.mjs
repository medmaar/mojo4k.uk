import { pageHero, ctaBand } from '../layout.mjs';

// A sample of the lineup, grouped so people can find what they care about.
const groups = [
  ['🇬🇧', 'UK entertainment', ['BBC One', 'BBC Two', 'ITV1', 'ITV2', 'ITV3', 'ITV4', 'ITVBe', 'Channel 4', 'E4', 'More4', 'Film4', 'Channel 5', '5USA', 'Sky Showcase', 'Sky Max', 'Sky Atlantic', 'Sky Witness', 'Sky Comedy', 'Sky Arts', 'Gold', 'Dave', 'W', 'Alibi', 'Comedy Central', 'MTV', 'Really', 'Quest', 'Yesterday', 'Drama']],
  ['⚽', 'UK sports', ['Sky Sports Main Event', 'Sky Sports Premier League', 'Sky Sports Football', 'Sky Sports F1', 'Sky Sports Cricket', 'Sky Sports Golf', 'Sky Sports Action', 'Sky Sports Arena', 'Sky Sports Racing', 'Sky Sports News', 'TNT Sports 1', 'TNT Sports 2', 'TNT Sports 3', 'TNT Sports 4', 'Premier Sports 1', 'Premier Sports 2', 'LaLiga TV', 'Racing TV', 'Eurosport 1', 'Eurosport 2', 'MUTV', 'LFCTV', 'Chelsea TV']],
  ['🥊', 'PPV & events', ['Sky Sports Box Office', 'TNT Sports Box Office', 'DAZN PPV', 'UFC Fight Pass', 'UFC PPV events', 'WWE Network', 'Boxing PPV events', 'NFL Game Pass', 'NBA League Pass', 'NHL Center Ice', 'MLB Extra Innings']],
  ['🌍', 'International sports', ['beIN Sports', 'DAZN', 'ESPN', 'ESPN 2', 'FOX Sports 1', 'FOX Sports 2', 'TSN', 'Sportsnet', 'Canal+ Sport', 'SuperSport', 'Sport TV', 'Ziggo Sport', 'Viaplay Sports']],
  ['🎬', 'Movies', ['Sky Cinema Premiere', 'Sky Cinema Action', 'Sky Cinema Comedy', 'Sky Cinema Thriller', 'Sky Cinema Drama', 'Sky Cinema Family', 'Sky Cinema Sci-Fi & Horror', 'Sky Cinema Greats', 'Film4', 'Great! Movies', 'Talking Pictures TV', 'HBO', 'Showtime', 'Cinemax']],
  ['📺', 'Streaming (VOD)', ['Netflix', 'Prime Video', 'Disney+', 'Apple TV+', 'HBO Max', 'Paramount+', 'NOW', 'BritBox', 'Peacock', 'Hulu']],
  ['🧸', 'Kids', ['CBBC', 'CBeebies', 'CITV', 'Cartoon Network', 'Cartoonito', 'Nickelodeon', 'Nick Jr', 'Nicktoons', 'Disney Junior', 'Sky Kids', 'Boomerang', 'Pop']],
  ['📰', 'News', ['BBC News', 'Sky News', 'GB News', 'TalkTV', 'CNN International', 'Al Jazeera English', 'Bloomberg', 'CNBC', 'Euronews', 'France 24', 'DW News', 'Fox News']],
  ['🦁', 'Documentaries', ['National Geographic', 'Nat Geo Wild', 'Discovery', 'Discovery Science', 'Animal Planet', 'History', 'Sky History', 'Sky Nature', 'Sky Documentaries', 'Crime+Investigation', 'Blaze', 'Quest Red']],
  ['🌐', 'International', ['USA', 'Canada', 'Ireland', 'France', 'Germany', 'Spain', 'Italy', 'Portugal', 'Netherlands', 'Poland', 'Romania', 'Turkey', 'Greece', 'India', 'Pakistan', 'Bangladesh', 'Arabic', 'Africa', 'Caribbean', 'Latin America', 'Ex-Yu', 'Albania', 'Scandinavia', 'Philippines']],
];

export default () => ({
  path: '/channels-list/',
  title: 'IPTV Channels List UK – Sky, TNT Sports, BBC & 50,000+ More | MOJO 4K',
  description: 'Browse the MOJO 4K IPTV channels list: UK entertainment, Sky Sports, TNT Sports, PPV, movies, kids, news and international channels from 100+ countries in HD & 4K.',
  body: `
${pageHero({
  kicker: 'Channels list',
  title: '50,000+ live channels. <span class="grad-text">One login.</span>',
  lead: 'Here is a taste of the lineup. Search a channel or country below; if you can’t see what you want, ask us on WhatsApp and we will check it for you.',
})}
<section class="section section--tight">
  <div class="container">
    <div class="ch-search reveal"><label class="sr-only" for="ch-q">Search channels</label><input id="ch-q" type="search" placeholder="Search a channel or country, e.g. Sky Sports" autocomplete="off" data-ch-search><p class="muted small" data-ch-empty hidden>No match in this sample. <a href="/go/wa" target="_blank" rel="noopener">Ask us</a>, it is probably in the full list.</p></div>
    <div class="ch-grid">${groups
      .map(([e, name, list]) => `<div class="card ch-group reveal" data-ch-group><h2 class="h3"><span aria-hidden="true">${e}</span> ${name}</h2><ul>${list.map((c) => `<li>${c.replace('&', '&amp;')}</li>`).join('')}</ul></div>`)
      .join('')}</div>
    <p class="center muted small" style="margin-top:24px">Channel availability can change. The lineup includes HD, FHD and 4K versions where the broadcaster offers them, plus catch-up and EPG on supported apps.</p>
  </div>
</section>
${ctaBand('Every channel on every plan', 'No add-ons or sports packs to buy. Every plan includes the full lineup and the on-demand library.')}
`,
});
