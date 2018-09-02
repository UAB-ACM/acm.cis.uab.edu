const tutoring = {

    courses: [
        {
            name: 'Algorithms and Data Structures',
            categories: ['uab']
        },
        {
            name: 'Capstone',
            categories: ['uab']
        },
        {
            name: 'Computer Organization and Assembly',
            categories: ['uab']
        },
        {
            name: 'Discrete Structures',
            categories: ['uab']
        },

        {
            name: 'Google Cloud Platform',
            categories: ['web'],
            icon: 'icon-cloud'
        }
    ],

    categories: [
        {label: 'Courses at UAB', key: 'uab'},
        {label: 'Web Development', key: 'web'},
    ]

}

// TODO - swap this implementation to resolve from a data source that officers can update?
export const getWithDefaults = () => ({
    courses: tutoring.courses.map(C => ({
        icon: 'icon-line-book',
        categories: C.categories.map(c => 'xxx'+c).join(' '),
        ...C
    })),
    categories: tutoring.categories.map(C => ({ key: 'xxx'+C.key, ...C }))
})