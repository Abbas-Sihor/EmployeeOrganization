// created user
export async function createUser(userData) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("createUser Error:", error.message);
    return { error: error.message };
  }
}
// Check user
export async function checkUser(loginData) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("checkUser Error:", error.message);
    return { error: error.message };
  }
}
// Fetch user
export const fetchUser = async (id) => {
  try {
    const url = id ? `/api/user?id=${id}` : "/api/user";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch user");
    }

    return data; 
  } catch (err) {
    console.error("Fetch User Error:", err);
    return { error: err.message };
  }
};
//Logout user
export const logoutUser = () => {
  try {
  
    localStorage.removeItem("userId");

    window.location.href = "/login";
  } catch (err) {
    console.error("Logout Error:", err);
  }
};


// Count interns
export const countInterns = async () => {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("API Response:", data);

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch users");
    }

    const interns = Array.isArray(data.data)
      ? data.data.filter((u) => u.role === "intern")
      : [];

    console.log("Interns:", interns);

    return { success: true, count: interns.length };
  } catch (err) {
    console.error("Count Interns Error:", err);
    return { success: false, count: 0, error: err.message };
  }
};


