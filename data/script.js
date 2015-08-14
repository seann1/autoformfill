self.port.on("fillForm", function() {

	$("input#j_username").val("");
	$("input#j_password").val("");

	//all inputs
	var allInputs = $("input");
	//all selects
	var allSelects = $("select");
	//all radios
	var allRadios = $("div[role='radiogroup']");
	//all checkboxes
	var allCheckboxes = $(".ufe-checkbox");
	//all text areas
	var allTextareas = $("textarea");

    //all text inputs
	$.each(allInputs, function(index, value) {

		var inputId = $(value).attr('id');
		var parent = $(value).parent(); 

		//label is current input's label to lowercase
		var label = $('label[for="' + inputId + '"]').text().toLowerCase();

		//long condition to weed out all inputs that should not be autofilled
		//element must be visible on the page, have an id, not already have content in it and not be an address line 2 field
		if (typeof inputId != 'undefined' && !~label.indexOf("address line 2") && $(value).val() === "" && $(value).is(":visible")) {

			//if label contains the string 'city' then fill label with random city
			if ( label.indexOf("city") > -1 ) {

				$(value).val(faker.address.city());

			} else if ( label.indexOf("street") > -1 ) {

				$(value).val(faker.address.streetAddress());

			} else if (label.indexOf("zip") > -1 ) {

				$(value).val(faker.address.zipCode());

			} else if (label.indexOf("email") > -1  && $(parent).find(':input').length != 3) {

				$(value).val(faker.internet.email());

			} else if (label.indexOf("first") > -1 && label.indexOf("name") > -1) {

				$(value).val(faker.name.firstName());

			} else if (label.indexOf("last") > -1 && label.indexOf("name") > -1) {

				$(value).val(faker.name.lastName());

			} else if (label.indexOf("phone") > -1) {

				if ($(value).attr("maxlength") === "3") {

					$(value).val(333);
					$(value).next("input").val(333);
					$(value).next("input").next("input").val(3333);

				} else {

					$(value).val(3333333333);
				}

			} else {

				$(value).val("arf");
			}
		}
	});//end of each loop
	//end all inputs

	//all text areas
	$.each(allTextareas, function(index, value) {
		$(value).val(faker.lorem.paragraph());
	});

	//each radio button
	$.each(allRadios, function(index, value) {
		
		var radioInputs = $(value).find("input:radio");


		$.each(radioInputs, function(index, value) {

			if ($(value).attr("value") === "N" || $(value).attr("value") === "No") {

				$(value).attr('checked', 'checked');
			}

		});

	});

	//each checkbox
	$.each(allCheckboxes, function(index, value) {

		var checkboxes = $(value).find("input:checkbox");

		//remove checkboxes with 'other' value from array
		$.each(checkboxes, function(index, value) {
			var label = $(value).val().toLowerCase();
			if (label.indexOf("other") > -1) {
				checkboxes.splice(index, 1);
			}
		});


		$(checkboxes[Math.floor(Math.random()*checkboxes.length)]).attr("checked", "checked");

	});

	//all select lists
	$.each(allSelects, function(index, value) {
		var selectId = $(value).attr('id');
		var parent = $(value).parent();
		var selLength = value.length;

		var listLength = [];
		var i = 2;

		//create array with length of select list
		while (i < selLength) {
			listLength.push(i);
			i++
		}


		var randomOption = listLength[Math.floor(Math.random()*listLength.length)];

		//label is current select's label to lowercase
		var label = $('label[for="' + selectId + '"]').text().toLowerCase();

		if (typeof selectId != 'undefined' && $(value).is(":visible")) {
			if (label.indexOf("citizenship") > -1) {

				$('#'+ selectId + ' :nth-child(2)').prop('selected', true);

			} else if (label.indexOf("start") > -1 && label.indexOf("date") > -1) {
				console.log(value[randomOption]);
				//select month from dropdown
				$(value).val(value[randomOption]);
				$(value).next().next().val(2000);

			} else if (label.indexOf("end") > -1 && label.indexOf("date") > -1) {
				//select month from dropdown
				$('#'+ selectId + ' :nth-child('+ randomOption.toString() +')').prop('selected', true);
				$(value).next().next().val(2002);

			}  else if (selectId.indexOf("month") > -1 && $(parent).find(':input').length === 3) {
				//select month from dropdown
				$('#'+ selectId + ' :nth-child('+ randomOption.toString() +')').prop('selected', true);
				//enter random day of month into input
				$(value).next().next().val(faker.date.recent().getDay());
				//conditional statement for year
				if (label.indexOf("birth") > -1) {
					var year = 1986;
				} else if (label.indexOf("valid") > -1 || label.indexOf("expiration") > -1) {
					var year = 2020;
				}

				$(value).next().next().next().next().val(year);

			} else if ($(value).val() === "") {
				//select random option from select list
				$('#'+ selectId + ' :nth-child('+ randomOption.toString() +')').prop('selected', true);
			}

		}

	});

	//end all select lists
});//end of self.port.on