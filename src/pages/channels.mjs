import { pageHero, ctaBand } from '../layout.mjs';

// A sample of the lineup, grouped so people can find what they care about.
const groups = [
  ['🇬🇧', 'UK entertainment', ['BBC One', 'BBC Two', 'BBC Three', 'BBC Four', 'ITV1', 'ITV2', 'ITV3', 'ITV4', 'ITVBe', 'Channel 4', 'E4', 'More4', 'Film4', 'Channel 5', '5USA', 'Sky Showcase', 'Sky Max', 'Sky Atlantic', 'Sky Witness', 'Sky Comedy', 'Sky Arts', 'Gold', 'Dave', 'W', 'Alibi', 'Comedy Central', 'MTV', 'Really', 'Quest', 'Yesterday', 'Drama']],
  ['🏴', 'Nations & regions', ['BBC One Scotland', 'BBC One Wales', 'BBC One Northern Ireland', 'BBC Scotland', 'BBC Alba', 'BBC regional (all English regions)', 'ITV1 London', 'ITV1 regions', 'STV', 'UTV', 'S4C', 'RTÉ One', 'RTÉ Two', 'Virgin Media One']],
  ['⚽', 'UK sport', ['Sky Sports Main Event', 'Sky Sports Premier League', 'Sky Sports Football', 'Sky Sports F1', 'Sky Sports Cricket', 'Sky Sports Golf', 'Sky Sports Action', 'Sky Sports Arena', 'Sky Sports Racing', 'Sky Sports News', 'Sky Sports Tennis', 'Sky Sports Mix', 'TNT Sports 1', 'TNT Sports 2', 'TNT Sports 3', 'TNT Sports 4', 'Premier Sports 1', 'Premier Sports 2', 'LaLiga TV', 'Racing TV', 'Eurosport 1', 'Eurosport 2', 'Viaplay Sports', 'BBC iPlayer sport streams', 'MUTV', 'LFCTV', 'Chelsea TV', 'Rangers TV', 'Celtic TV']],
  ['🥊', 'PPV & events', ['Sky Sports Box Office', 'TNT Sports Box Office', 'DAZN PPV', 'Boxing PPV events', 'UFC Fight Pass', 'UFC PPV events', 'WWE Network']],
  ['🌍', 'Sport from abroad', ['beIN Sports', 'DAZN', 'ESPN', 'ESPN 2', 'FOX Sports 1', 'FOX Sports 2', 'TSN', 'Sportsnet', 'Canal+ Sport', 'SuperSport', 'Sport TV', 'Ziggo Sport', 'Viaplay Sports']],
  ['🎬', 'Films', ['Sky Cinema Premiere', 'Sky Cinema Action', 'Sky Cinema Comedy', 'Sky Cinema Thriller', 'Sky Cinema Drama', 'Sky Cinema Family', 'Sky Cinema Sci-Fi & Horror', 'Sky Cinema Greats', 'Film4', 'Great! Movies', 'Talking Pictures TV', 'HBO', 'Showtime', 'Cinemax']],
  ['📺', 'On demand', ['BBC iPlayer box sets', 'ITVX', 'Channel 4 box sets', 'NOW', 'Netflix', 'Prime Video', 'Disney+', 'Apple TV+', 'Paramount+', 'BritBox']],
  ['🧸', 'Kids', ['CBBC', 'CBeebies', 'CITV', 'Cartoon Network', 'Cartoonito', 'Nickelodeon', 'Nick Jr', 'Nicktoons', 'Disney Junior', 'Sky Kids', 'Boomerang', 'Pop']],
  ['📰', 'News', ['BBC News', 'Sky News', 'GB News', 'TalkTV', 'BBC Parliament', 'CNN International', 'Al Jazeera English', 'Bloomberg', 'CNBC', 'Euronews']],
  ['🦁', 'Documentaries', ['National Geographic', 'Nat Geo Wild', 'Discovery', 'Discovery Science', 'Animal Planet', 'History', 'Sky History', 'Sky Nature', 'Sky Documentaries', 'Crime+Investigation', 'Blaze', 'Quest Red']],
  ['🌐', 'Channels from home', ['Ireland', 'India', 'Pakistan', 'Bangladesh', 'Poland', 'Romania', 'Nigeria & Ghana', 'Caribbean', 'Arabic', 'Turkey', 'Portugal', 'Spain', 'Italy', 'France', 'Greece', 'Albania', 'Lithuania & Latvia', 'Philippines', 'USA']],
];

export default () => ({
  path: '/uk-iptv-channels/',
  title: 'UK IPTV Channels List – BBC, ITV, Sky Sports, TNT & 50,000+ More | MOJO 4K',
  description: 'Browse the MOJO 4K UK channels list: BBC, ITV, Channel 4 and regional channels, every Sky Sports and TNT Sports channel, Sky Cinema, kids, news and channels from home, in HD & 4K.',
  body: `
${pageHero({
  kicker: 'Channels list',
  title: '50,000+ live channels. <span class="grad-text">One login.</span>',
  lead: 'All the British channels you know, plus every sports channel worth having. Search below, and if you can’t spot what you’re after, ask us on WhatsApp and we’ll check.',
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
${ctaBand('Every channel on every plan', 'No sports pack, no cinema add-on, no HD fee. Every plan gets the full lineup and the on-demand library.')}
`,
});
