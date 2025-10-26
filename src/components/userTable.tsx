"use client";

import React from "react";
import RegistrationForm from "./RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCities, setEditingUser, setExpanded, setShowForm, setUsers } from "../store/slice/userSlice";
import masterData from "../data/masterData.json";
import appConfig from "../config/appConfig";

interface Address {
  line1: string;
  line2: string;
  state: string;
  city: string;
  pin: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: string;
  address: Address;
}

const UserTable = () => {
  const { users, showForm, expanded } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(setEditingUser(null));
    dispatch(setShowForm(true));
  };

  const handleEdit = (user: User) => {
    if (!appConfig.features.editEnabled) return;

    const stateData = masterData.states.find(s => s.name === user.address.state);
    dispatch(setEditingUser(user));
    dispatch(setCities(stateData?.cities || []));
    dispatch(setShowForm(true));
  };

  const handleDelete = (id: number) => {
    if (!appConfig.features.deleteEnabled) return;

    if (confirm("Are you sure you want to delete this user?")) {
      const userList = users?.filter((user) => user?.id !== id);
      dispatch(setUsers(userList));
    }
  };

  const toggleExpand = (id: number) => {
    dispatch(setExpanded(id))
  }

  return (
    <div className="p-8 max-w-5xl mx-auto mt-15">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Data Management System</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-700 cursor-pointer"
        >
          ADD
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto bg-white shadow rounded-lg mt-10">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left w-8"></th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">LinkedIn</th>
              <th className="p-3 text-left">Gender</th>
              {(appConfig.features.editEnabled || appConfig.features.deleteEnabled) && (
                <th className="p-3 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={appConfig.features.editEnabled || appConfig.features.deleteEnabled ? 6 : 5}
                  className="p-4 py-25 text-center text-gray-500"
                >
                  No users added yet.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr
                    key={user?.id}
                    className="border-t"
                  >
                    <td className="p-3 py-4">
                      <button
                        onClick={() => toggleExpand(user?.id)
                        }
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {expanded.includes(user.id) ? (
                          <div className="cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </td>
                    <td className="p-3 py-4">{user.name}</td>
                    <td className="p-3 py-4">{user.email}</td>
                    <td className="p-3 py-4 text-blue-600 underline">
                      <a
                        href={user.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Profile
                      </a>
                    </td>
                    <td className="p-3">{user.gender}</td>
                    {(appConfig.features.editEnabled || appConfig.features.deleteEnabled) && (
                      <td
                        className="p-3 py-4 flex gap-2 justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {appConfig.features.editEnabled && (
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-800 cursor-pointer"
                          >
                            Edit
                          </button>
                        )}
                        {appConfig.features.deleteEnabled && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>

                  {/* Expandable Address */}
                  {expanded.includes(user.id) && (
                    <tr className="bg-white border-t">
                      <td></td>
                      <td colSpan={appConfig.features.editEnabled || appConfig.features.deleteEnabled ? 5 : 4} className="p-4">
                        <div className="text-sm">
                          <p className="font-semibold mb-2">Full Address:</p>
                          <p>{user.address.line1}</p>
                          {user.address.line2 && <p>{user.address.line2}</p>}
                          <p>{user.address.city}, {user.address.state} - {user.address.pin}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && <RegistrationForm />}
    </div>
  );
}

export default UserTable;