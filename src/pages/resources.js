export const pageTitle = 'Resources';

function createActionButton(label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-access-button';
    button.textContent = label;
    button.setAttribute('aria-label', `${label} resource (coming soon)`);
    return button;
}

export function render() {
    const section = document.createElement('section');
    section.className = 'page';

    const heading = document.createElement('h1');
    heading.textContent = 'Resource Library';
    heading.setAttribute('tabindex', '-1');
    section.appendChild(heading);

    const body = document.createElement('div');
    body.className = 'page-body';

    const overview = document.createElement('div');
    overview.className = 'dashboard-section';
    const intro = document.createElement('p');
    intro.textContent = 'Find guidance, policy documents, and templates to support every stage of supervision.';
    overview.appendChild(intro);
    body.appendChild(overview);

    const actions = document.createElement('div');
    actions.className = 'dashboard-section';
    const subHeading = document.createElement('h2');
    subHeading.textContent = 'Featured Collections';
    actions.appendChild(subHeading);

    const grid = document.createElement('div');
    grid.className = 'quick-access-grid';
    [
        'Orientation Materials',
        'Assessment Rubrics',
        'Site Visit Guides',
    ].forEach((label) => {
        grid.appendChild(createActionButton(label));
    });
    actions.appendChild(grid);
    body.appendChild(actions);

    section.appendChild(body);
    return section;
}
