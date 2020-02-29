import navPerformance from "../../content/performance/nav.yml"

export const sectionListPerformance = navPerformance.map(item => ({
  ...item,
  directory: "performance",
}))
