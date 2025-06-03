
export interface College {
    name: string;
    state: string;
    popularCourses: string[];
}

export const usColleges: College[] = [
    {
        name: "Harvard University",
        state: "Massachusetts",
        popularCourses: ["Computer Science", "Economics", "Political Science", "Psychology", "Biology"]
    },
    {
        name: "Stanford University",
        state: "California",
        popularCourses: ["Computer Science", "Engineering", "Business", "Human Biology", "International Relations"]
    },
    {
        name: "Massachusetts Institute of Technology (MIT)",
        state: "Massachusetts",
        popularCourses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Physics", "Mathematics"]
    },
    {
        name: "California Institute of Technology (Caltech)",
        state: "California",
        popularCourses: ["Computer Science", "Physics", "Electrical Engineering", "Chemical Engineering", "Biology"]
    },
    {
        name: "Princeton University",
        state: "New Jersey",
        popularCourses: ["Computer Science", "Economics", "Public Policy", "Molecular Biology", "Psychology"]
    },
    {
        name: "Yale University",
        state: "Connecticut",
        popularCourses: ["Political Science", "Economics", "History", "Psychology", "Biology"]
    },
    {
        name: "Columbia University",
        state: "New York",
        popularCourses: ["Computer Science", "Economics", "Political Science", "Psychology", "English"]
    },
    {
        name: "University of Chicago",
        state: "Illinois",
        popularCourses: ["Economics", "Mathematics", "Political Science", "Computer Science", "Physics"]
    },
    {
        name: "University of Pennsylvania",
        state: "Pennsylvania",
        popularCourses: ["Finance", "Economics", "Nursing", "Computer Science", "Biology"]
    },
    {
        name: "Duke University",
        state: "North Carolina",
        popularCourses: ["Computer Science", "Economics", "Public Policy", "Biology", "Psychology"]
    },
    // Add more universities as needed...
    {
        name: "New York University (NYU)",
        state: "New York",
        popularCourses: ["Business", "Film & Television", "Economics", "Computer Science", "Psychology"]
    },
    {
        name: "University of California, Berkeley",
        state: "California",
        popularCourses: ["Computer Science", "Electrical Engineering", "Business", "Molecular Biology", "Economics"]
    },
    {
        name: "University of California, Los Angeles (UCLA)",
        state: "California",
        popularCourses: ["Biology", "Political Science", "Psychology", "Economics", "Sociology"]
    },
    {
        name: "University of Michigan",
        state: "Michigan",
        popularCourses: ["Business", "Psychology", "Economics", "Computer Science", "Political Science"]
    },
    {
        name: "University of Virginia",
        state: "Virginia",
        popularCourses: ["Economics", "Business", "Biology", "Psychology", "Political Science"]
    },
];

// Common US courses that span multiple universities
export const commonCourses = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Economics",
    "Business Administration",
    "Finance",
    "Accounting",
    "Marketing",
    "Psychology",
    "Political Science",
    "International Relations",
    "English Literature",
    "History",
    "Sociology",
    "Communications",
    "Nursing",
    "Pre-Med",
    "Pre-Law",
    "Film Studies",
    "Architecture",
    "Art History",
    "Philosophy",
    "Environmental Science",
    "Biochemistry"
];