import React, { useEffect, useState } from "react";
import bar from "./assets/A-02.svg";
import logo from "./assets/LOGO.png";
import years from "./assets/year.svg";
import "./App.css";
import LinkExpiredPage from "./closeForm/LinkExpiredPage";

function App() {
  const [formData, setFormData] = useState({
    SSN: "",
    name: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [sucsess, setSucsess] = useState("");
  const [formIsEnded, setFormIsEnded] = useState(false);

  const validateForm = (data) => {
    const validationErrors = {};

    if (!data.name.trim()) {
      validationErrors.name = "Full name is required.";
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "A valid email is required.";
    }

    if (!data.phoneNumber || !/^\d{11,12}$/.test(data.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 11 to 12 digits.";
    }

    if (!data.SSN || !/^\d{14}$/.test(data.SSN)) {
      validationErrors.SSN = "National ID must be exactly 14 digits.";
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSucsess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          "https://stp-org.software/api/attendence/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          console.log("Form submitted successfully", formData);
          setFormData({
            SSN: "",
            name: "",
            email: "",
            phoneNumber: "",
            comments: "",
          });
          setSucsess(true);
        } else {
          const result = await response.json();
          console.error("Error submitting form:", result.errors);
          setErrors({
            submission: "National ID, phone number or email is already used.",
          });
          setSucsess(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({
          submission: "National ID, phone number or email is already used..",
        });
        setSucsess(false);
      }
    } else {
      console.log("Validation failed", validationErrors);
      setSucsess(false);
    }
  };

  return (
    <div className='bg-primary font-bold h-screen'>
      <div className='md:h-32 h-24 flex justify-between w-11/12   mx-auto items-center '>
        <figure>
          <img src={logo} alt='logo' className='md:w-24 w-14 ' />
        </figure>
        <figure>
          <img src={years} alt='20years' className='md:w-32 w-20 ' />
        </figure>
      </div>
      {!formIsEnded ? (
        <main>
          <header className='  md:w-1/2 w-[95%] mx-auto mb-4  -mt-5   '>
            <figure className='rounded-lg'>
              <img src={bar} alt='bar ' className='rounded-lg' />
            </figure>
          </header>
          <div className='min-h-screen bg-primary  flex flex-col justify-center '>
            <div className='  sm:max-w-xl sm:mx-auto '>
              <div className='px-4  bg-secondary mx-8 mb-8  shadow  sm:px-10'>
                <div className='max-w-md mx-auto'>
                  <div className='flex items-center space-x-5'></div>
                  <form
                    onSubmit={handleSubmit}
                    className='divide-y pb-4 divide-gray-200'
                  >
                    <div className='py-6 text-base  space-y-8 text-gray-700 sm:text-lg sm:leading-7'>
                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>
                          Full Name*
                        </label>
                        <input
                          type='text'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          placeholder='Full Name'
                          required
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>Email*</label>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          placeholder='Email'
                          required
                        />
                      </div>
                      {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                      )}
                      {/* -------------------------------------------------------------------------------------------------------------- */}

                      <div className='grid gap-4 md:grid-cols-2 grid-cols-1 md:space-y-0 space-y-8'>
                        <div className='flex flex-col'>
                          <label className='leading-loose mb-2 '>
                            WhatsApp Number*
                          </label>
                          <input
                            type='tel'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            placeholder='WhatsApp Number'
                            required
                          />
                          {errors.phoneNumber && (
                            <p className='text-red-500 text-sm'>
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>

                        <div className='flex flex-col'>
                          <label className='leading-loose mb-2 '>
                            National ID*
                          </label>
                          <input
                            type='text'
                            name='SSN'
                            value={formData.SSN}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            placeholder='National ID'
                            required
                          />
                          {errors.SSN && (
                            <p className='text-red-500 text-sm'>{errors.SSN}</p>
                          )}
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>
                          Any Comments or Question
                        </label>
                        <textarea
                          name='comments'
                          value={formData.comments}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          rows='2'
                          placeholder='Your comments or question'
                        ></textarea>
                      </div>
                    </div>
                    <div className='pt-4 flex items-center space-x-4'>
                      <button
                        type='submit'
                        className='bg-primary flex justify-center items-center  text-white px-8 py-2 mx-auto rounded-md focus:outline-none hover:bg-[#6B0000] transition-colors'
                      >
                        Submit
                      </button>
                    </div>
                    {errors.submission && (
                      <p className='text-red-500 text-lg text-center'>
                        {errors.submission}
                      </p>
                    )}
                    {sucsess && (
                      <p className='text-green-500 text-md text-center'>
                        form submitted successfully
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <LinkExpiredPage />
      )}
    </div>
  );
}

export default App;
