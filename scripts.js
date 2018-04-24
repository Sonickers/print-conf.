$(document).ready(function() {
	function totalPrice() {
		var sum = 0;
		$('.btn-stethoscope-selector.active').each(function() {
			sum += parseInt($(this).data('price'));
			$('.right-price').html(sum);
		});
	}

	$.getJSON('data.json', function(json) {
		const brands = json.brands;
		const models = json.models;		
		const personalisations = json.personalisations;
		const colors = json.colors;

		const brandDiv = $('#brands');
		brands.forEach(function(brand) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(brand.name);
			btnTemplate.attr('disabled', false);
			btnTemplate.data('price', brand.price);

			btnTemplate.on('click', function() {
				$('.right-brand').html(brand.name);
				$('#brands button, #models button, #personalisations button').removeClass('active');
				$(this).addClass('active');
				$('.right-model, .right-personalisation').html('');
				$('#models button, #personalisations button').attr('disabled', true);
				brand.models.forEach(function(index) {
					$('#models button').eq(index).attr('disabled', false);
				});
				totalPrice();
			});
			brandDiv.append(btnTemplate);
		});

		const modelDiv = $('#models');
		models.forEach(function(model) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(model.name);
			btnTemplate.data('price', model.price);
			btnTemplate.on('click', function() {
				$('.right-model').html(model.name);
				$('#models button, #presonalisations button').removeClass('active');
				$('.right-personalisation').html('');
				$(this).addClass('active');
				$('#personalisations button').attr('disabled', true);
				model.personalisations.forEach(function(index) {
					$('#personalisations button').eq(index).attr('disabled', false);
				});
				totalPrice();
			});
			modelDiv.append(btnTemplate);
		});

		const colorsDiv = $('#colors');
		colors.forEach(function(color) {
			const name = color.name;
			const rgb = color.rgb;
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.css('background-color', rgb);
			btnTemplate.html('&nbsp;');
			btnTemplate.attr('disabled', false);
			btnTemplate.removeClass('btn-stethoscope-selector');
			btnTemplate.addClass('btn-color');

			btnTemplate.on('click', function()	{
				$(".btn-color").removeClass("active");
				$(this).addClass("active");
				$(".fa-stethoscope").css('color', rgb);
				$('.right-color').html(name);
			});
			colorsDiv.append(btnTemplate);
		});

		$('.btn-color').eq(0).click();

		const personalisationDiv = $('#personalisations');
		personalisations.forEach(function(personalisation) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(personalisation.name);
			btnTemplate.data('price', personalisation.price);
			btnTemplate.on('click', function() {
				$('.right-personalisation').html(personalisation.name);
				$('#personalisations button').removeClass('active');
				$(this).addClass('active');
				totalPrice();
			});
			personalisationDiv.append(btnTemplate);
		});
	});
});

