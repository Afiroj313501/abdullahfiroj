export type JourneyNode = {
  period: string;
  title: string;
  detail?: string;
  color: string;
};

export const journeyNodes: JourneyNode[] = [
  { period: "2007–2011", title: "BB Govt Primary School", color: "#5eead4" },
  { period: "2012–2017", title: "BBK High School", detail: "JSC GPA 5 · SSC (Science) GPA 5", color: "#67e8f9" },
  { period: "2017–2019", title: "Ghatail Cantonment Public School and College", detail: "HSC Science GPA 5", color: "#7dd3fc" },
  { period: "2020–2021", title: "Self-Taught Web Development", color: "#93c5fd" },
  { period: "2022–2026", title: "BSc in CSE — United International University", color: "#a5b4fc" },
];