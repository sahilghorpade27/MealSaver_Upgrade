import React, { useEffect, useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/institutes");
        setInstitutes(res.data);
      } catch (err) {
        console.error("❌ Failed to load institutes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      {loading ? (
        <p>Loading institutes...</p>
      ) : (
        <form className="space-y-4">
          <div>
            <label htmlFor="institute" className="block mb-1 font-medium">
              Select Institute
            </label>
            <select id="institute" className="border p-2 w-full">
              {institutes.map((inst) => (
                <option key={inst._id} value={inst.code}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="border p-2 w-full" required />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input type="password" className="border p-2 w-full" required />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
