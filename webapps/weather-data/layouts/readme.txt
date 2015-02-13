Example weather layout required items:
---------------------------------------
DateTime ObservationTime    "[%1$td.%1$tm.%1$tY %1$tH:%1$tM]" {weather="locationId=..., type=condition, property=observationTime"}

Number   Pressure 		{weather="locationId=..., type=athmosphere, property=pressure, scale=1"}
Number   Current_Temp {weather="locationId=..., type=temperature, property=current, scale=1"}

DateTime Forecast_Day_1  "[%1$tA]" {weather="locationId=..., forecast=1, type=condition, property=observationTime"}
DateTime Forecast_Day_2  "[%1$tA]" {weather="locationId=..., forecast=2, type=condition, property=observationTime"}

Number   Temp_Max_0   {weather="locationId=..., forecast=0, type=temperature, property=max, scale=0"}
Number   Temp_Max_1		{weather="locationId=..., forecast=1, type=temperature, property=max, scale=0"}
Number   Temp_Max_2		{weather="locationId=..., forecast=2, type=temperature, property=max, scale=0"}

Number   Temp_Min_0		{weather="locationId=..., forecast=0, type=temperature, property=min, scale=0"}
Number   Temp_Min_1		{weather="locationId=..., forecast=1, type=temperature, property=min, scale=0"}
Number   Temp_Min_2		{weather="locationId=..., forecast=2, type=temperature, property=min, scale=0"}


Display
-------
Either call it directly
http://YOUR_SERVER:8080/weather?locationId=...&layout=example&iconset=colorful

or with a sitemap:
Webview url="/weather?locationId=...&layout=example&iconset=colorful" height=7
