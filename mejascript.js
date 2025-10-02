//bildspel

const pictures = [
    'Meja_Bilder/BildMeja2.png',
    'Meja_Bilder/BildMeja3.png',
    'Meja_Bilder/BildMeja4.png',
    'Meja_Bilder/BildMeja5.png'
];

const slideshowPicture = document.getElementById('slideshow-picture');
const slideshowButtonBack = document.getElementById('back-button');
const slideshowButtonNext = document.getElementById('next-button');
const pictureCount = document.getElementById('picture-count');

let currentIndex = 0;

const updateSlideshow = () => {
    slideshowPicture.src = pictures[currentIndex];
    pictureCount.textContent = (currentIndex + 1) + ' / ' + pictures.length;
};

updateSlideshow();

slideshowButtonBack.addEventListener('click', () => {
    currentIndex = currentIndex - 1;
    if(currentIndex <0){
        currentIndex = pictures.length -1;
    }

    updateSlideshow();

});

slideshowButtonNext.addEventListener('click', () => {
    currentIndex = currentIndex + 1;
    if(currentIndex >= pictures.length){
        currentIndex=0;
    }

    updateSlideshow();
});

//skillbar
const fillCupcake = document.getElementById('fill-cupcake');
const fillEfficiency = document.getElementById('fill-efficiency');
const fillPrecision = document.getElementById('fill-precision');
const fillCreativity = document.getElementById('fill-creativity');

window.addEventListener('load', () => {
    fillCupcake.classList.add('skillbar-filled');
    fillEfficiency.classList.add('skillbar-filled');
    fillPrecision.classList.add('skillbar-filled');
    fillCreativity.classList.add('skillbar-filled');
});

//Förflyttning skillbar & slideshow
const skillbar = document.getElementById('skillbar-container');
const slideshow = document.getElementById('slideshow-container');

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        skillbar.classList.add("move");
        slideshow.classList.add("move");
    }else{
        skillbar.classList.remove("move");
        slideshow.classList.remove("move");
    }
});

//Projekt

const projectsContainer = document.getElementById('projects-container');
const filtering = document.getElementById('filtering');
const sorting = document.getElementById('sorting');

const showProjects = () => {

    projectsContainer.replaceChildren();

    axios.get('mejadata.json').then(response => {
        let projects = response.data;

        if(filtering.value.trim() !== "") {
            projects = projects.filter(project => 
            project.title.toLowerCase().includes(filtering.value.trim().toLowerCase())
        
        );
        }

        if(sorting.value === 'alphabetical-titles'){
            projects.sort((a, b) => a.title.localeCompare(b.title));
        }

        projects.forEach(project => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project');

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.title;
            projectTitle.classList.add('grid-title');
            projectContainer.appendChild(projectTitle);

            const projectCustomer= document.createElement('h4');
            projectCustomer.textContent = "Kund:"+ "\u00A0\u00A0\u00A0"+ project.customer;
            projectCustomer.classList.add('grid-customer');
            projectContainer.appendChild(projectCustomer);

            const projectDescription = document.createElement('p');
            projectDescription.textContent = project.description;
            projectDescription.classList.add('grid-description');
            projectContainer.appendChild(projectDescription);

            const projectDate = document.createElement('p');
            projectDate.textContent = project.date;
            projectDate.classList.add('grid-date');
            projectContainer.appendChild(projectDate);

            const projectImage = document.createElement('img');
            projectImage.src = project.image;
            projectImage.classList.add('grid-image');
            projectContainer.appendChild(projectImage);

            projectsContainer.appendChild(projectContainer);

        });
     });
};

showProjects();

filtering.addEventListener('input', showProjects);
sorting.addEventListener('change', showProjects);

