import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/resultview.css';

const ResultView = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch results from the backend
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/results/all');
                setResults(response.data);
                setFilteredResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching results:', error);
                setError('Failed to fetch results.');
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    // Handle Search Input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter results based on the query
        const filtered = results.filter(
            (result) =>
                result.name.toLowerCase().includes(query) ||
                result.examRollNo.toString().includes(query) ||
                result.collegeRollNo.toString().includes(query)
        );
        setFilteredResults(filtered);
    };

    const handleDownload = async (resultId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/results/download/${resultId}`, {
                responseType: 'blob', // Important for handling file downloads
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `Result-${resultId}.pdf`; // Adjust filename as required
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading result:', error);
            alert('Failed to download result.');
        }
    };

    if (loading) {
        return <p>Loading results...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="result-view-container">
            <h2 className="view-heading">Student Results</h2>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name, Exam Roll No, or College Roll No"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {filteredResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <table className="result-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Exam Roll No</th>
                            <th>College Roll No</th>
                            <th>Honours</th>
                            <th>CC</th>
                            <th>GE1</th>
                            <th>GE2</th>
                            <th>CGPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((result) => (
                            <tr key={result._id}>
                                <td>{result.name}</td>
                                <td>{result.examRollNo}</td>
                                <td>{result.collegeRollNo}</td>
                                <td>{result.honours}</td>
                                <td>{result.cc}</td>
                                <td>{result.ge1}</td>
                                <td>{result.ge2}</td>
                                <td>{result.cgpa.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handleDownload(result._id)}
                                        className="download-button"
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ResultView;
