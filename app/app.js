"use strict";


const deviceID = new Date().getTime();

$(function(){
	$("#btn").click(function() {
		const score = $("#score").val()
		$.post("/api/ranking", { deviceID: deviceID, points: score})
		.done(function( data ) {
			alert( "Rank is: " + data.ranking );
		});
	});
});

