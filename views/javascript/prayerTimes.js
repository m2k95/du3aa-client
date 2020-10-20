async function getTimings(today) {
	const response = await fetch(`https://api.aladhan.com/timingsByAddress/${today}?address=kuwait,al-asimah&method=9`);
	const data = await response.json();
	if (data.code == 200){
		var Fajr = data.data.timings.Fajr
		var Dhuhr = data.data.timings.Dhuhr
		var Asr = data.data.timings.Asr
		var Maghrib = data.data.timings.Maghrib
		var Isha = data.data.timings.Isha

		return {
			"Fajr": `${reformatDate(Fajr)}`,
			"Dhuhr": `${reformatDate(Dhuhr)}`,
			"Asr": `${reformatDate(Asr)}`,
			"Maghrib": `${reformatDate(Maghrib)}`,
			"Isha": `${reformatDate(Isha)}`
		}
	}
}

function reformatDate(date) {
	h = date.toString().split(':')[0]
	m = date.toString().split(':')[1]
	return parseInt(h) > 12? `${parseInt(h) - 12}:${parseInt(m)} م` : `${parseInt(h)}:${parseInt(m)} ص`
}
