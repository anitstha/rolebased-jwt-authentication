import React, { useState } from "react";

const CreateSchoolForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    schoolAddress: "",
  });
  const [logo, setLogo] = useState(null);

  // handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //handleLogo function
  const handleLogo = (e) => {
    setLogo(e.target.files[0]); // store the first selected file
  };

  // handleCreateSchool function
  const handleCreateSchool = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("subdomain", formData.subdomain);
    data.append("schoolAddress", formData.schoolAddress);
    if (logo) {
      data.append("logo", logo);
    }

    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const response = await fetch(
        "http://91.108.111.41:8082/api/super-admin/create/school",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create school");
      }

      const result = await response.json();
      console.log("School created:", result);
      alert("School created successfully!");
      setFormData({ name: "", subdomain: "", schoolAddress: "" });
      setLogo(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleCreateSchool}
        className="flex flex-col gap-4 p-8 bg-gray-100 rounded"
      >
        <input
          type="text"
          name="name"
          placeholder="School Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-4"
        />

        <input
          type="text"
          name="subdomain"
          placeholder="Sub Domain"
          value={formData.subdomain}
          onChange={handleChange}
          className="border p-4"
        />

        <input
          type="text"
          name="schoolAddress"
          placeholder="School Address"
          value={formData.schoolAddress}
          onChange={handleChange}
          className="border p-4"
        />

        <input
          type="file"
          name="logo"
          onChange={handleLogo}
          className="border p-2 bg-red-200"
        />

        <button
          type="submit"
          className="bg-green-600 py-2 text-white font-bold"
        >
          Create School
        </button>
      </form>
    </div>
  );
};

export default CreateSchoolForm;
