$(document).ready(function () {
  const dictId = {};
  const dictName = {};
  const checkBox = $('input:checkbox');
  const h4 = $('div.amenities h4');

  checkBox.change(function () {
    let str = '';
    if ($(this).is(':checked')) {
      dictId[$(this).attr('data-id')] = $(this).attr('data-id');
      dictName[$(this).attr('data-id')] = $(this).attr('data-name');
    } else { delete dictId[$(this).attr('data-id')]; }

    for (const key in dictId) {
      if (str !== '') { str += ', '; }
      str += dictName[key];
    }
    h4.text(str);
  });
});
