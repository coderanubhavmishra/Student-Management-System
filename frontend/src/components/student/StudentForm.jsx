function StudentForm({
    student,
    loading,
    onChange,
    onSubmit,
    onCancel,
    buttonText
}) {

    const formTitle =
        buttonText.includes("Update") ? "Update Student" : "Add Student";

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    {formTitle}
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={student.name}
                        onChange={onChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={onChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="course"
                        placeholder="Course"
                        value={student.course}
                        onChange={onChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={student.mobile}
                        onChange={onChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : buttonText}
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={onCancel}
                            className="flex-1 bg-gray-500 text-white p-3 rounded hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default StudentForm;