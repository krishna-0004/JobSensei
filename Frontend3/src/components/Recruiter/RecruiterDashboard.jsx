import React from 'react';

const RecruiterDashboard = () => {
  const applications = [
    {
      job: {
        _id: 'job1',
        title: 'Frontend Developer',
        company: 'TechNova',
        location: 'Bangalore',
      },
      applicants: [
        {
          _id: 'intan1',
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '9876543210',
          location: 'Delhi',
          gender: 'Male',
          skills: ['React', 'JavaScript', 'Tailwind CSS'],
          education: [
            { degree: 'B.Tech', institution: 'IIT Delhi', year: '2023' },
          ],
          projects: [
            { name: 'Portfolio Website', description: 'Built with React and Vite' },
          ],
          awards_certifications: ['Google UX Design', 'Hackathon Winner 2022'],
        },
      ],
    },
    {
      job: {
        _id: 'job2',
        title: 'Backend Engineer',
        company: 'DataCrate',
        location: 'Hyderabad',
      },
      applicants: [
        {
          _id: 'intan2',
          name: 'Sneha Mehta',
          email: 'sneha.mehta@example.com',
          phone: '9123456789',
          location: 'Mumbai',
          gender: 'Female',
          skills: ['Node.js', 'MongoDB', 'Express'],
          education: [
            { degree: 'MCA', institution: 'Mumbai University', year: '2022' },
          ],
          projects: [
            { name: 'Job Portal API', description: 'RESTful API for job search platform' },
          ],
          awards_certifications: ['MongoDB Certified Developer'],
        },
      ],
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Recruiter Dashboard
      </h1>

      {applications.map(({ job, applicants }) => (
        <div key={job._id} className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-1">{job.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {job.company} — {job.location}
          </p>

          {applicants.length === 0 ? (
            <p className="text-gray-500">No one has applied for this job yet.</p>
          ) : (
            <div className="space-y-4">
              {applicants.map((applicant) => (
                <div key={applicant._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800">{applicant.name}</h3>
                  <p><strong>Email:</strong> {applicant.email}</p>
                  <p><strong>Phone:</strong> {applicant.phone}</p>
                  <p><strong>Location:</strong> {applicant.location}</p>
                  <p><strong>Gender:</strong> {applicant.gender}</p>
                  <p><strong>Skills:</strong> {applicant.skills.join(', ')}</p>

                  <div className="mt-3">
                    <p className="font-semibold text-gray-700">Education:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {applicant.education.map((edu, index) => (
                        <li key={index}>
                          {edu.degree} at {edu.institution} ({edu.year})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <p className="font-semibold text-gray-700">Projects:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {applicant.projects.map((proj, index) => (
                        <li key={index}>
                          <span className="font-medium">{proj.name}</span> - {proj.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <p className="font-semibold text-gray-700">Certifications & Awards:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {applicant.awards_certifications.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecruiterDashboard;
