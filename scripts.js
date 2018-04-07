$(document).ready(function() {
	$.getJSON('/data.json', function(json) {
		const models = json.models;
		const engines = json.engines;
		const gearboxes = json.gearboxes;

		const modelDiv = $('#models');
		models.forEach(function(model) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(model.name);
			btnTemplate.attr('disabled', false);
			btnTemplate.on('click', function() {
				$('#models button, #engines button, #gearboxes button').removeClass('active');
				$(this).addClass('active');
				$('#engines button, #gearboxes button').attr('disabled', true);
				model.engines.forEach(function(index) {
					$('#engines button').eq(index).attr('disabled', false);
				});
			});
			modelDiv.append(btnTemplate);
		});

		const engineDiv = $('#engines');
		engines.forEach(function(engine) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(engine.name);
			btnTemplate.on('click', function() {
				$('#engines button, #gearboxes button').removeClass('active');
				$(this).addClass('active');
				$('#gearboxes button').attr('disabled', true);
				engine.gearboxes.forEach(function(index) {
					$('#gearboxes button').eq(index).attr('disabled', false);
				});
			});
			engineDiv.append(btnTemplate);
		});

		const gearboxDiv = $('#gearboxes');
		gearboxes.forEach(function(gearbox) {
			const btnTemplate = $('.js-btn-template > button').clone();
			btnTemplate.html(gearbox.name);
			btnTemplate.on('click', function() {
				$('#gearboxes button').removeClass('active');
				$(this).addClass('active');
			});
			gearboxDiv.append(btnTemplate);
		});
	});

	$('.btn-color').on('click', function()	{
		const color = $(this).data('color');
		const name = $(this).data('name');
		$(".btn-color").removeClass("active");
		$(this).addClass("active");
		$(".fa-car").css('color', color);
	});

	


});

