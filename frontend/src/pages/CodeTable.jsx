import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism"

const PAGE_SIZE = 4;
const languageMap = {
    'C++': 54,
    'Python': 71,
    'JavaScript': 63,
    'Java': 28
}

const codeMap = {
    54: 'C++',
    71: 'Python',
    63: 'JavaScript',
    28: 'Java'
}
function CodeTable() {


    const [codes, setCodes] = useState([]);




    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);


    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const [responseof, setResponseOf] = useState(0)
    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const response = await axios.get(`https://tuf-server-113b.onrender.com/api/v1/code/listcodes?page=${currentPage}`);
                setCodes(response.data.data)


            } catch (error) {
                console.error('Error fetching codes:', error);
            }
        };

        fetchCodes();
    }, [currentPage]);

    const handleSubmitCode = async (id, sourceCode, code_language, input) => {
        if (loading) {
            return;
        }
        setLoading(true);
        setResponse(null);
        setResponseOf(id)
        const submissionOptions = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'false',
                wait: 'true'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '2e4508cademshd63869206b9a3a5p13cc15jsnd61c05ab9039',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
                language_id: languageMap[code_language],
                source_code: sourceCode,
                stdin: input
            }
        };

        try {
            const submissionResponse = await axios.request(submissionOptions);
            const { token } = submissionResponse.data;

            const fetchOptions = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: {
                    base64_encoded: 'false',
                    fields: 'stdout,status_id,language_id,stderr'
                },
                headers: {
                    'X-RapidAPI-Key': '2e4508cademshd63869206b9a3a5p13cc15jsnd61c05ab9039',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            };

            const fetchResponse = await axios.request(fetchOptions);



            setResponse(fetchResponse.data);
            setResponseOf(id)
        } catch (error) {
            console.error('Error submitting code:', error);
        } finally {
            setLoading(false);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-900 text-white w-85vw mx-auto p-4 h-[1000px]">
            <h2 className="text-xl font-bold mb-4">All Submitted Entries</h2>

            {codes.length === 0 && currentPage > 1 && (
                <div className="flex justify-center items-center text-center mb-4">
                    <p className="text-gray-400">Nothing here. Go to previous page.</p>
                </div>
            )}

            {codes.length > 0 && (
                <table className="border-collapse border w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-800 text-white">Username</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-800 text-white">Code Language</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-800 text-white">Standard Input</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-800 text-white">Source Code</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-800 text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map(code => (
                            <React.Fragment key={code.id}>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">{code.username}</td>
                                    <td className="border border-gray-300 px-4 py-2">{code.code_language}</td>
                                    <td className="border border-gray-300 px-4 py-2">{code.standard_input}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <SyntaxHighlighter language={code.code_language.toLowerCase()} style={materialOceanic}>
                                            {code.source_code.substring(0, 200)}
                                        </SyntaxHighlighter>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 ">
                                        {loading && responseof === code.id && (
                                            <div className="flex justify-center items-center h-full">
                                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                        {!loading && response && responseof === code.id && (
                                            <div className="bg-gray-800 rounded-md border border-gray-300 px-4 py-2 text-white">
                                                <h3 className="font-bold mb-2">Response:</h3>

                                                {response.language_id && <p>Language: {codeMap[response.language_id]}</p>}
                                                {response.stdout && <p className="text-green-500">Stdout: {response.stdout}</p>}
                                                {response.stderr && <p className="text-red-500">Error: {response.stderr}</p>}
                                                {response.status_id && <p>Judge0 Status: {response.status_id}</p>}
                                            </div>
                                        )}
                                        {!loading && responseof !== code.id && (
                                            <button
                                                className="bg-blue-900 text-white px-4 py-2 rounded-md"
                                                onClick={() => handleSubmitCode(code.id, code.source_code, code.code_language, code.standard_input)}
                                            >
                                                Submit
                                            </button>
                                        )}
                                        {loading && responseof !== code.id && (
                                            <button
                                                className="bg-blue-900 text-white px-4 py-2 rounded-md"
                                                onClick={() => handleSubmitCode(code.id, code.source_code, code.code_language, code.standard_input)}
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </td>
                                </tr>

                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}

            {codes.length === 0 && currentPage === 1 && (
                <div className="flex justify-center items-center text-center mt-4">
                    <p className="text-gray-400">No codes submitted yet.</p>
                </div>
            )}

            <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page + 1}
                        className={`bg-blue-900 text-white px-4 py-2 rounded-md ${currentPage === page + 1 ? 'text-yellow-500' : ''}`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );


}

export default CodeTable











// <div className="flex bg-white rounded-lg font-[Poppins]">
// <button onClick={back} className="h-12 border-2 border-r-0 border-indigo-600
//      px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white">
//     <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
//     </svg>
// </button>
// {
//     pages.map((pg, i) => (
//         <button key={i} onClick={() => setCur(pg.page)} className={`h-12 border-2 border-r-0 border-indigo-600
//      w-12 ${cur === pg.page && 'bg-indigo-600 text-white'}`}>{pg.page}</button>
//     ))
// }
// <button onClick={Next} className="h-12 border-2  border-indigo-600
//      px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white">
//     <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
// </button>
// </div>