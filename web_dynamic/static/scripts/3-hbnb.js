$(document).ready(function () {
  const dictId = {};
  const dictName = {};
  const checkBox = $('input:checkbox');
  const h4 = $('div.amenities h4');
  const status = $('div#api_status');

  function appendPlace (place) {
    $('section.places').append(
	    '<article>' +
		'<div class="title_box">' +
		  '<h2>' + place.name + '</h2>' +
		  '<div class="price_by_night">' + place.price_by_night + '</div>' +
		'</div>' +
		'<div class="information">' +
		  '<div class="max_guest">' + place.max_guest + 'Guest </div>' +
		  '<div class="number_rooms">' + place.number_rooms + 'Bedroom</div>' +
		  '<div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom</div>' +
		'</div>' +
		'<div class="user"></div>' +
		'<div class="description">' + place.description + '</div>' +
	    '</article>');
  }

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

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      $.each(data, function (idx, place) {
        appendPlace(place);
      });
    }
  });
});
