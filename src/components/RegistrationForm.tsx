"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCities, setShowForm, setUsers } from "../store/slice/userSlice";
import masterData from "../data/masterData.json";
import appConfig from "../config/appConfig";

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(
            appConfig.validation.name.minLength,
            `Must be at least ${appConfig.validation.name.minLength} characters`
        )
        .max(
            appConfig.validation.name.maxLength,
            `Must be ${appConfig.validation.name.maxLength} characters or less`
        ),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    linkedinUrl: Yup.string()
        .url("Invalid URL")
        .required("LinkedIn URL is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.object({
        line1: Yup.string().required("Address Line 1 is required"),
        line2: Yup.string().nullable(),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        pin: Yup.string()
            .required("PIN is required")
            .matches(/^[0-9]{6}$/, "PIN must be 6 digit number")
    }),
});

const RegistrationForm = () => {
    const { editingUser, cities, users } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative md:max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {editingUser ? "Edit User" : "Add User"}
                </h2>

                <Formik
                    initialValues={
                        editingUser || {
                            id: 0,
                            name: "",
                            email: "",
                            linkedinUrl: "",
                            gender: "",
                            address: {
                                line1: "",
                                line2: "",
                                state: "",
                                city: "",
                                pin: "",
                            },
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (editingUser) {
                            const updatedUsers = users.map((u) =>
                                u.id === editingUser.id ? { ...editingUser, ...values } : u
                            );
                            dispatch(setUsers(updatedUsers));
                        } else {
                            const newUser = { ...values, id: users.length + 1 };
                            dispatch(setUsers([...users, newUser]));
                        }
                        dispatch(setShowForm(false));
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-3">
                            {/* Name */}
                            <div>
                                <label className="block font-medium">
                                    Name *
                                    <span className="text-xs text-gray-500 ml-2">
                                        ({appConfig.validation.name.minLength}-
                                        {appConfig.validation.name.maxLength} characters)
                                    </span>
                                </label>
                                <Field name="name" className="w-full border rounded-md p-2" />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium">Email *</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full border rounded-md p-2"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <label className="block font-medium">LinkedIn URL *</label>
                                <Field
                                    name="linkedinUrl"
                                    className="w-full border rounded-md p-2"
                                />
                                <ErrorMessage
                                    name="linkedinUrl"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block font-medium">Gender *</label>
                                <div className="flex gap-4 mt-1">
                                    {["Male", "Female", "Other"].map((g) => (
                                        <label key={g} className="flex items-center gap-2">
                                            <Field type="radio" name="gender" value={g} />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Address Section */}
                            <div className="border-t pt-3 mt-3">
                                <h3 className="font-semibold mb-2">Address</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-5">
                                        <div className="flex-1">
                                            <label className="block font-medium">Address Line 1 *</label>
                                            <Field
                                                name="address.line1"
                                                className="w-full border rounded-md p-2"
                                                placeholder="Enter Address Line 1"
                                            />
                                            <ErrorMessage
                                                name="address.line1"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block font-medium">Address Line 2</label>
                                            <Field
                                                name="address.line2"
                                                className="w-full border rounded-md p-2"
                                                placeholder="Enter Address Line 2 (Optional)"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        {/* State */}
                                        <div className="flex-1">
                                            <Field
                                                as="select"
                                                name="address.state"
                                                className="w-full border rounded-md p-2"
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                    const state = e.target.value;
                                                    setFieldValue("address.state", state);
                                                    setFieldValue("address.city", "");

                                                    const stateData = masterData.states.find(
                                                        (s) => s.name === state
                                                    );
                                                    dispatch(setCities(stateData?.cities || []));
                                                }}
                                            >
                                                <option value="">Select State</option>
                                                {masterData.states.map((s) => (
                                                    <option key={s.name} value={s.name}>
                                                        {s.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="address.state"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="flex-1">
                                            <Field
                                                as="select"
                                                name="address.city"
                                                className="w-full border rounded-md p-2"
                                                disabled={!values.address.state}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="address.city"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* PIN */}
                                    <div>
                                        <label className="block font-medium">Pincode 1 *</label>
                                        <Field
                                            name="address.pin"
                                            className="w-full border rounded-md p-2"
                                            placeholder="Enter PIN Code"
                                        />
                                        <ErrorMessage
                                            name="address.pin"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => dispatch(setShowForm(false))}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700"
                                >
                                    {editingUser ? "Update" : "Add"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RegistrationForm;