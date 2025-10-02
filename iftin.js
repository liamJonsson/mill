document.addEventListener("DOMContentLoaded", () => {
  /* Progress bars */
  const skillsSection = document.querySelector(".iftin-skills");
  const progressBars = document.querySelectorAll(".iftin-progress");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => bar.classList.add("active"));
        observer.unobserve(skillsSection);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(skillsSection);

  /* Projektlista */
  const projectList = document.getElementById("iftin-project-list");
  const searchInput = document.getElementById("iftin-sök");
  const sortSelect = document.getElementById("iftin-sort-year");

  let projects = [];
  let sortAlphabeticalAsc = true;

  axios.get("iftin.json")
    .then(response => {
      projects = response.data;
      renderProjects(projects);

      /* Sökfunktion */
      searchInput.addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        const filtered = projects.filter(p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
        renderProjects(filtered);
      });

      /* Sortering efter år */
      sortSelect.addEventListener("change", e => {
        const val = e.target.value;
        if (val === "asc") {
          projects.sort((a, b) => a.year - b.year);
        } else if (val === "desc") {
          projects.sort((a, b) => b.year - a.year);
        }
        renderProjects(projects);
      });
    });

  function renderProjects(list) {
    while (projectList.firstChild) {
      projectList.removeChild(projectList.firstChild);
    }

    list.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("iftin-project-card");

      /* Bild */
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("iftin-project-image");

      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;

      imageDiv.appendChild(img);
      card.appendChild(imageDiv);

      /* Innehåll */
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("iftin-project-content");

      /* Titel */
      const title = document.createElement("h2");
      title.classList.add("iftin-project-title");
      title.textContent = project.title;
      contentDiv.appendChild(title);

      /* År */
      const year = document.createElement("p");
      const yearStrong = document.createElement("strong");
      yearStrong.textContent = "År: ";
      year.appendChild(yearStrong);
      year.append(project.year);
      contentDiv.appendChild(year);

      // Beskrivning
      const description = document.createElement("p");
      description.textContent = project.description;
      contentDiv.appendChild(description);

      card.appendChild(contentDiv);
      projectList.appendChild(card);

      /* Sortering A–Ö / Ö–A */
      title.addEventListener("click", () => {
        projects.sort((a, b) =>
          sortAlphabeticalAsc
            ? a.title.localeCompare(b.title, "sv")
            : b.title.localeCompare(a.title, "sv")
        );
        sortAlphabeticalAsc = !sortAlphabeticalAsc;
        renderProjects(projects);
      });
    });
  }

  /* Slideshow */
  const slides = [
    { image: "iftins-bilder/iftinsGlasskollektion.png", text: "Glassmanifestet: En sommarkollektion av handgjorda glassar och macaron-glassandwichar." },
    { image: "iftins-bilder/iftinsHöstkollektion.png", text: "Lansering av Höstkollektionen: Bakverk inspirerade av pumpa, kanel och äpple." },
    { image: "iftins-bilder/iftinsJulkollektion.png", text: "Julens Smakresa: Praliner och bakverk med saffran, glögg och pepparkaka." },
    { image: "iftins-bilder/iftinsNordiskakollektion.png", text: "Nordiska Kollektionen: Smaker inspirerade av nordiska råvaror och traditioner." },
    { image: "iftins-bilder/iftinsVårkollektion.png", text: "En hyllning till våren: Vårkollektion med lavendel, ros och viol, en smakresa i vårens färger." }
  ];

  let index = 0;
  const imageElement = document.getElementById("iftin-slideshow-image");
  const textElement = document.getElementById("iftin-slideshow-text");
  const prevBtn = document.getElementById("iftin-prev");
  const nextBtn = document.getElementById("iftin-next");

  function showSlide() {
    imageElement.src = slides[index].image;
    textElement.textContent = slides[index].text;
  }

  nextBtn.addEventListener("click", () => {
    index++;
    if (index >= slides.length) {
      index = 0;
    }
    showSlide();
  });

  prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = slides.length - 1;
    }
    showSlide();
  });

  showSlide();
});
