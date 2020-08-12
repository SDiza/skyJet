export function responsiveTable() {
  if ($('.js--responsive_table__data').length) {
    let headertext = [],
      headers = document.querySelectorAll('.js--responsive_table__data th'),
      tablebody = document.querySelector('.js--responsive_table__data tbody');

    for (let i = 0; i < headers.length; i++) {
      let current = headers[i];
      headertext.push(current.textContent.replace(/\r?\n|\r/, ''));
    }
    for (let i = 0, row; row = tablebody.rows[i]; i++) {
      for (let j = 0, col; col = row.cells[j]; j++) {
        col.setAttribute('data-th', headertext[j]);
      }
    }
  }
}
