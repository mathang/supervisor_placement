export const pageTitle = 'Students';

function createActionButton(label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-access-button';
    button.textContent = label;
    button.setAttribute('aria-label', `${label} (opens detailed workspace in future updates)`);
    return button;
}

export function render(context = {}) {
    const section = document.createElement('section');
    section.className = 'page';

    const heading = document.createElement('h1');
    heading.textContent = 'Student Placements';
    heading.setAttribute('tabindex', '-1');
    section.appendChild(heading);

    const body = document.createElement('div');
    body.className = 'page-body';

    const overview = document.createElement('div');
    overview.className = 'dashboard-section';
    const intro = document.createElement('p');
    const name = context.supervisorName ? `${context.supervisorName}, ` : '';
    intro.textContent = `${name}monitor active placements and connect with learners from this hub.`;
    overview.appendChild(intro);
    body.appendChild(overview);

    const actions = document.createElement('div');
    actions.className = 'dashboard-section';
    const subHeading = document.createElement('h2');
    subHeading.textContent = 'Student Workspaces';
    actions.appendChild(subHeading);

    const grid = document.createElement('div');
    grid.className = 'quick-access-grid';
    [
        'Placement Overview',
        'Progress Reviews',
        'Communication Log',
    ].forEach((label) => {
        grid.appendChild(createActionButton(label));
    });
    actions.appendChild(grid);
    body.appendChild(actions);

    section.appendChild(body);
    return section;
}
