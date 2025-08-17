// app/api/employee/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Employee from "@/lib/model/Employee";

//  CREATE new employee (POST)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newEmployee = await Employee.create(body);
    await newEmployee.save();

    return NextResponse.json({ success: true, data: newEmployee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// ✅ GET all employees (GET)
export async function GET() {
  try {
    await dbConnect();
    const employees = await Employee.find();
    return NextResponse.json({ success: true, data: employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

//  UPDATE employee (PUT)
export async function PUT(req) {
  try {
    await dbConnect();
    const { id, ...updates } = await req.json();

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedEmployee }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE employee (DELETE)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedEmployee }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
