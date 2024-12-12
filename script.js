document.addEventListener('DOMContentLoaded', () => {
    // Fetch data and display in table
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            let tableHTML = '';
            const uniqueValues = {
                process_type: new Set(),
                site: new Set(),
                workcell: new Set(),
                customer: new Set(),
                problem_failure_mode: new Set(),
                potential_cause_root_cause: new Set(),
                prevention_control: new Set(),
                detection_control: new Set(),
                last_modified_date: new Set(),
                last_uploaded: new Set()
            };

            data.forEach(row => {
                tableHTML += `
                    <tr>
                        <td>${row.process_type}</td>
                        <td>${row.site}</td>
                        <td>${row.workcell}</td>
                        <td>${row.customer}</td>
                        <td>${row.problem_failure_mode}</td>
                        <td>${row.potential_cause_root_cause}</td>
                        <td>${row.prevention_control}</td>
                        <td>${row.detection_control}</td>
                        <td>${row.last_modified_date}</td>
                        <td>${row.last_uploaded}</td>
                    </tr>`;

                uniqueValues.process_type.add(row.process_type);
                uniqueValues.site.add(row.site);
                uniqueValues.workcell.add(row.workcell);
                uniqueValues.customer.add(row.customer);
                uniqueValues.problem_failure_mode.add(row.problem_failure_mode);
                uniqueValues.potential_cause_root_cause.add(row.potential_cause_root_cause);
                uniqueValues.prevention_control.add(row.prevention_control);
                uniqueValues.detection_control.add(row.detection_control);
                uniqueValues.last_modified_date.add(row.last_modified_date);
                uniqueValues.last_uploaded.add(row.last_uploaded);
            });

            table.innerHTML = tableHTML;

            // Populate dropdowns
            populateDropdown('filter-process_type', uniqueValues.process_type);
            populateDropdown('filter-site', uniqueValues.site);
            populateDropdown('filter-workcell', uniqueValues.workcell);
            populateDropdown('filter-customer', uniqueValues.customer);
            populateDropdown('filter-problem_failure_mode', uniqueValues.problem_failure_mode);
            populateDropdown('filter-potential_cause_root_cause', uniqueValues.potential_cause_root_cause);
            populateDropdown('filter-prevention_control', uniqueValues.prevention_control);
            populateDropdown('filter-detection_control', uniqueValues.detection_control);
            populateDropdown('filter-last_modified_date', uniqueValues.last_modified_date);
            populateDropdown('filter-last_uploaded', uniqueValues.last_uploaded);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateDropdown(id, values) {
    const dropdown = document.getElementById(id);
    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        dropdown.add(option);
    });
}

function filterTable() {
    const filters = {
        process_type: document.getElementById('filter-process_type').value.toLowerCase(),
        site: document.getElementById('filter-site').value.toLowerCase(),
        workcell: document.getElementById('filter-workcell').value.toLowerCase(),
        customer: document.getElementById('filter-customer').value.toLowerCase(),
        problem_failure_mode: document.getElementById('filter-problem_failure_mode').value.toLowerCase(),
        potential_cause_root_cause: document.getElementById('filter-potential_cause_root_cause').value.toLowerCase(),
        prevention_control: document.getElementById('filter-prevention_control').value.toLowerCase(),
        detection_control: document.getElementById('filter-detection_control').value.toLowerCase(),
        last_modified_date: document.getElementById('filter-last_modified_date').value.toLowerCase(),
        last_uploaded: document.getElementById('filter-last_uploaded').value.toLowerCase()
    };

    const table = document.getElementById('data-table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let showRow = true;

        if (filters.process_type && cells[0].textContent.toLowerCase().indexOf(filters.process_type) === -1) showRow = false;
        if (filters.site && cells[1].textContent.toLowerCase().indexOf(filters.site) === -1) showRow = false;
        if (filters.workcell && cells[2].textContent.toLowerCase().indexOf(filters.workcell) === -1) showRow = false;
        if (filters.customer && cells[3].textContent.toLowerCase().indexOf(filters.customer) === -1) showRow = false;
        if (filters.problem_failure_mode && cells[4].textContent.toLowerCase().indexOf(filters.problem_failure_mode) === -1) showRow = false;
        if (filters.potential_cause_root_cause && cells[5].textContent.toLowerCase().indexOf(filters.potential_cause_root_cause) === -1) showRow = false;
        if (filters.prevention_control && cells[6].textContent.toLowerCase().indexOf(filters.prevention_control) === -1) showRow = false;
        if (filters.detection_control && cells[7].textContent.toLowerCase().indexOf(filters.detection_control) === -1) showRow = false;
        if (filters.last_modified_date && cells[8].textContent.toLowerCase().indexOf(filters.last_modified_date) === -1) showRow = false;
        if (filters.last_uploaded && cells[9].textContent.toLowerCase().indexOf(filters.last_uploaded) === -1) showRow = false;

        rows[i].style.display = showRow ? '' : 'none';
    }
}

function navigateMenu() {
    const menu = document.getElementById('menu');
    const selectedSection = menu.value;
    document.querySelector(selectedSection).scrollIntoView({ behavior: 'smooth' });
}