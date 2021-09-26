$(document).ready(function () {
  const dictId = {};
  const dictName = {};
  const checkBox = $('input:checkbox');
  const h4 = $('div.amenities h4');
  const status = $('div#api_status');

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

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        console.log(data.status);
        $('div#api_status').addClass('available');
      } else if (status.hasClass('available')) {
        console.log('class not added');
        $('div#api_status').removeClass('available');
      }
    }
  });
});
