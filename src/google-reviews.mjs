// Google reviews shown in the Google Reviews section on the homepage.
//
// Only add reviews that are live on the MOJO 4K Google Business Profile, copied
// exactly as posted (same text, name, rating and order). Nothing is shortened
// or rewritten: long reviews show in full behind a "Read more" button.
//
// Each entry:
//   { name: 'Jane D.', rating: 5, text: '…', date: 'March 2026', url: 'https://…' }
//   date and url are optional. url should be the review's own link on Google.
//
// While this list is empty, the section shows a "Review us on Google" call to action.
export const googleReviews = [];
