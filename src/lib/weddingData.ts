// Dades de la invitació. Substituïu els valors d'exemple pels vostres.
export const wedding = {
  brideAndGroom: "Nom & Nom",
  bride: "Nom Cognom Cognom",
  groom: "Nom Cognom Cognom",
  // Data i hora de la cerimònia.
  date: new Date("2030-06-15T17:00:00"),
  dayLabel: "Dissabte",
  dateLabel: "15 de juny de 2030",
  venueName: "Nom del lloc",
  venueLocation: "Ciutat, País",
  venueInstagram: "https://www.instagram.com/",
  mapEmbedSrc: "https://www.google.com/maps?q=Espanya&output=embed",
  mapLinkHref: "https://www.google.com/maps/search/?api=1&query=Espanya",
} as const;

export const navLinks = [
  { href: "#inici", label: "Inici" },
  { href: "#historia", label: "La nostra història" },
  { href: "#galeria", label: "Galeria" },
  { href: "#ubicacio", label: "Ubicació" },
  { href: "#coses-per-fer", label: "Coses per fer" },
  { href: "#faq", label: "Preguntes freqüents" },
] as const;
