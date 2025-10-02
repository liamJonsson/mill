//* Progress bars *//
document.addEventListener("DOMContentLoaded", () => {
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
});

//* Projektlista *//
document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("iftin-project-list");
  const searchInput = document.getElementById("iftin-sök");
  const sortSelect = document.getElementById("iftin-sort-year");

  let projects = [];
  let sortAlphabeticalAsc = true;

/* Hämta JSON */
axios.get("iftin.json")
  .then(response => {
    projects = response.data;
    renderProjects(projects);
    });

  /* Hämtar projekt */
  const renderProjects = list => {
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

      /* Beskrivning */
      const description = document.createElement("p");
      description.textContent = project.description;
      contentDiv.appendChild(description);

      card.appendChild(contentDiv);
      projectList.appendChild(card);

      /* Sortering A–Ö / Ö–A */
      title.addEventListener("click", () => {
        projects.sort((a, b) => sortAlphabeticalAsc
          ? a.title.localeCompare(b.title, "sv")
          : b.title.localeCompare(a.title, "sv")
        );
        sortAlphabeticalAsc = !sortAlphabeticalAsc;
        renderProjects(projects);
      });
    });
  };

/* Sökfunktion */
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
    const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term)
    );
    renderProjects(filtered);
});

/* Sortering efter år (dropdown) */
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


/* Slideshow */
document.addEventListener("DOMContentLoaded", () => {
  const slideshowImages = [
    "iftins-bilder/iftinsGlasskollektion.png",
    "iftins-bilder/iftinsHöstkollektion.png",
    "iftins-bilder/iftinsJulkollektion.png",
    "iftins-bilder/iftinsNordiskakollektion.png",
    "iftins-bilder/iftinsVårkollektion.png"
  ];

  const slideshowTexts = [
    "Glassmanifestet: En sommarkollektion av handgjorda glassar och macaron-glassandwichar.",
    "Lansering av Höstkollektionen: Bakverk inspirerade av pumpa, kanel och äpple.",
    "Julens Smakresa: Praliner och bakverk med saffran, glögg och pepparkaka.",
    "Nordiska Kollektionen: Smaker inspirerade av nordiska råvaror och traditioner.",
    "En hyllning till våren: Vårkollektion med lavendel, ros och viol, en smakresa i vårens färger."
  ];

  let currentIndex = 0;
  const imageElement = document.getElementById("iftin-slideshow-image");
  const textElement = document.getElementById("iftin-slideshow-text");
  const prevBtn = document.getElementById("iftin-prev");
  const nextBtn = document.getElementById("iftin-next");

  const updateImage = () => {
    imageElement.src = slideshowImages[currentIndex];
    textElement.textContent = slideshowTexts[currentIndex];
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;
    updateImage();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slideshowImages.length;
    updateImage();
  });

  updateImage();
});