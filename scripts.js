$(document).ready(function() {
	function totalPrice() {
		var sum = 0;
		$('.btn-car-selector.active').each(function() {
			sum += parseInt($(this).data('price'));
			$('.right-price').html(sum);
		});
	}

	$.getJSON('/data.json', function(json) {
		const models = json.models;
		const engines = json.engines;
		const gearboxes = json.gearboxes;
		const colors = json.colors;

		const modelDiv = $('#models');
		models.forEach(function(model) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(model.name);
			btnTemplate.attr('disabled', false);
			btnTemplate.data('price', model.price);

			btnTemplate.on('click', function() {
				$('.right-model').html(model.name);
				$('#models button, #engines button, #gearboxes button').removeClass('active');
				$(this).addClass('active');
				$('#engines button, #gearboxes button').attr('disabled', true);
				model.engines.forEach(function(index) {
					$('#engines button').eq(index).attr('disabled', false);
				});
				totalPrice();
			});
			modelDiv.append(btnTemplate);
		});

		const engineDiv = $('#engines');
		engines.forEach(function(engine) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(engine.name);
			btnTemplate.data('price', engine.price);
			btnTemplate.on('click', function() {
				$('.right-engine').html(engine.name);
				$('#engines button, #gearboxes button').removeClass('active');
				$(this).addClass('active');
				$('#gearboxes button').attr('disabled', true);
				engine.gearboxes.forEach(function(index) {
					$('#gearboxes button').eq(index).attr('disabled', false);
				});
				totalPrice();
			});
			engineDiv.append(btnTemplate);
		});

		const colorsDiv = $('#colors');
		colors.forEach(function(color) {
			const name = color.name;
			const rgb = color.rgb;
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.css('background-color', rgb);
			btnTemplate.html('&nbsp;');
			btnTemplate.attr('disabled', false);
			btnTemplate.removeClass('btn-car-selector');
			btnTemplate.addClass('btn-color');

			btnTemplate.on('click', function()	{
				$(".btn-color").removeClass("active");
				$(this).addClass("active");
				$(".fa-car").css('color', rgb);
				$('.right-color').html(name);
			});
			colorsDiv.append(btnTemplate);
		});

		$('.btn-color').eq(0).click();

		const gearboxDiv = $('#gearboxes');
		gearboxes.forEach(function(gearbox) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(gearbox.name);
			btnTemplate.data('price', gearbox.price);
			btnTemplate.on('click', function() {
				$('.right-gearbox').html(gearbox.name);
				$('#gearboxes button').removeClass('active');
				$(this).addClass('active');
				totalPrice();
			});
			gearboxDiv.append(btnTemplate);
		});
	});
});

