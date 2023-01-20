import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_HOST = import.meta.env.VITE_API_HOST;
  const URL = import.meta.env.VITE_API_URL;
  const [getData, setData] = useState(0);
  const [loader, setLoader] = useState(false);
  const [userDetails, getUserDetails] = useState({
    number: "",
    country: "IN",
  });
  const onChangeHandler = (e) => {
    getUserDetails({
      number: e.target.value,
      country: "IN",
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (userDetails.number.length < 10) {
      alert("Enter a valid number");
      return;
    }
    setLoader(true);
    const res = await axios.get(URL, {
      params: { number: userDetails.number, country: userDetails.country },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });
    if (res.status === 200) {
      setData(res.data);
      setLoader(false);
    } else {
      alert("No data found! Check your number!");
    }
  };
  const hideTheDetails = (e) => {
    e.preventDefault();
    setData(false);
    getUserDetails({
      number: ""
    });
  }
  return (
    <>
      <div>
        <h1 className="text-2xl text-center mt-10">
          Mobile Number Verification
        </h1>
        <div>
          <form method="GET">
            <div className="flex flex-col items-center mt-10">
              <label htmlFor="mobileNumber" className="text-xl">
                Mobile Number
              </label>
              <input
                type="text"
                maxLength="10"
                name="mobileNumber"
                id="mobileNumber"
                className="border-2 border-black rounded-md p-2 mt-2"
                value={userDetails.number}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col items-center mt-10">
              {loader && <Loader />}
              {!loader && (
                <button
                  onClick={onSubmitHandler}
                  type="Submit"
                  className="bg-blue-500 text-white rounded-md p-2"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          <div>
            {getData &&  <div className="flex flex-col items-center mt-10">
                <span className="text-xl">Number: {getData.nationalNumber}</span>
                <span className="text-xl">Country Code: {getData.countryCode}</span>
                <span className="text-xl">Carrier: {getData.carrier}</span>
                <span className="text-xl">Location: {getData.location}</span>
                <span className="text-xl">Number is Vaild: {getData.isValidNumber ? "Number is Valid": "Number is invalid"}</span>
                <button onClick={hideTheDetails} type="reset" className="bg-red-400 text-white px-4 py-3 my-5 rounded font-mono" >
                  Reset
                </button>
              </div>
                }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
