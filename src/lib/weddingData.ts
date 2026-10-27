// Dades de la invitació.
export const wedding = {
  bride: "Xisca",
  groom: "Ivan",
  // Data i hora de la cerimònia.
  date: new Date("2027-04-10T17:00:00"),
  dayLabel: "Dissabte",
  dateLabel: "10 d'abril de 2027",
  dateShort: "10-04-2027",
  venueName: "Son Muntaner",
  venueLocation: "Bunyola, Mallorca",
  venueAddress: "Ma-2030, 07193 Bunyola",
  venueInstagram: "https://www.instagram.com/",
  mapLinkHref: "https://www.google.com/maps/search/?api=1&query=Son+Muntaner+Ma-2030+07193+Bunyola",
  rsvpDeadline: "10 de març de 2027",
  intro:
    "Després de deu anys compartint moments i aventures, hem decidit fer un pas més i casar-nos, i ens faria molta il·lusió que ens acompanyassis a celebrar-ho.",
} as const;

export const navLinks = [
  { href: "#inici", label: "Inici" },
  { href: "#historia", label: "La nostra història" },
  { href: "#ubicacio", label: "On serà" },
  { href: "#faq", label: "Preguntes freqüents" },
] as const;
