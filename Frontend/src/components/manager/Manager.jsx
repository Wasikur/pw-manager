import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPasswordArray(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ref = useRef();
  const pwRef = useRef();
  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      pwRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      pwRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to save password");
      }
      await response.json();
      toast.success("Password saved successfully");
      setForm({ site: "", username: "", password: "" });
      fetchData(); // Fetch updated data after saving
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Error saving password");
    }
  };

  const deleteEntry = async (id) => {
    try {
      const confirmation = window.confirm(
        "Do you really want to delete the entry?"
      );
      if (!confirmation) return;
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete password");
      }
      await response.json();
      toast.success("Password deleted successfully");
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error("Error deleting password");
    }
  };

  const editEntry = (id) => {
    const entry = passwordArray.find((item) => item._id === id);
    if (entry) {
      setForm(entry);
      deleteEntry(id);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        toast.error("Could not copy text to clipboard");
      });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:p-0 md:mycontainer min-h-[87.3vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP / &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Passowrd Manager
        </p>
        <div className="text-black flex flex-col p-12 gap-8 items-center ">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1 "
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            id="site"
            placeholder="Website URL/ Name "
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="UserName"
              value={form.username}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 mr-12 py-1 "
                ref={pwRef}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            className="flex  justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border border-green-900"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 px-4">Your Passwords</h2>

          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto px-4">
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-green-800 text-white ">
                  <tr>
                    <th className="py-2">Website</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center align-middle w-32">
                          <div className="flex items-center justify-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="ml-2"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: 20,
                                  cursor: "pointer",
                                  paddingTop: 3,
                                }}
                                src="https://cdn.lordicon.com/xpgofwru.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center w-32">
                          <div className="flex items-center justify-center">
                            {item.username}
                            <div
                              className="ml-2"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: 20,
                                  cursor: "pointer",
                                  paddingTop: 3,
                                }}
                                src="https://cdn.lordicon.com/xpgofwru.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center w-32">
                          <div className="flex items-center justify-center">
                            {item.password}
                            <div
                              className="ml-2"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: 20,
                                  cursor: "pointer",
                                  paddingTop: 3,
                                }}
                                src="https://cdn.lordicon.com/xpgofwru.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center w-32">
                          <div className="flex items-center justify-center">
                            <div
                              className="mx-2"
                              onClick={() => {
                                editEntry(item._id);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: 20,
                                  cursor: "pointer",
                                  paddingTop: 3,
                                }}
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                            <div
                              className="mx-2"
                              onClick={() => deleteEntry(item._id)}
                            >
                              <lord-icon
                                style={{
                                  width: 20,
                                  cursor: "pointer",
                                  paddingTop: 3,
                                }}
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
