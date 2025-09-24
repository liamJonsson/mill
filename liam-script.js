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
            customer.textContent = project.customer
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
});