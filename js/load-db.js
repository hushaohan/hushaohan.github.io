function formatYears(years) {
    years.sort((a, b) => a - b);
    let length = 1;
    let list = [];
    if (years.length == 0) {
        return list;
    }
    for (let i = 1; i <= years.length; i++) {
        if (i == years.length || years[i] - years[i - 1] != 1) {
            if (length == 1) {
                list.push((years[i - length]).toString());
            } else {
                list.push(years[i - length] + "~" + years[i - 1]);
            }
            length = 1;
        }
        else {
            length++;
        }
    }
    return list.join(', ');
}


function renderService(s) {
    return `
        <a href="${s.url}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h7 class="mb-1 tpc-short fw-bold">${s.acronym}</h7>
                <small class="badge text-dark fw-lighter">${formatYears(s.years)}</small>
            </div>
            <small class="fs-7 fw-lighter">${s.name}</small>
        </a>
    `
}

const services = ['tpcs', 'conf-reviews', 'journal-reviews'];
services.forEach(service => {
    fetch(`db/${service}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById(`${service}-content`).innerHTML = `
                ${data.map(renderService).join('\n')}
            `;
        })
})

function renderPatent(p) {
    return `
        <a href="${p.url}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                ${p.title}
                <small class="badge text-dark fw-lighter">${p.number}</small>
            </div>
        </a>
    `
}

function renderPatents(ps) {
    const statuses = [...new Set(ps.map(p => p.status))];
    return statuses.map(s => `
        <div id="patents-${s}" class="col-lg-6 pb-3"
            data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
            <div class="list-group">
                <li class="list-group-item list-group-item-info">${s}</li>
                ${ps.filter(patent => patent.status == s).map(renderPatent).join('\n') }
            </div>
        </div >
    `).join('\n')
}

fetch(`db/patents.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById(`patents-content`).innerHTML = `${renderPatents(data)}`;
    })

function publicationYear(p) {
    return p.journal ? p.journal.year : p.conference ? p.conference.year : p.preprint.year;
}

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function additionalConferenceInfo(p) {
    if (p.journal && p.conference) {
        return `<br/>
            Presented at <a href="p.conference.url">${p.conference.acronym} ${p.conference.year}</a>
        `
    }
}

function publicationVenue(p) {
    var v = p.journal || p.conference || p.preprint
    var venueItems = [`<a href="${v.url}">${v.name}${v.acronym ? ` (${v.acronym})` : ''}</a>`];
    if (v.volume) {
        venueItems.push(`Volume ${v.volume}, Number ${v.number}`)
    }
    if (v.location) {
        venueItems.push(v.location)
    }
    if (v.date) {
        venueItems.push(v.date)
    } else {
        venueItems.push(months[v.month - 1])
    }
    venueItems.push(v.year)
    return venueItems.join(', ')
}

function renderPublication(p) {
    return `
        <li class="list-group-item">
            <em><a href="${p.url}" class="fw-bolder">${p.title}</a></em>
            ${p.pdf ? `<a href="${p.pdf}"><i class="bi bi-file-earmark-pdf-fill"></i></a>` : ''}
            ${p.slides ? `<a href="${p.slides}"><i class="bi bi-file-earmark-slides-fill"></i></a>` : ''}
            ${p.demo ? `<a href="${p.demo}"><i class="bi bi-youtube"></i></a>` : ''}
            <br/>
            ${p.authors.map(a => a == 'Shaohan Hu' ? "<strong>Shaohan Hu</strong>" : a).join(', ')}<br/>
            ${publicationVenue(p)}<br/>
            ${p.award ? p.award : ''}
        </li>
    `
}

function renderPublications(ps) {
    const years = [... new Set(ps.map(publicationYear))].sort((a, b) => b - a)
    return years.map(y => `
        <div id="publications-${y}" class="list-group-flush py-2"
             data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
            <li class="list-group-item list-group-item-info">${y}</li>
            ${ps.filter(p => publicationYear(p) == y).map(renderPublication).join('')}
        </div>
    `).join('')
}

fetch(`db/publications.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById(`publications-content`).innerHTML = `${renderPublications(data)}`;
    })

function renderWork(ws) {
    return ws.map(w => `
        <tr>
            <th scope="row">${w.title}</th>
            <td><a href="${w.url}">${w.employer}</a></td>
            <td>${w.location}</td>
            <td>${w.date}</td>
        </tr>
    `).join('\n')
}

fetch(`db/work.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById(`work-content`).innerHTML = `${renderWork(data)}`;
    })

function renderEducation(es) {
    return es.map(e => `
        <tr>
            <th scope="row">${e.degree}
            </th>
            <td>${e.majors.map(m => `<a href="${m.url}">${m.name}</a>`).join(', ')}</td>
            <td><a href="${e.institute.url}">${e.institute.name}</a></td>
            <td>${e.location}</td>
            <td>${e.date}</td>
        </tr>
    `).join('\n')
}

fetch(`db/education.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById(`education-content`).innerHTML = `${renderEducation(data)}`;
    })
