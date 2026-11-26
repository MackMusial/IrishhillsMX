/* =====================================================================
   IrishHillsMX — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update ride dates, fees
   and contact details. You don't need to touch the page layout.

   How to edit:
   - Change the text between the quotes "like this".
   - Dates are written YEAR-MONTH-DAY, e.g. "2027-05-15".
   - Keep the commas at the end of each line, just like the examples.
   - Save the file and refresh the website.

   PLACEHOLDERS: anything marked  placeholder: true  shows a small
   "Placeholder" tag on the website so visitors know it isn't final.
   When you enter the real information, change it to  placeholder: false
   (or delete that line).
   ===================================================================== */

window.SITE_DATA = {

  /* -------------------------------------------------------------------
     RIDE DATES
     List the ride days. The website automatically:
       - highlights the next upcoming ride,
       - marks rides that have already happened as past,
       - moves last season's rides into an "Earlier ride days" list.

     There are no ride days in June.

     ridesArePlaceholder: true  shows a "Tentative dates" notice above the
     calendar. Set it to false once the dates are confirmed.
     ------------------------------------------------------------------- */
  ridesArePlaceholder: true,

  rides: [
    // 2026 season (these happened)
    { date: "2026-04-26", note: "" },
    { date: "2026-05-17", note: "" },
    { date: "2026-07-26", note: "" },

    // 2027 season (tentative; set ridesArePlaceholder to false once confirmed)
    { date: "2027-04-25", note: "Likely first ride" },
    { date: "2027-05-16", note: "" },
    { date: "2027-07-25", note: "" },
    { date: "2027-09-12", note: "" },
    { date: "2027-10-03", note: "" },
  ],

  // Shown on every ride day. Example: "Gate 8:00 AM · Riding 9:00 AM–4:00 PM"
  rideHours: {
    text: "Riding 11:00 AM – 6:00 PM",
    placeholder: false,
  },

  /* -------------------------------------------------------------------
     RIDER FEES
     Write each price exactly as you want it shown, e.g. "$40".
     Fees are grouped (Members, Guest riders). Add or remove lines as needed.
     inHero: true  also shows that fee next to the next ride date at the top.
     ------------------------------------------------------------------- */
  fees: [
    {
      group: "Members",
      items: [
        { label: "Membership", price: "$90", per: "per year" },
        { label: "Each ride", price: "$15", per: "every time you come out", inHero: true, heroLabel: "Member" },
        { label: "Kids track", price: "Free", per: "for members" },
      ],
    },
    {
      group: "Guest riders",
      items: [
        { label: "Adult", price: "$40", per: "flat fee", inHero: true, heroLabel: "Guest" },
        { label: "Kids track", price: "$15", per: "non-members" },
      ],
    },
  ],

  // Short notes shown under the fees. Add or remove lines as needed.
  feeNotes: [
    { text: "Cash only at the gate." },
    { text: "No spectator fee. Non-riders get in free." },
  ],

  /* -------------------------------------------------------------------
     LOCATION & CONTACT
     ------------------------------------------------------------------- */
  location: {
    region: "Manchester, Michigan",
    address: { text: "14758 Sharon Hollow Rd, Manchester, MI 48158", placeholder: false },
    // What Google Maps searches for when someone taps "Get directions".
    mapsQuery: "14758 Sharon Hollow Rd, Manchester, MI 48158",
    mapsQueryIsExact: true,
  },

  contact: {
    // The Facebook group is the main way the track communicates.
    facebookGroup: { text: "IrishHillsMX (Official Club Page)", link: "https://www.facebook.com/groups/1685273218427270/" },
    facebook: { text: "IrishHillsMX on Facebook", link: "https://www.facebook.com/p/Irish-Hills-MX-100054641460702/" },
    // Optional. Leave text empty ("") to hide.
    phone: { text: "", link: "" },
    email: { text: "", link: "" },
  },
};
