/* Hämtar datan från json och skapar elementen för mina projekt */
axios.get('lisaData.json')
    .then((response) => {
        const projects = response.data

        const projectContainer = document.getElementById('project-container')

        projects.forEach(thisProject => {
            const title = document.createElement('h3')
            const description = document.createElement('p')
            const customer = document.createElement('h3')

            const projectTitleDiv = document.createElement('div')
            const projectDescriptionDiv = document.createElement('div')
            const projectCustomerDiv = document.createElement('div')

            const projectItemDiv = document.createElement('div')

            title.textContent = thisProject.title
            description.textContent = thisProject.description
            customer.textContent = thisProject.customer

            projectTitleDiv.classList.add('project-title')
            projectDescriptionDiv.classList.add('project-description')
            projectCustomerDiv.classList.add('project-customer')
            projectItemDiv.classList.add('project-item')


            projectTitleDiv.appendChild(title)
            projectDescriptionDiv.appendChild(description)
            projectCustomerDiv.appendChild(customer)

            projectItemDiv.appendChild(projectTitleDiv)
            projectItemDiv.appendChild(projectDescriptionDiv)
            projectItemDiv.appendChild(projectCustomerDiv)

            projectContainer.appendChild(projectItemDiv)
        })
    })





/* Skill bars */
window.addEventListener("load", () => {
  document.querySelector(".lisa-container").classList.add("animate");
});




/* Bildspel */
let pictures = ["lisaPictures/bread.png", "lisaPictures/cupcakes.png", "lisaPictures/company-event.png", "lisaPictures/christmas.png"];
let index = 0;

let slide = document.getElementById('slide');
let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');

function showPicture() {
  slide.src = pictures[index];
}


nextButton.addEventListener("click", () => {
  index++;
  if (index >= pictures.length) {
    index = 0;
  }
  showPicture();
});

previousButton.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = pictures.length - 1; 
  }
    showPicture();
});



/* Popup fönster */
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closePopup');
let shown = false; 

window.addEventListener('scroll', () => {
  if (window.scrollY > 400 && !shown) {
    popup.style.display = 'flex';  
    setTimeout(() => popup.classList.add('show'), 10); 
    shown = true;
  }
});

// Stäng-knappen
closeButton.addEventListener('click', () => {
  popup.classList.remove('show');
  setTimeout(() => popup.style.display = 'none', 500); 
});



/* Filtrera och Sortera */
axios.get('lisaData.json')
    .then((response) => {
        const projects = response.data
        const projectContainer = document.getElementById('project-container')
        const filter = document.getElementById('filter')
        const sort = document.getElementById('sort')

        
        function renderProjects(list) {
            projectContainer.innerHTML = '' 

            list.forEach(thisProject => {
                const title = document.createElement('h3')
                const description = document.createElement('p')
                const customer = document.createElement('h3')

                const projectTitleDiv = document.createElement('div')
                const projectDescriptionDiv = document.createElement('div')
                const projectCustomerDiv = document.createElement('div')
                const projectItemDiv = document.createElement('div')

                title.textContent = thisProject.title
                description.textContent = thisProject.description
                customer.textContent = thisProject.customer

                projectTitleDiv.classList.add('project-title')
                projectDescriptionDiv.classList.add('project-description')
                projectCustomerDiv.classList.add('project-customer')
                projectItemDiv.classList.add('project-item')

                projectTitleDiv.appendChild(title)
                projectDescriptionDiv.appendChild(description)
                projectCustomerDiv.appendChild(customer)

                projectItemDiv.appendChild(projectTitleDiv)
                projectItemDiv.appendChild(projectDescriptionDiv)
                projectItemDiv.appendChild(projectCustomerDiv)

                projectContainer.appendChild(projectItemDiv)
            })
        }

       
        renderProjects(projects)

        
        function updateList() {
            let filtered = projects.filter(p =>
                p.title.toLowerCase().includes(filter.value.toLowerCase())
            )

            if (sort.value === "asc") {
                filtered.sort((a, b) => a.title.localeCompare(b.title))
            } else if (sort.value === "desc") {
                filtered.sort((a, b) => b.title.localeCompare(a.title))
            }

            renderProjects(filtered)
        }

        
        filter.addEventListener('input', updateList)
        sort.addEventListener('change', updateList)
    })
