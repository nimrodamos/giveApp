const CreateProjectPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Project</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Project Description"
          className="p-2 border rounded"
        ></textarea>
        <input
          type="number"
          placeholder="Goal Amount"
          className="p-2 border rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
