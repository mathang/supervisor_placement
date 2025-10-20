export const pageTitle = 'Dashboard';

export function render(context = {}) {
    const section = document.createElement('section');
    section.className = 'page';

    const heading = document.createElement('h1');
    heading.textContent = context.supervisorName ? `Welcome back, ${context.supervisorName}!` : 'Welcome back!';
    heading.setAttribute('tabindex', '-1');
    section.appendChild(heading);

    const body = document.createElement('div');
    body.className = 'page-body';

    const intro = document.createElement('div');
    intro.className = 'dashboard-section';
    const introParagraph = document.createElement('p');
    introParagraph.textContent = 'Choose a task below to continue your supervision workflow.';
    intro.appendChild(introParagraph);
    body.appendChild(intro);

    const snapshot = document.createElement('div');
    snapshot.className = 'dashboard-section';
    const snapshotHeading = document.createElement('h2');
    snapshotHeading.textContent = 'Placement Snapshot';
    snapshot.appendChild(snapshotHeading);

    const list = document.createElement('ul');
    list.className = 'detail-list';
    const items = [
        '12 active students are progressing through placements this term.',
        '3 midterm assessments are due within the next 7 days.',
        '2 new collaboration requests from university educators are awaiting review.',
    ];

    items.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
    });
    snapshot.appendChild(list);
    body.appendChild(snapshot);

    const quickAccess = document.createElement('div');
    quickAccess.className = 'dashboard-section';
    const quickHeading = document.createElement('h2');
    quickHeading.textContent = 'Quick Access Menu';
    quickAccess.appendChild(quickHeading);

    const grid = document.createElement('div');
    grid.className = 'quick-access-grid';
    const links = [
        { hash: '#/students', label: 'View My Students' },
        { hash: '#/assessments', label: 'Complete Assessments' },
        { hash: '#/resources', label: 'Resource Library' },
        { hash: '#/bookings', label: 'Manage Bookings' },
        { hash: '#/messages', label: 'Message Center' },
    ];

    links.forEach(({ hash, label }) => {
        const anchor = document.createElement('a');
        anchor.className = 'quick-access-button';
        anchor.href = hash;
        anchor.textContent = label;
        grid.appendChild(anchor);
    });

    quickAccess.appendChild(grid);
    body.appendChild(quickAccess);

    section.appendChild(body);
    return section;
}
