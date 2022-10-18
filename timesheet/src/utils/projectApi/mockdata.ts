import { IProjectData } from "../../components/ProjectForm";

export const projects: IProjectData[] = [
    {
        id:     '1',
        name:   'Accenture',
        color:  'yellow',
        workdays: [
            {
                month: 9,
                hours: [
                    {
                        workday: 25,
                        workhours: 8
                    },
                    {
                        workday: 26,
                        workhours: 8
                    },
                    {
                        workday: 27,
                        workhours: 8
                    },
                    {
                        workday: 28,
                        workhours: 8
                    }
                ]
            },
            {
                month: 10,
                hours: [
                    {
                        workday: 3,
                        workhours: 8
                    },
                    {
                        workday: 4,
                        workhours: 8
                    },
                    {
                        workday: 5,
                        workhours: 8
                    },
                    {
                        workday: 6,
                        workhours: 8
                    },
                    {
                        workday: 11,
                        workhours: 8
                    },
                    {
                        workday: 13,
                        workhours: 8
                    },
                    {
                        workday: 19,
                        workhours: 8
                    },
                    {
                        workday: 25,
                        workhours: 8
                    },
                    {
                        workday: 27,
                        workhours: 8
                    },
                    {
                        workday: 28,
                        workhours: 8
                    }
                ]
            }
        ]
    },
    {
        id:     '2',
        name:   'Ramada',
        color:  'blue',
        workdays: [
            {
                month: 9,
                hours: [
                    {
                        workday: 25,
                        workhours: 8
                    },
                    {
                        workday: 26,
                        workhours: 8
                    },
                    {
                        workday: 27,
                        workhours: 8
                    },
                    {
                        workday: 28,
                        workhours: 8
                    }
                ]
            },
        ]
    }
];