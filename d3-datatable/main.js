document.getElementById('csvFile').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const data = results.data;
      const columns = Object.keys(data[0]).map(key => ({
        title: key,
        data: key
      }));

      // Destroy existing DataTable if any
      if ($.fn.DataTable.isDataTable('#csvTable')) {
        $('#csvTable').DataTable().clear().destroy();
        $('#csvTable thead').empty();
        $('#csvTable tbody').empty();
      }

      // Add headers
      const headerRow = columns.map(col => `<th>${col.title}</th>`).join('');
      document.querySelector('#csvTable thead').innerHTML = `<tr>${headerRow}</tr>`;

      // Initialize DataTable
      $('#csvTable').DataTable({
        data: data,
        columns: columns
      });
    }
  });
});
