const STORAGE_KEY = "portfolio_projects";

const defaultProjects = [
  {
    id: "leon-project",
    title: "Leon Project",
    image: "images/leon.png",
    url: "https://amr273.github.io/HTML_CSS_Templete_one/",
    description: "A clean landing page built with HTML and CSS.",
  },
  {
    id: "kasper-project",
    title: "Kasper Project",
    image: "images/kasper.png",
    url: "https://amr273.github.io/Kasper---templete_two/",
    description: "A minimal portfolio template with elegant sections.",
  },
  {
    id: "dashboard-project",
    title: "Dashboard",
    image: "images/dashboard.png",
    url: "https://amr273.github.io/Dashboard/",
    description: "A dashboard design for analytics and user data.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getProjects() {
  try {
    const savedProjects = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null",
    );

    if (Array.isArray(savedProjects) && savedProjects.length > 0) {
      return savedProjects;
    }
  } catch (error) {
    console.warn("Could not load saved projects:", error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
  return defaultProjects;
}

const projectContainer = document.getElementById("portfolioProjects");

if (projectContainer) {
  projectContainer.innerHTML = getProjects()
    .map(
      (project) => `
    <div class="project">
      <div class="proj">
        <img src="${project.image}" alt="${escapeHtml(project.title)}">
      </div>
      <div class="text" style="margin-left:60px">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description || "No description added yet.")}</p>
        <a href="${project.url}" target="_blank" rel="noreferrer">visit Website</a>
      </div>
    </div>
  `,
    )
    .join("");
}
