
  let jobs = JSON.parse(localStorage.getItem('ulyaJobs')) || [];

  function save() {
    localStorage.setItem('ulyaJobs', JSON.stringify(jobs));
  }

  function badge(status) {
    if (status === 'no') return '<span class="badge status-no">No Action</span>';
    if (status === 'preparing') return '<span class="badge status-prep">Preparing</span>';
    return '<span class="badge status-applied">Applied</span>';
  }

  function addJob() {
    const job = {
      date: date.value,
      role: role.value,
      company: company.value,
      deadline: deadline.value,
      link: link.value,
      status: status.value,
      note: note.value
    };

    if (!job.role || !job.company) return alert('Role & Instansi wajib diisi');

    jobs.push(job);
    save();
    render();

    document.querySelectorAll('input, select').forEach(e => e.value = '');
  }

  function updateStatus(index, value) {
    jobs[index].status = value;
    save();
    render();
  }

  function editJob(index) {
    const j = jobs[index];
    date.value = j.date;
    role.value = j.role;
    company.value = j.company;
    deadline.value = j.deadline;
    link.value = j.link;
    status.value = j.status;
    note.value = j.note;
    jobs.splice(index, 1);
    save();
    render();
  }

  function deleteJob(index) {
    if (confirm('Hapus data ini?')) {
      jobs.splice(index, 1);
      save();
      render();
    }
  }

  function render() {
    jobTable.innerHTML = '';
    jobs.forEach((j, i) => {
      jobTable.innerHTML += `
        <tr>
          <td>${j.date || '-'}</td>
          <td>${j.role}</td>
          <td>${j.company}</td>
          <td>${j.deadline || '-'}</td>
          <td><a href="${j.link}" target="_blank">Link</a></td>
          <td>
            <select class="form-select form-select-sm" onchange="updateStatus(${i}, this.value)">
              <option value="no" ${j.status==='no'?'selected':''}>No Action</option>
              <option value="preparing" ${j.status==='preparing'?'selected':''}>Preparing</option>
              <option value="applied" ${j.status==='applied'?'selected':''}>Applied</option>
            </select>
          </td>
          <td>${j.note || '-'}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editJob(${i})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteJob(${i})">Hapus</button>
          </td>
        </tr>`;
    });
  }

  render();
