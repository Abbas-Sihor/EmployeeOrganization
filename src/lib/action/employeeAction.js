"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL || "/";

// CREATE
export async function createEmployee(employeeData) {
  try {
    const res = await fetch(`${baseUrl}api/employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// GET all
export async function getEmployees() {
  try {
    const res = await fetch(`${baseUrl}api/employee`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// UPDATE
export async function updateEmployee(id, updates) {
  try {
    const res = await fetch(`${baseUrl}api/employee`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });

    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// DELETE
export async function deleteEmployee(id) {
  try {
    const res = await fetch(`${baseUrl}api/employee`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}
//EmployeeCount
export async function getEmployeeCount() {
  try {
    const res = await fetch(`${baseUrl}api/employee`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (res.ok && data) {
      return { success: true, count: data.data.length };
    }

    return { success: false, error: "Failed to get employee count" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}