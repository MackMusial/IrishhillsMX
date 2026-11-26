---
name: IrishHillsMX
description: A private motocross track's season, printed as a two-ink screenprinted race poster.
colors:
  poster-paper: "#ece3cf"
  poster-paper-deep: "#e1d5ba"
  press-ink: "#1b1915"
  press-ink-soft: "#4a4337"
  mud-orange: "#e0612a"
  mud-orange-text: "#a8400e"
  mud-orange-lit: "#f0773a"
  forest-green: "#233f2a"
  forest-green-deep: "#1a3020"
  on-green-soft: "#c6d0b8"
  on-ink-soft: "#c9bfa9"
typography:
  display:
    fontFamily: "Big Shoulders Display, Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(4.25rem, 2.2rem + 7.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Big Shoulders Display, Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 4vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Big Shoulders Display, Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 4.6vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.92
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  print: "2px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 9vw, 7.5rem)"
  max: "78rem"
  masthead: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.mud-orange}"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.print}"
    padding: "0.8rem 1.4rem 0.75rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.poster-paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.print}"
    padding: "0.8rem 1.1rem 0.75rem"
    height: "3rem"
  button-outline-hover:
    backgroundColor: "{colors.press-ink}"
    textColor: "{colors.poster-paper}"
  ride-row-next:
    backgroundColor: "{colors.mud-orange}"
    textColor: "{colors.press-ink}"
  status-tag:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.print}"
    padding: "0.3rem 0.6rem 0.25rem"
  placeholder-tag:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink}"
    rounded: "{rounded.print}"
    padding: "0.1em 0.45em 0.05em"
---

# Design System: IrishHillsMX

## Overview

**Creative North Star: "The Two-Ink Race Poster"**

The whole site is one screenprinted race poster for the season. It is printed on uncoated poster paper, with black ink and only two spot inks: mud orange and forest green. The ride dates are the headline, set huge and stacked, and the next ride is circled the way someone would ring a date on a poster pinned up in the shop. Photos aren't shown in full colour. Each one is printed as a duotone in a single ink, with the key plate slightly out of register, so stock photos and the owners' phone snapshots all look like part of the same print run.

The pages are dense, the way a flyer is. Heavy 2px rules divide the content instead of boxes and cards. Sections alternate between bare paper and full-bleed ink areas (green for About and Contact, black for Fees), like separate passes on the press. Practical facts sit at poster scale. A visitor should be able to read the next ride date, the guest fee and the address from across a parking lot.

The site rejects the common motocross-site template: a dark full-bleed photo, a neon orange button, and a grid of icon cards. It also never uses gradients, glass effects or soft drop shadows.

**Key Characteristics:**
- Paper background, black text, two spot inks, and nothing else.
- Display type that is condensed, heavy and stacked; body text that is plain and readable.
- Rules and full-bleed colour blocks give the page structure. There are no cards.
- Photos are one-ink duotones with a slight misregistration.
- Unknown facts are labelled visibly with dashed Placeholder tags rather than hidden.

## Colors

The palette is two spot inks and black on uncoated paper. Every colour should look like it was printed rather than lit.

### Primary
- **Mud Orange** (`mud-orange`): the main spot ink. It is used for primary buttons, the highlighted next-ride row, the circle around the next date, text highlights, and orange duotone photos. Black text on it has 4.9:1 contrast.
- **Mud Orange, Text Weight** (`mud-orange-text`): a darker orange for orange text and focus rings on paper (4.8:1), including the "MX" in the wordmark and the rule numbers.
- **Mud Orange, Lit** (`mud-orange-lit`): a lighter orange for orange text and focus rings on black or green, such as fee group labels and the next date in the date band.

### Secondary
- **Forest Green** (`forest-green`): the second spot ink. It fills the About and Contact sections and the green duotone photo.
- **Deep Forest** (`forest-green-deep`): a darker green tone for depth within green areas.

### Neutral
- **Poster Paper** (`poster-paper`): the page background, warm and uncoated. It is also the text colour on black and green areas.
- **Deep Paper** (`poster-paper-deep`): a slightly darker paper tone for notices like the sample-dates banner.
- **Press Ink** (`press-ink`): the black for body text, rules, the masthead border and the black Fees section.
- **Soft Ink** (`press-ink-soft`): secondary text on paper, such as weekdays, ride numbers and small print.
- **Soft Green Text** (`on-green-soft`) and **Soft Paper Text** (`on-ink-soft`): secondary text on green and black. They are tinted from the background colour rather than grey.

### Named Rules
**The Two Spot Inks Rule.** Orange and green are the only colours besides black and paper. A third hue, a gradient or a tint ramp would make it no longer a two-ink print.

**The Lit / Text Split Rule.** Orange has three weights by surface: the fill colour for solid areas, `mud-orange-text` for text on paper, and `mud-orange-lit` for text on black or green. Never set fill-weight orange as text on paper.

## Typography

**Display Font:** Big Shoulders Display (falls back to Barlow Condensed, then Arial Narrow)
**Body Font:** Barlow (falls back to system-ui)
**Label Font:** Barlow Condensed 600/700

**Character:** The display face is a narrow, heavy grotesque in the style of a wood-type poster: tall, packed tight and loud. Barlow comes from the same family, a plain workhorse sans, so the information text reads as calm next to it.

All three typefaces are self-hosted from `fonts/`.

### Hierarchy
- **Display** (900, `clamp(4.25rem, 2.2rem + 7.5vw, 6rem)`, line-height 0.82): used only for the stacked wordmark in the hero, "IrishHills" over "MX". The MX line is in orange.
- **Headline** (900, `clamp(2.5rem, 1.6rem + 4vw, 4.75rem)`, line-height 0.88, uppercase, max 14ch, balanced wrapping): section titles.
- **Title** (900, `clamp(2.5rem, 1.4rem + 4.6vw, 4.75rem)`, line-height 0.92, uppercase, no wrapping): ride dates in the calendar and fee amounts. These are the poster-scale facts.
- **Body** (400–500, `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`, line-height 1.6, max 60–62ch): every sentence on the page.
- **Label** (700, 0.85–1.15rem, letter-spacing 0.06–0.1em, uppercase): navigation, buttons, weekdays, fee labels, status tags and contact keys.

### Named Rules
**The Name Is Exact Rule.** The name is always written **IrishHillsMX**, as one word in mixed case. The wordmarks are not uppercased for that reason, even though other display type is.

**The Dates Never Wrap Rule.** A ride date or fee amount stays on one line at every width. When space runs short, the layout changes rather than the date breaking.

## Layout

The content column is `78rem` wide with a fluid side margin (`clamp(1.25rem, 4vw, 3rem)`). The sticky masthead is `4rem` tall. Vertical section padding is `clamp(4rem, 9vw, 7.5rem)`.

There are three breakpoints: **phone** (below 48em), **tablet** (48em and up) and **desktop** (64em and up).
- **Hero:** on desktop, the copy sits on the left and the duotone photo takes about 58% on the right, bleeding off the edge. On phone and tablet, the photo sits on top and the copy below it. A black band showing the five dates runs along the bottom at every size.
- **Ride list:** on phones each ride stacks: number, date, any tag, then the calendar link. Tablets use three columns: number, the date with any note under it, and the calendar link. Desktop puts each ride on one line with four columns: number, date, tag, calendar link. The next-ride row bleeds past the column edges into the margin.
- **Fees:** one column on phones and two on tablet and up (Members, Guest riders), separated by a faint vertical rule.
- **Track info:** on desktop, a sticky heading and portrait photo sit on the left with stacked info blocks on the right.

## Elevation & Depth

There are no shadows anywhere. The page is a flat print, and depth comes from overprinting: a full-bleed area of black or green, a 2px rule, or the photo's key plate offset slightly from its ink. Layers are told apart by ink colour, never by height.

### Named Rules
**The Flat Print Rule.** Never use `box-shadow` for depth. If something needs to stand out, give it ink (an orange fill, a black band) or a heavier rule.

## Shapes

Every corner has the same barely-there `2px` radius, which reads as a crisp printed corner, not a rounded one. Borders are 2px solid in the current text colour. Rules span the full content width. Placeholders are the one exception: they use dashed borders and underlines, so a dashed line always means "not final yet".

## Components

### Buttons
- **Shape:** squared corners (`2px`), at least `3rem` tall, uppercase condensed label at 1.1rem with 0.06em letter-spacing, and an optional 1.25em line icon.
- **Primary:** an orange fill with black text. On hover it turns black with paper text; on green or black areas it turns paper with black text. The icon nudges 2px in the direction of its arrow.
- **Outline:** a 2px border in the text colour on a transparent background, used for secondary actions like Get Directions. On hover it fills with the text colour.
- **Quiet:** a text link with a 2px underline, used for the lesser hero action.
- **Active:** the button presses down 1px. **Focus:** a 3px outline offset by 3px, in text-weight orange on paper or lit orange on dark areas.

### Ride row
The site's signature component. It is a full-width row between 2px rules containing the ride number, a small uppercase weekday, the date at poster scale, an optional tag and note, and an "Add to calendar" link. The **next ride** row is filled solid orange and extends into the margins. **Past** rides have their date struck through, with a dashed tag reading "Past".

### Status tag
A small uppercase condensed label in a 2px box. It is shown only for Next ride (solid black), Today and Past (dashed). Ordinary upcoming rides have no tag.

### Date band
A black strip at the bottom of the hero showing the season's dates, each with a small month label over large numerals. The next date is in lit orange, and a hand-drawn SVG circle is drawn around it on page load.

### Fee sheet
Fees are grouped into columns: Members and Guest riders. Each group has an orange label, then rows with a paper-coloured label, the amount at poster scale, and a soft "per" note beside it. A short list of notes with orange dashes sits underneath. This section is filled from `js/site-data.js`.

### Placeholder tag
Placeholder text gets a dashed underline, and a small dashed box reading "Placeholder" follows it. The tag always stays on the same line as the word before it. It is meant to be seen.

### Navigation
A sticky paper masthead with a 2px black bottom rule. It has the wordmark on the left and uppercase condensed links on the right; hovering a link draws an underline across it. Below 48em the links collapse into a black Menu button that opens a full-width list, and Escape closes it.

### Motion
There is one main animated moment, on page load:
- The photo wipes in from the left with a clip-path over 0.95s.
- The photo's key plate slides into near-registration.
- The hero copy rises into place in short staggered steps.
- The circle draws around the next date.

A few smaller effects repeat the print idea:
- **Lower photos print as they come into view.** The About and Track Info photos get the same left-to-right ink pull (0.9s) across their ink, photo and paper layers. The animation leaves no clip behind once it finishes. Unlike the hero, they don't shift into register: moving a layer while it's clipped opens a seam at the wipe's edge.
- **The next-ride row gets inked.** Its orange is pulled across the row (0.75s), then the "Next ride" tag stamps on (0.3s, at 0.7s).
- **Jumps from the date band print the whole list at once**, so its entrance doesn't compete with the landing.
- **Rows slide in as a list.** The other ride rows slide in from the left with a 60ms stagger, capped at 0.24s.
- **Jumps show where you landed.** Tapping a date in the hero band scrolls to that row. Once the scroll lands, the row takes an orange tint that holds briefly, then fades over 1.4s.
- **Buttons fill like a squeegee pull.** On hover, the fill wipes left to right (0.32s in, 0.16s out).

Plain text sections don't animate; they simply appear. All motion uses the easing `cubic-bezier(0.16, 1, 0.3, 1)`. With reduced motion turned on, nothing moves: the page appears as the finished print, and a row you jump to keeps a static orange tint.

**The Echo Rule.** New motion repeats the print idea (an ink pull, a stamp or a registration shift) or it isn't added. A generic fade-up never gets added just to make a section appear.

## Do's and Don'ts

### Do:
- **Do** keep every colour within the two spot inks, black and paper.
- **Do** print new photos as one-ink duotones in orange or green, and keep the slight key-plate offset.
- **Do** use 2px rules and full-bleed ink areas to divide content.
- **Do** keep ride dates and fee amounts on one line at poster scale, and change the layout when they don't fit.
- **Do** mark every unconfirmed fact with the dashed Placeholder treatment.
- **Do** write the name as **IrishHillsMX**.

### Don't:
- **Don't** use drop shadows, gradients, glass effects or blur.
- **Don't** wrap content in cards or use a grid of equal-size cards.
- **Don't** round corners beyond `2px`.
- **Don't** add a third accent colour or a grey for secondary text. Tint it from the background instead.
- **Don't** put a tag on every ride row. Tags only mark Next, Today and Past.
- **Don't** use the dashed border or underline for anything except placeholders.
