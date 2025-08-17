import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pencil, Trash } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	createEmployee,
	deleteEmployee,
	getEmployees,
	updateEmployee,
} from "@/lib/action/employeeAction";
import { fetchUser } from "@/lib/action/userAction";



const EmployeeTable = () => {
	const [user, setUser] = useState(null);
	const [admin, setAdmin]=useState(false);
	const [employee, setEmployee] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "",
		department: "",
	});
	useEffect(() => {
		
		const id= localStorage.getItem("userId");
		if(!id){
			window.location.href = "/login";
			return;
		}
		const fetchEmployees = async () => {
			try {
				const response = await getEmployees();
				if (response.success) {
					setEmployee(response.data);
				} else {
					console.error("Failed to fetch employees:", response.error);
				}
			} catch (error) {
				console.error("Error fetching employees:", error);
			}
		};
		const getUser = async () => {
			try {
				const response = await fetchUser(id);
				if (response.success) {
					console.log("User Data:", response.data);
					setUser(response.data)
				} else {
					console.error("Failed to fetch user:", response.error);
				}
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};
		
		getUser();
		fetchEmployees();
		
	}, []);

useEffect(() => {
  if (user?.role === "admin") {
    setAdmin(true);
  } else {
    setAdmin(false);
  }
}, [user]); 

const handleExport = () => {
  if (!employee || employee.length === 0) {
    alert("No employee data to export");
    return;
  }

  const headers = ["Name", "Email", "Role", "Department", "Status"];


  const rows = employee.map(emp => [
    emp.name,
    emp.email,
    emp.role,
    emp.department,
    emp.status,
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(item => `"${item}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "employees.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
	const handleChange = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};
	const handleEdit = (employee) => {
		setSelectedEmployee(employee);
		setForm({
			name: employee.name,
			email: employee.email,
			role: employee.role,
			department: employee.department,
		});
	};
	const handleSave = async () => {
		if (!form.name || !form.email || !form.role || !form.department) {
			alert("All fields are required");
			return;
		}
		if (selectedEmployee) {
			
			const response = await updateEmployee(selectedEmployee._id, form);
			if (response.success) {
				setEmployee((prev) =>
					prev.map((emp) =>
						emp._id === selectedEmployee._id ? response.data : emp
					)
				);
				setSelectedEmployee(null);
				setForm({ name: "", email: "", role: "", department: "" });
			} else {
				console.error("Failed to update employee:", response.error);
			}
		} else {
			const response = await createEmployee(form);
			console.log(response);
			if (response.success) {
				setEmployee((prev) => [...prev, response.data]);
				setForm({
					name: "",
					email: "",
					role: "",
					department: "",
				});
			} else {
				console.error("Failed to create employee:", response.error);
			}
		}
	};
	const onDelete = async (id) => {
		const response = await deleteEmployee(id);
		if (response.success) {
			setEmployee((prev) => prev.filter((emp) => emp._id !== id));
		} else {
			console.error("Failed to delete employee:", response.error);
		}
	};
	const handleDialog = () => {
		return (
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="font-semibold text-[22px] text-brandBlue">
						Add New Employee
					</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new employee to the system.
					</DialogDescription>
				</DialogHeader>

				{/* Form */}
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							placeholder="Enter name"
							className="col-span-3"
							value={form.name}
							onChange={(e) => handleChange("name", e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							placeholder="example@domain.com"
							className="col-span-3"
							value={form.email}
							onChange={(e) => handleChange("email", e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<Select
							onValueChange={(val) => handleChange("role", val)}
							value={form.role}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Developer">Developer</SelectItem>
								<SelectItem value="Designer">Designer</SelectItem>
								<SelectItem value="Manager">Manager</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="department" className="text-right">
							Department
						</Label>
						<Select
							onValueChange={(val) => handleChange("department", val)}
							value={form.department}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select department" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="IT">IT</SelectItem>
								<SelectItem value="HR">HR</SelectItem>
								<SelectItem value="Finance">Finance</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Submit Button */}
				<Button onClick={handleSave} className="bg-brandBlue text-white">
					Save Employee
				</Button>
			</DialogContent>
		);
	};
	return (
		<div className="px-8 py-16 ">
			{/* Top bar */}
			<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
				<h3 className="text-brandBlue font-bold text-3xl">Employees</h3>

				{admin&&<div className="flex flex-wrap gap-4 items-center  justify-end min-w-[150px]">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-brandBlue w-[165px] h-[40px] text-white">
								Add an employee
							</Button>
						</DialogTrigger>

						{handleDialog()}
					</Dialog>

					<Input
						placeholder="Search employees"
						className="flex-1 min-w-[150px]"
					/>

					<Button onClick={handleExport} className="bg-brandBlue h-[40px] text-white">Export</Button>
				</div>}
			</div>

			{/* Table */}
			<div className="w-full overflow-x-auto border rounded-lg">
				{employee.length == 0 ? (
					<p className="font-bold text-brandRed">No Data To Show</p>
				) : (
					<table className="w-full table-auto divide-y divide-gray-200 ">
						<thead className="bg-gray-100">
							<tr>
								{[
									"Name",
									"Email",
									"Role",
									"Department",
									"Status",
									"Actions",
								].map((header) => (
									<th
										key={header}
										className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{employee.length == 0 ? (
								<p className="self-center font-bold">No data To Show</p>
							) : (
								employee.map((emp, idx) => (
									<tr key={idx} className="hover:bg-gray-50">
										<td className="px-6 py-4">{emp.name}</td>
										<td className="px-6 py-4">{emp.email}</td>
										<td className="px-6 py-4">{emp.role}</td>
										<td className="px-6 py-4">{emp.department}</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
													emp.status === "Active"
														? "bg-green-500"
														: "bg-red-500"
												}`}
											>
												{emp.status}
											</span>
										</td>
										{admin&&<td className="px-6 py-4 flex gap-2">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														className="p-2 bg-gray-400 hover:bg-gray-300"
														onClick={() => handleEdit(emp)}
													>
														<Pencil size={16} />
													</Button>
												</DialogTrigger>
												{handleDialog()}
											</Dialog>

											<Button
												className="p-2 bg-gray-400 hover:bg-gray-300"
												onClick={() => onDelete(emp._id)}
											>
												<Trash size={16} />
											</Button>
										</td>}
									</tr>
								))
							)}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default EmployeeTable;
