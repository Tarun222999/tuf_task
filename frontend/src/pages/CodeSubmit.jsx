import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function CodeSubmit() {
    const [formData, setFormData] = useState({
        username: '',
        codeLanguage: '',
        standardInput: '',
        sourceCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/code/createcode', formData); // Send form data to backend
            console.log('Response from backend:', response.data);




            if (response.data?.success) {
                toast.success('🦄 Submited Code!', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light"
                });
            } else {
                toast.error('Code Submitting Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light"
                })
            }
            // Reset form data after successful submission if needed
            setFormData({
                username: '',
                codeLanguage: '',
                standardInput: '',
                sourceCode: ''
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex-col md:flex-row flex justify-center items-center h-screen bg-gray-900 text-white">

                <form onSubmit={handleSubmit} className="w-[850px] ">
                    <h2 className="text-xl font-bold mb-[10px]">Submit your Code</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="codeLanguage" className="block mb-2">Preferred Code Language</label>
                        <select id="codeLanguage" name="codeLanguage" value={formData.codeLanguage} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white">
                            <option value="">Select language</option>
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="standardInput" className="block mb-2">Standard Input (stdin)</label>
                        <textarea id="standardInput" name="standardInput" value={formData.standardInput} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white" rows="4"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sourceCode" className="block mb-2">Source Code</label>
                        <textarea id="sourceCode" name="sourceCode" value={formData.sourceCode} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white" rows="10"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                </form>
                {/* Display the code with syntax highlighting */}
                {
                    formData.sourceCode &&
                    <div className="ml-8">
                        <h2 className="text-xl font-bold mb-4">Code :</h2>
                        <SyntaxHighlighter language={formData.codeLanguage.toLowerCase()} style={materialOceanic}>
                            {formData.sourceCode}
                        </SyntaxHighlighter>
                    </div>
                }
            </div>
        </>
    );
}

export default CodeSubmit
