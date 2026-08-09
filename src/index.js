import { contact, portrait, projects } from "./data.js";
import "./style.css"

console.log("Hello Odin!");


const socialLinks = [
    { iconClass: "devicon-github-original", link: portrait.githubLink },
    { iconClass: "devicon-linkedin-plain", link: portrait.linkedinLink },
    { iconClass: "devicon-twitter-original", link: portrait.twitterLink },
]

function makeIcon(iconClass, link) {
    const iconeEL = document.createElement('a')
    iconeEL.href = link
    iconeEL.target = '_blank'
    iconeEL.rel = 'noopener'
    const icon = document.createElement('i')
    icon.classList.add(iconClass, 'icon')
    iconeEL.append(icon)
    return iconeEL
}

function makeSocials(className) {
    const iconsDiv = document.createElement('div')
    iconsDiv.classList.add(className)
    socialLinks.forEach(({ iconClass, link }) => {
        iconsDiv.append(makeIcon(iconClass, link))
    })
    return iconsDiv
}

function makePicture(jpeg, webp, alt, className) {
    const picture = document.createElement('picture')
    picture.classList.add(className)

    const source = document.createElement('source')
    source.srcset = webp
    source.type = 'image/webp'

    const img = document.createElement('img')
    img.src = jpeg
    img.alt = alt

    picture.append(source, img)
    return picture
}

function makeContactLine(className, iconName, text, href) {
    const wrapper = document.createElement('div')
    wrapper.classList.add(className)

    const icon = document.createElement('span')
    icon.classList.add('material-symbols-outlined')
    icon.textContent = iconName

    const link = document.createElement('a')
    link.href = href
    link.textContent = text

    wrapper.append(icon, link)
    return wrapper
}


const header = document.querySelector('header')

function populateHeader() {
    const banner = document.createElement('div')
    banner.classList.add('hero-banner')

    const photo = makePicture(
        portrait.jpeg,
        portrait.webp,
        `Portrait of ${portrait.name}`,
        'hero-photo'
    )

    const title = document.createElement('h1')
    title.classList.add('hero-name')
    title.textContent = portrait.name

    const figure = document.createElement('div')
    figure.classList.add('hero-figure')
    figure.append(photo, title)

    const resumeDiv = document.createElement('div')
    resumeDiv.classList.add('resume')

    const resumeTitle = document.createElement('h2')
    resumeTitle.textContent = 'About me'

    const resume = document.createElement('p')
    resume.textContent = portrait.description


    resumeDiv.append(figure, resumeTitle, resume, makeSocials('resume-icon'))

    header.append(banner, resumeDiv)
}


const main = document.querySelector('main')

function populateMain(projectsList) {
    projectsList.forEach(project => {
        const card = document.createElement('article')
        card.classList.add('card')

        const pictureCard = makePicture(project.jpeg, project.webp, project.name, 'picture-card')

        const footerCard = document.createElement('div')
        footerCard.classList.add('footer-card')

        const titleAndIcon = document.createElement('div')
        titleAndIcon.classList.add('title-icon-card')

        const title = document.createElement('h3')
        title.textContent = project.name

        const gitIcon = document.createElement('i')
        gitIcon.classList.add('devicon-github-original')
        const gitLink = document.createElement('a')
        gitLink.target = '_blank'
        gitLink.rel = 'noopener'
        gitLink.href = project.githubLink
        gitLink.append(gitIcon)

        titleAndIcon.append(title, gitLink)

        if (project.websiteLink) {
            const linkIcon = document.createElement('span')
            linkIcon.classList.add('material-symbols-outlined')
            linkIcon.textContent = 'north_east'
            const externalLink = document.createElement('a')
            externalLink.href = project.websiteLink
            externalLink.target = '_blank'
            externalLink.rel = 'noopener'
            externalLink.append(linkIcon)
            titleAndIcon.append(externalLink)
        }

        const para = document.createElement('p')
        para.textContent = project.description

        footerCard.append(titleAndIcon, para)

        card.append(pictureCard, footerCard)
        main.append(card)
    });
}


const footer = document.querySelector('footer')

function populateFooter() {
    const contactDiv = document.createElement('div')
    contactDiv.classList.add('contact')

    const title = document.createElement('h2')
    title.textContent = contact.title

    const description = document.createElement('p')
    description.textContent = contact.description

    const details = document.createElement('address')
    details.classList.add('contact-details')

    const address = document.createElement('p')
    address.textContent = contact.address

    const phoneDiv = makeContactLine(
        'phone-wrapper',
        'phone_enabled',
        contact.phone,
        `tel:${contact.phone.replace(/\s/g, '')}`
    )

    const emailDiv = makeContactLine(
        'email-wrapper',
        'email',
        contact.email,
        `mailto:${contact.email}`
    )

    details.append(address, phoneDiv, emailDiv)

    contactDiv.append(title, description, details, makeSocials('contact-icon'))

    const workPicture = makePicture(contact.imgJpg, contact.imgWebp, 'Ashley at work', 'work-image')

    footer.append(contactDiv, workPicture)
}

populateHeader()
populateMain(projects)
populateFooter()
