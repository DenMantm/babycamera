$("#b_refresh_temperature").click(function(){
    $.ajax({url: "/temperature", success: function(result){
    	console.log(result);
        $("#val_temperature").html(result.TemperatureC+"C");
		$("#val_humidity").html(result.HumidityPercent+"%");
        
    }});
});
