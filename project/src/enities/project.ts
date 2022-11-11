export interface IProject {
    _id:            string | undefined;
    name:           string;
    type:           string;
    payerId:        string;
    payerName:      string;
    receptorId:     string;
    receptorName:   string;
    rateValueDay:   number;
    rateValueHour:  number;
    color:          string;
}