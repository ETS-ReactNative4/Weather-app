import React from "react";

import claudy from "../Assests/img/day.claudy.svg";
import nightclaudy from "../Assests/img/night.claudy.svg";
import clear from "../Assests/img/day.clear.svg";
import rain from "../Assests/img/day.rain.svg";
import night from "../Assests/img/night.clear.svg";

import liteclaudy from "../Assests/img/lite.day.claudy.svg";
import litenightclaudy from "../Assests/img/lite.night.claudy.svg";
import liteclear from "../Assests/img/lite.day.clear.svg";
import literain from "../Assests/img/lite.day.rain.svg";
import litenight from "../Assests/img/lite.night.clear.svg";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

function Home() {
  let search = "toshkent";
  const [state, useState] = React.useState("");
  let imgg = clear;
  let liteimg = liteclear;

  function dayOfTheWeek(year, moth, day) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[new Date(year, moth, day).getDay()];
  }

  function Year(datas) {
    const y = Number(datas.substr(0, 4));
    return y;
  }

  function Mout(datas) {
    const m = Number(datas.substr(5, 2));
    return m;
  }

  function Day(datas) {
    const d = Number(datas.substr(8, 2));
    return d;
  }

  function searchs() {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=266dfd511fd1453295a135131220402&q=${search}&days=5&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((data) => {
        const date = data.location.localtime;
        const date1 = data.forecast.forecastday[1].date;
        const date2 = data.forecast.forecastday[2].date;
        const time = date.substr(11);

        const dataa = [
          {
            name: "",
            Temperatura: data.forecast.forecastday[0].day.avgtemp_c,
          },
          {
            name: "Today",
            Temperatura: data.current.temp_c,
          },
          {
            name: dayOfTheWeek(Year(date1), Mout(date1) - 1, Day(date1)),
            Temperatura: data.forecast.forecastday[1].day.avgtemp_c,
          },
          {
            name: dayOfTheWeek(Year(date1), Mout(date2) - 1, Day(date2)),
            Temperatura: data.forecast.forecastday[2].day.avgtemp_c,
          },
          {
            name: dayOfTheWeek(Year(date1), Mout(date2) - 1, Day(date2) + 1),
            Temperatura: data.forecast.forecastday[2].day.avgtemp_c - 1,
          },
          {
            name: "",
            Temperatura: data.forecast.forecastday[2].day.avgtemp_c,
          },
        ];

        const code = data.current.condition.code;
        if (code === 1000) {
          imgg = clear;
          liteimg = liteclear;
          if (!data.current.is_day) {
            imgg = night;
            liteimg = litenight;
          }
        } else if (
          code === 1003 ||
          code === 1006 ||
          code === 1009 ||
          code === 1030 ||
          code === 1069 ||
          code === 1087 ||
          code === 1135 ||
          code === 1276 ||
          code === 1279 ||
          code === 1282
        ) {
          imgg = claudy;
          liteimg = liteclaudy;
          if (!data.current.is_day) {
            imgg = nightclaudy;
            liteimg = litenightclaudy;
          }
        } else if (
          code === 1063 ||
          code === 1069 ||
          code === 1072 ||
          code === 1150 ||
          code === 1153 ||
          code === 1180 ||
          code === 1183 ||
          code === 1186 ||
          code === 1192 ||
          code === 1195 ||
          code === 1204 ||
          code === 1240 ||
          code === 1243 ||
          code === 1246 ||
          code === 1249 ||
          code === 1252
        ) {
          imgg = rain;
          liteimg = literain;
        }

        let item = (
          <div className="container home__container">
            <div className="home__left">
              <div className="home__left-input">
                <h3 className="home__left-title">Your citiy</h3>
                <input
                  type="text"
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      search = e.target.value;
                      searchs();
                    }
                  }}
                  placeholder="Search location..."
                />
              </div>

              <p className="home__data">
                {time} -{" "}
                {`${dayOfTheWeek(Year(date), Mout(date) - 1, Day(date))} ${Day(
                  date
                )}/ ${Mout(date)}/ ${Year(date)}`}
              </p>

              <div className="home__left-cloud">
                <img src={imgg} alt="" width="160" />
                <h1 className="home__left-cloud-title">
                  {data.current.temp_c}°
                </h1>
              </div>

              <h2 className="home__left-desc">{data.current.condition.text}</h2>
              <div className="home__left-det">
                <div className="home__left-detIt">
                  <h3>Humidity</h3>
                  <p>{data.current.humidity}%</p>
                </div>
                <div className="home__left-detIt">
                  <h3>Wind speed</h3>
                  <p>{data.current.wind_kph} km/h</p>
                </div>
              </div>
            </div>

            <div id="home__right">
              <h2 className="home__right-title">{data.location.name}</h2>

              <div className="home__right-chart">
                <p className="home__right-chart-desc">Temperatura C°</p>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart
                    width="100%"
                    height="100%"
                    data={dataa}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis /> */}
                    {/* <Tooltip name="name" /> */}
                    <Area
                      type="monotone"
                      dataKey="Temperatura"
                      stroke="rgb(62, 134, 241)"
                      fill="rgb(139, 176, 233)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="home__right-list">
                <div className="home__right-item blue">
                  <p className="home__right-title1">Today</p>
                  <img src={liteimg} alt="" width="50" height="50" />
                  <p className="home__right-desc">Humidity</p>
                  <p className="home__right-desc1">
                    {data.forecast.forecastday[0].day.avghumidity} %
                  </p>
                </div>
                <div className="home__right-item">
                  <p className="home__right-title">
                    {dayOfTheWeek(Year(date1), Mout(date1) - 1, Day(date1))}
                  </p>
                  <img src={imgg} alt="" width="50" height="50" />
                  <p className="home__right-desc">Humidity</p>
                  <p className="home__right-desc1">
                    {data.forecast.forecastday[1].day.avghumidity} %
                  </p>
                </div>
                <div className="home__right-item">
                  <p className="home__right-title">
                    {dayOfTheWeek(Year(date2), Mout(date2) - 1, Day(date2))}
                  </p>
                  <img src={imgg} alt="" width="50" height="50" />
                  <p className="home__right-desc">Humidity</p>
                  <p className="home__right-desc1">
                    {data.forecast.forecastday[2].day.avghumidity} %
                  </p>
                </div>
                <div className="home__right-item">
                  <p className="home__right-title">
                    {dayOfTheWeek(Year(date2), Mout(date2) - 1, Day(date2) + 1)}
                  </p>
                  <img src={imgg} alt="" width="50" height="50" />
                  <p className="home__right-desc">Humidity</p>
                  <p className="home__right-desc1">
                    {data.forecast.forecastday[2].day.avghumidity} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

        useState(item);
      })
      .catch(() => {
        alert("City not found, please try again");
      });
  }

  React.useEffect((e) => {
    searchs();
  }, []);

  return <div className="home">{state}</div>;
}

export default Home;
