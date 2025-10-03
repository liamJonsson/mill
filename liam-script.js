const skillItem1 = document.getElementById('skill-item1')
const skillItem2 = document.getElementById('skill-item2')
const skillItem3 = document.getElementById('skill-item3')
const skillItem4 = document.getElementById('skill-item4')

window.addEventListener('DOMContentLoaded', () => {
    skillItem1.classList.add('skill-bar1')
    skillItem2.classList.add('skill-bar2')
    skillItem3.classList.add('skill-bar3')
    skillItem4.classList.add('skill-bar4')

    const skillItem1Procentage = document.createElement('p')
    const skillItem2Procentage = document.createElement('p')
    const skillItem3Procentage = document.createElement('p')
    const skillItem4Procentage = document.createElement('p')

    skillItem1Procentage.textContent = "90%"
    skillItem2Procentage.textContent = "60%"
    skillItem3Procentage.textContent = "50%"
    skillItem4Procentage.textContent = "35%"

    skillItem1.appendChild(skillItem1Procentage)
    skillItem2.appendChild(skillItem2Procentage)
    skillItem3.appendChild(skillItem3Procentage)
    skillItem4.appendChild(skillItem4Procentage)
})

const liam = document.getElementById('liam')

liam.addEventListener('click', () =>{
    liam.src = "liamPictures/liam_glad.png"
    liam.classList.add('spin')    
})

window.addEventListener('scroll', () =>{
    liam.src = "pictures/liam.png"
    liam.classList.add('spin-reverse')
})
axios.get('liam.json')
    .then((response) => {
        const projects = response.data
        const container = document.getElementById('project-container')
        projects.forEach(project => {
            const projectItems = document.createElement('div')
            const projectGridItem1 = document.createElement('div')
            const projectGridItem2 = document.createElement('div')
            const projectGridItem3 = document.createElement('div')
            const title = document.createElement('h3')
            const customer = document.createElement('h3')
            const description = document.createElement('p')

            title.textContent = project.title
            customer.textContent = "Kund: " + project.customer
            description.textContent = project.description

            projectItems.classList.add('project-items')
            projectGridItem1.classList.add('project-grid-item1')
            projectGridItem2.classList.add('project-grid-item2')
            projectGridItem3.classList.add('project-grid-item3')

            projectGridItem1.appendChild(title)
            projectGridItem2.appendChild(customer)
            projectGridItem3.appendChild(description)
            projectItems.appendChild(projectGridItem1)
            projectItems.appendChild(projectGridItem2)
            projectItems.appendChild(projectGridItem3)
            container.appendChild(projectItems)
        })
    })

axios.get('liam.json')
    .then((response) => {
        const allProjects = response.data; 
        const container = document.getElementById('project-container')
        const projectFilter = document.getElementById('project-filter')
        const projectSort = document.getElementById('project-sort')

        function createProjects(projects) {
            container.innerHTML = ""

            projects.forEach(project => {
                const projectItems = document.createElement('div');
                const projectGridItem1 = document.createElement('div');
                const projectGridItem2 = document.createElement('div');
                const projectGridItem3 = document.createElement('div');
                const title = document.createElement('h3');
                const customer = document.createElement('h3');
                const description = document.createElement('p');

                title.textContent = project.title;
                customer.textContent = "Kund: " + project.customer;
                description.textContent = project.description;

                projectItems.classList.add('project-items');
                projectGridItem1.classList.add('project-grid-item1');
                projectGridItem2.classList.add('project-grid-item2');
                projectGridItem3.classList.add('project-grid-item3');

                projectGridItem1.appendChild(title);
                projectGridItem2.appendChild(customer);
                projectGridItem3.appendChild(description);

                projectItems.appendChild(projectGridItem1);
                projectItems.appendChild(projectGridItem2);
                projectItems.appendChild(projectGridItem3);

                container.appendChild(projectItems);
            });        
        }

        createProjects(allProjects)

        function updateList() {
            projectFilter.value.toLowerCase();
            projectSort.value;

            let filtered = allProjects.filter(project =>
                project.title.toLowerCase().includes(projectFilter.value.toLowerCase())
            );

            if(projectSort.value === "a-ö"){
                filtered.sort((project, comparedProject) => project.title.localeCompare(comparedProject.title))
            }
            else if(projectSort.value === "ö-a"){
                filtered.sort((project, comparedProject) => comparedProject.title.localeCompare(project.title))
            }
            createProjects(filtered);
        }

        projectFilter.addEventListener('input', updateList)
        projectSort.addEventListener('change', updateList)
    });

const images = ["liamPictures/desk.jpg", "liamPictures/strawberry-cake.jpg", "liamPictures/william-cake.jpg"]

const slide = document.getElementById("slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function showImage(index) {
    slide.src = images[index];
}

prevBtn.addEventListener("click", () => {
    if(slide.src.includes("desk.jpg")){
        showImage(2)
    }
    else if(slide.src.includes("strawberry-cake.jpg")){
        showImage(0)
    }
    else{
        showImage(1)
    }
});

nextBtn.addEventListener("click", () => {
    if(slide.src.includes("desk.jpg")){
        showImage(1)
    }
    else if(slide.src.includes("strawberry-cake.jpg")){
        showImage(2)
    }
    else{
        showImage(0)
    }
});