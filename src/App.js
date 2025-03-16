import React, { useEffect, useState } from "react";
import bar from "./assets/par.png";
import logo from "./assets/LOGO.png";
import years from "./assets/year.svg";
import vector from "./assets/Vector.png";
import workshops from "./assets/workshop.png";
import "./App.css";
import LinkExpiredPage from "./closeForm/LinkExpiredPage";
import {Lock} from "lucide-react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationalId: "",
    college: "",
    major: "",
    graduationYear: "",
    participation: "",
    firstPreference: "",
    secondPreference: "",
    competitionChoice: "",
    reason: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [sucsess, setSucsess] = useState("");
  const [formIsEnded, setFormIsEnded] = useState(false);

  const validateForm = (data) => {
    const validationErrors = {};

    if (!data.fullName.trim()) {
      validationErrors.fullName = "Full name is required.";
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "A valid email is required.";
    }

    if (!data.phoneNumber || !/^\d{11,12}$/.test(data.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 11 to 12 digits.";
    }

    if (!data.nationalId || !/^\d{14}$/.test(data.nationalId)) {
      validationErrors.nationalId = "National ID must be exactly 14 digits.";
    }

    if (!data.college.trim()) {
      validationErrors.college = "College is required.";
    }

    if (!data.major.trim()) {
      validationErrors.major = "Major is required.";
    }

    if (
      !data.graduationYear ||
      !/^\d{4}$/.test(data.graduationYear) ||
      parseInt(data.graduationYear) < 1900
    ) {
      validationErrors.graduationYear = "Graduation year is invalid.";
    }

    if (!["competition", "workshops"].includes(data.participation)) {
      validationErrors.participation =
        "Participation must be either 'competition' or 'workshops'.";
    }

    if (data.participation === "workshops") {
      if (!data.firstPreference) {
        validationErrors.firstPreference = "First preference is required.";
      }

      if (!data.secondPreference) {
        validationErrors.secondPreference = "Second preference is required.";
      } else if (data.secondPreference === data.firstPreference) {
        validationErrors.secondPreference =
          "First and second preferences must be different.";
      }
    }

    if (data.participation === "competition" && !data.competitionChoice) {
      validationErrors.competitionChoice = "Competition choice is required.";
    }

    if (!data.reason.trim()) {
      validationErrors.reason = "Reason is required.";
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
        const response = await fetch("https://stp-org.software/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form submitted successfully", formData);
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            nationalId: "",
            college: "",
            major: "",
            graduationYear: "",
            participation: "",
            firstPreference: "",
            secondPreference: "",
            competitionChoice: "",
            reason: "",
            comment: "",
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
          <header className='  md:w-1/2 w-[95%] mx-auto border-black border-4 rounded-xl  '>
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
                          name='fullName'
                          value={formData.fullName}
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
                            name='nationalId'
                            value={formData.nationalId}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            placeholder='National ID'
                            required
                          />
                          {errors.nationalId && (
                            <p className='text-red-500 text-sm'>
                              {errors.nationalId}
                            </p>
                          )}
                        </div>

                        <div className='flex flex-col'>
                          <label className='leading-loose mb-2 '>
                            College*
                          </label>
                          <input
                            type='text'
                            name='college'
                            value={formData.college}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            placeholder='College'
                            required
                          />
                        </div>

                        <div className='flex flex-col'>
                          <label className='leading-loose mb-2 '>Major*</label>
                          <input
                            type='text'
                            name='major'
                            value={formData.major}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            placeholder='Major'
                            required
                          />
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>
                          Graduation Year*
                        </label>
                        <select
                          name='graduationYear'
                          value={formData.graduationYear}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          required
                        >
                          <option value=''>Select Year</option>
                          {[...Array(5)].map((_, i) => (
                            <option key={i} value={2024 + i}>
                              {2024 + i}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='flex flex-col '>
                        <label className='leading-loose mb-2 mt-8 text-gray-800 font-semibold'>
                          Want to Participate in:
                        </label>
                        <div className='flex gap-8 mx-auto flex-wrap '>
                          <div className='flex-1 '>
                            <label className=' flex flex-col  '>
                              <input
                                type='radio'
                                name='participation'
                                value='competition'
                                checked={
                                  formData.participation === "competition"
                                }
                                onChange={handleChange}
                                className='sr-only'
                              />
                              <div
                                className={`flex flex-col items-center justify-center p-8  rounded-lg cursor-pointer transition-colors bg-white shadow-md  ${
                                  formData.participation === "competition"
                                    ? " border-2 border-accent"
                                    : " "
                                }`}
                              >
                                <div className='w-8  '>
                                  <img
                                    src={vector}
                                    alt='vector'
                                    className='w-8 h-8'
                                  />
                                </div>
                              </div>
                              <span
                                className={`font-medium inline-block mx-auto mt-2 text-primary `}
                              >
                                Competitions
                              </span>
                            </label>
                          </div>

                          <div className='flex-1 '>
                            <label className=' flex flex-col '>
                              <input
                                type='radio'
                                name='participation'
                                value='workshops'
                                disabled
                                checked={formData.participation === "workshops"}
                                onChange={handleChange}
                                className='sr-only'
                              />
                              <div
                                className={`flex flex-col items-center justify-center p-8  rounded-lg  transition-colors bg-white shadow-md relative ${
                                  formData.participation === "workshops"
                                    ? "border-2 border-accent"
                                    : ""
                                }`}
                              >
                                <div className='w-8 '>
                                  <img
                                    src={workshops}
                                    alt='workshops'
                                    className='w-8 h-8 invisible '
                                  />
                                </div>
                                <div className='bg-black/75 flex flex-col gap-4  items-center  rounded-md w-full h-full text-sm font-bold  absolute text-secondary'>
                                  <span className='mt-2'>Completed</span>
                                  <Lock className='font-extrabold' />
                                </div>
                              </div>
                            </label>
                            <span
                              className={`font-medium inline-block mx-auto mt-2  text-primary`}
                            >
                              Workshops
                            </span>
                          </div>
                          {errors.participation && (
                            <p className='text-red-500 text-md'>
                              {errors.participation}
                            </p>
                          )}
                        </div>
                      </div>

                      {formData.participation === "workshops" && (
                        <>
                          <div className='flex flex-col'>
                            <label className='leading-loose mb-2 '>
                              First Preference
                            </label>
                            <select
                              name='firstPreference'
                              value={formData.firstPreference}
                              onChange={handleChange}
                              className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                              required
                            >
                              <option value=''>Select Preference</option>
                              <option value='Python'>Python</option>
                              <option value='Machine learning'>
                                Machine learning
                              </option>
                              <option value='Ansys'>Ansys</option>
                              <option value='Solidworks'>Solidworks</option>
                              <option value='Graphic design'>
                                Graphic design
                              </option>
                              <option value='Montage'>Montage</option>
                            </select>
                          </div>
                          <div className='flex flex-col'>
                            <label className='leading-loose mb-2 '>
                              Second Preference
                            </label>
                            <select
                              name='secondPreference'
                              value={formData.secondPreference}
                              onChange={handleChange}
                              className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                              required
                            >
                              <option value=''>Select Preference</option>
                              <option value='Python'>Python</option>
                              <option value='Machine learning'>
                                Machine learning
                              </option>
                              <option value='Ansys'>Ansys</option>
                              <option value='Solidworks'>Solidworks</option>
                              <option value='Graphic design'>
                                Graphic design
                              </option>
                              <option value='Montage'>Montage</option>
                            </select>
                            {errors.secondPreference && (
                              <p className='text-red-500 text-sm'>
                                {errors.secondPreference}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      {formData.participation === "competition" && (
                        <div className='flex flex-col'>
                          <label className='leading-loose mb-2 '>
                            Competitions
                          </label>
                          <select
                            name='competitionChoice'
                            value={formData.competitionChoice}
                            onChange={handleChange}
                            className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                            required
                          >
                            <option value=''>Select Competition</option>
                            <option value='Prescription Digitization'>
                              Prescription Digitization
                            </option>
                            <option value='RoboQuest'>RoboQuest</option>
                          </select>
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>
                          Why do you want to Participate in this
                          Workshop/Competition?
                        </label>
                        <textarea
                          name='reason'
                          value={formData.reason}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          rows='2'
                          placeholder='Your reason'
                          required
                        ></textarea>
                      </div>
                      <div className='flex flex-col'>
                        <label className='leading-loose mb-2 '>
                          Any Comment or Question
                        </label>
                        <textarea
                          name='comment'
                          value={formData.comment}
                          onChange={handleChange}
                          className='px-4 py-2 border focus:ring-gray-500 font-medium focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                          rows='2'
                          placeholder='Your comment or question'
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
