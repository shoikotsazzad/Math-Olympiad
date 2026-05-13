import type { Event } from "@/types";

export const events: Event[] = [
  {
    id: "imo-2024",
    title: "International Mathematical Olympiad (IMO)",
    type: "IMO",
    date: "July 11-22, 2024",
    location: "United Kingdom",
    officialLink: "https://imo-official.org",
    description: "World-renowned mathematics competitions for high school students.",
    isInternal: false,
  },
  {
    id: "bdmo-2024",
    title: "Bangladesh Math Olympiad (BdMO)",
    type: "BdMO",
    date: "December 20, 2024",
    location: "Dhaka, Bangladesh",
    officialLink: "https://matholympiad.org.bd",
    registrationLink: "#",
    description: "Regional rounds followed by the national festival in Dhaka.",
    isInternal: false,
  },
  {
    id: "amc-2024",
    title: "American Math Competitions (AMC)",
    type: "AMC",
    date: "November 08, 2024",
    location: "Online / Centers",
    officialLink: "https://maa.org/math-competitions",
    registrationLink: "#",
    description: "World-renowned series for middle and high school students.",
    isInternal: false,
  },
];

export const internalEvents = [
  {
    id: "mock-04",
    title: "UIU Grand Mock 04",
    subtitle: "Topic: Advanced Number Theory",
    date: "Sat, 14 Oct",
    time: "3:00 PM",
    type: "MOCK SESSION",
    typeColor: "violet",
  },
  {
    id: "imo-geo",
    title: "IMO Geometry Proofs",
    subtitle: "Discussion & Problem Solving",
    date: "Mon, 16 Oct",
    time: "8:30 PM",
    type: "DISCUSSION CLASS",
    typeColor: "blue",
  },
  {
    id: "challenge-12",
    title: "Weekly Sprint #12",
    subtitle: "15 Questions in 10 Minutes",
    date: "Wed, 18 Oct",
    time: "All Day",
    type: "CHALLENGE",
    typeColor: "gold",
  },
];
