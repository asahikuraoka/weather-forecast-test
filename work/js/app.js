document.addEventListener("DOMContentLoaded", function () {
  const citySelect = document.getElementById("city-select");
  const getWeatherButton = document.getElementById("get-weather");

  getWeatherButton.addEventListener("click", async function () {
    const selectedCity = citySelect.value;

    if (!selectedCity) {
      alert("都市を選択してください");
      return;
    }

    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${selectedCity}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("ネットワークエラーが発生しました");
      }
      const data = await response.json();
      displayWeatherData(data);
    } catch (error) {
      console.error(error);
      alert("天気データの取得に失敗しました");
    }
  });

  function displayWeatherData(data) {
    console.log(data);

    document.getElementById("publishingOffice").children[1].textContent = data[0].publishingOffice;


    document.getElementById("reportDatetime").children[1].textContent = data[0].reportDatetime;


    document.getElementById("targetArea").children[1].textContent = data[0].timeSeries[0].areas[0].area.name;


    const todayWeather = data[0].timeSeries[0].areas[0].weathers[0];
    if (todayWeather) {
      document.getElementById("today").children[1].textContent = todayWeather;
    } else {
      document.getElementById("today").children[1].textContent = "データなし";
    }


    const tomorrowWeather = data[0].timeSeries[0].areas[0].weathers[1];
    if (tomorrowWeather) {
      document.getElementById("tomorrow").children[1].textContent = tomorrowWeather;
    } else {
      document.getElementById("tomorrow").children[1].textContent = "データなし";
    }


    const dayAfterTomorrowWeather = data[0].timeSeries[0].areas[0].weathers[2];
    if (dayAfterTomorrowWeather) {
      document.getElementById("dayAfterTomorrow").children[1].textContent = dayAfterTomorrowWeather;
    } else {
      document.getElementById("dayAfterTomorrow").children[1].textContent = "データなし";
    }


    const tempInfo = data[1].tempAverage.areas[0];
    if (tempInfo) {

      document.getElementById("todayHighTemperature").children[1].textContent = tempInfo.max + "℃";

      document.getElementById("todayLowTemperature").children[1].textContent = tempInfo.min + "℃";
    } else {
      document.getElementById("todayHighTemperature").children[1].textContent = "データなし";
      document.getElementById("todayLowTemperature").children[1].textContent = "データなし";
    }
  }
});