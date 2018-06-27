/*
* @Author: msi-pc
* @Date:   2018-06-26 18:25:17
* @Last Modified by:   msi-pc
* @Last Modified time: 2018-06-27 08:48:46
*/
$(function(){
	let weather;
	$.ajax({
		url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
		 dataType:'jsonp',
		success:function(obj){ 
			weather=obj.data.weather;
			console.log(weather);
			render();
		}
	})


	function render(){
		//城市
		$(".chengshi").html(weather.city_name);
		//度数
		$(".du").html(weather.current_temperature+"°");
		 //天气情况
		$(".yun").html(weather.current_condition);
		//风向等级
		$(".feng").html(weather.wind_direction);
		//湿度
		$("#shidu").html("湿度"+weather.tomorrow_aqi+"%");
		// 今天最高气温和最低气温
		
		
		$(".zi").html(weather.quality_level);
		$(".shu").html(weather.aqi);

		if(weather.aqi>150){
			$(".jiankong").css({"background":"red"});
		}
		else{
			$(".jiankong").css({"background":"yellow"});
		}



		$(".wendu").html(weather.high_temperature
				+"/"+weather.low_temperature+"°")

		// 第二阶段明天天最高气温和最低气温
		$("#wendu1").html(weather.tomorrow_high_temperature
				+"/"+weather.tomorrow_low_temperature+"°");
		// 今天天气
		$(".duoyun").html(weather.dat_condition);
		// 明天天气
		$("#duoyun1").html(weather.tomorrow_dat_condition);
		$(".logg").attr("src",`img/${weather.dat_weather_icon_id}.png`)
		$(".loggg").attr("src",`img/${weather.tomorrow_weather_icon_id}.png`)


		// 第三阶段
		weather.hourly_forecast.forEach(function(e){
			let str=`<li class="item">
				        <p class="tex">${e.hour}:00</p>
				 		<img src="img/${e.weather_icon_id}.png" alt="" class="iconc">
						<p class="pos">${e.temperature}°</p>
					</li>`
			$(".zhong").append(str);
		})



		// 第四阶段
		weather.forecast_list.forEach(function(i){
			console.log(i.date);
			let zifu=i.date.slice(5,7);
			let zifu1=i.date.slice(8);
			console.log(zifu,zifu1);
			let str=`<li class="txt">
						<p class="day">昨天</p>
						<p class="date">${zifu}/${zifu1}</p>
						<div class="datime">
							<p class="weather">${i.condition}</p>
							<img src="img/${i.weather_icon_id}.png" alt="" class="icon">
						</div>
						<div class="datime1">
							<img src="img/${i.weather_icon_id}.png" alt="" class="icon">
							<p class="weather weat1">${i.condition}</p>
						</div>
						<p class="wind">${i.wind_direction}</p>
						<p class="wind">${i.wind_level}级</p>
					</li>`
				$(".bottom").append(str);
			})

	}


})