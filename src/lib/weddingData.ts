// Dades de la invitació.
export const wedding = {
  bride: "Xisca",
  groom: "Ivan",
  // Es retira a la Tasca 7.
  brideAndGroom: "Xisca & Ivan",
  // Data i hora de la cerimònia.
  date: new Date("2027-04-10T17:00:00"),
  dayLabel: "Dissabte",
  dateLabel: "10 d'abril de 2027",
  dateShort: "10-04-2027",
  venueName: "Nom del lloc",
  venueLocation: "Ciutat, Mallorca",
  venueAddress: "Carrer d'exemple, 1 · 07000 Ciutat, Mallorca",
  venueInstagram: "https://www.instagram.com/",
  mapLinkHref: "https://www.google.com/maps/search/?api=1&query=Nom+del+lloc",
  // Es retira a la Tasca 7.
  mapEmbedSrc: "https://www.google.com/maps?q=Mallorca&output=embed",
  rsvpDeadline: "10 de març de 2027",
} as const;

export const navLinks = [
  { href: "#inici", label: "Inici" },
  { href: "#historia", label: "La nostra història" },
  { href: "#records", label: "Records" },
  { href: "#ubicacio", label: "Ubicació" },
  { href: "#faq", label: "Preguntes freqüents" },
] as const;
