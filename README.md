# IrishHillsMX

The website for IrishHillsMX: a single static page with no build step, no backend and no database.

## View it

Open `index.html` in a browser.

## Hosting it on your own hardware

The site is plain files, so any web server can serve it. Copy the whole folder (`index.html`, `css/`, `js/`, `fonts/`, `images/`) into the server's web root.

- **Caddy** (simplest; sets up HTTPS on its own). In the `Caddyfile`:
  ```
  your-domain.com {
      root * /srv/irishhillsmx
      file_server
  }
  ```
- **nginx**: point a `server` block's `root` at the folder, then add HTTPS with Let's Encrypt (`certbot --nginx`).
- **Quick local test**: run `python3 -m http.server 8000` in the folder and open `http://localhost:8000`.

Things to set up:
- **Point your domain at your home or server IP.** Use a DNS A record. If your home IP changes, use a dynamic DNS service.
- **Forward ports 80 and 443** on your router to the server.
- **Use HTTPS.** Caddy does it automatically. With nginx, use certbot.
- **Don't serve the hidden folders.** Leave `.git/` and `.impeccable/` out of the web root, or block them in the server config.

To update the site, edit the files and copy them to the server again. Nothing needs restarting.

## Updating ride dates, fees and contact info

**Edit one file: [`js/site-data.js`](js/site-data.js).** You don't need to touch the page layout.

| What | Where in `js/site-data.js` |
|---|---|
| Ride dates | `rides:` list. Dates are written `"YEAR-MONTH-DAY"`, e.g. `"2027-05-15"` |
| Gate and riding times | `rideHours:` |
| Member and guest fees | `fees:` (grouped under "Members" and "Guest riders") |
| Notes under the fees (cash only, spectators) | `feeNotes:` |
| Address and the Get Directions link | `location:` |
| Facebook group and page, phone, email | `contact:` |
| Meet the crew (names, positions, photos) | `crew:` |

The site works out the rest on its own:
- The next upcoming ride is circled at the top of the page and highlighted in the calendar.
- Rides that have already happened are crossed out and marked **Past**.
- Older seasons move into an "Earlier ride days" list.
- Upcoming rides get an **Add to calendar** link.
- A fee marked `inHero: true` also appears next to the next ride date at the top of the page.
- Phone and email rows stay hidden until you fill them in.
- Crew members without a photo get a box with their initials. To add a photo, put a square image in `images/crew/` (create the folder) and set `photo:` to its path, e.g. `"images/crew/jake.webp"`. It is printed in orange like the other photos.

**Placeholders:** any item with `placeholder: true` shows a small dashed **Placeholder** tag on the site. When you enter the real info, change it to `placeholder: false`. The ride dates are currently samples, so set `ridesArePlaceholder: false` once the real dates are in.

## Text that lives in the page

A few things are written directly in `index.html`. Search for these headings:
- **"Add a short description of the main track and the kids track"** in the About section. Replace it with a real description.
- **Required at the gate**: cash only, proof of medical insurance, and the parent, guardian or notarized-letter rule for riders under 18. These are confirmed.
- **Track rules**: common motocross rules that the owners still need to confirm. Edit them, then delete the "Placeholder" note above the list.
- **What to bring**, and the "What to expect on a ride day" items.
- **Merch**: currently says "Coming soon". When merch is ready, replace that text with what's for sale and how to buy it.

## Photos

The site currently uses free stock photos from Unsplash. Replace them with your own track photos, keeping the same file names in `images/`:

| File | Used for | Best shape |
|---|---|---|
| `hero-roost.webp` (1800px wide) and `hero-roost-1200.webp` (1200px wide) | Big top photo | Wide (3:2), action shot |
| `riders-corner.webp` | About section | Wide (4:3) |
| `rider-jump.webp` | Track info section | Tall (4:5) |

The site prints each photo in a single ink colour (orange or green) automatically, so any colour photo works. After swapping, update each photo's `alt` description in `index.html` and the photo credit line in the footer.
