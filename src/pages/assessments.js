export const pageTitle = 'Assessments';

function createActionButton(label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-access-button';
    button.textContent = label;
    button.setAttribute('aria-label', `${label} (detailed workflow coming soon)`);
    return button;
}

export function render() {
    const section = document.createElement('section');
    section.className = 'page';

    const heading = document.createElement('h1');
    heading.textContent = 'Assessment Center';
    heading.setAttribute('tabindex', '-1');
    section.appendChild(heading);

    const body = document.createElement('div');
    body.className = 'page-body';

    const overview = document.createElement('div');
    overview.className = 'dashboard-section';
    const intro = document.createElement('p');
    intro.textContent = 'Launch new evaluations or pick up where you left off with saved drafts.';
    overview.appendChild(intro);
    body.appendChild(overview);

    const actions = document.createElement('div');
    actions.className = 'dashboard-section';
    const subHeading = document.createElement('h2');
    subHeading.textContent = 'Assessment Actions';
    actions.appendChild(subHeading);

    const grid = document.createElement('div');
    grid.className = 'quick-access-grid';
    [
        'Start Midterm Assessment',
        'Finalize Final Assessment',
        'Review Assessment History',
    ].forEach((label) => {
        grid.appendChild(createActionButton(label));
    });
    actions.appendChild(grid);
    body.appendChild(actions);

    section.appendChild(body);
    return section;
}
