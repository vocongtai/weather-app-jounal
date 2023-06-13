
/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "bec6a2448f05fd878d18c1159a5a0cd7";

//get value Zip code
const zip = document.getElementById("zip");

//get content value
const feelings = document.getElementById("feelings");

//get date element
const date = document.getElementById("date");

//get temp
const temp = document.getElementById("temp");

//get content entry
const errorContent = document.getElementById("error");

//get content
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Get METHOD API
const getDataWeather = async (url) => {
  const response = await fetch(url);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

//POST METHOD API
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const newData = async (data) => {
  try {
    if (data.cod != 200) {
      return data;
    }
    const dataNew = {
      date: newDate,
      temp: data.main.temp,
      content: feelings.value,
    };
    return dataNew;
  } catch (error) {
    console.log(error);
  }
};

const reData = async (url) => {
  const res = await fetch(url);
  try {
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Show Weather Inforation:
const showWeather = async (data) => {
  if (Object.keys(data).length > 0) {
    if (
      data.date !== undefined &&
      data.temp !== undefined &&
      data.content !== undefined
    ) {
      zip.value = "";
      feelings.value = "";
      date.innerHTML = data.date;
      temp.innerHTML = data.temp + " degree ";
      content.innerHTML = data.content;
      errorContent.innerHTML = "";
    }
  } else {
    zip.value = "";
    feelings.value = "";
    date.innerHTML = "";
    temp.innerHTML = "";
    content.innerHTML = "";
    errorContent.innerHTML = "Invalid zip code";
  }
};

//ADD EVENTLISTENER
const submitButton = document.getElementById("generate");
submitButton.addEventListener("click", () => {
  submitGenerateHandle();
});

const submitGenerateHandle = () => {
  //url
  const requestAPIURL = `${baseURL}?zip=${zip.value}&appid=${APIKey}`;
  if (zip.value !== "") {
    getDataWeather(requestAPIURL).then((data) => {
      newData(data).then((info) => {
        //call /add to server
        // console.log(info);
        postData("/add", info).then((dataInfo) => {
          //call all to server
          console.log(dataInfo);
          reData("/all", dataInfo).then((info) => {
            //Update UI
            // console.log(info);
            showWeather(info);
          });
        });
      });
    });
  }
};
