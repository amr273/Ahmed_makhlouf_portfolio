const AUTH_KEY = "portfolio_dashboard_auth";
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

if (localStorage.getItem(AUTH_KEY) !== "true") {
  window.location.href = "login.html";
}

const projectForm = document.getElementById("projectForm");
const projectIdInput = document.getElementById("projectId");
const projectList = document.getElementById("projectList");
const logoutBtn = document.getElementById("logoutBtn");
const cancelEditBtn = document.getElementById("cancelEdit");
const imageInput = document.getElementById("image");
const imageUploadInput = document.getElementById("imageUpload");

imageUploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    imageInput.value = reader.result;
  };

  reader.readAsDataURL(file);
});

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

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function resetForm() {
  projectForm.reset();
  projectIdInput.value = "";
  document.getElementById("submitBtn").textContent = "Add Project";
}

function renderProjects() {
  const projects = getProjects();

  projectList.innerHTML = projects
    .map(
      (project) => `
    <article class="project-item">
      <img src="${project.image}" alt="${escapeHtml(project.title)}">
      <div class="project-item-content">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description || "No description added yet.")}</p>
        <div class="project-links">
          <a href="${project.url}" target="_blank" rel="noreferrer">Visit project</a>
        </div>
        <div class="project-actions">
          <button type="button" class="edit-btn" data-id="${project.id}">Edit</button>
          <button type="button" class="delete-btn danger" data-id="${project.id}">Delete</button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const url = document.getElementById("url").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !image || !url) {
    return;
  }

  const projects = getProjects();
  const projectId = projectIdInput.value;

  if (projectId) {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, title, image, url, description }
        : project,
    );
    saveProjects(updatedProjects);
  } else {
    const newProject = {
      id: `project-${Date.now()}`,
      title,
      image,
      url,
      description,
    };
    saveProjects([newProject, ...projects]);
  }

  renderProjects();
  resetForm();
});

document.addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-btn");

  if (editButton) {
    const projectId = editButton.dataset.id;
    const projects = getProjects();
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    projectIdInput.value = project.id;
    document.getElementById("title").value = project.title;
    document.getElementById("image").value = project.image;
    document.getElementById("url").value = project.url;
    document.getElementById("description").value = project.description || "";
    document.getElementById("submitBtn").textContent = "Update Project";
    document.getElementById("title").focus();
    return;
  }

  const deleteButton = event.target.closest(".delete-btn");

  if (deleteButton) {
    const projectId = deleteButton.dataset.id;
    const projects = getProjects().filter(
      (project) => project.id !== projectId,
    );
    saveProjects(projects);
    renderProjects();
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "index.html";
});

cancelEditBtn.addEventListener("click", resetForm);
renderProjects();
