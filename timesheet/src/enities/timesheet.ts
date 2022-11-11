export interface ITimeSheet {
    _id:            string;
    projectId:      string;
    color?:         string;
    description:    string;
    workday:        Date;
    hours:          number;
}